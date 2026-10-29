/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: token("paper"),
        panel: token("panel"),
        sunk: token("sunk"),
        ink: token("ink"),
        muted: token("muted"),
        faint: token("faint"),
        rule: token("rule"),
        note: token("note"),
        "note-ink": token("note-ink"),
        "note-dim": token("note-dim"),
        "note-serial": token("note-serial"),
        mint: token("mint"),
        serial: token("serial"),
        up: token("up"),
        down: token("down"),
      },
      fontFamily: {
        sans: ["Archivo", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        note: "14px",
      },
      boxShadow: {
        note: "0 1px 1px rgb(var(--shadow) / 0.12), 0 12px 32px -12px rgb(var(--shadow) / 0.35)",
        lift: "0 1px 2px rgb(var(--shadow) / 0.10), 0 8px 24px -10px rgb(var(--shadow) / 0.30)",
      },
      keyframes: {
        flashUp: { "0%": { backgroundColor: "rgb(var(--up) / 0.22)" }, "100%": { backgroundColor: "transparent" } },
        flashDown: { "0%": { backgroundColor: "rgb(var(--down) / 0.22)" }, "100%": { backgroundColor: "transparent" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        rise: { "0%": { opacity: "0", transform: "translateY(6px) scale(0.985)" }, "100%": { opacity: "1", transform: "none" } },
        ticker: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
      },
      animation: {
        "flash-up": "flashUp 1.4s cubic-bezier(0.16,1,0.3,1)",
        "flash-down": "flashDown 1.4s cubic-bezier(0.16,1,0.3,1)",
        shimmer: "shimmer 1.6s linear infinite",
        rise: "rise 220ms cubic-bezier(0.16,1,0.3,1)",
        ticker: "ticker 90s linear infinite",
      },
    },
  },
  plugins: [],
};
