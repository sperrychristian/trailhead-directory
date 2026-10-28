import { View, Text, Pressable, StyleSheet, Platform } from "react-native";

import { useNavigation } from "@react-navigation/native";
import TrailSummary from "./TrailSummary";

function TrailItem({ id, name, lengthMiles, difficulty }) {
  const navigation = useNavigation();

  function selectTrailItemHandler() {
    navigation.navigate("Explore", { screen: "TrailDetail", params: { trailId: id } });
  }

  return (
    <View style={styles.trailItem}>
      <Pressable
        style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
        android_ripple={{ color: "#ccc" }}
        onPress={selectTrailItemHandler}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>{name}</Text>
          <TrailSummary lengthMiles={lengthMiles} difficulty={difficulty} />
        </View>
      </Pressable>
    </View>
  );
}

export default TrailItem;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    margin: 8,
  },
  trailItem: {
    margin: 16,
    borderRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    backgroundColor: "white",
  },
  innerContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
