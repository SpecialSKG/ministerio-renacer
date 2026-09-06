import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";
import { randomBytes } from "node:crypto";

const executable = process.argv[2] || "gitleaks";
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), "opencode-gitleaks-"));
const fixture = path.join(temporary, "fixture.txt");
const config = path.resolve(".gitleaks.toml");
function randomAlphanumeric(length) {
  let value = "";
  while (value.length < length) {
    value += randomBytes(length)
      .toString("base64")
      .replace(/[^a-zA-Z0-9]/g, "");
  }
  return value.slice(0, length);
}

const fakeCredential = [
  "github",
  "_pat_",
  randomAlphanumeric(22),
  "_",
  randomAlphanumeric(59),
].join("");

try {
  fs.writeFileSync(
    fixture,
    `temporary_token="${fakeCredential}"\napi_key="${randomAlphanumeric(64)}"\n`,
    {
    encoding: "utf8",
    mode: 0o600,
    },
  );
  const result = spawnSync(
    executable,
    [
      "dir",
      "--no-banner",
      "--redact",
      "--exit-code",
      "42",
      "--config",
      config,
      temporary,
    ],
    { encoding: "utf8" },
  );
  if (result.error) throw result.error;
  if (result.status !== 42) {
    throw new Error(
      `Gitleaks debía detectar el fixture (exit 42), devolvió ${result.status}\n${result.stderr}`,
    );
  }
  const output = `${result.stdout}\n${result.stderr}`;
  if (output.includes(fakeCredential)) {
    throw new Error("Gitleaks imprimió el fixture sin redactar");
  }
  console.log("GITLEAKS FIXTURE OK (detección y redacción)");
} finally {
  const resolved = path.resolve(temporary);
  const tempRoot = path.resolve(os.tmpdir());
  if (resolved.startsWith(`${tempRoot}${path.sep}`)) {
    fs.rmSync(resolved, { recursive: true, force: true });
  }
}
