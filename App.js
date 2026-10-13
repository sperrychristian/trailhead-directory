import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OverviewScreen from "./screens/OverviewScreen";
import TrailsScreen from "./screens/TrailsScreen";
import TrailDetailScreen from "./screens/TrailDetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Overview"
          screenOptions={{
            headerStyle: { backgroundColor: "#1f3d2b" },
            headerTintColor: "white",
            contentStyle: { backgroundColor: "#f4efe6" },
          }}
        >
          <Stack.Screen
            name="Overview"
            component={OverviewScreen}
            options={{
              title: "Utah Trail Areas",
            }}
          />
          <Stack.Screen name="Trails" component={TrailsScreen} />
          <Stack.Screen name="TrailDetail" component={TrailDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f3d2b",
  },
});
