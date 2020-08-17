import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
import { Icon, Input, CheckBox, Button } from "react-native-elements";
import * as SecureStore from "expo-secure-store";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { Asset } from "expo-asset";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { baseUrl } from "../shared/baseUrl";

const LoginTab = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    SecureStore.getItemAsync("userInfo").then((userdata) => {
      let userinfo = JSON.parse(userdata);
      if (userinfo) {
        setUsername(userinfo.username);
        setPassword(userinfo.password);
        setRemember(true);
      }
    });
  }, []);

  const handleLogin = () => {
    console.log(username);
    if (remember) {
      SecureStore.setItemAsync(
        "userInfo",
        JSON.stringify({ username: username, password: password })
      ).catch((error) => console.log(error));
    } else {
      SecureStore.deleteItemAsync("userInfo").catch((error) =>
        console.log(error)
      );
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Username"
        leftIcon={{ type: "font-awesome", name: "user-o" }}
        onChangeText={(username) => setUsername(username)}
        value={username}
        containerStyle={styles.formInput}
      />
      <Input
        placeholder="Password"
        leftIcon={{ type: "font-awesome", name: "key" }}
        onChangeText={(password) => setPassword(password)}
        value={password}
        containerStyle={styles.formInput}
      />
      <CheckBox
        title="Remember me?"
        checked={remember}
        center
        onPress={() => setRemember(!remember)}
        containerStyle={styles.formCheckbox}
      />
      <View style={styles.formButton}>
        <Button
          onPress={() => handleLogin()}
          title="Login"
          color="#512DA8"
          icon={
            <Icon name="sign-in" type="font-awesome" color="white" size={24} />
          }
          buttonStyle={{ backgroundColor: "#512DA8" }}
        />
      </View>
      <View style={styles.formButton}>
        <Button
          onPress={() => props.navigation.navigate("Register")}
          title="Register"
          color="#512DA8"
          clear
          icon={
            <Icon name="user-plus" type="font-awesome" color="blue" size={24} />
          }
          titleStyle={{ color: "blue" }}
        />
      </View>
    </View>
  );
};

const RegisterTab = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [remember, setRemember] = useState(false);
  const [imageUrl, setImageUrl] = useState(baseUrl + "images/logo.png");

  const getImageFromCamera = async () => {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (
      cameraPermission.status === "granted" &&
      cameraRollPermission.status === "granted"
    ) {
      let capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (!capturedImage.cancelled) {
        processImage(capturedImage.uri);
      }
    }
  };

  const processImage = async (imageUri) => {
    let porecessedImage = await ImageManipulator.manipulateAsync(
      imageUri,
      [{ resize: { width: 400 } }],
      { format: "png" }
    );
    setImageUrl(porecessedImage.uri);
  };

  const handleRegister = () => {
    console.log(JSON.stringify(email));
    if (remember) {
      SecureStore.setItemAsync(
        "userInfo",
        JSON.stringify({ username: username, password: password })
      ).catch((error) => console.log(error));
    }
  };

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          loadingIndicatorSource={require("./images/logo.png")}
          style={styles.image}
        />
        <Button title="Camera" onPress={getImageFromCamera} />
      </View>
      <View style={styles.container}>
        <Input
          placeholder="Username"
          leftIcon={{ type: "font-awesome", name: "user-o" }}
          onChangeText={(username) => setUsername(username)}
          value={username}
          containerStyle={styles.formInput}
        />
        <Input
          placeholder="Password"
          leftIcon={{ type: "font-awesome", name: "key" }}
          onChangeText={(password) => setPassword(password)}
          value={password}
          containerStyle={styles.formInput}
        />
        <Input
          placeholder="First Name"
          leftIcon={{ type: "font-awesome", name: "user-o" }}
          onChangeText={(firstname) => setFirstName(firstname)}
          value={firstName}
          containerStyle={styles.formInput}
        />
        <Input
          placeholder="Last Name"
          leftIcon={{ type: "font-awesome", name: "user-o" }}
          onChangeText={(lastname) => setLastName(lastname)}
          value={lastName}
          containerStyle={styles.formInput}
        />
        <Input
          placeholder="Email"
          leftIcon={{ type: "font-awesome", name: "envelope-o" }}
          onChangeText={(email) => setEmail(email)}
          value={email}
          containerStyle={styles.formInput}
        />
        <CheckBox
          title="Remember me?"
          checked={remember}
          center
          onPress={() => setRemember(!remember)}
          containerStyle={styles.formCheckbox}
        />
        <View style={styles.formButton}>
          <Button
            onPress={() => handleRegister()}
            title="Register"
            color="#512DA8"
            icon={
              <Icon
                name="user-plus"
                type="font-awesome"
                color="white"
                size={24}
              />
            }
            buttonStyle={{ backgroundColor: "#512DA8" }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const Tab = createBottomTabNavigator();
const Login = (props) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: "#9575CD",
        inactiveBackgroundColor: "#D1C4E9",
        activeTintColor: "white",
        inactiveTintColor: "grey",
      }}
    >
      <Tab.Screen
        name="Login"
        component={LoginTab}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="sign-in"
              type="font-awesome"
              size={24}
              iconStyle={{ color: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Register"
        component={RegisterTab}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="user-plus"
              type="font-awesome"
              size={24}
              iconStyle={{ color: color }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    margin: 20,
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  image: {
    margin: 10,
    width: 80,
    height: 60,
  },
  formInput: {
    margin: 20,
  },
  formCheckbox: {
    margin: 20,
    backgroundColor: null,
  },
  formButton: {
    margin: 60,
  },
});

export default Login;
