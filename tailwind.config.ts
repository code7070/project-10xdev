import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "app-gray-700": "#374151",
        "app-orange": "#FF5834",
        "app-orange-shade": "#FF8E75",
        "app-green": "#2C838C",
        "gray-100": "#F3F4F6",
        "app-red-500": "#EF4444",
        "app-yellow": "#FFCE22",
      },
      fontFamily: {
        primary: "var(--font-primary)",
        secondary: "var(--font-secondary)",
      },
      borderRadius: {
        "app-radius": "1.25rem",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      const colors = (color: string) => theme(`colors.app-${color}`);
      const gradient = `linear-gradient(to bottom, ${colors(
        "orange-shade"
      )}, ${colors("orange")})`;
      addComponents({
        ".brand-text": {
          fontSize: "2.25rem",
          fontWeight: theme("fontWeight.bold"),
          lineHeight: "2.5rem",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          backgroundImage: gradient,
        },
      });
    }),
  ],
} satisfies Config;
