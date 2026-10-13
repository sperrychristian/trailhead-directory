import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useLayoutEffect } from "react";

import { TRAILS } from "../data/dummy-data";
import TrailSummary from "../components/TrailSummary";
import StatRow from "../components/StatRow";
import Subtitle from "../components/Subtitle";
import List from "../components/List";
import IconButton from "../components/IconButton";

function TrailDetailScreen({ route, navigation }) {
  const trailId = route.params.trailId;

  const selectedTrail = TRAILS.find((trail) => trail.id === trailId);

  useLayoutEffect(() => {
    function headerButtonPressHandler() {
      console.log("pressed");
    }

    navigation.setOptions({
      title: selectedTrail.name,
      headerRight: () => {
        return (
          <IconButton
            onPress={headerButtonPressHandler}
            icon="star"
            color="white"
          />
        );
      },
    });
  }, [navigation, selectedTrail]);

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
