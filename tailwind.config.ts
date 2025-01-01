import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "disco-50": "#ffffff",
        "disco-100": "#f3e7ec",
        "disco-200": "#e7cfda",
        "disco-300": "#dbb8c7",
        "disco-400": "#cfa0b4",
        "disco-500": "#c488a2",
        "disco-600": "#b8708f",
        "disco-700": "#ac587c",
        "disco-800": "#a04169",
        "disco-900": "#942957",
        "disco-950": "#881144",
      },
    },
  },
  plugins: [require("daisyui")],
} satisfies Config;
