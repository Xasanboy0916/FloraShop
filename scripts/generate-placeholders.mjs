/**
 * Generates the pastel placeholder artwork for the flower shop.
 * Writes SVG masters + JPEG copies into public/placeholder/, and the app icon.
 * Run: node scripts/generate-placeholders.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "placeholder");
mkdirSync(outDir, { recursive: true });

const f1 = (n) => Number(n.toFixed(1));

const svg = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${body}</svg>`;

/* ---------- primitives ---------- */

function ring(cx, cy, r, n, fill, { rx = 0.3, ry = 0.52, lift = 0.55, rot = 0, opacity = 1, stroke, sw = 1.5 } = {}) {
  let out = "";
  for (let i = 0; i < n; i++) {
    const a = f1(rot + (360 / n) * i);
    out += `<ellipse cx="${f1(cx)}" cy="${f1(cy - r * lift)}" rx="${f1(r * rx)}" ry="${f1(r * ry)}" fill="${fill}"${
      opacity !== 1 ? ` opacity="${opacity}"` : ""
    }${stroke ? ` stroke="${stroke}" stroke-width="${sw}"` : ""} transform="rotate(${a} ${f1(cx)} ${f1(cy)})"/>`;
  }
  return out;
}

function dots(cx, cy, dist, n, fill, dr, startAngle = 12) {
  let s = "";
  for (let i = 0; i < n; i++) {
    const a = ((360 / n) * i + startAngle) * (Math.PI / 180);
    s += `<circle cx="${f1(cx + dist * Math.cos(a))}" cy="${f1(cy + dist * Math.sin(a))}" r="${f1(dr)}" fill="${fill}"/>`;
  }
  return s;
}

function leaf(x, y, len, angle, fill = "#8fb98a", vein = "#79a873") {
  return `<g transform="rotate(${f1(angle)} ${f1(x)} ${f1(y)})">
    <ellipse cx="${f1(x)}" cy="${f1(y - len * 0.52)}" rx="${f1(len * 0.36)}" ry="${f1(len * 0.55)}" fill="${fill}"/>
    <line x1="${f1(x)}" y1="${f1(y + len * 0.05)}" x2="${f1(x)}" y2="${f1(y - len)}" stroke="${vein}" stroke-width="${f1(
      Math.max(2, len * 0.055),
    )}" stroke-linecap="round"/>
  </g>`;
}

function stem(d, w = 7, color = "#7fa877") {
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`;
}

/* ---------- blooms ---------- */

function rose(cx, cy, r, rot = 0) {
  return `<g>
    ${leaf(cx - r * 0.92, cy + r * 0.55, r * 0.6, -145)}
    ${leaf(cx + r * 0.92, cy + r * 0.55, r * 0.6, 145)}
    ${ring(cx, cy, r, 7, "#f2a9c3", { rot: rot + 10, stroke: "#e795b4", sw: f1(r * 0.02) })}
    ${ring(cx, cy, r * 0.74, 7, "#e78cab", { rot: rot - 16 })}
    ${ring(cx, cy, r * 0.5, 6, "#dd6f95", { rot: rot + 22 })}
    <circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r * 0.26)}" fill="#c2557c"/>
    <circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r * 0.14)}" fill="#a84468"/>
    <path d="M ${f1(cx - r * 0.4)} ${f1(cy - r * 0.12)} A ${f1(r * 0.42)} ${f1(r * 0.42)} 0 0 1 ${f1(cx - r * 0.06)} ${f1(
      cy - r * 0.44,
    )}" stroke="#f8c9d9" stroke-width="${f1(r * 0.05)}" fill="none" stroke-linecap="round" opacity="0.85"/>
  </g>`;
}

function azalea(cx, cy, r, rot = 0) {
  let streaks = "";
  for (let i = 0; i < 5; i++) {
    const a = f1(rot + i * 72);
    streaks += `<line x1="${f1(cx)}" y1="${f1(cy - r * 0.28)}" x2="${f1(cx)}" y2="${f1(cy - r * 0.82)}" stroke="#e27fa4" stroke-width="${f1(
      r * 0.05,
    )}" stroke-linecap="round" transform="rotate(${a} ${f1(cx)} ${f1(cy)})"/>`;
  }
  return `<g>
    ${ring(cx, cy, r, 5, "#f6b3ca", { rx: 0.44, ry: 0.56, rot, stroke: "#eb98b8", sw: f1(r * 0.022) })}
    ${streaks}
    <circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r * 0.2)}" fill="#f8d468"/>
    ${dots(cx, cy, r * 0.13, 7, "#e39c3f", f1(r * 0.035))}
  </g>`;
}

