import React from "react";
import { View, FlatList } from "react-native";
import { Tile } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
  };
};

const Menu = (props) => {
  const { navigate } = props.navigation;

  const renderMenuItem = ({ item, index }) => {
    return (
      <Tile
        key={index}
        title={item.name}
        caption={item.description}
        featured
        imageSrc={{ uri: baseUrl + item.image }}
        onPress={() => navigate("Dishdetail", { dishId: item.id })}
      />
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
