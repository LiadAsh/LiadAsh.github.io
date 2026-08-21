// Renders pixel-art arrays onto canvas contexts
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

// Kris Pixel Art Data (19x28 scale)
export const KRIS_PALETTE = {
  'H': '#090d16', // Dark Hair
  'S': '#38bdf8', // Cyan Skin
  'G': '#15803d', // Green Sweater
  'Y': '#facc15', // Yellow Stripe
  'P': '#1e1b4b', // Pants
  'B': '#020617'  // Shoes
};

export const KRIS_DOWN = [
  ".....HHHHHHH.....",
  "....HHHHHHHHH....",
  "...HHHHHHHHHHH...",
  "..HHHHHHHHHHHHH..",
  "..HHHHHHHHHHHHH..",
  "..HHHHHHHHHHHHH..",
  "..HHSSSSSSSSH... ",
  "..HHSSSSSSSSH... ",
  "...HSSSSSSSS.....",
  "....SSSSSSSS.....",
  "...GGGGGGGGGGG...",
  "..GGGGGGGGGGGGG..",
  "..GGGGGGGGGGGGG..",
  "..GGGGYYYYYGGGG..",
  "..GGGGYYYYYGGGG..",
  "..GGGGGGGGGGGGG..",
  "..GGGGGGGGGGGGG..",
  "...GGGGGGGGGGG...",
  "....PPPPPPPPP....",
  "....PPPPPPPPP....",
  "....PPPPPPPPP....",
  "....PPPPPPPPP....",
  "....PPPPPPPPP....",
  "....BBBB.BBBB....",
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
  "..HHHHHHHHHHHHH..",
  "...HHHHHHHHHHH...",
  "....HHHHHHHHH....",
  "...GGGGGGGGGGG...",
  "..GGGGGGGGGGGGG..",
  "..GGGGGGGGGGGGG..",
  "..GGGGYYYYYGGGG..",
  "..GGGGYYYYYGGGG..",
  "..GGGGGGGGGGGGG..",
  "..GGGGGGGGGGGGG..",
  "...GGGGGGGGGGG...",
  "....PPPPPPPPP....",
  "....PPPPPPPPP....",
  "....PPPPPPPPP....",
  "....PPPPPPPPP....",
  "....PPPPPPPPP....",
  "....BBBB.BBBB....",
  "....BBBB.BBBB...."
];

export const KRIS_LEFT = [
  "......HHHHH......",
  ".....HHHHHHH.....",
  "....HHHHHHHHH....",
  "...HHHHHHHHHH....",
  "...HHHHHHHHHH....",
  "...HHHHHHHHHH....",
  "...HHHSSSSS......",
  "...HHHSSSSS......",
  "....HHSSSSS......",
  ".....SSSSSS......",
  "....GGGGGGGGG....",
  "...GGGGGGGGGGG...",
  "...GGGGGGGGGGG...",
  "...GGGGYYYYGGG...",
  "...GGGGYYYYGGG...",
  "...GGGGGGGGGGG...",
  "...GGGGGGGGGGG...",
  "....GGGGGGGGG....",
  ".....PPPPPPP.....",
  ".....PPPPPPP.....",
  ".....PPPPPPP.....",
  ".....PPPPPPP.....",
  ".....PPPPPPP.....",
  ".....BBBB.BB.....",
  ".....BBBB.BB....."
];
