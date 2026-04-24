// Tailwind v4 is loaded via @tailwindcss/vite — no PostCSS plugins needed.
// This empty config prevents Vite from walking up and loading the parent
// Vite project's postcss.config.js (which references Tailwind v3).
export default { plugins: [] };
