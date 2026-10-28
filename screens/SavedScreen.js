import { View, Text, StyleSheet } from "react-native";
import { useContext } from "react";

import TrailsList from "../components/TrailsList";
import { SavedContext } from "../store/SavedContext";
import { TRAILS } from "../data/dummy-data";

function SavedScreen() {
  const savedTrailsCtx = useContext(SavedContext);

  const savedTrails = TRAILS.filter((trail) =>
    savedTrailsCtx.ids.includes(trail.id)
  );

  if (savedTrails.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No saved trails yet.</Text>
      </View>
    );
  }

  return <TrailsList items={savedTrails} />;
}

export default SavedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#1f3d2b",
  },
});
