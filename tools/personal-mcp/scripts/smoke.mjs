import path from "node:path";
import process from "node:process";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const toolRoot = path.resolve(import.meta.dirname, "..");
const projectRoot = path.resolve(toolRoot, "..", "..");
const transport = new StdioClientTransport({
  command: process.execPath,
  args: [path.join(toolRoot, "src", "index.mjs")],
  cwd: projectRoot,
  env: {
    ...process.env,
    PERSONAL_MCP_ROOT: projectRoot,
    PERSONAL_MCP_CONFIG: path.join(
      toolRoot,
      "config",
      "project.example.json",
    ),
  },
});
const client = new Client({ name: "personal-mcp-smoke", version: "1.0.0" });

try {
  await client.connect(transport);
  const listed = await client.listTools();
  const expected = [
    "project_context",
    "list_project_files",
    "read_project_file",
    "search_project_text",
  ];
  for (const name of expected) {
    if (!listed.tools.some((tool) => tool.name === name)) {
      throw new Error(`Herramienta ausente: ${name}`);
    }
  }
  const context = await client.callTool({
    name: "project_context",
    arguments: {},
  });
  if (context.isError) throw new Error("project_context devolvió error");

  const readable = await client.callTool({
    name: "read_project_file",
    arguments: { path: "README.md" },
  });
  if (readable.isError) throw new Error("README.md debía ser legible");

  const denied = await client.callTool({
    name: "read_project_file",
    arguments: { path: ".env" },
  });
  if (!denied.isError) throw new Error("La lectura de .env no fue denegada");

  const traversal = await client.callTool({
    name: "read_project_file",
    arguments: { path: "../README.md" },
  });
  if (!traversal.isError) throw new Error("El escape de raíz no fue denegado");

  const files = await client.callTool({
    name: "list_project_files",
    arguments: {},
  });
  const serializedFiles = JSON.stringify(files);
  if (serializedFiles.includes("node_modules") || serializedFiles.includes(".git/")) {
    throw new Error("El listado expuso una ruta denegada");
  }

  console.log(`MCP SMOKE OK (${listed.tools.length} herramientas)`);
} finally {
  await client.close();
}
