import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerToggleButton,
} from "@react-navigation/drawer";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import OverviewScreen from "./screens/OverviewScreen";
import TrailsScreen from "./screens/TrailsScreen";
import TrailDetailScreen from "./screens/TrailDetailScreen";
import SavedScreen from "./screens/SavedScreen";
import AboutScreen from "./screens/AboutScreen";
import SavedContextProvider from "./store/SavedContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function ExploreStack() {
  return (
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
          headerLeft: () => <DrawerToggleButton tintColor="white" />,
        }}
      />
      <Stack.Screen name="Trails" component={TrailsScreen} />
      <Stack.Screen name="TrailDetail" component={TrailDetailScreen} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#1f3d2b" },
        headerTintColor: "white",
        sceneStyle: { backgroundColor: "#f4efe6" },
        tabBarStyle: { backgroundColor: "#1f3d2b" },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#8fae98",
      }}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreStack}
        options={{
          headerShown: false,
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          title: "Saved",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#1f3d2b" },
        headerTintColor: "white",
        sceneStyle: { backgroundColor: "#f4efe6" },
        drawerStyle: { backgroundColor: "#1f3d2b" },
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: "#8fae98",
        drawerActiveBackgroundColor: "#2e5a40",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          headerShown: false,
          title: "Trails",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="trail-sign" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: "About",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="information-circle" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SavedContextProvider>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </SavedContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f3d2b",
  },
});
