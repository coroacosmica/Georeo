/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        safety: {
          dark: "#0A0C0F",
          orange: "#F2661E",
          gray: "#3A3D42",
          panel: "#1E2024",
          light: "#E2E8F0",
        },
      },
      fontFamily: {
        safetyDisplay: ["'Bebas Neue'", "sans-serif"],
        safetySans: ["Inter", "system-ui", "sans-serif"],
        safetyMono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
}
