import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customblue: "#5083BB",
        custombluehover: "#336FB0",
        customred: "#BB0404",
        customlightred: "#F7E8E8",
        customlightredhover: "#FBD3D3",
        customsoftwhite: "#FAFAFA",
        customlightestgrey: "#E5E5E5",
        customlightgrey: "#7D7D7D",
        customdarkgrey: "#5A5A5A",
        customblack: "#3C3C3C"
      },
      fontFamily: {
        alata: ['Alata', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
