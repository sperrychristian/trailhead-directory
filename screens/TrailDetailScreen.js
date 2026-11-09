import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useLayoutEffect, useContext, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { TRAILS } from "../data/dummy-data";
import TrailSummary from "../components/TrailSummary";
import StatRow from "../components/StatRow";
import Subtitle from "../components/Subtitle";
import List from "../components/List";
import IconButton from "../components/IconButton";
import Button from "../components/Button";
import { SavedContext } from "../store/SavedContext";
import { fetchHikes } from "../util/http";

function TrailDetailScreen({ route, navigation }) {
  const savedTrailsCtx = useContext(SavedContext);

  const [hikes, setHikes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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

  function logHikeHandler() {
    navigation.navigate("LogHike", { trailName: selectedTrail.name });
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

  // Reload hikes each time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      async function loadHikes() {
        setIsLoading(true);
        setError("");
        try {
          const allHikes = await fetchHikes();
          setHikes(
            allHikes.filter((hike) => hike.trailName === selectedTrail.name)
          );
        } catch (error) {
          setError("Could not load hikes. Please try again later.");
        }
        setIsLoading(false);
      }

      loadHikes();
    }, [selectedTrail])
  );

  let hikesContent;
  if (isLoading) {
    hikesContent = <ActivityIndicator style={styles.status} color="#1f3d2b" />;
  } else if (error) {
    hikesContent = <Text style={styles.errorText}>{error}</Text>;
  } else if (hikes.length === 0) {
    hikesContent = <Text style={styles.statusText}>No hikes logged yet</Text>;
  } else {
    hikesContent = hikes.map((hike) => (
      <StatRow key={hike.id} label={hike.date} value={`${hike.miles} mi`} />
    ));
  }

  return (
    <ScrollView style={styles.root}>
      <Text style={styles.title}>{selectedTrail.name}</Text>
      <TrailSummary
        lengthMiles={selectedTrail.lengthMiles}
        difficulty={selectedTrail.difficulty}
        textStyle={styles.detailText}
      />
      <Button style={styles.logHikeButton} onPress={logHikeHandler}>
        Log a Hike
      </Button>
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
          <Subtitle>My Hikes</Subtitle>
          {hikesContent}
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
  logHikeButton: {
    alignSelf: "center",
    marginVertical: 8,
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
  status: {
    marginVertical: 8,
  },
  statusText: {
    fontSize: 14,
    color: "#1f3d2b",
    textAlign: "center",
    marginVertical: 8,
  },
  errorText: {
    fontSize: 14,
    color: "#b3261e",
    textAlign: "center",
    marginVertical: 8,
  },
});
