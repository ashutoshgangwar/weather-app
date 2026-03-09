import { ScrollView, StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { STRINGS } from "../constants/strings";
import { getWeatherIcon } from "../utils/weatherIcons";

const formatDateLabel = (dateString, lang) => {
  const date = new Date(`${dateString}T00:00:00`);
  const locale = lang === "hi" ? "hi-IN" : "en-US";
  return date.toLocaleDateString(locale, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

export default function ForecastList({ forecast = [], lang = "en" }) {
  const t = (key) => STRINGS[lang][key] || key;

  if (!forecast.length) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("forecast5Days")}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {forecast.map((item) => (
          <View key={item.date} style={styles.card}>
            <Text style={styles.day}>{formatDateLabel(item.date, lang)}</Text>
            <Text style={styles.icon}>{getWeatherIcon(item.icon)}</Text>
            <Text style={styles.tempRange}>
              {Math.round(item.max)}° / {Math.round(item.min)}°
            </Text>
            <Text style={styles.desc} numberOfLines={1}>
              {item.description}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(10),
    marginBottom: verticalScale(5),
  },
  title: {
    marginHorizontal: scale(20),
    marginBottom: verticalScale(10),
    fontSize: moderateScale(16),
    fontWeight: "600",
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(14),
    marginLeft: scale(20),
    width: scale(120),
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  day: {
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: "#222",
    marginBottom: verticalScale(6),
  },
  icon: {
    fontSize: moderateScale(28),
    marginBottom: verticalScale(6),
  },
  tempRange: {
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: "#007AFF",
  },
  desc: {
    marginTop: verticalScale(4),
    fontSize: moderateScale(12),
    color: "#666",
    textTransform: "capitalize",
  },
});
