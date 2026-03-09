import { StyleSheet, Text, View } from "react-native";
import { STRINGS } from "../constants/strings";
import { getWeatherBackground, getWeatherIcon } from "../utils/weatherIcons";

// Component to display weather information in a card format
export default function WeatherCard({ weather, lang = "en" }) {
  const t = (key) => STRINGS[lang][key] || key;
  // If no weather data, show empty state
  if (!weather) {
    return (
      <View style={styles.emptyCard}>
        <Text style={styles.emptyText}>{t("noWeatherData")}</Text>
      </View>
    );
  }

  // Get appropriate icon and background color based on weather condition
  const icon = getWeatherIcon(weather.weather[0].main);
  const backgroundColor = getWeatherBackground(weather.weather[0].main);

  return (
    <View style={[styles.card, { backgroundColor }]}>
      {/* Header with city name and weather icon */}
      <View style={styles.header}>
        <Text style={styles.cityName}>{weather.name}</Text>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      {/* Main temperature display */}
      <Text style={styles.temperature}>{Math.round(weather.main.temp)}°C</Text>
      <Text style={styles.description}>
        {lang === "hi" && weather.weather[0].main === "Clouds"
          ? t("clouds")
          : weather.weather[0].main}
      </Text>
      {/* Detailed weather metrics */}
      <View style={styles.detailsContainer}>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>{t("feelsLike")}</Text>
          <Text style={styles.detailValue}>
            {Math.round(weather.main.feels_like)}°C
          </Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>{t("humidity")}</Text>
          <Text style={styles.detailValue}>{weather.main.humidity}%</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>{t("windSpeed")}</Text>
          <Text style={styles.detailValue}>{weather.wind.speed} m/s</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>{t("pressure")}</Text>
          <Text style={styles.detailValue}>{weather.main.pressure} hPa</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  cityName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  icon: {
    fontSize: 50,
  },
  temperature: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 5,
  },
  description: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 20,
    opacity: 0.9,
  },
  detailsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  detail: {
    width: "48%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 12,
    color: "#fff",
    opacity: 0.8,
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  emptyCard: {
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 200,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
});
