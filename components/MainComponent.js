import React, { useEffect } from "react";
import { View, Platform, Image, StyleSheet, Text } from "react-native";
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Home from "./HomeComponent";
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import About from "./AboutComponent";
import Contact from "./ContactComponent";
import Reservation from "./ReservationComponent";
import { Icon } from "react-native-elements";
import {
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
} from "../redux/ActionCreators";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

const mapDispatchToProps = (dispatch) => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
});

const Stack = createStackNavigator();

const HomeNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
        headerLeft: () => (
          <Icon
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      }}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};
const MenuNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{
          headerStyle: {
            backgroundColor: "#512DA8",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            color: "#fff",
          },
          headerLeft: () => (
            <Icon
              name="menu"
              size={24}
              color="white"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Dishdetail"
        component={Dishdetail}
        options={{
          headerStyle: {
            backgroundColor: "#512DA8",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            color: "#fff",
          },
        }}
      />
    </Stack.Navigator>
  );
};
const AboutNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
        headerLeft: () => (
          <Icon
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      }}
    >
      <Stack.Screen name="About us" component={About} />
    </Stack.Navigator>
  );
};
const ContactNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
        headerLeft: () => (
          <Icon
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      }}
    >
      <Stack.Screen name="Contact us" component={Contact} />
    </Stack.Navigator>
  );
};
const ReservationNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
        headerLeft: () => (
          <Icon
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      }}
    >
      <Stack.Screen name="Reservation" component={Reservation} />
    </Stack.Navigator>
  );
};

const CustomDrawerContentComponent = (props) => (
  <DrawerContentScrollView {...props}>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: baseUrl + "/images/logo.png" }}
            style={styles.drawerImage}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>

      <DrawerItemList {...props}></DrawerItemList>
    </SafeAreaView>
  </DrawerContentScrollView>
);

const drawerNavStyle = {
  backgroundColor: "#D1C4E9",
};

const Drawer = createDrawerNavigator();

const Main = (props) => {
  useEffect(() => {
    props.fetchDishes();
    props.fetchComments();
    props.fetchPromos();
    props.fetchLeaders();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
      }}
    >
      <SafeAreaProvider>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Home"
            drawerStyle={drawerNavStyle}
            drawerContent={CustomDrawerContentComponent}
          >
            <Drawer.Screen
              name="Home"
              component={HomeNavigator}
              options={{
                drawerIcon: ({ color }) => (
                  <Icon
                    name="home"
                    type="font-awesome"
                    size={24}
                    color={color}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Menu"
              component={MenuNavigator}
              options={{
                drawerIcon: ({ color }) => (
                  <Icon
                    name="list"
                    type="font-awesome"
                    size={24}
                    color={color}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="About us"
              component={AboutNavigator}
              options={{
                drawerIcon: ({ color }) => (
                  <Icon
                    name="info-circle"
                    type="font-awesome"
                    size={24}
                    color={color}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Contact us"
              component={ContactNavigator}
              options={{
                drawerIcon: ({ color }) => (
                  <Icon
                    name="address-card"
                    type="font-awesome"
                    size={18}
                    color={color}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Reservation"
              component={ReservationNavigator}
              options={{
                drawerIcon: ({ color }) => (
                  <Icon
                    name="cutlery"
                    type="font-awesome"
                    size={24}
                    color={color}
                  />
                ),
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  drawerHeader: {
    backgroundColor: "#512DA8",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60,
  },
});

export default connect(null, mapDispatchToProps)(Main);
