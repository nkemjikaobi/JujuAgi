/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        maxMobile: { max: "640px" },
        mobile: "640px",
        tablet: "768px",
        maxTablet: { max: "768px" },
        smallLaptop: "1024px",
        desktop: "1280px",
        bigLaptop: "1440px",
        television: "1536px",
      },
      colors: {
        "juju-purple": {
          200: "#8e83d4",
          500: "#4C35DD",
          800: "#381ee6",
        },
        "juju-gray": {
          50: "#FEFEFE",
          100: "#6C7275",
          200: "#F3F5F7",
          300: "#E8ECEF",
          400: "#252525",
          500: "#8C9DA6",
          600: "#A5A7AD",
          700: "#9D9D9D",
          800: "#C6CED2",
        },
        "juju-black": {
          100: "#141718",
          200: "#343839",
          300: "#232627",
          400: "#18191B",
          500: "#151515",
        },
      },
      fontSize: {
        8: ["0.5rem", "0.688rem"],
        10: ["0.625rem", "0.938rem"],
        12: ["0.75rem", "1rem"],
        13: ["0.813rem", "1.125rem"],
        14: ["0.875rem", "1.118rem"],
        16: ["1rem", "1.313rem"],
        18: ["1.125rem", "2rem"],
        20: ["1.25rem", "1.688rem"],
        24: ["1.5rem", "2.063rem"],
        32: ["2rem", "3rem"],
        40: ["2.5rem", "3.375rem"],
        64: ["4rem", "4.375rem"],
      },
      fontFamily: {},
    },
  },
  plugins: [],
};
