import React from "react";
import { View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./HomeComponent";
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import About from "./AboutComponent";
import Contact from "./ContactComponent";

const stackNavOptions = {
  headerStyle: {
    backgroundColor: "#512DA8",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    color: "#fff",
  },
};

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={stackNavOptions}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};
const MenuNavigator = () => {
  return (
    <Stack.Navigator screenOptions={stackNavOptions}>
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="Dishdetail" component={Dishdetail} />
    </Stack.Navigator>
  );
};
const AboutNavigator = () => {
  return (
    <Stack.Navigator screenOptions={stackNavOptions}>
      <Stack.Screen name="About us" component={About} />
    </Stack.Navigator>
  );
};
const ContactNavigator = () => {
  return (
    <Stack.Navigator screenOptions={stackNavOptions}>
      <Stack.Screen name="Contact us" component={Contact} />
    </Stack.Navigator>
  );
};

const drawerNavOptions = {
  backgroundColor: "#D1C4E9",
};

const Drawer = createDrawerNavigator();

const Main = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
      }}
    >
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerStyle={drawerNavOptions}
        >
          <Drawer.Screen name="Home" component={HomeNavigator} />
          <Drawer.Screen name="Menu" component={MenuNavigator} />
          <Drawer.Screen name="About us" component={AboutNavigator} />
          <Drawer.Screen name="Contact us" component={ContactNavigator} />
        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default Main;