function daisy(cx, cy, r, rot = 0) {
  return `<g>
    ${ring(cx, cy, r, 12, "#fffdf4", { rx: 0.17, ry: 0.5, rot, stroke: "#e7dfc9", sw: 2 })}
    ${ring(cx, cy, r * 0.7, 12, "#fffef9", { rx: 0.15, ry: 0.42, rot: rot + 15, stroke: "#eee6d2", sw: 1.5 })}
    <circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r * 0.3)}" fill="#f2bd3e"/>
    <circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r * 0.3)}" fill="none" stroke="#dfa32a" stroke-width="2"/>
    ${dots(cx, cy, r * 0.18, 8, "#d9971f", f1(r * 0.03), 22)}
  </g>`;
}

function violet(cx, cy, r, rot = 0) {
  return `<g>
    ${ring(cx, cy, r, 5, "#a48bd8", { rx: 0.42, ry: 0.54, rot, stroke: "#8f73c9", sw: 2 })}
    ${ring(cx, cy, r * 0.56, 5, "#bda4e6", { rx: 0.4, ry: 0.52, rot: rot + 36 })}
    <circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r * 0.15)}" fill="#f6cf5d"/>
  </g>`;
}

function sprig(x, y, len, angle) {
  let s = `<g transform="rotate(${f1(angle)} ${f1(x)} ${f1(y)})">`;
  s += `<line x1="${f1(x)}" y1="${f1(y)}" x2="${f1(x)}" y2="${f1(y - len)}" stroke="#8ab083" stroke-width="5" stroke-linecap="round"/>`;
  for (let i = 1; i <= 5; i++) {
    const t = i / 5.5;
    const rr = f1(len * 0.085 * (1 - t * 0.45));
    s += `<circle cx="${f1(x - rr * 1.7)}" cy="${f1(y - len * t)}" r="${rr}" fill="#9dbd96"/>`;
    s += `<circle cx="${f1(x + rr * 1.7)}" cy="${f1(y - len * t - len * 0.05)}" r="${f1(rr * 0.85)}" fill="#abc9a4"/>`;
  }
  s += `</g>`;
  return s;
}

/* ---------- cards (600x600) ---------- */

function cardLola() {
  return svg(
    600,
    600,
    `
    <rect width="600" height="600" fill="#fdeff5"/>
    <circle cx="300" cy="275" r="215" fill="#f9dfe9"/>
    <circle cx="520" cy="120" r="10" fill="#f2c3d6" opacity="0.7"/>
    <circle cx="80" cy="180" r="7" fill="#f2c3d6" opacity="0.7"/>
    <circle cx="470" cy="500" r="9" fill="#edd6e0" opacity="0.8"/>
    <ellipse cx="300" cy="556" rx="150" ry="15" fill="#f0d3df" opacity="0.75"/>
    ${stem("M 300 552 C 294 470 252 380 240 292")}
    ${stem("M 300 552 C 306 440 366 320 372 240")}
    ${stem("M 300 552 C 304 500 322 448 328 392", 6, "#8ab083")}
    ${leaf(255, 470, 88, -48)}
    ${leaf(352, 486, 82, 46)}
    ${azalea(238, 262, 96)}
    ${azalea(374, 212, 82, 28)}
    ${azalea(330, 368, 72, 12)}
  `,
  );
}

