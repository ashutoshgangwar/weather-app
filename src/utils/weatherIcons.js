// Function to get emoji icon based on weather condition
export const getWeatherIcon = (weatherMain) => {
  const iconMap = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Drizzle: "🌦️",
    Thunderstorm: "⛈️",
    Snow: "❄️",
    Mist: "🌫️",
    Smoke: "🌫️",
    Haze: "🌫️",
    Dust: "🌪️",
    Fog: "🌫️",
    Sand: "🌪️",
    Ash: "🌫️",
    Squall: "🌪️",
    Tornado: "🌪️",
  };

  return iconMap[weatherMain] || "🌤️"; // Default icon if condition not found
};

// Function to get background color based on weather condition
export const getWeatherBackground = (weatherMain) => {
  const backgroundMap = {
    Clear: "#FFD700", // Gold for sunny
    Clouds: "#B0C4DE", // Light steel blue for cloudy
    Rain: "#708090", // Slate gray for rain
    Drizzle: "#A9A9A9", // Dark gray for drizzle
    Thunderstorm: "#2F4F4F", // Dark slate gray for thunderstorm
    Snow: "#F0F8FF", // Alice blue for snow
    Mist: "#D3D3D3", // Light gray for mist
    Smoke: "#696969", // Dim gray for smoke
    Haze: "#C0C0C0", // Silver for haze
    Dust: "#CD853F", // Peru for dust
    Fog: "#DCDCDC", // Gainsboro for fog
    Sand: "#EDC9AF", // Wheat for sand
    Ash: "#808080", // Gray for ash
  };

  return backgroundMap[weatherMain] || "#87CEEB"; // Sky blue as default
};
