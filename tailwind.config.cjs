/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.jsx",
  ],
  theme: {
    extend: {
      colors: {
        eggplant: "#443742",
        coyote: "#846C5B",
        buff: "#CEA07E",
        peachyellow: "#EDD9A3"
      }
    },
  },
  plugins: [],
}
