import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const failures = [];
const checks = [];
const fixtureArgument = process.argv.indexOf("--fixture");
const fixtureName = fixtureArgument >= 0 ? process.argv[fixtureArgument + 1] : undefined;
const fixtureCatalog = fixtureName
  ? JSON.parse(
      fs.readFileSync(
        path.join(root, "scripts/fixtures/agent-topology.invalid.json"),
        "utf8",
      ),
    )
  : [];
const activeFixture = fixtureCatalog.find((fixture) => fixture.name === fixtureName);
let fixtureApplied = false;

if (fixtureArgument >= 0 && !fixtureName) {
  console.error("Falta el nombre después de --fixture");
  process.exit(2);
}
if (fixtureName && !activeFixture) {
  console.error(`Fixture desconocido: ${fixtureName}`);
  process.exit(2);
}

function ok(message) {
  checks.push(message);
}

function fail(message) {
  failures.push(message);
}

function read(relativePath) {
  const content = fs.readFileSync(path.join(root, relativePath), "utf8");
  if (!activeFixture || relativePath.replaceAll("\\", "/") !== activeFixture.file) {
    return content;
  }
  if (!content.includes(activeFixture.find)) {
    fail(`fixture ${fixtureName}: patrón de mutación ausente`);
    return content;
  }
  fixtureApplied = true;
  return content.replace(activeFixture.find, activeFixture.replace);
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function listFiles(relativePath) {
  const base = path.join(root, relativePath);
  return fs.readdirSync(base, { withFileTypes: true }).flatMap((entry) => {
    const child = path.join(relativePath, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules") return [];
      return listFiles(child);
    }
    return [child.replaceAll("\\", "/")];
  });
}

function frontmatter(relativePath) {
  const content = read(relativePath);
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) {
    fail(`${relativePath}: frontmatter ausente o sin cierre`);
    return "";
  }
  return match[1];
}

