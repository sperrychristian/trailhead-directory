import { View, Text, StyleSheet } from "react-native";

function TrailSummary({ lengthMiles, difficulty, textStyle }) {
  return (
    <View style={styles.details}>
      <Text style={[styles.detailItem, textStyle]}>{lengthMiles} mi</Text>
      <Text style={[styles.detailItem, textStyle]}>
        {difficulty.toUpperCase()}
      </Text>
    </View>
  );
}

export default TrailSummary;

const styles = StyleSheet.create({
  details: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  detailItem: {
    marginHorizontal: 4,
    fontSize: 12,
  },
});
