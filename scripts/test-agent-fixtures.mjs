import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const fixtures = JSON.parse(
  fs.readFileSync(
    path.join(root, "scripts/fixtures/agent-topology.invalid.json"),
    "utf8",
  ),
);
const failures = [];

for (const fixture of fixtures) {
  const result = spawnSync(
    process.execPath,
    ["scripts/validate-template.mjs", "--fixture", fixture.name],
    {
      cwd: root,
      encoding: "utf8",
    },
  );
  const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
  if (result.status === 0) {
    failures.push(`${fixture.name}: el fixture inválido fue aceptado`);
  } else if (!output.includes(fixture.expected)) {
    failures.push(
      `${fixture.name}: falló sin citar la invariante esperada "${fixture.expected}"`,
    );
  }
}

if (failures.length > 0) {
  console.error(`FIXTURES DE AGENTES FALLIDOS (${failures.length})`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`FIXTURES DE AGENTES COMPLETOS (${fixtures.length} mutaciones rechazadas)`);