function cardAtirgul() {
  return svg(
    600,
    600,
    `
    <rect width="600" height="600" fill="#faf0f4"/>
    <circle cx="300" cy="280" r="218" fill="#f5dde7"/>
    <circle cx="120" cy="110" r="9" fill="#eec3d3" opacity="0.8"/>
    <circle cx="500" cy="170" r="7" fill="#eec3d3" opacity="0.8"/>
    <ellipse cx="300" cy="560" rx="90" ry="14" fill="#eccdd9" opacity="0.8"/>
    ${stem("M 300 556 C 292 500 296 460 300 425", 9, "#6f9a68")}
    ${leaf(300, 500, 95, -58, "#93b98d", "#7ca876")}
    ${leaf(300, 515, 90, 58, "#93b98d", "#7ca876")}
    ${rose(300, 272, 148)}
    <ellipse cx="118" cy="468" rx="24" ry="15" fill="#f2b3cb" transform="rotate(24 118 468)"/>
    <ellipse cx="474" cy="430" rx="22" ry="14" fill="#f2b3cb" transform="rotate(-18 474 430)"/>
    <ellipse cx="432" cy="530" rx="20" ry="12" fill="#eeb3c7" transform="rotate(38 432 530)"/>
  `,
  );
}

function cardMoychechak() {
  return svg(
    600,
    600,
    `
    <rect width="600" height="600" fill="#eef5ea"/>
    <circle cx="300" cy="280" r="215" fill="#e1edda"/>
    <circle cx="470" cy="120" r="9" fill="#cfe3c6" opacity="0.9"/>
    <circle cx="90" cy="420" r="8" fill="#cfe3c6" opacity="0.9"/>
    <ellipse cx="300" cy="560" rx="140" ry="15" fill="#d3e4cb" opacity="0.8"/>
    ${stem("M 300 552 C 298 490 300 430 300 400", 8, "#7fa877")}
    ${stem("M 300 552 C 268 510 220 480 185 462", 7, "#7fa877")}
    ${stem("M 300 552 C 330 520 380 500 415 488", 6, "#8ab083")}
    ${leaf(268, 500, 84, -50)}
    ${leaf(332, 512, 78, 52)}
    ${daisy(300, 282, 112)}
    ${daisy(162, 440, 74, 10)}
    <g>
      <ellipse cx="428" cy="470" rx="16" ry="24" fill="#fffdf4" stroke="#e7dfc9" stroke-width="1.5" transform="rotate(30 428 470)"/>
      <path d="M 418 486 q 10 12 22 4" stroke="#9dbd96" stroke-width="5" fill="none" stroke-linecap="round"/>
    </g>
  `,
  );
}

function cardBinafsha() {
  return svg(
    600,
    600,
    `
    <rect width="600" height="600" fill="#f3eefb"/>
    <circle cx="300" cy="285" r="212" fill="#e9e0f6"/>
    <circle cx="105" cy="150" r="8" fill="#d8cbee" opacity="0.9"/>
    <circle cx="505" cy="220" r="10" fill="#d8cbee" opacity="0.9"/>
    <ellipse cx="300" cy="552" rx="150" ry="15" fill="#d9cdec" opacity="0.8"/>
    ${stem("M 300 546 C 280 470 250 380 236 330")}
    ${stem("M 300 546 C 312 460 356 340 366 312")}
    ${stem("M 300 546 C 300 500 300 470 300 448", 6, "#8ab083")}
    ${leaf(240, 452, 86, -44, "#9ab58f", "#84a67c")}
    ${leaf(356, 470, 80, 48, "#9ab58f", "#84a67c")}
    ${leaf(300, 448, 72, 4, "#a5bf9a", "#8fb084")}
    ${violet(232, 252, 76)}
    ${violet(372, 234, 68, 22)}
    ${violet(300, 380, 88, -12)}
  `,
  );
}

