import React from "react";
import { View, FlatList, Text } from "react-native";
import { Card } from "react-native-elements";
import { DISHES } from "../shared/dishes";

const RenderDish = (props) => {
  const dish = props.dish;

  if (dish == null) {
    return <View />;
  } else {
    return (
      <Card featuredTitle={dish.name}>
        <Text style={{ margin: 10 }}>{dish.description}</Text>
      </Card>
    );
  }
};

const Dishdetail = (props) => {
  const [dishes, setDishes] = React.useState(DISHES);

  const dishId = props.route.params.dishId;

  const dish = dishes[+dishId];

  return <RenderDish dish={dish} />;
};

export default Dishdetail;
