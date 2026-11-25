// makefun-x-reposts-02 entry program (Node 22+, standard library only).
//
// The entry itself is the posts on X named in POSTS.json: posts of my own, each a
// quote of or a direct reply to a different @makefunai pool post, each carrying
// make.fun and my play code in its own words. The house reads those posts and
// their repost / quote / like counts from X; nothing this program computes is
// scored. All this program has to do is hand POSTS.json to the gate: it reads
// the file from the repository root, checks its shape, and writes the same
// bytes to the output directory.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand
// in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const MAX_POSTS = 15;

function fail(message: string): never {
  console.error(`makefun-x-reposts-02: ${message}`);
  process.exit(1);
}

const sourcePath = join(BOT_DIR, 'POSTS.json');

let raw: string;
try {
  raw = readFileSync(sourcePath, 'utf8');
} catch (err) {
  fail(`POSTS.json could not be read from ${BOT_DIR}: ${(err as Error).message}`);
}

let parsed: unknown;
try {
  parsed = JSON.parse(raw);
} catch (err) {
  fail(`POSTS.json is not valid JSON: ${(err as Error).message}`);
}

if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
  fail('POSTS.json must be a JSON object like {"posts": ["https://x.com/<handle>/status/<id>"]}');
}

const posts = (parsed as Record<string, unknown>).posts;
if (!Array.isArray(posts)) {
  fail('POSTS.json must hold a "posts" list of X post addresses');
}
if (posts.length < 1 || posts.length > MAX_POSTS) {
  fail(`POSTS.json must name 1 to ${MAX_POSTS} posts, got ${posts.length}`);
}
const STATUS_URL = /^https:\/\/(www\.|mobile\.)?(x|twitter)\.com\/[^/\s]+\/status\/\d+([?#].*)?$/;

const seen = new Set<string>();
for (const post of posts) {
  if (typeof post !== 'string' || post.length === 0) {
    fail('every item of "posts" must be an X post address string');
  }
  if (!STATUS_URL.test(post)) {
    fail(`"${post}" is not an X post address of the form https://x.com/<handle>/status/<id>`);
  }
  // The house reads a post named twice once; warn here so a wasted slot is
  // visible locally instead of only in the graded counts.
  const id = post.match(/\/status\/(\d+)/)?.[1] ?? post;
  if (seen.has(id)) {
    console.error(`makefun-x-reposts-02: warning: post ${id} is named more than once`);
  }
  seen.add(id);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  writeFileSync(join(OUTPUT_DIR, 'POSTS.json'), raw);
} catch (err) {
  fail(`POSTS.json could not be written to ${OUTPUT_DIR}: ${(err as Error).message}`);
}
