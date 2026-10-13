import { FlatList } from "react-native";

import { AREAS } from "../data/dummy-data";
import AreaGridTile from "../components/AreaGridTile";

function OverviewScreen({ navigation }) {
  function renderAreaItem(itemData) {
    function pressHandler() {
      navigation.navigate("Trails", {
        areaId: itemData.item.id,
      });
    }

    return (
      <AreaGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={pressHandler}
      />
    );
  }

  return <FlatList data={AREAS} renderItem={renderAreaItem} numColumns={2} />;
}

export default OverviewScreen;
