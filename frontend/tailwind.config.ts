import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import tailwindAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
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
        "app-red": "#7A0400",
        "app-yellow": "#FFCE22",
        "app-blue": "#1E4B8F",
        "app-violet": "#4C2848",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        primary: "var(--font-primary)",
        secondary: "var(--font-secondary)",
      },
      borderRadius: {
        "app-radius": "1.25rem",
        "app-radius-lg": "1.5rem",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      const colors = (color: string) => theme(`colors.app-${color}`);
      const gradient = `linear-gradient(to bottom, ${colors(
        "orange-shade",
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
        ".page-wrapper": {
          // px-8 mt-6 flex flex-col gap-6
          padding: "32px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        },
      });
    }),
    tailwindAnimate,
  ],
} satisfies Config;
