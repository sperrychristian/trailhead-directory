import { useLayoutEffect } from "react";

import TrailsList from "../components/TrailsList";
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

  return <TrailsList items={displayedTrails} />;
}

export default TrailsScreen;
