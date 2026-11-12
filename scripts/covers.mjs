#!/usr/bin/env node
/*
 * Regenerates the twelve abstract cover illustrations in assets/covers/.
 * No dependencies: run `node scripts/covers.mjs` from the project root.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'assets', 'covers');
mkdirSync(outDir, { recursive: true });

const palettes = {
  ai: { bg: '#100b24', deep: '#1b1238', ink: '#6d4aff', hot: '#d6ff3f', paper: '#f4f1e8' },
  mobile: { bg: '#06140f', deep: '#0a2018', ink: '#0d9f6e', hot: '#e8ff6a', paper: '#f4f1e8' },
  cyber: { bg: '#190a0b', deep: '#2a1012', ink: '#e5484d', hot: '#ffd166', paper: '#f4f1e8' },
  space: { bg: '#060f20', deep: '#0a1830', ink: '#1f6feb', hot: '#9ef01a', paper: '#f4f1e8' },
  software: { bg: '#171006', deep: '#241a09', ink: '#b7791f', hot: '#7df9ff', paper: '#f4f1e8' },
  hardware: { bg: '#180b06', deep: '#28130a', ink: '#d9480f', hot: '#ffd60a', paper: '#f4f1e8' }
};

const covers = [
  ['ai-small-models', 'ai', 'AI', 1, 'small'],
  ['ai-agents', 'ai', 'AI', 2, 'network'],
  ['mobile-battery', 'mobile', 'MOBILE', 3, 'bars'],
  ['mobile-satellite', 'mobile', 'MOBILE', 4, 'orbits'],
  ['cyber-passkeys', 'cyber', 'CYBER', 5, 'keyhole'],
  ['cyber-quantum', 'cyber', 'CYBER', 6, 'lattice'],
  ['space-small-sats', 'space', 'SPACE', 7, 'constellation'],
  ['space-lunar', 'space', 'SPACE', 8, 'moon'],
  ['software-local-first', 'software', 'SOFTWARE', 9, 'stack'],
  ['software-boring', 'software', 'SOFTWARE', 10, 'monolith'],
  ['hardware-repairable', 'hardware', 'HARDWARE', 11, 'exploded'],
  ['hardware-edge', 'hardware', 'HARDWARE', 12, 'die']
];

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function art(kind, rnd, p) {
  const parts = [];
  const dot = (x, y, r, fill, o = 1) =>
    parts.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${fill}" opacity="${o}"/>`);
  const line = (x1, y1, x2, y2, stroke, w, o = 1) =>
    parts.push(`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${stroke}" stroke-width="${w}" opacity="${o}"/>`);
  const rect = (x, y, w, h, fill, o = 1, rx = 0) =>
    parts.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" opacity="${o}"/>`);
  const poly = (points, fill, o = 1) =>
    parts.push(`<polygon points="${points}" fill="${fill}" opacity="${o}"/>`);

  if (kind === 'small' || kind === 'monolith') {
    for (let i = 0; i < 7; i += 1) {
      const size = 80 + i * 66;
      rect(600 - size / 2, 360 - size / 3.4, size, size, p.ink, 0.1 + i * 0.035, 8);
    }
    rect(600, 190, 10, 340, p.hot, 0.9);
    for (let i = 0; i < 40; i += 1) dot(160 + rnd() * 880, 100 + rnd() * 480, 1.5 + rnd() * 5, p.paper, 0.05 + rnd() * 0.2);
  }
  if (kind === 'network') {
    const nodes = [];
    for (let i = 0; i < 18; i += 1) nodes.push([140 + rnd() * 920, 110 + rnd() * 460, rnd()]);
    nodes.forEach((n, i) => {
      nodes.slice(i + 1).forEach((m) => {
        const d = Math.hypot(n[0] - m[0], n[1] - m[1]);
        if (d < 240) line(n[0], n[1], m[0], m[1], p.ink, 1.4, 0.35);
      });
    });
    nodes.forEach((n) => dot(n[0], n[1], 6 + n[2] * 24, n[2] > 0.72 ? p.hot : p.paper, 0.85));
  }
  if (kind === 'bars') {
    for (let i = 0; i < 13; i += 1) {
      const h = 80 + rnd() * 380;
      rect(130 + i * 76, 570 - h, 34, h, i % 4 === 0 ? p.hot : p.ink, 0.9, 4);
    }
    line(90, 570, 1120, 570, p.paper, 2, 0.5);
    dot(1010, 170, 65, p.hot, 0.9);
  }
  if (kind === 'orbits' || kind === 'constellation') {
    for (let i = 0; i < 6; i += 1) {
      parts.push(`<ellipse cx="600" cy="400" rx="${170 + i * 92}" ry="${54 + i * 30}" fill="none" stroke="${i % 2 ? p.ink : p.paper}" stroke-width="1.6" opacity="${0.36 - i * 0.035}" transform="rotate(-18 600 400)"/>`);
    }
    dot(600, 400, 92, p.ink, 0.9);
    dot(600, 400, 46, p.bg, 1);
    for (let i = 0; i < 17; i += 1) {
      const x = 120 + rnd() * 960;
      const y = 90 + rnd() * 500;
      dot(x, y, 2 + rnd() * 5, p.paper, 0.3 + rnd() * 0.55);
    }
    dot(886, 240, 13, p.hot, 1);
  }
  if (kind === 'keyhole') {
    dot(600, 300, 175, p.ink, 0.16);
    dot(600, 300, 118, p.ink, 0.85);
    dot(600, 290, 58, p.bg, 1);
    poly('588,330 612,330 632,470 568,470', p.bg, 1);
    for (let i = 0; i < 6; i += 1) line(90, 560 + i * 10, 1110, 520 + i * 10, p.hot, 1, 0.15);
  }
  if (kind === 'lattice') {
    for (let x = 0; x < 9; x += 1) {
      for (let y = 0; y < 5; y += 1) {
        const cx = 170 + x * 108;
        const cy = 180 + y * 82;
        dot(cx, cy, 3.5, p.paper, 0.45);
        if (rnd() > 0.6) dot(cx, cy, 11, p.ink, 0.65);
      }
    }
    parts.push(`<path d="M170 180 L1000 508 M1000 180 L170 508" stroke="${p.hot}" stroke-width="2" opacity=".8"/>`);
    parts.push(`<circle cx="600" cy="344" r="120" fill="none" stroke="${p.hot}" stroke-width="2" opacity=".6"/>`);
  }
  if (kind === 'moon') {
    dot(760, 300, 250, p.ink, 0.92);
    dot(700, 240, 46, p.bg, 0.18);
    dot(830, 380, 70, p.bg, 0.18);
    dot(710, 390, 28, p.bg, 0.18);
    parts.push(`<path d="M0 560 Q300 470 600 560 T1200 540 L1200 675 L0 675 Z" fill="${p.deep}"/>`);
    parts.push(`<path d="M0 560 Q300 470 600 560 T1200 540" fill="none" stroke="${p.hot}" stroke-width="3" opacity=".9"/>`);
    for (let i = 0; i < 26; i += 1) dot(rnd() * 560, 80 + rnd() * 360, 1 + rnd() * 2.4, p.paper, 0.4);
  }
  if (kind === 'stack') {
    for (let i = 0; i < 5; i += 1) {
      const y = 140 + i * 88;
      const x = 190 + i * 24;
      rect(x, y, 660 - i * 48, 82, i === 4 ? p.hot : p.ink, 0.24 + i * 0.15, 6);
    }
    parts.push(`<path d="M850 190 L1040 190 L1040 470 L850 470" fill="none" stroke="${p.paper}" stroke-width="2" opacity=".45"/>`);
    dot(945, 330, 22, p.hot, 0.95);
  }
  if (kind === 'exploded') {
    const pieces = [
      [170, 220, 220, 34],
      [230, 286, 300, 24],
      [310, 338, 250, 18],
      [210, 386, 350, 40],
      [180, 460, 230, 26]
    ];
    pieces.forEach((r, i) => {
      rect(r[0], r[1], r[2], r[3], i === 2 ? p.hot : p.ink, 0.9, 4);
      dot(r[0] + r[2] + 30, r[1] + r[3] / 2, 6, p.paper, 0.7);
    });
    for (let i = 0; i < 5; i += 1) {
      const y = 210 + i * 62;
      line(170, y, 1000, y, p.paper, 1, 0.18);
    }
    dot(940, 210, 130, p.ink, 0.14);
  }
  if (kind === 'die') {
    rect(330, 150, 540, 400, p.deep, 1, 18);
    for (let i = 0; i < 6; i += 1) {
      for (let j = 0; j < 4; j += 1) {
        rect(390 + i * 74, 210 + j * 78, 52, 56, (i + j) % 3 === 0 ? p.hot : p.ink, 0.5 + rnd() * 0.4, 4);
      }
    }
    for (let i = 0; i < 12; i += 1) {
      const side = i % 4;
      if (side === 0) line(330, 170 + i * 31, 250, 170 + i * 31, p.ink, 4, 0.8);
      if (side === 1) line(870, 170 + i * 31, 950, 170 + i * 31, p.ink, 4, 0.8);
      if (side === 2) line(350 + i * 42, 150, 350 + i * 42, 90, p.ink, 4, 0.8);
      if (side === 3) line(350 + i * 42, 550, 350 + i * 42, 610, p.ink, 4, 0.8);
    }
  }
  return parts.join('');
}

covers.forEach(([name, cat, label, index, kind], i) => {
  const p = palettes[cat];
  const rnd = mulberry32(1000 + i * 97);
  const num = String(index).padStart(2, '0');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675" role="img" aria-labelledby="t">
<title id="t">${label} cover ${num} — NoxaPlus Tech News</title>
<defs>
  <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${p.bg}"/>
    <stop offset="1" stop-color="${p.deep}"/>
  </linearGradient>
  <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
    <circle cx="2" cy="2" r="1.1" fill="${p.paper}" opacity=".12"/>
  </pattern>
</defs>
<rect width="1200" height="675" fill="url(#g)"/>
<rect width="1200" height="675" fill="url(#dots)"/>
<g>${art(kind, rnd, p)}</g>
<g font-family="ui-monospace, SFMono-Regular, Menlo, monospace">
  <text x="70" y="86" fill="${p.paper}" font-size="20" letter-spacing="5" opacity=".9">NOXAPLUS / ${label}</text>
  <text x="70" y="120" fill="${p.hot}" font-size="15" letter-spacing="3" opacity=".8">TECH NEWS — ${num}</text>
  <text x="1130" y="86" fill="${p.paper}" font-size="17" letter-spacing="3" text-anchor="end" opacity=".55">2026</text>
  <text x="1130" y="620" fill="${p.paper}" font-size="14" letter-spacing="3" text-anchor="end" opacity=".5">EDITORIAL DESK</text>
</g>
<rect x="0" y="0" width="1200" height="6" fill="${p.ink}"/>
<rect x="0" y="669" width="1200" height="6" fill="${p.hot}"/>
</svg>
`;
  writeFileSync(join(outDir, `${name}.svg`), svg, 'utf8');
  console.log(`wrote assets/covers/${name}.svg`);
});
