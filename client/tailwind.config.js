/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "mt-yellow" : "#FED74E",
        "mt-green" : "#00A15D",
        "mt-red" : "#F65129",
        "mt-blue" : "#5157CF",
        "mt-black" : "#1B1B1B",
        "mt-white" : "#FFFFFF",
        
      },
      fontFamily: {
        champ: ["Champ","sans-serif"],
        dm : ["DM Sans","sans-serif"]
      },
      fontSize : {
        xxs: "0.5rem"
      }
      
    },
  },
  plugins: [],
}

