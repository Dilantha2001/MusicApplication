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
        pop: { DEFAULT: "#a631ff", 50: "#c77dff" },
        rock: { DEFAULT: "#0d9488", 50: "#11beae" },
        bubble: { DEFAULT: "#ed0eff", 50: "#ef2dff" },
        // 2026 Neon Palette
        "neon-red": "#ff003c",
        "neon-orange": "#ff4d00",
        "neon-cyan": "#00f3ff",
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
        "mesh-gradient": "radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)",
      },
    },
  },
  plugins: [],
};
