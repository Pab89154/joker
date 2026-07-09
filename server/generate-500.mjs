import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const TARGET = 500;

const CATEGORIES = [
  "Dad jokes",
  "Puns",
  "One-liners",
  "Knock-knock",
  "Observational",
  "Programming / tech",
  "Science",
  "Dark humor",
  "Riddles",
];

const A = ["duck", "cow", "pig", "chicken", "frog", "bear", "cat", "dog", "fish", "horse", "sheep", "goat", "owl", "bee", "ant", "mouse", "rabbit", "turtle", "penguin", "koala", "llama", "otter", "whale", "crab", "snail"];
const P = ["school", "library", "park", "beach", "kitchen", "garden", "store", "hospital", "museum", "zoo", "theater", "bakery", "farm", "stadium", "airport", "market", "office", "garage", "attic", "basement"];
const O = ["pencil", "lamp", "clock", "chair", "book", "phone", "shoe", "hat", "ball", "kite", "cookie", "pizza", "sandwich", "backpack", "umbrella", "mirror", "pillow", "candle", "basket", "drum"];
const C = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown", "gold", "silver", "teal", "maroon", "ivory", "navy", "lime"];
const J = ["teacher", "chef", "pilot", "artist", "doctor", "farmer", "builder", "singer", "dancer", "writer", "nurse", "driver", "judge", "clown", "guard"];
const L = ["Python", "JavaScript", "Java", "Ruby", "Rust", "Go", "C++", "Swift", "Kotlin", "PHP", "TypeScript", "SQL", "HTML", "CSS", "Bash"];
const E = ["oxygen", "helium", "carbon", "neon", "iron", "gold", "silver", "copper", "zinc", "sodium", "calcium", "nitrogen", "argon", "lithium", "cobalt"];
const M = ["happy", "sleepy", "hungry", "curious", "brave", "silly", "proud", "shy", "loud", "calm"];
const X = ["dance", "sing", "jump", "read", "cook", "paint", "run", "nap", "laugh", "hide"];
const N = ["Anita", "Boo", "Olive", "Tank", "Luke", "Howard", "Justin", "Cereal", "Harry", "Alpaca", "Dishes", "Nobel", "Wanda", "Pizza", "Donut", "Ketchup", "Mustard", "Bacon", "Waffle", "Maple", "Pear", "Mango", "Cocoa", "Pepper", "Ginger"];
const T = ["suddenly", "bravely", "quietly", "wildly", "slowly", "quickly", "happily", "boldly", "gently", "loudly"];

function combo(i, arrs) {
  let n = i;
  return arrs.map((arr) => {
    const v = arr[n % arr.length];
    n = Math.floor(n / arr.length);
    return v;
  });
}

function extractExisting(src) {
  const match = src.match(/export const JOKES = (\{[\s\S]*?\n\});/);
  if (!match) throw new Error("Could not parse JOKES");
  return eval("(" + match[1] + ")");
}

function buildCategory(existing, generator, target = TARGET) {
  const seen = new Set();
  const out = [];
  for (const joke of existing) {
    if (!seen.has(joke) && out.length < target) {
      seen.add(joke);
      out.push(joke);
    }
  }
  for (let i = 0; out.length < target; i++) {
    const joke = generator(i);
    if (!seen.has(joke)) {
      seen.add(joke);
      out.push(joke);
    }
    if (i > 200000) throw new Error(`Stuck at ${out.length}/${target}`);
  }
  return out;
}

