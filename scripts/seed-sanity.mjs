import { createClient } from '@sanity/client';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-10-01';

if (!projectId || !dataset || !token) {
  console.error('Missing env vars. Run with: node --env-file=.env.local scripts/seed-sanity.mjs');
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion, useCdn: false });

const files = readdirSync(here)
  .filter((f) => f.startsWith('seed-') && f.endsWith('.ndjson'))
  .sort();

let total = 0;
for (const file of files) {
  const lines = readFileSync(join(here, file), 'utf8').split('\n').filter(Boolean);
  let tx = client.transaction();
  for (const line of lines) tx = tx.createOrReplace(JSON.parse(line));
  await tx.commit();
  console.log(`  ${file.padEnd(36)} ${lines.length} docs`);
  total += lines.length;
}

console.log(`\nDone. ${total} documents written to ${projectId}/${dataset}.`);
