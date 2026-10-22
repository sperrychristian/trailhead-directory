import { useLayoutEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import TrailItem from "../components/TrailItem";
import { AREAS, TRAILS } from "../data/dummy-data";

function TrailsScreen({ route, navigation }) {
  const areaId = route.params.areaId;

  const displayedTrails = TRAILS.filter((trailItem) => {
    return trailItem.areaId === areaId;
  });

  useLayoutEffect(() => {
    const areaTitle = AREAS.find((area) => area.id === areaId).title;

    navigation.setOptions({
      title: areaTitle,
    });
  }, [areaId, navigation]);

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
      <FlatList data={displayedTrails} renderItem={renderTrailItem} />
    </View>
  );
}

export default TrailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
