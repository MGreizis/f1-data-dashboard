/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.jsx",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        eggplant: "#443742",
        coyote: "#846C5B",
        buff: "#CEA07E",
        peachyellow: "#EDD9A3",
        oxford: "#0A2239",
        moonstone: "#53A2BE",
        ncsblue: "#1D84B5",
        gunmetal: "#132E32",
        lapislazuli: "#176087",
        auburn: "#A62639",
        amaranth: "#DB324D",
        wenge: "#56494E",
        taupe: "#A29C9B",
        darkred: "#511C29",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
