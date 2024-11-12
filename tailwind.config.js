module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1a73e8', 
        'secondary': '#ff5722', 
        'hover-blue': '#1a5dd8', 
      },
      spacing: {
        'btn-padding': '1rem', 
        'header-padding-x': '1.5rem', 
      },
      borderRadius: {
        'btn-radius': '0.375rem', 
      },
      fontSize: {
        'logo-text': '1.25rem', 
      },
    },
  },
  plugins: [],
}
