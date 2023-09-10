import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: {
          yellow: "#EFE3C9",
        },
      },
      fontFamily: {
        Red_Hat_Display: ["Red Hat Display", "sans-serif"],
        Poppins: ["Poppins", "sans-serif"],
        Quicksand: ["Quicksand", "sans-serif"],
        Marck_Script: ["Marck Script", "cursive"],
      },
    },
  },
  plugins: [],
} satisfies Config;
