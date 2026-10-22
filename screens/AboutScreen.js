import { View, Text, StyleSheet } from "react-native";

function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trailhead Directory</Text>
      <Text style={styles.text}>
        Browse Utah trail areas, find trails in each area, and check details
        like length, difficulty, elevation gain, and the best season to go.
      </Text>
      <Text style={styles.text}>
        Use the Explore tab to browse trails and the Saved tab to keep track of
        the ones you want to hike.
      </Text>
    </View>
  );
}

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f3d2b",
    textAlign: "center",
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 12,
  },
});