const generators = {
  "Dad jokes": (i) => {
    const [a, b, o, p, m, x, t, j] = combo(i, [A, A, O, P, M, X, T, J]);
    return `Why did the ${m} ${a} and ${b} bring a ${o} to the ${p}? To ${x} ${t} — at least that's what the ${j} said.`;
  },
  Puns: (i) => {
    const [a, o, p, j, c, t, m, x] = combo(i, [A, O, P, J, C, T, M, X]);
    return `The ${j} saw a ${c} ${o} and a ${m} ${a} at the ${p}. It was ${t} ${x} — pure pun energy.`;
  },
  "One-liners": (i) => {
    const [a, o, p, c, j, t, m, x] = combo(i, [A, O, P, C, J, T, M, X]);
    return `I brought a ${c} ${o} to the ${p}, met a ${m} ${a}, and the ${j} said I looked ${t} ${x}.`;
  },
  "Knock-knock": (i) => {
    const [name, p, o, a, t, m, c, j] = combo(i, [N, P, O, A, T, M, C, J]);
    return `Knock knock. Who's there? ${name}. ${name} who? ${name} ${o}, ${a}, and ${j} at the ${m} ${p} — ${t} ${c}!`;
  },
  Observational: (i) => {
    const [o, p, a, j, c, t, m, x] = combo(i, [O, P, A, J, C, T, M, X]);
    return `Why does a ${c} ${o} at the ${p} make a ${m} ${a} and a ${x} ${j} act ${t}?`;
  },
  "Programming / tech": (i) => {
    const [lang, o, a, p, j, t, m, c] = combo(i, [L, O, A, P, J, T, M, C]);
    return `Why do ${lang} devs bring a ${c} ${o} and a ${m} ${a} to the ${p}? The ${j} said it compiles ${t}.`;
  },
  Science: (i) => {
    const [el, a, o, p, j, t, m, c] = combo(i, [E, A, O, P, J, T, M, C]);
    return `Why did ${el}, a ${m} ${a}, and a ${c} ${o} visit the ${p}? The ${j} called it ${t} science.`;
  },
  "Dark humor": (i) => {
    const [o, a, p, j, c, t, m, x] = combo(i, [O, A, P, J, C, T, M, X]);
    return `I told my ${c} ${o} and ${m} ${a} we needed space at the ${p}. The ${j} just laughed ${t} ${x}.`;
  },
  Riddles: (i) => {
    const [o, p, a, c, j, t, m, x] = combo(i, [O, P, A, C, J, T, M, X]);
    return `What has a ${c} ${o}, visits the ${p}, and makes a ${m} ${a} ${x}? A ${t} ${j} on homework night.`;
  },
};

function formatJokes(obj) {
  const lines = ["export const JOKES = {"];
  const keys = Object.keys(obj);
  keys.forEach((key, ki) => {
    lines.push(`  ${JSON.stringify(key)}: [`);
    obj[key].forEach((joke, ji) => {
      const comma = ji < obj[key].length - 1 ? "," : "";
      lines.push(`    ${JSON.stringify(joke)}${comma}`);
    });
    const comma = ki < keys.length - 1 ? "," : "";
    lines.push(`  ]${comma}`);
  });
  lines.push("};");
  lines.push("");
  return lines.join("\n");
}

function formatHtmlJokes(obj) {
  const lines = ["      const JOKES = {"];
  const keys = Object.keys(obj);
  keys.forEach((key, ki) => {
    lines.push(`              ${JSON.stringify(key)}: [`);
    obj[key].forEach((joke, ji) => {
      const comma = ji < obj[key].length - 1 ? "," : "";
      lines.push(`                      ${JSON.stringify(joke)}${comma}`);
    });
    const comma = ki < keys.length - 1 ? "," : "";
    lines.push(`              ]${comma}`);
  });
  lines.push("      };");
  return lines.join("\n");
}

function syncHtml(path, jokesBlock) {
  let html = readFileSync(path, "utf8");
  html = html.replace(/      const JOKES = \{[\s\S]*?\n      \};/, jokesBlock);
  writeFileSync(path, html);
}

const existingSrc = readFileSync(join(__dirname, "jokes.js"), "utf8");
const footer = existingSrc.slice(existingSrc.indexOf("const decks = new Map();"));
const existing = extractExisting(existingSrc);
const merged = {};

for (const cat of CATEGORIES) {
  merged[cat] = buildCategory(existing[cat] || [], generators[cat], TARGET);
  if (merged[cat].length !== TARGET) throw new Error(`${cat}: ${merged[cat].length}`);
  if (new Set(merged[cat]).size !== TARGET) throw new Error(`${cat}: duplicates`);
}

writeFileSync(join(__dirname, "jokes.js"), formatJokes(merged) + footer);

const htmlBlock = formatHtmlJokes(merged);
for (const rel of ["Joker/index.html", "docs/index.html"]) {
  syncHtml(join(root, rel), htmlBlock);
}

console.log("Generated jokes successfully:");
for (const cat of CATEGORIES) {
  console.log(`  ${cat}: ${merged[cat].length}`);
}
