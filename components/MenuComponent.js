import React from "react";
import { View, FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { DISHES } from "../shared/dishes";

const Menu = (props) => {
  const [dishes, setDishes] = React.useState(DISHES);

  const { navigate } = props.navigation;

  const renderMenuItem = ({ item, index }) => {
    return (
      <ListItem
        key={index}
        title={item.name}
        subtitle={item.description}
        hideChevron={true}
        leftAvatar={{ source: require("./images/uthappizza.png") }}
        onPress={() => navigate("Dishdetail", { dishId: item.id })}
      />
    );
  };

  return (
    <FlatList
      data={dishes}
      renderItem={renderMenuItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default Menu;
