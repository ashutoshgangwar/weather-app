# Weather App 🌤️

A simple weather application built with React Native and Expo that shows current weather for your location.

## Features

✨ **Current Weather**: Display real-time weather for your current location
📍 **Location-Based**: Automatically detect and display weather for your location
📊 **Detailed Metrics**: View temperature, humidity, wind speed, pressure, and "feels like" temperature
🎨 **Dynamic UI**: Beautiful backgrounds based on weather conditions
🔄 **Refresh**: Easy one-tap weather refresh functionality

## Project Structure

```
WeatherApp/
├── app/
│   ├── index.tsx                # Main home screen
│   └── _layout.tsx              # Root layout
├── src/
│   ├── components/
│   │   └── WeatherCard.js       # Weather display component
│   ├── screens/
│   │   └── HomeScreen.js        # Home screen logic
│   ├── services/
│   │   └── weatherApi.js        # API calls to OpenWeatherMap
│   └── utils/
│       └── weatherIcons.js      # Icons and colors for weather
├── constants/
│   └── theme.ts                 # App theme
└── package.json                 # Dependencies
```

│ ├── screens/
│ │ └── HomeScreen.js # Home screen logic
│ ├── services/
│ │ └── weatherApi.js # OpenWeatherMap API integration
│ └── utils/
│ └── weatherIcons.js # Weather icons and colors
├── constants/
│ └── theme.ts # App theme and colors
└── package.json # Dependencies

````

## Quick Start 🚀

### 1. Get Your Free API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to your API keys section
4. Copy your API key

### 2. Configure Your API Key

Open `src/services/weatherApi.js` and replace `YOUR_API_KEY_HERE` with your actual API key:

```javascript
const API_KEY = "your_actual_api_key_here"; // Replace with your actual API key
````

### 3. Start the App

```bash
npx expo start
```

Then press:

- **i** for iOS Simulator
- **a** for Android Emulator
- **w** for Web Browser

**Note**: The free API key has usage limits. If you exceed the limits, you'll need to wait or upgrade to a paid plan.

## Running the App

Start the development server:

```bash
npx expo start
```

Then press:

- **i** to open in iOS Simulator
- **a** to open in Android Emulator
- **w** to open in web browser
- **j** to open Expo Debugger
- **r** to reload the app

## Permissions

The app requires location permissions:

- **iOS**: Add location permission request to `app.json` if needed
- **Android**: Location permission is requested at runtime

## Features Explained

### 1. Home Screen (Current Location)

- Automatically requests location permission on first launch
- Displays current weather for your location
- Shows temperature, weather condition, and detailed metrics
- One-tap refresh button to update weather data

### 2. Explore Screen (City Search)

- Search weather for any city in the world
- Recent search history stored for quick access
- Beautiful error handling for invalid cities
- Loading states for better UX

### 3. Weather Card Component

- Responsive design that works on all screen sizes
- Gradient backgrounds that change based on weather conditions
- Clean, organized display of weather metrics
- Weather emojis (☀️ ☁️ 🌧️ ⛈️ ❄️ etc.)

## API Endpoints Used

- **Current Weather**: `/data/2.5/weather`
  - By coordinates: `?lat={lat}&lon={lon}`
  - By city name: `?q={city}`

- **Weather Forecast**: `/data/2.5/forecast` (available for future expansion)

## Technologies Used

- **React Native**: Cross-platform mobile development
- **Expo**: Managed React Native platform
- **Expo Router**: File-based routing
- **axios**: HTTP client for API calls
- **expo-location**: Geolocation services
- **React Native StyleSheet**: Native styling

## Customization

### Change Colors

Edit `src/utils/weatherIcons.js` to modify weather background colors:

```javascript
export const getWeatherBackground = (weatherMain) => {
  const backgroundMap = {
    Clear: "#FFD700", // Yellow
    Clouds: "#B0C4DE", // Light slate blue
    Rain: "#708090", // Slate gray
    // ...
  };
};
```

### Add More Weather Conditions

Edit the icon and background maps in `src/utils/weatherIcons.js` to add emoji and colors for additional weather conditions.

### Styling

- Card styling: `src/components/WeatherCard.js`
- Screen styling: `src/screens/HomeScreen.js`
- Explore screen styling: `app/(tabs)/explore.tsx`

## Troubleshooting

### "Location permission denied"

- Ensure location permissions are granted in device settings
- On iOS: Check Settings > Privacy > Location
- On Android: Check Settings > Apps > WeatherApp > Permissions

### "City not found" error

- Check spelling of city name
- Some small cities may not be in the OpenWeatherMap database
- Try using larger city names

### API errors

- Verify API key is correct in `src/services/weatherApi.js`
- Check internet connection
- OpenWeatherMap API limits free tier usage

## Future Enhancements

- 📅 5-day weather forecast
- 🗓️ Hourly weather breakdown
- 💾 Save favorite cities
- 🔔 Weather alerts and notifications
- 🗺️ Weather map integration
- 🌙 Dark mode theme
- 🌍 Multiple language support

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:

1. Check the [Expo documentation](https://docs.expo.dev/)
2. Visit [OpenWeatherMap API docs](https://openweathermap.org/api)
3. Check React Native documentation

---

Happy coding! 🚀
