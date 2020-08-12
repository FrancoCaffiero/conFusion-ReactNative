import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  Modal,
  Alert,
  PanResponder,
} from "react-native";
import { Card, Icon, Rating, Input } from "react-native-elements";
import Moment from "moment";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite, postComment } from "../redux/ActionCreators";
import * as Animatable from "react-native-animatable";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, comment, author) =>
    dispatch(postComment(dishId, rating, comment, author)),
});

const RenderComments = (props) => {
  Moment.locale("en");
  const comments = props.comments;
  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Rating
          style={{ alignSelf: "flex-start", marginTop: 8, marginBottom: 8 }}
          ratingCount={5}
          startingValue={item.rating}
          imageSize={15}
          readonly
        />
        <Text style={{ fontSize: 12 }}>
          {"-- " + item.author + ", " + Moment(item.date).format("MMM DD yyyy")}
        </Text>
      </View>
    );
  };
  return (
    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
      <Card title="Comments">
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={(item) => {
            item.id.toString();
          }}
        />
      </Card>
    </Animatable.View>
  );
};

const RenderDish = (props) => {
  const dish = props.dish;

  const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
    if (dx < -200) {
      return true;
    } else {
      return false;
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => {
      return true;
    },
    onPanResponderEnd: (e, gestureState) => {
      if (recognizeDrag(gestureState)) {
        Alert.alert(
          "Add to Favorites?",
          "Are you sure you wish to add " + dish.name + " to your favorites?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("cancel pressed"),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: props.favorite
                ? console.log("Already favorite")
                : props.markFavorite,
            },
          ],
          { cancelable: false }
        );
      }
      return true;
    },
  });

  if (dish == null) {
    return <View />;
  } else {
    return (
      <Animatable.View
        animation="fadeInDown"
        duration={2000}
        delay={1000}
        {...panResponder.panHandlers}
      >
        <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
          <Text style={{ margin: 10 }}>{dish.description}</Text>
          <Icon
            raised
            reverse
            name={props.favorite ? "heart" : "heart-o"}
            type="font-awesome"
            color="#f50"
            onPress={
              props.favorite
                ? console.log("Already favorite")
                : props.markFavorite
            }
          />
          <Icon
            raised
            reverse
            name="pencil"
            type="font-awesome"
            color="#512DA8"
            onPress={() => props.toggleModal()}
          />
        </Card>
      </Animatable.View>
    );
  }
};

const Dishdetail = (props) => {
  const dishId = props.route.params.dishId;
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState();

  const markFavorite = (dishId) => {
    props.postFavorite(dishId);
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const resetModal = () => {
    setComment();
  };
  const submitComment = (dishId) => {
    props.postComment({ ...comment, dishId: dishId });
    toggleModal();
    resetModal();
  };

  return (
    <ScrollView>
      <RenderDish
        dish={props.dishes.dishes[+dishId]}
        favorite={props.favorites.some((el) => el === dishId)}
        markFavorite={() => markFavorite(dishId)}
        toggleModal={() => toggleModal()}
      />
      <RenderComments
        comments={props.comments.comments.filter(
          (comment) => comment.dishId === dishId
        )}
      />
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={showModal}
        onDismiss={() => {
          toggleModal();
          resetModal();
        }}
        onRequestClose={() => {
          toggleModal();
          resetModal();
        }}
      >
        <View style={styles.modal}>
          <View>
            <Rating
              showRating
              ratingCount={5}
              onFinishRating={(rating) =>
                setComment({ ...comment, rating: rating })
              }
            />
            <Input
              placeholder="Author"
              leftIcon={{ type: "font-awesome", name: "user-o" }}
              onChangeText={(value) =>
                setComment({ ...comment, author: value })
              }
            />
            <Input
              placeholder="Comment"
              leftIcon={{ type: "font-awesome", name: "comment-o" }}
              onChangeText={(value) =>
                setComment({ ...comment, message: value })
              }
            />
          </View>
          <View>
            <Button
              onPress={() => submitComment(dishId)}
              color="#512DA8"
              title="Submit"
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Button
              onPress={() => {
                toggleModal();
                resetModal();
              }}
              color="grey"
              title="Cancel"
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#512DA8",
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
