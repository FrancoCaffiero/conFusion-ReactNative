import React from "react";
import { View, Text, FlatList } from "react-native";
import { Card, ListItem } from "react-native-elements";
import { LEADERS } from "../shared/leaders";
import { createStackNavigator } from "@react-navigation/stack";

const About = (props) => {
  const [leaders, setLeaders] = React.useState(LEADERS);

  const renderLeader = ({ item, index }) => {
    return (
      <ListItem
        key={index}
        title={item.name}
        subtitle={item.description}
        hideChevron={true}
        leftAvatar={{ source: require("./images/alberto.png") }}
      />
    );
  };

  const History = () => {
    return (
      <Card title="Our History">
        <Text style={{ margin: 10 }}>
          Started in 2010, Ristorante con Fusion quickly established itself as a
          culinary icon par excellence in Hong Kong. With its unique brand of
          world fusion cuisine that can be found nowhere else, it enjoys
          patronage from the A-list clientele in Hong Kong. Featuring four of
          the best three-star Michelin chefs in the world, you never know what
          will arrive on your plate the next time you visit us.
        </Text>
        <Text style={{ margin: 10 }}>
          The restaurant traces its humble beginnings to The Frying Pan, a
          successful chain started by our CEO, Mr. Peter Pan, that featured for
          the first time the world's best cuisines in a pan.
        </Text>
      </Card>
    );
  };

  return (
    <View>
      <History />
      <Card title="Corporate Leadership">
        <FlatList
          data={leaders}
          renderItem={renderLeader}
          keyExtractor={(leader) => leader.id.toString()}
        />
      </Card>
    </View>
  );
};

export default About;
