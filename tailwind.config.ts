import type { Config } from "tailwindcss";
import fluid, { extract } from 'fluid-tailwind'

export default {
  content: {
    files:[
      "./src/slices/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    extract
  },
  theme: {
    colors: {
      transparent: 'transparent',
      red: "red",
      white: "white",
      black: "black",
    },
    extend: {
      fontFamily: {
        ultraLightNarrow: ['var(--font-mona-sans)',
          {fontVariationSettings: `"wght" 200, "wdth" 75`}
        ],
        lightNarrow: ['var(--font-mona-sans)',
          {fontVariationSettings: `"wght" 300, "wdth" 75`}
        ],
        regularNarrow: ['var(--font-mona-sans)',
          {fontVariationSettings: `"wght" 400, "wdth" 75`}
        ],
        mediumNarrow: ['var(--font-mona-sans)',
          {fontVariationSettings: `"wght" 500, "wdth" 75`}
        ],
        semiBoldNarrow: ['var(--font-mona-sans)',
          {fontVariationSettings: `"wght" 600, "wdth" 75`}
        ],
        boldNarrow: ['var(--font-mona-sans)',
          {fontVariationSettings: `"wght" 700, "wdth" 75`}
        ],
        extraBoldNarrow: ['var(--font-mona-sans)',
          {fontVariationSettings: `"wght" 800, "wdth" 75`}
        ],
        blackNarrow: ['var(--font-mona-sans)',
          {fontVariationSettings: `"wght" 900, "wdth" 75`}
        ],
        ultraLight: ['var(--font-mona-sans)',
          {fontVariationSettings: `"wght" 200, "wdth" 100`}
        ],
        light: ['var(--font-mona-sans)',
          {fontVariationSettings: `"wght" 300, "wdth" 100`}
        ],
        regular: ['var(--font-mona-sans)',
          {fontVariationSettings: `"wght" 400, "wdth" 100`}
        ],
        medium: ['var(--font-mona-sans)',
          {fontVariationSettings: `"wght" 500, "wdth" 100`}
        ],
        semiBold: ['var(--font-mona-sans)',
          {fontVariationSettings: `"wght" 600, "wdth" 100`}
        ],
        bold: ['var(--font-mona-sans)',
          {fontVariationSettings: `"wght" 700, "wdth" 100`}
        ],
        extraBold: ['var(--font-mona-sans)',
          {fontVariationSettings: `"wght" 800, "wdth" 100`}
        ],
        black: ['var(--font-mona-sans)',
          {fontVariationSettings: `"wght" 900, "wdth" 100`}
        ],
        ultraLightWide: ['var(--font-mona-sans)',
          {fontVariationSettings: `"wght" 200, "wdth" 125`}
        ],
        lightWide: ['var(--font-mona-sans)',
          {fontVariationSettings: `"wght" 300, "wdth" 125`}
        ],
        regularWide: ['var(--font-mona-sans)',
          {fontVariationSettings: `"wght" 400, "wdth" 125`}
        ],
        mediumWide: ['var(--font-mona-sans)',
          {fontVariationSettings: `"wght" 500, "wdth" 125`}
        ],
        semiBoldWide: ['var(--font-mona-sans)',
          {fontVariationSettings: `"wght" 600, "wdth" 125`}
        ],
        boldWide: ['var(--font-mona-sans)',
          {fontVariationSettings: `"wght" 700, "wdth" 125`}
        ],
        extraBoldWide: ['var(--font-mona-sans)',
          {fontVariationSettings: `"wght" 800, "wdth" 125`}
        ],
        blackWide: ['var(--font-mona-sans)',
          {fontVariationSettings: `"wght" 900, "wdth" 125`}
        ],
      }
    },
  },
  plugins: [
    fluid
  ],
} satisfies Config;
