import { View, Text, StyleSheet } from "react-native";

function SavedScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No saved trails yet.</Text>
    </View>
  );
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
