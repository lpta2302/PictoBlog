/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["montserrat", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
        system: ["Open Sans", "sans-serif"],
      },
      screens: {
        "2xl": "1400px",
        xs: "480px",
      },
      backgroundImage: {
        authside:
          "url(../public/assets/images/side-img.png)",
      },
      colors: {
        "primary-1": "#0ea5e9",

        success: "#52b963",
        error: "#e53935",
        warning: "#e9d502",
        info: "#1e92f4",

        "white-text": "#f5f5f5",
        subtitle: "#a8a8a8",

        white: "#fefefe",
        "off-white": "#E4E4E4",

        "dark-bg": "#000",
        "light-bg": "#fbfbfb",

        "dark-item": "#080808",
        "dark-3": "#101012",
        "dark-4": "#1F1F22",
      },
      maxWidth: {
        wide: "1440px",
      },
      width: {
        xs: "328px",
        sm: "472px",
      },
      keyframes: {
        slideIn: {
          from: {
            opacity: "0",
            transform: "translateX(-30%)",
          },
          to: {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        slideOut: {
          from: {
            opacity: "1",
            transform: "translateX(0)",
          },
          to: {
            opacity: "0",
            transform: "translateX(-30%)",
          },
        },
        slideDown: {
          from: {
            display: "none",
            opacity: "0",
            transform: "translateY(-30%)",
          },
          to: {
            display: null,
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideUp: {
          from: {
            opacity: "1",
            transform: "translateY(0)",
          },
          to: {
            opacity: "0",
            transform: "translateY(-30%)",
          },
        },
      },
      boxShadow: {
        primary:
          "3px 3px 10px 0 rgba(0, 0, 0, 0.1)",
      },
      animation: {
        slideIn: "slideIn 0.2s linear forwards",
        slideOut: "slideOut 0.2s linear forwards",
        slideUp: "slideUp 0.2s linear forwards",
        slideDown:
          "slideDown 0.1s linear forwards",
      },
    },
  },
  plugins: [],
};
