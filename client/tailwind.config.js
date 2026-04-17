/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    {
      pattern: /(bg|text|border|decoration|from|via|accent)-(pop|rock|bubble|neon-red|neon-orange|neon-cyan)/,
      variants: ["hover", "focus", "active"],
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: "#050505", // Deeper black for 2026 contrast
        secondary: { 
          100: "#121212", 
          200: "#181818",
          300: "#242424"
        },
        pop: { DEFAULT: "#a3e635", 50: "#bef264" }, // Lime Green
        rock: { DEFAULT: "#0d9488", 50: "#11beae" }, // Teal/Green
        bubble: { DEFAULT: "#10b981", 50: "#34d399" }, // Emerald Green
        // 2026 Neon Palette
        "neon-red": "#22c55e", // Neon Green
        "neon-orange": "#16a34a", // Forest Green
        "neon-cyan": "#4ade80", // Spring Green
        "glass": "rgba(255, 255, 255, 0.03)",
        "glass-border": "rgba(255, 255, 255, 0.08)",
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.6 },
        },
      },
      backgroundImage: {
        "mesh-gradient": "radial-gradient(at 0% 0%, hsla(160,80%,10%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(150,80%,5%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(170,80%,10%,1) 0, transparent 50%)",
        "green-mesh-gradient": "radial-gradient(at 0% 0%, hsla(160,80%,10%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(150,80%,5%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(170,80%,10%,1) 0, transparent 50%)",
      },
    },
  },
  plugins: [],
};
