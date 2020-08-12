import React, { useState, useEffect } from "react";
import { View, Text, Animated, Easing } from "react-native";
import { Card } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

const RenderItem = (props) => {
  const item = props.item;
  if (props.isLoading) {
    return <Loading />;
  } else if (props.errMess) {
    return <Text>{props.errMess}</Text>;
  } else {
    if (item != null) {
      return (
        <Card
          featuredTitle={item.name}
          featuredSubtitle={item.designation}
          image={{ uri: baseUrl + item.image }}
        >
          <Text style={{ margin: 10 }}>{item.description}</Text>
        </Card>
      );
    } else {
      return <View></View>;
    }
  }
};

const Home = (props) => {
  const animatedValue = new Animated.Value(0);
  const animate = () => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 8,
      duration: 8000,
      easing: Easing.linear,
    }).start(() => animate());
  };
  useEffect(() => animate(), []);
  const xpos1 = animatedValue.interpolate({
    inputRange: [0, 1, 3, 5, 8],
    outputRange: [1200, 600, 0, -600, -1200],
  });
  const xpos2 = animatedValue.interpolate({
    inputRange: [0, 2, 4, 6, 8],
    outputRange: [1200, 600, 0, -600, -1200],
  });
  const xpos3 = animatedValue.interpolate({
    inputRange: [0, 3, 5, 7, 8],
    outputRange: [1200, 600, 0, -600, -1200],
  });
  return (
    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
      <Animated.View
        style={{ width: "100%", transform: [{ translateX: xpos1 }] }}
      >
        <RenderItem
          item={props.dishes.dishes.filter((dish) => dish.featured)[0]}
          isLoading={props.dishes.isLoading}
          errMess={props.dishes.errMess}
        />
      </Animated.View>
      <Animated.View
        style={{ width: "100%", transform: [{ translateX: xpos2 }] }}
      >
        <RenderItem
          item={props.promotions.promos.filter((promo) => promo.featured)[0]}
          isLoading={props.promotions.isLoading}
          errMess={props.promotions.errMess}
        />
      </Animated.View>
      <Animated.View
        style={{ width: "100%", transform: [{ translateX: xpos3 }] }}
      >
        <RenderItem
          item={props.leaders.leaders.filter((leader) => leader.featured)[0]}
          isLoading={props.leaders.isLoading}
          errMess={props.leaders.errMess}
        />
      </Animated.View>
    </View>
  );
};

export default connect(mapStateToProps)(Home);