/* ---------- hero bouquet (720x800) ---------- */

function heroBouquet() {
  return svg(
    720,
    800,
    `
    <rect width="720" height="800" fill="#fdf1f6"/>
    <circle cx="360" cy="330" r="305" fill="#f9dfe9"/>
    <circle cx="640" cy="620" r="14" fill="#f0c9da" opacity="0.8"/>
    <circle cx="86" cy="560" r="11" fill="#f0c9da" opacity="0.8"/>
    <circle cx="120" cy="130" r="9" fill="#f2c3d6" opacity="0.7"/>
    <ellipse cx="360" cy="762" rx="205" ry="20" fill="#ecd7e0"/>

    ${sprig(240, 560, 190, -18)}
    ${sprig(480, 560, 190, 18)}
    ${sprig(300, 575, 165, -6)}
    ${sprig(430, 575, 165, 8)}
    ${stem("M 360 600 C 340 480 305 380 300 345", 8, "#7fa877")}
    ${stem("M 360 600 C 400 480 455 380 467 305", 8, "#7fa877")}
    ${stem("M 360 600 C 361 540 362 500 362 462", 7, "#7fa877")}
    ${stem("M 360 600 C 300 540 220 470 195 405", 7, "#8ab083")}
    ${stem("M 360 600 C 420 540 500 460 522 400", 7, "#8ab083")}
    ${leaf(205, 430, 95, -40)}
    ${leaf(515, 420, 92, 42)}
    ${leaf(422, 500, 80, 18)}
    ${leaf(298, 490, 78, -16)}

    ${rose(298, 258, 100)}
    ${azalea(468, 232, 90, 24)}
    ${daisy(362, 420, 74)}
    ${violet(192, 366, 56, -8)}
    ${violet(524, 366, 50, 12)}

    <path d="M 258 560 L 462 560 C 468 640 448 720 424 752 C 400 776 320 776 296 752 C 272 720 252 640 258 560 Z" fill="#e9b7c4"/>
    <path d="M 258 560 L 462 560 C 463 575 463 590 461 604 L 259 604 C 257 590 257 575 258 560 Z" fill="#dfa0b2"/>
    <path d="M 300 640 C 296 680 300 710 312 738" stroke="#f6d7de" stroke-width="10" fill="none" stroke-linecap="round" opacity="0.8"/>
    ${ring(360, 672, 26, 5, "#ffffff", { rx: 0.45, ry: 0.55, opacity: 0.55 })}
    <circle cx="360" cy="672" r="7" fill="#d0688c" opacity="0.7"/>
  `,
  );
}

/* ---------- app icon ---------- */

function appIcon() {
  return svg(
    64,
    64,
    `
    <rect width="64" height="64" rx="16" fill="#f7d7e3"/>
    ${ring(32, 33, 16, 5, "#ffffff", { rx: 0.44, ry: 0.56, rot: -90 })}
    <circle cx="32" cy="33" r="6" fill="#d0688c"/>
  `,
  );
}

/* ---------- write everything ---------- */

const raster = async (svgStr, name) => {
  writeFileSync(join(outDir, `${name}.svg`), svgStr);
  await sharp(Buffer.from(svgStr), { density: 108 })
    .jpeg({ quality: 82 })
    .toFile(join(outDir, `${name}.jpg`));
  console.log(`✓ ${name}.jpg + .svg`);
};

await raster(cardLola(), "lola");
await raster(cardAtirgul(), "atirgul");
await raster(cardMoychechak(), "moychechak");
await raster(cardBinafsha(), "binafsha");
await raster(heroBouquet(), "hero-bouquet");

writeFileSync(join(root, "app", "icon.svg"), appIcon());
console.log("✓ app/icon.svg");
console.log("Done.");
