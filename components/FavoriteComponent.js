import React from "react";
import { View, FlatList, Text, Alert } from "react-native";
import { Tile, ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";
import Swipeout from "react-native-swipeout";
import { deleteFavorite } from "../redux/ActionCreators";
import * as Animatable from "react-native-animatable";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId)),
});

const Favorites = (props) => {
  const { navigate } = props.navigation;
  const renderMenuItem = ({ item, index }) => {
    const rightButton = [
      {
        text: "Delete",
        type: "delete",
        onPress: () => {
          Alert.alert(
            "Delete Favorite",
            "Are you sure you wish to delete the favorite dish " +
              item.name +
              "?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Not deleted"),
                style: "cancel",
              },
              {
                text: "OK",
                onPress: () => props.deleteFavorite(item.id),
              },
            ],
            {
              cancelable: false,
            }
          );
        },
      },
    ];
    return (
      <Swipeout right={rightButton} autoClose={true}>
        <Animatable.View animation="fadeInRightBig" duration={2000}>
          <ListItem
            key={index}
            title={item.name}
            subtitle={item.description}
            hideChavron={true}
            onPress={() => navigate("Dishdetail", { dishId: item.id })}
            leftAvatar={{ source: { uri: baseUrl + item.image } }}
          />
        </Animatable.View>
      </Swipeout>
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

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
