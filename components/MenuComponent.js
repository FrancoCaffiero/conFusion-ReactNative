import React from "react";
import { View, FlatList, Text } from "react-native";
import { Tile } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";
import * as Animatable from "react-native-animatable";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
  };
};

const Menu = (props) => {
  const { navigate } = props.navigation;

  const renderMenuItem = ({ item, index }) => {
    return (
      <Animatable.View animation="fadeInRightBig" duration={2000} delay={1000}>
        <Tile
          key={index}
          title={item.name}
          caption={item.description}
          featured
          imageSrc={{ uri: baseUrl + item.image }}
          onPress={() => navigate("Dishdetail", { dishId: item.id })}
        />
      </Animatable.View>
    );
  };

  if (props.dishes.isLoading) {
    return <Loading />;
  } else if (props.dishes.errMess) {
    return <Text>{props.dishes.errMess}</Text>;
  } else {
    return (
      <FlatList
        data={props.dishes.dishes}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
};

export default connect(mapStateToProps)(Menu);
