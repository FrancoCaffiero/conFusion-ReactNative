import React from "react";
import { View, FlatList, Text, ScrollView } from "react-native";
import { Card, Icon } from "react-native-elements";
import Moment from "moment";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
});

const RenderComments = (props) => {
  Moment.locale("en");
  const comments = props.comments;
  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
        <Text style={{ fontSize: 12 }}>
          {"-- " + item.author + ", " + Moment(item.date).format("MMM DD yyyy")}
        </Text>
      </View>
    );
  };
  return (
    <Card title="Comments">
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={(item) => {
          item.id.toString();
        }}
      />
    </Card>
  );
};

const RenderDish = (props) => {
  const dish = props.dish;

  if (dish == null) {
    return <View />;
  } else {
    return (
      <Card
        featuredTitle={dish.name}
        image={require("./images/uthappizza.png")}
      >
        <Text style={{ margin: 10 }}>{dish.description}</Text>
        <Icon
          raised
          reverse
          name={props.favorite ? "heart" : "heart-o"}
          type="font-awesome"
          color="#f50"
          onPress={
            props.favorite ? console.log("Already favorite") : props.onPress
          }
        />
      </Card>
    );
  }
};

const Dishdetail = (props) => {
  const dishId = props.route.params.dishId;
  const markFavorite = (dishId) => {
    props.postFavorite(dishId);
  };

  return (
    <ScrollView>
      <RenderDish
        dish={props.dishes.dishes[+dishId]}
        favorite={props.favorites.some((el) => el === dishId)}
        onPress={() => markFavorite(dishId)}
      />
      <RenderComments
        comments={props.comments.comments.filter(
          (comment) => comment.dishId === dishId
        )}
      />
    </ScrollView>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
