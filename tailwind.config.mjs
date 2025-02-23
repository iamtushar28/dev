/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "ul, ol": {
              color: theme("colors.black"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
