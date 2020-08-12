import React from "react";
import { View, FlatList, Text } from "react-native";
import { Tile, ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    favorites: state.favorites,
  };
};

const Favorites = (props) => {
  const { navigate } = props.navigation;
  const renderMenuItem = ({ item, index }) => {
    return (
      <ListItem
        key={index}
        title={item.name}
        subtitle={item.description}
        hideChavron={true}
        onPress={() => navigate("Dishdetail", { dishId: item.id })}
        leftAvatar={{ source: { uri: baseUrl + item.image } }}
      />
    );
  };

  if (props.dishes.isLoading) {
    return <Loading />;
  } else if (props.dishes.errMes) {
    return (
      <View>
        <Text>{props.dishes.errMes}</Text>
      </View>
    );
  } else {
    return (
      <FlatList
        data={props.dishes.dishes.filter((dish) =>
          props.favorites.some((el) => el === dish.id)
        )}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
};

export default connect(mapStateToProps)(Favorites);
