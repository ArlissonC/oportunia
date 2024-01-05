import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-primary": "#334155",
        "brand-secondary": "#1E293B",
        "brand-tertiary": "#4B4EFC",
      },
      borderRadius: {
        "2.5xl": "1.25rem",
      },
      boxShadow: {
        auth: "-4px 6px 29px -14px rgba(0, 0, 0, 0.25);",
      },
    },
  },
  plugins: [],
};
export default config;
