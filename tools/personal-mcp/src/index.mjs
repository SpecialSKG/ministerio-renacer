#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const root = path.resolve(process.env.PERSONAL_MCP_ROOT || process.cwd());
const configPath = path.resolve(
  root,
  process.env.PERSONAL_MCP_CONFIG ||
    "tools/personal-mcp/config/project.example.json",
);

function stop(message) {
  console.error(`[personal-mcp] ${message}`);
  process.exit(1);
}

if (!fs.existsSync(configPath)) stop(`Configuración inexistente: ${configPath}`);

let config;
try {
  config = JSON.parse(fs.readFileSync(configPath, "utf8"));
} catch (error) {
  stop(`Configuración JSON inválida: ${error.message}`);
}

const requiredArrays = ["instructions", "allowedPaths", "deniedPatterns", "textExtensions"];
for (const key of requiredArrays) {
  if (!Array.isArray(config[key])) stop(`${key} debe ser un arreglo`);
}
if (config.allowedPaths.length === 0) stop("allowedPaths no puede estar vacío");

const rootReal = fs.realpathSync(root);
const maxFileBytes = boundedInteger(config.maxFileBytes, 1024, 1048576, 65536);
const maxResults = boundedInteger(config.maxResults, 1, 100, 25);

function boundedInteger(value, minimum, maximum, fallback) {
  return Number.isInteger(value) && value >= minimum && value <= maximum
    ? value
    : fallback;
}

function posix(relativePath) {
  return relativePath.replaceAll("\\", "/").replace(/^\.\/+/, "");
}

function globRegex(glob) {
  const pattern = posix(glob);
  let source = "";
  for (let index = 0; index < pattern.length; index += 1) {
    const character = pattern[index];
    const next = pattern[index + 1];
    if (character === "*" && next === "*" && pattern[index + 2] === "/") {
      source += "(?:.*/)?";
      index += 2;
    } else if (character === "*" && next === "*") {
      source += ".*";
      index += 1;
    } else if (character === "*") {
      source += "[^/]*";
    } else if (character === "?") {
      source += "[^/]";
    } else {
      source += character.replace(/[.+^${}()|[\]\\]/g, "\\$&");
    }
  }
  return new RegExp(`^${source}$`, "i");
}

const allowed = config.allowedPaths.map(globRegex);
const denied = config.deniedPatterns.map(globRegex);

function isAllowed(relativePath) {
  const normalized = posix(relativePath);
  return (
    allowed.some((pattern) => pattern.test(normalized)) &&
    !denied.some((pattern) => pattern.test(normalized))
  );
}

function resolveReadable(relativePath) {
  const normalized = posix(relativePath);
  if (!normalized || path.isAbsolute(relativePath) || !isAllowed(normalized)) {
    throw new Error("Ruta fuera de la allowlist");
  }
  const absolute = path.resolve(root, normalized);
  if (!fs.existsSync(absolute)) throw new Error("Archivo inexistente");
  const real = fs.realpathSync(absolute);
  if (real !== rootReal && !real.startsWith(`${rootReal}${path.sep}`)) {
    throw new Error("La ruta resuelta sale del proyecto");
  }
  const stat = fs.statSync(real);
  if (!stat.isFile()) throw new Error("La ruta no es un archivo");
  if (stat.size > maxFileBytes) {
    throw new Error(`Archivo mayor al límite de ${maxFileBytes} bytes`);
  }
  if (!config.textExtensions.includes(path.extname(real).toLowerCase())) {
    throw new Error("Extensión no autorizada");
  }
  return { absolute: real, relative: normalized, size: stat.size };
}

function walk(directory, results = []) {
  if (results.length >= maxResults * 20) return results;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    const relative = posix(path.relative(root, absolute));
    if (denied.some((pattern) => pattern.test(relative))) continue;
    if (entry.isSymbolicLink()) continue;
    if (
      entry.isDirectory() &&
      !denied.some((pattern) => pattern.test(`${relative}/`))
    ) {
      walk(absolute, results);
    }
    if (entry.isFile() && isAllowed(relative)) results.push(relative);
  }
  return results;
}

function response(data) {
  return {
    content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
    structuredContent: data,
  };
}

function failure(error) {
  return {
    isError: true,
    content: [{ type: "text", text: error.message }],
  };
}

const server = new McpServer({
  name: "special-personal-project",
  version: "1.0.0",
});

server.registerTool(
  "project_context",
  {
    title: "Contexto personal del proyecto",
    description:
      "Devuelve propósito e instrucciones curadas del proyecto sin leer archivos.",
    inputSchema: {},
    outputSchema: {
      projectName: z.string(),
      purpose: z.string(),
      instructions: z.array(z.string()),
    },
  },
  async () =>
    response({
      projectName: String(config.projectName || "Proyecto sin nombre"),
      purpose: String(config.purpose || ""),
      instructions: config.instructions.map(String),
    }),
);

server.registerTool(
  "list_project_files",
  {
    title: "Listar archivos permitidos",
    description:
      "Lista archivos de texto que coinciden con la allowlist del perfil personal.",
    inputSchema: {
      contains: z.string().max(100).optional(),
    },
    outputSchema: {
      files: z.array(z.string()),
      truncated: z.boolean(),
    },
  },
  async ({ contains }) => {
    try {
      const needle = contains?.toLowerCase();
      const matches = walk(root)
        .filter((file) => !needle || file.toLowerCase().includes(needle))
        .sort();
      return response({
        files: matches.slice(0, maxResults),
        truncated: matches.length > maxResults,
      });
    } catch (error) {
      return failure(error);
    }
  },
);

server.registerTool(
  "read_project_file",
  {
    title: "Leer archivo permitido",
    description:
      "Lee un archivo de texto autorizado, sujeto a límites de ruta, extensión y tamaño.",
    inputSchema: {
      path: z.string().min(1).max(300),
    },
    outputSchema: {
      path: z.string(),
      size: z.number(),
      content: z.string(),
    },
  },
  async ({ path: requestedPath }) => {
    try {
      const file = resolveReadable(requestedPath);
      return response({
        path: file.relative,
        size: file.size,
        content: fs.readFileSync(file.absolute, "utf8"),
      });
    } catch (error) {
      return failure(error);
    }
  },
);

server.registerTool(
  "search_project_text",
  {
    title: "Buscar texto permitido",
    description:
      "Busca texto literal dentro de archivos autorizados sin ejecutar comandos.",
    inputSchema: {
      query: z.string().min(2).max(200),
    },
    outputSchema: {
      matches: z.array(
        z.object({
          path: z.string(),
          line: z.number(),
          preview: z.string(),
        }),
      ),
      truncated: z.boolean(),
    },
  },
  async ({ query }) => {
    try {
      const needle = query.toLowerCase();
      const matches = [];
      for (const relative of walk(root)) {
        let file;
        try {
          file = resolveReadable(relative);
        } catch {
          continue;
        }
        const lines = fs.readFileSync(file.absolute, "utf8").split(/\r?\n/);
        for (let index = 0; index < lines.length; index += 1) {
          if (!lines[index].toLowerCase().includes(needle)) continue;
          matches.push({
            path: relative,
            line: index + 1,
            preview: lines[index].trim().slice(0, 240),
          });
          if (matches.length > maxResults) break;
        }
        if (matches.length > maxResults) break;
      }
      return response({
        matches: matches.slice(0, maxResults),
        truncated: matches.length > maxResults,
      });
    } catch (error) {
      return failure(error);
    }
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
