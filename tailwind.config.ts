import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "2rem" },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        // Brittany's color palette
        navy: {
          DEFAULT: "#0a192f",
          dark: "#020c1b",
          light: "#112240",
          lighter: "#233554",
        },
        slate: {
          DEFAULT: "#8892b0",
          dark: "#495670",
          light: "#a8b2d1",
          lighter: "#ccd6f6",
        },
        teal: {
          DEFAULT: "#64ffda",
          tint: "rgba(100, 255, 218, 0.1)",
        },
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
      fontFamily: {
        mono: ["'SF Mono'", "'Fira Code'", "'Fira Mono'", "'Roboto Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
