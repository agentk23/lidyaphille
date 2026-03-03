const config = {
  plugins: {
    "@tailwindcss/postcss": {
    },
  },
  theme: {
    extend: {
      fontFamily: {
        glitch: ["var(--font-glitch)", "cursive"],
      },
    },
  },
};

export default config;
