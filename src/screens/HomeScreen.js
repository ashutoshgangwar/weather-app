import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { STRINGS } from "../constants/strings";

import WeatherCard from "../components/WeatherCard";
import {
  getLocationSuggestions,
  getWeatherByCity,
  getWeatherByCoords,
} from "../services/weatherApi";

export default function HomeScreen() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [lang, setLang] = useState("en");

  const t = (key) => STRINGS[lang][key] || key;

  // suggestions debounce
  useEffect(() => {
    const delay = setTimeout(async () => {
      if (searchQuery.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const results = await getLocationSuggestions(searchQuery);
        setSuggestions(results);
      } catch {
        setSuggestions([]);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [searchQuery]);

  // get current location weather
  const fetchWeatherByLocation = async () => {
    setLoading(true);
    setError(null);

    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setError("Location permission denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});

      const data = await getWeatherByCoords(
        location.coords.latitude,
        location.coords.longitude,
      );

      setWeather(data);
    } catch (err) {
      setError(err.message || "Failed to fetch weather");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCityName = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const data = await getWeatherByCity(searchQuery.trim());
      setWeather(data);
      setSuggestions([]);
    } catch (err) {
      setError(err.message || "City not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherByLocation();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>{t("gettingWeather")}</Text>
      </View>
    );
  }

  if (error) {
    // Show error in selected language if possible
    let errorText = error;
    if (error === "City not found") errorText = t("cityNotFound");
    if (error === "Location permission denied")
      errorText = t("locationPermissionDenied");
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{errorText}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={fetchWeatherByLocation}
        >
          <Text style={styles.buttonText}>{t("retry")}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top bar with refresh icon and language toggle */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: scale(20),
          marginTop: verticalScale(5),
        }}
      >
        {/* Refresh icon button */}
        <TouchableOpacity
          onPress={fetchWeatherByLocation}
          style={{ padding: 8 }}
          accessibilityLabel="Refresh current location weather"
        >
          <MaterialIcons name="refresh" size={28} color="#007AFF" />
        </TouchableOpacity>
        {/* Language toggle */}
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[
              styles.langButton,
              lang === "en" && styles.langButtonActive,
            ]}
            onPress={() => setLang("en")}
          >
            <Text
              style={[
                styles.langButtonText,
                lang === "en" && styles.langButtonTextActive,
              ]}
            >
              English
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.langButton,
              lang === "hi" && styles.langButtonActive,
            ]}
            onPress={() => setLang("hi")}
          >
            <Text
              style={[
                styles.langButtonText,
                lang === "hi" && styles.langButtonTextActive,
              ]}
            >
              हिन्दी
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainerWrapper}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={fetchWeatherByCityName}
          />

          <TouchableOpacity
            style={styles.searchButton}
            onPress={async () => {
              await fetchWeatherByCityName();
              setSearchQuery("");
            }}
          >
            <Text style={styles.buttonText}>{t("search")}</Text>
          </TouchableOpacity>
        </View>

        {suggestions.length > 0 && (
          <View style={styles.suggestionsDropdown}>
            <ScrollView style={{ maxHeight: verticalScale(200) }}>
              {suggestions.map((item, idx) => (
                <TouchableOpacity
                  key={item.lat + "," + item.lon + idx}
                  style={styles.suggestionItem}
                  onPress={() => {
                    setSearchQuery(
                      `${item.name}${item.state ? ", " + item.state : ""}${
                        item.country ? ", " + item.country : ""
                      }`,
                    );
                    setSuggestions([]);
                  }}
                >
                  <Text style={styles.suggestionText}>
                    {item.name}
                    {item.state ? `, ${item.state}` : ""}
                    {item.country ? `, ${item.country}` : ""}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.contentContainer}
      >
        {weather && <WeatherCard weather={weather} lang={lang} />}

        <TouchableOpacity
          style={styles.button}
          onPress={fetchWeatherByLocation}
        >
          <Text style={styles.buttonText}>{t("useCurrentLocation")}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    marginTop: verticalScale(30),
  },

  contentContainer: {
    paddingVertical: verticalScale(30),
    flexGrow: 1,
  },

  searchContainerWrapper: {
    zIndex: 10,
    marginHorizontal: scale(20),
    marginTop: verticalScale(10),
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: scale(5),
    paddingVertical: verticalScale(2),
  },

  input: {
    flex: 1,
    padding: moderateScale(12),
    fontSize: moderateScale(16),
  },

  searchButton: {
    backgroundColor: "#007AFF",
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(16),
    borderRadius: moderateScale(10),
    marginLeft: scale(5),
  },

  suggestionsDropdown: {
    position: "absolute",
    top: verticalScale(50),
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderBottomLeftRadius: moderateScale(10),
    borderBottomRightRadius: moderateScale(10),
    elevation: 3,
    zIndex: 100,
  },

  suggestionItem: {
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  suggestionText: {
    fontSize: moderateScale(16),
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: verticalScale(10),
    fontSize: moderateScale(16),
  },

  errorText: {
    fontSize: moderateScale(16),
    color: "#d32f2f",
  },

  button: {
    backgroundColor: "#007AFF",
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(30),
    borderRadius: moderateScale(10),
    marginHorizontal: scale(20),
    marginVertical: verticalScale(15),
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: moderateScale(16),
    fontWeight: "600",
  },

  langButton: {
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(14),
    borderRadius: moderateScale(8),
    backgroundColor: "#eee",
    marginLeft: scale(8),
  },
  langButtonActive: {
    backgroundColor: "#007AFF",
  },
  langButtonText: {
    color: "#333",
    fontSize: moderateScale(14),
    fontWeight: "500",
  },
  langButtonTextActive: {
    color: "#fff",
  },
});
