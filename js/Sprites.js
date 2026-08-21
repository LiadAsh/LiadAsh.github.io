export function drawPixelMatrix(ctx, matrix, colorMap, startX, startY, pixelSize = 1) {
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      const colorKey = matrix[r][c];
      if (colorKey !== '.') {
        ctx.fillStyle = colorMap[colorKey];
        ctx.fillRect(
          Math.round(startX + c * pixelSize),
          Math.round(startY + r * pixelSize),
          pixelSize,
          pixelSize
        );
      }
    }
  }
}

export const PALETTE = {
  'H': '#0f172a', // Dark Hair
  'S': '#38bdf8', // Cyan Skin
  'G': '#15803d', // Green Sweater
  'Y': '#facc15', // Yellow Stripe
  'P': '#1e1b4b', // Pants
  'B': '#020617', // Shoes
  'R': '#ef4444', // Red SOUL
  'M': '#6366f1', // Monster Blue
  'W': '#ffffff', // White
  'D': '#1e293b'  // Monster Dark Shading
};

export const KRIS_DOWN = [
  ".....HHHHHHH.....",
  "....HHHHHHHHH....",
  "...HHHHHHHHHHH...",
  "..HHHHHHHHHHHHH..",
  "..HHHHHHHHHHHHH..",
  "..HHSSSSSSSSH... ",
  "..HHSSSSSSSSH... ",
  "...HSSSSSSSS.....",
  "....SSSSSSSS.....",
  "...GGGGGGGGGGG...",
  "..GGGGGGGGGGGGG..",
  "..GGGGYYYYYGGGG..",
  "..GGGGGGGGGGGGG..",
  "...GGGGGGGGGGG...",
  "....PPPPPPPPP....",
  "....PPPPPPPPP....",
  "....PPPPPPPPP....",
  "....BBBB.BBBB...."
];

export const KRIS_UP = [
  ".....HHHHHHH.....",
  "....HHHHHHHHH....",
  "...HHHHHHHHHHH...",
  "..HHHHHHHHHHHHH..",
  "..HHHHHHHHHHHHH..",
  "..HHHHHHHHHHHHH..",
  "..HHHHHHHHHHHHH..",
  "...HHHHHHHHHHH...",
  "....HHHHHHHHH....",
  "...GGGGGGGGGGG...",
  "..GGGGGGGGGGGGG..",
  "..GGGGYYYYYGGGG..",
  "..GGGGGGGGGGGGG..",
  "...GGGGGGGGGGG...",
  "....PPPPPPPPP....",
  "....PPPPPPPPP....",
  "....PPPPPPPPP....",
  "....BBBB.BBBB...."
];

// Facing Left: Hair Bangs & Face on Left
export const KRIS_LEFT = [
  "......HHHHHH.....",
  ".....HHHHHHHH....",
  "....HHHHHHHHH....",
  "...HHHHHHHHHH....",
  "...HHHHHHHHHH....",
  "...HSSSSSSHHH....",
  "...HSSSSSSHHH....",
  "....SSSSSSHH.....",
  "....SSSSSS.......",
  "...GGGGGGGGG.....",
  "..GGGGGGGGGGG....",
  "..GGYYYYGGGGG....",
  "..GGGGGGGGGGG....",
  "...GGGGGGGGG.....",
  "....PPPPPPP......",
  "....PPPPPPP......",
  "....PPPPPPP......",
  "....BBBB.BB......"
];

// Facing Right: Hair Bangs & Face on Right
export const KRIS_RIGHT = [
  ".....HHHHHH......",
  "....HHHHHHHH.....",
  "....HHHHHHHHH....",
  "....HHHHHHHHHH...",
  "....HHHHHHHHHH...",
  "....HHHSSSSSSH...",
  "....HHHSSSSSSH...",
  ".....HHSSSSSS....",
  ".......SSSSSS....",
  ".....GGGGGGGGG...",
  "....GGGGGGGGGGG..",
  "....GGGGGYYYYGG..",
  "....GGGGGGGGGGG..",
  ".....GGGGGGGGG...",
  "......PPPPPPP....",
  "......PPPPPPP....",
  "......PPPPPPP....",
  "......BB.BBBB...."
];

export const SOUL_SPRITE = [
  ".RR..RR.",
  "RRRRRRRR",
  "RRRRRRRR",
  "RRRRRRRR",
  ".RRRRRR.",
  "..RRRR..",
  "...RR..."
];

export const MONSTER_SPRITE = [
  ".....WWWWWW.....",
  "...WWMMMMMMWW...",
  "..WMMMMMMMMMMW..",
  ".WMMWMMMMMMWMMW.",
  ".WMMWMMMMMMWMMW.",
  "WMMMMMMMMMMMMMMW",
  "WMMMMWWWWWWMMMMW",
  "WMMMWDWDWDWDWMMW",
  ".WMMMDWDWDWDMMW.",
  "..WMMMMMMMMMMW..",
  "...WWMMMMMMWW...",
  "....WMMMMMMW....",
  "...WMMMMMMMMW...",
  "..WMMMMMMMMMMW..",
  "..WMMWWWWWWMMW.."
];