function scalar(source, key) {
  const match = source.match(new RegExp(`^${key}:\\s*(.+?)\\s*$`, "m"));
  if (!match) return undefined;
  return match[1].replace(/^["']|["']$/g, "");
}

function nestedKeys(source, parent) {
  const lines = source.split(/\r?\n/);
  const start = lines.findIndex((line) => line === `  ${parent}:`);
  if (start < 0) return [];
  const keys = [];
  for (let index = start + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (line.trim() === "") continue;
    if (!line.startsWith("    ")) break;
    const match = line.match(/^ {4}["']?([^"':]+)["']?:/);
    if (match) keys.push(match[1]);
  }
  return keys;
}

function nestedMap(source, parent) {
  const lines = source.split(/\r?\n/);
  const start = lines.findIndex((line) => line === `  ${parent}:`);
  if (start < 0) return new Map();
  const entries = new Map();
  for (let index = start + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (line.trim() === "") continue;
    if (!line.startsWith("    ")) break;
    const match = line.match(/^ {4}["']?([^"':]+)["']?:\s*(.*?)\s*$/);
    if (match) entries.set(match[1], match[2].replace(/^["']|["']$/g, ""));
  }
  return entries;
}

function permissionScalar(source, key) {
  const match = source.match(new RegExp(`^  ${key}:\\s*(.+?)\\s*$`, "m"));
  return match?.[1]?.replace(/^["']|["']$/g, "");
}

function validateJson(relativePath) {
  try {
    JSON.parse(read(relativePath));
    ok(`${relativePath}: JSON válido`);
  } catch (error) {
    fail(`${relativePath}: JSON inválido (${error.message})`);
  }
}

for (const file of ["opencode.json", "opencode.local-mcp.example.json"]) {
  validateJson(file);
}

const config = JSON.parse(read("opencode.json"));
if (config.share !== "disabled") fail("opencode.json: share debe estar disabled");
if (config.autoupdate !== "notify") {
  fail('opencode.json: autoupdate debe estar en "notify"');
}
if (config.permission?.["*"] !== "ask") {
  fail('opencode.json: herramientas no enumeradas deben heredar "*" = ask');
}
if (config.permission?.task?.["*"] !== "deny") {
  fail("opencode.json: task global debe denegar *");
}
if (config.permission?.doom_loop !== "deny") {
  fail("opencode.json: doom_loop debe detener repeticiones idénticas");
}
for (const [name, mcp] of Object.entries(config.mcp ?? {})) {
  if (mcp.enabled !== false) fail(`opencode.json: MCP ${name} debe iniciar deshabilitado`);
  if (!Number.isInteger(mcp.timeout) || mcp.timeout <= 0) {
    fail(`opencode.json: MCP ${name} debe declarar timeout positivo`);
  }
}
for (const name of ["context7", "playwright", "personal"]) {
  if (!config.mcp?.[name]) fail(`opencode.json: falta MCP opt-in ${name}`);
  if (config.permission?.[`${name}_*`] !== "deny") {
    fail(`opencode.json: ${name}_* debe estar denegado globalmente`);
  }
}
if (
  !Number.isInteger(config.tool_output?.max_lines) ||
  !Number.isInteger(config.tool_output?.max_bytes)
) {
  fail("opencode.json: tool_output debe limitar líneas y bytes");
}
if (config.compaction?.prune !== false) {
  fail("opencode.json: compaction.prune debe preservar evidencia");
}
const configText = read("opencode.json");
for (const pattern of ["*.env", "*.pem", "*.key", "credentials.*", "secrets.*"]) {
  if (!configText.includes(`"${pattern}": "deny"`)) {
    fail(`opencode.json: falta protección de lectura para ${pattern}`);
  }
}
for (const pattern of ["rm *", "Remove-Item*", "del *", "rmdir *", "git reset*"]) {
  if (config.permission?.bash?.[pattern] !== "deny") {
    fail(`opencode.json: falta denegación global para ${pattern}`);
  }
}
if (config.instructions?.includes("AGENTS.md")) {
  fail("opencode.json: AGENTS.md no debe cargarse dos veces");
}
if (!config.instructions?.includes(".opencode/instructions/agent-contracts.md")) {
  fail("opencode.json: debe cargar el contrato compartido de agentes");
}
ok("opencode.json: postura segura comprobada");

const ownSkillFiles = listFiles(".opencode/skills").filter((file) => file.endsWith("/SKILL.md"));
const externalSkillFiles = listFiles(".agents/skills").filter((file) => file.endsWith("/SKILL.md"));
const skillFiles = [...ownSkillFiles, ...externalSkillFiles];
const skillNames = new Set();
for (const file of skillFiles) {
  const source = frontmatter(file);
  const name = scalar(source, "name");
  const description = scalar(source, "description");
  const directory = file.split("/").at(-2);
  if (!name) fail(`${file}: falta name`);
  if (!description) fail(`${file}: falta description`);
  if (description && description.length > 1024) {
    fail(`${file}: description excede 1024 caracteres`);
  }
  if (name !== directory) fail(`${file}: name no coincide con el directorio`);
  if (name && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
    fail(`${file}: name no cumple el formato`);
  }
  const unsafeDescription = source
    .split(/\r?\n/)
    .find((line) => /^description:\s+[^"'|>].*:\s/.test(line));
  if (unsafeDescription) fail(`${file}: description con ':' debe ir entre comillas`);
  if (name) skillNames.add(name);

  const metadataIndex = source.split(/\r?\n/).findIndex((line) => line === "metadata:");
  if (metadataIndex >= 0) {
    const lines = source.split(/\r?\n/);
    for (let index = metadataIndex + 1; index < lines.length; index += 1) {
      const line = lines[index];
      if (!line.startsWith("  ")) break;
      if (!/^ {2}[a-zA-Z0-9_./-]+:\s+["']?.+["']?\s*$/.test(line)) {
        fail(`${file}: metadata debe ser un mapa plano de strings`);
      }
    }
  }

  const uiFile = path.posix.join(path.posix.dirname(file), "agents/openai.yaml");
  if (exists(uiFile)) {
    const ui = read(uiFile);
    const shortDescription = scalar(ui, "  short_description");
    if (
      !shortDescription ||
      shortDescription.length < 25 ||
      shortDescription.length > 64
    ) {
      fail(`${uiFile}: short_description debe tener entre 25 y 64 caracteres`);
    }
    if (!ui.includes(`$${name}`)) {
      fail(`${uiFile}: default_prompt debe mencionar $${name}`);
    }
  }
}
if (ownSkillFiles.length !== 9) {
  fail(`.opencode/skills: deben existir 9 skills propias; observadas ${ownSkillFiles.length}`);
}
if (externalSkillFiles.length !== 18) {
  fail(`.agents/skills: deben existir 18 skills externas; observadas ${externalSkillFiles.length}`);
}
const frontendSkillRoot = ".opencode/skills/special-frontend-quality";
const frontendSkillFiles = [
  "SKILL.md",
  "references/html.md",
  "references/javascript.md",
  "references/css.md",
  "references/accessibility.md",
  "references/seo.md",
  "references/performance.md",
  "references/security.md",
  "references/html-email.md",
  "checklists/audit.md",
  "checklists/implementation.md",
  "checklists/review.md",
];
for (const relative of frontendSkillFiles) {
  const file = `${frontendSkillRoot}/${relative}`;
  if (!exists(file)) fail(`${file}: módulo frontend requerido ausente`);
}
if (skillNames.has("special-webapp-qa")) {
  fail(".opencode/skills: special-webapp-qa debe quedar reemplazada");
}
if (exists(`${frontendSkillRoot}/SKILL.md`)) {
  const frontendContract = read(`${frontendSkillRoot}/SKILL.md`);
  for (const fragment of [
    "STANDARD contextual",
    "Página pública indexable o solicitud SEO explícita",
    "SEO no se activa para dashboards privados",
    "Para HTML email, `html-email.md` sustituye",
    "Una auditoría no concede permiso para corregir",
    "Preservar comportamiento salvo cambio funcional explícito",
    "No inventar rutas, contenido, testimonios, métricas, datos legales o de negocio",
  ]) {
    if (!frontendContract.includes(fragment)) {
      fail(`${frontendSkillRoot}/SKILL.md: falta escenario contractual "${fragment}"`);
    }
  }
}
if (exists(`${frontendSkillRoot}/references/seo.md`)) {
  const seo = read(`${frontendSkillRoot}/references/seo.md`);
  for (const exclusion of [
    "dashboards",
    "paneles administrativos",
    "aplicaciones autenticadas",
    "componentes aislados",
    "HTML email",
  ]) {
    if (!seo.includes(exclusion)) {
      fail(`${frontendSkillRoot}/references/seo.md: falta exclusión ${exclusion}`);
    }
  }
  if (!seo.includes("nunca inventarlos")) {
    fail(`${frontendSkillRoot}/references/seo.md: debe prohibir contenido comercial inventado`);
  }
}
for (const file of [
  ".agents/licenses/emilkowalski-skills-MIT.txt",
  ".agents/licenses/addyosmani-agent-skills-MIT.txt",
  ".agents/licenses/interface-design-MIT.txt",
  ".agents/references/testing-patterns.md",
  ".agents/references/performance-checklist.md",
]) {
  if (!exists(file)) fail(`${file}: artefacto externo requerido ausente`);
}
ok(`${ownSkillFiles.length} skills propias y ${externalSkillFiles.length} externas comprobadas`);

const agentFiles = listFiles(".opencode/agents").filter((file) => file.endsWith(".md"));
const agentNames = new Set(agentFiles.map((file) => path.basename(file, ".md")));
const expectedModes = new Map([
  ["base-orchestrator", "primary"],
  ["base-planner", "subagent"],
  ["base-researcher", "subagent"],
  ["base-builder", "subagent"],
  ["base-reviewer", "subagent"],
  ["base-docs", "subagent"],
  ["base-security", "subagent"],
]);
const expectedTaskTargets = [
  "*",
  "base-planner",
  "base-researcher",
  "base-builder",
  "base-reviewer",
  "base-docs",
  "base-security",
];
let primaryCount = 0;
for (const file of agentFiles) {
  const source = frontmatter(file);
  const mode = scalar(source, "mode");
  if (!["primary", "subagent", "all"].includes(mode)) {
    fail(`${file}: mode inválido`);
  }
  const steps = Number(scalar(source, "steps"));
  if (!Number.isInteger(steps) || steps < 1 || steps > 50) {
    fail(`${file}: steps debe estar entre 1 y 50`);
  }
  const name = path.basename(file, ".md");
  if (mode === "primary") primaryCount += 1;
  if (expectedModes.has(name) && mode !== expectedModes.get(name)) {
    fail(`${file}: mode debe ser ${expectedModes.get(name)}`);
  }
  if (scalar(source, "hidden") === "true") {
    fail(`${file}: los agentes base deben permanecer visibles`);
  }
  if (name !== "base-orchestrator" && permissionScalar(source, "task") !== "deny") {
    fail(`${file}: agente hoja debe declarar task: deny`);
  }
  if (name === "base-orchestrator") {
    const tasks = nestedMap(source, "task");
    if (
      tasks.size !== expectedTaskTargets.length ||
      expectedTaskTargets.some((target) => !tasks.has(target))
    ) {
      fail(`${file}: allowlist de task debe contener exactamente los agentes base`);
    }
    if (tasks.get("*") !== "deny") {
      fail(`${file}: task.* debe estar denegado`);
    }
    for (const target of expectedTaskTargets.slice(1)) {
      if (tasks.get(target) !== "allow") {
        fail(`${file}: task.${target} debe estar permitido`);
      }
    }
    const body = read(file);
    if (!body.includes("owner") || !body.includes("handoff_request")) {
      fail(`${file}: el prompt debe gobernar owner y handoff_request`);
    }
  } else if (!read(file).includes("handoff_request")) {
    fail(`${file}: agente hoja debe devolver necesidades mediante handoff_request`);
  }
  if (permissionScalar(source, "doom_loop") !== "deny") {
    fail(`${file}: doom_loop debe detener repeticiones idénticas`);
  }
  for (const skill of nestedKeys(source, "skill")) {
    if (skill !== "*" && !skillNames.has(skill)) {
      fail(`${file}: referencia skill inexistente ${skill}`);
    }
  }
  const editIsDenied = permissionScalar(source, "edit") === "deny";
  const almaIsDenied = source.includes('".opencode/instructions/ALMA.md": deny');
  if (!editIsDenied && !almaIsDenied) {
    fail(`${file}: debe denegar toda edición o proteger ALMA explícitamente`);
  }
}
if (primaryCount !== 1) {
  fail(`.opencode/agents: debe existir exactamente un primary; observados ${primaryCount}`);
}
for (const name of expectedModes.keys()) {
  if (!agentNames.has(name)) fail(`.opencode/agents: falta agente base ${name}`);
}
if (permissionScalar(frontmatter(".opencode/agents/base-reviewer.md"), "edit") !== "deny") {
  fail(".opencode/agents/base-reviewer.md: Reviewer debe denegar toda edición");
}
if (permissionScalar(frontmatter(".opencode/agents/base-orchestrator.md"), "bash") !== "deny") {
  fail(".opencode/agents/base-orchestrator.md: Orchestrator debe denegar bash");
}
const docsSkills = nestedMap(frontmatter(".opencode/agents/base-docs.md"), "skill");
for (const skill of ["special-data-content", "special-documentation"]) {
  if (docsSkills.get(skill) !== "allow") {
    fail(`.opencode/agents/base-docs.md: debe permitir la skill ${skill}`);
  }
}
const docsAgentSource = frontmatter(".opencode/agents/base-docs.md");
for (const allowedPath of [
  "docs/**",
  ".opencode/docs/**",
  ".opencode/proposals/**",
  ".opencode/reports/**",
]) {
  if (!docsAgentSource.includes(`"${allowedPath}": allow`)) {
    fail(`.opencode/agents/base-docs.md: debe permitir edición en ${allowedPath}`);
  }
}
ok(`${agentNames.size} agentes comprobados`);

const expectedCommandAgents = new Map([
  ["alma-proposal", "base-orchestrator"],
  ["audit", "base-reviewer"],
  ["build", "base-orchestrator"],
  ["context7", "base-researcher"],
  ["discover", "base-planner"],
  ["docs", "base-orchestrator"],
  ["plan", "base-planner"],
  ["profile", "base-orchestrator"],
  ["secure", "base-security"],
]);
for (const file of listFiles(".opencode/commands").filter((entry) => entry.endsWith(".md"))) {
  const source = frontmatter(file);
  const agent = scalar(source, "agent");
  if (!agentNames.has(agent)) fail(`${file}: agente inexistente ${agent ?? "(vacío)"}`);
  const command = path.basename(file, ".md");
  if (expectedCommandAgents.has(command) && agent !== expectedCommandAgents.get(command)) {
    fail(`${file}: debe enrutar a ${expectedCommandAgents.get(command)}`);
  }
}
for (const command of expectedCommandAgents.keys()) {
  if (!exists(`.opencode/commands/${command}.md`)) {
    fail(`.opencode/commands/${command}.md: comando base ausente`);
  }
}
ok("Referencias comando → agente comprobadas");

for (const file of [
  ".opencode/agents/base-builder.md",
  ".opencode/agents/base-docs.md",
]) {
  if (!read(file).includes('".opencode/instructions/ALMA.md": deny')) {
    fail(`${file}: falta denegación explícita de edición de ALMA`);
  }
}

const operationalFiles = [
  "opencode.json",
  "opencode.local-mcp.example.json",
  ...listFiles(".opencode"),
];
const movingVersionTag = `@${"latest"}`;
for (const file of operationalFiles) {
  if (file.includes("node_modules") || file.startsWith(".opencode/docs/")) continue;
  if (read(file).includes(movingVersionTag)) {
    fail(`${file}: no se permiten etiquetas móviles de versión`);
  }
}

const gitleaks = read(".gitleaks.toml");
if (!gitleaks.includes("[extend]") || !gitleaks.includes("useDefault = true")) {
  fail(".gitleaks.toml: debe extender las reglas predeterminadas");
}
if (/^\[allowlist\]$/m.test(gitleaks)) {
  fail(".gitleaks.toml: no debe usar la tabla global legacy [allowlist]");
}
ok(".gitleaks.toml: invariantes estructurales comprobadas");

const personalPackage = JSON.parse(read("tools/personal-mcp/package.json"));
for (const [name, version] of Object.entries(personalPackage.dependencies ?? {})) {
  if (!/^\d+\.\d+\.\d+$/.test(version)) {
    fail(`tools/personal-mcp/package.json: ${name} debe usar versión exacta`);
  }
}
if (!exists("tools/personal-mcp/package-lock.json")) {
  fail("tools/personal-mcp/package-lock.json: lockfile requerido");
}
ok("MCP personal: dependencias y lockfile comprobados");

for (const file of [
  "README.md",
  "AGENTS.md",
  ".opencode/docs/architecture.md",
  ".opencode/docs/agent-hierarchy.md",
  ".opencode/docs/security-model.md",
  ".opencode/docs/compatibility.md",
  ".opencode/docs/personal-mcp.md",
  ".opencode/docs/external-skills.md",
  "CHANGELOG.md",
]) {
  if (!exists(file)) fail(`${file}: documento requerido ausente`);
}

const activeReferenceFiles = [
  "README.md",
  "AGENTS.md",
  ...listFiles(".opencode").filter((file) => file.endsWith(".md")),
];
const staleDocumentationPaths = [
  /(^|[\s`("'\[])docs\/(?:architecture|agent-hierarchy|security-model|compatibility|personal-mcp|external-skills)\.md/m,
  /(^|[\s`("'\[])docs\/proposals\/alma\//m,
  /(^|[\s`("'\[])docs\/reports\/executions\//m,
];
for (const file of activeReferenceFiles) {
  const content = read(file);
  if (staleDocumentationPaths.some((pattern) => pattern.test(content))) {
    fail(`${file}: conserva una ruta documental interna anterior`);
  }
}

const markdownFiles = [
  "README.md",
  "AGENTS.md",
  ...listFiles(".opencode").filter((file) => file.endsWith(".md")),
  ...listFiles("docs").filter((file) => file.endsWith(".md")),
];
for (const file of markdownFiles) {
  const links = [...read(file).matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map(
    (match) => match[1].split("#", 1)[0],
  );
  for (const link of links) {
    if (!link || /^(?:https?:|mailto:)/.test(link)) continue;
    const target = path.resolve(root, path.dirname(file), decodeURIComponent(link));
    if (!fs.existsSync(target)) fail(`${file}: enlace interno inexistente ${link}`);
  }
}
ok("Enlaces internos Markdown comprobados");

if (activeFixture && !fixtureApplied) {
  fail(`fixture ${fixtureName}: no se aplicó`);
}

if (failures.length > 0) {
  console.error(`VALIDACIÓN FALLIDA (${failures.length})`);
  for (const message of failures) console.error(`- ${message}`);
  process.exit(1);
}

console.log(`VALIDACIÓN COMPLETA (${checks.length} grupos)`);
for (const message of checks) console.log(`- ${message}`);
