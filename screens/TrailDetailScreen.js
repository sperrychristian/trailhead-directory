import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useLayoutEffect, useContext } from "react";

import { TRAILS } from "../data/dummy-data";
import TrailSummary from "../components/TrailSummary";
import StatRow from "../components/StatRow";
import Subtitle from "../components/Subtitle";
import List from "../components/List";
import IconButton from "../components/IconButton";
import { SavedContext } from "../store/SavedContext";

function TrailDetailScreen({ route, navigation }) {
  const savedTrailsCtx = useContext(SavedContext);

  const trailId = route.params.trailId;

  const selectedTrail = TRAILS.find((trail) => trail.id === trailId);

  const trailIsSaved = savedTrailsCtx.ids.includes(trailId);

  // Toggle whether the trail is saved
  function changeSavedStatusHandler() {
    if (trailIsSaved) {
      savedTrailsCtx.removeTrail(trailId);
    } else {
      savedTrailsCtx.addTrail(trailId);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedTrail.name,
      headerRight: () => {
        return (
          <IconButton
            onPress={changeSavedStatusHandler}
            icon={trailIsSaved ? "bookmark" : "bookmark-outline"}
            color="white"
          />
        );
      },
    });
  }, [navigation, selectedTrail, trailIsSaved, changeSavedStatusHandler]);

  return (
    <ScrollView style={styles.root}>
      <Text style={styles.title}>{selectedTrail.name}</Text>
      <TrailSummary
        lengthMiles={selectedTrail.lengthMiles}
        difficulty={selectedTrail.difficulty}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Stats</Subtitle>
          <StatRow label="Elevation gain" value={`${selectedTrail.elevationGainFt} ft`} />
          <StatRow label="Route type" value={selectedTrail.routeType} />
          <StatRow label="Best season" value={selectedTrail.bestSeason} />
          <StatRow
            label="Dogs"
            value={selectedTrail.dogsAllowed ? "Allowed" : "Not allowed"}
          />
          <StatRow
            label="Permit"
            value={selectedTrail.permitRequired ? "Required" : "Not required"}
          />
          <StatRow
            label="Kid friendly"
            value={selectedTrail.kidFriendly ? "Yes" : "No"}
          />
          <Subtitle>Description</Subtitle>
          <Text style={styles.description}>{selectedTrail.description}</Text>
          <Subtitle>Highlights</Subtitle>
          <List data={selectedTrail.highlights} />
          <Subtitle>Tips</Subtitle>
          <List data={selectedTrail.tips} />
        </View>
      </View>
    </ScrollView>
  );
}

export default TrailDetailScreen;

const styles = StyleSheet.create({
  root: {
    marginBottom: 32,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
  },
  detailText: {
    color: "black",
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginVertical: 4,
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "90%",
  },
});
