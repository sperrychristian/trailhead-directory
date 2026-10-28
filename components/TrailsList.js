import { View, FlatList, StyleSheet } from "react-native";

import TrailItem from "./TrailItem";

// Shared trail list used by TrailsScreen and SavedScreen
function TrailsList({ items }) {
  function renderTrailItem(itemData) {
    const item = itemData.item;

    const trailItemProps = {
      id: item.id,
      name: item.name,
      lengthMiles: item.lengthMiles,
      difficulty: item.difficulty,
    };

    return <TrailItem {...trailItemProps} />;
  }

  return (
    <View style={styles.container}>
      <FlatList data={items} renderItem={renderTrailItem} />
    </View>
  );
}

export default TrailsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
