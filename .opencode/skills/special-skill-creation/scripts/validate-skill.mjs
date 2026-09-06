#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const input = process.argv[2];
if (!input) {
  console.error("Uso: node validate-skill.mjs <ruta-skill>");
  process.exit(2);
}

const directory = path.resolve(process.cwd(), input);
const skillFile = path.join(directory, "SKILL.md");
const errors = [];

if (!fs.existsSync(skillFile)) {
  errors.push("Falta SKILL.md");
} else {
  const content = fs.readFileSync(skillFile, "utf8");
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) {
    errors.push("Frontmatter ausente o sin cierre");
  } else {
    const frontmatter = match[1];
    const keys = [...frontmatter.matchAll(/^([a-zA-Z0-9_-]+):/gm)].map(
      (entry) => entry[1],
    );
    const unexpected = keys.filter(
      (key) => !["name", "description", "license", "compatibility", "metadata"].includes(key),
    );
    const name = frontmatter.match(/^name:\s*["']?([^"'\r\n]+)["']?\s*$/m)?.[1];
    const descriptionMatch = frontmatter.match(
      /^description:\s*(?:"([^"]+)"|'([^']+)'|(.+))$/m,
    );
    const description =
      descriptionMatch?.[1] ?? descriptionMatch?.[2] ?? descriptionMatch?.[3];

    if (!name) errors.push("Falta name");
    if (!description) errors.push("Falta description en una sola línea");
    if (unexpected.length > 0) {
      errors.push(`Campos de frontmatter no permitidos: ${unexpected.join(", ")}`);
    }
    if (name && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
      errors.push("name debe usar kebab-case");
    }
    if (name && name !== path.basename(directory)) {
      errors.push("name no coincide con el nombre de la carpeta");
    }
    if (name && name.length > 64) errors.push("name debe tener como máximo 64 caracteres");
    if (description && description.length > 1024) {
      errors.push("description excede 1024 caracteres");
    }
  }

  const lineCount = content.split(/\r?\n/).length;
  if (lineCount > 500) errors.push("SKILL.md excede 500 líneas");
}

if (errors.length > 0) {
  console.error("SKILL INVÁLIDA");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`SKILL VÁLIDA: ${path.basename(directory)}`);
