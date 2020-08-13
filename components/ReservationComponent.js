import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Picker,
  Switch,
  Button,
  Modal,
  Alert,
} from "react-native";
import { Card } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import * as Animatable from "react-native-animatable";

const Reservation = (props) => {
  const [guests, setGuests] = useState(1);
  const [smoking, setSmoking] = useState(false);
  const [date, setDate] = useState("");
  const [showModal, setShowModal] = useState(false);

  const resetForm = () => {
    setGuests(1);
    setSmoking(false);
    setDate("");
  };

  const handleReservation = () => {
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <ScrollView>
      <Animatable.View animation="zoomIn" duration={3000}>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Number of Guests: </Text>
          <Picker
            style={styles.formItem}
            selectedValue={guests}
            onValueChange={(itemValue, itemIndex) => {
              setGuests(itemValue);
            }}
          >
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
          </Picker>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Smoking?</Text>
          <Switch
            style={styles.formItem}
            value={smoking}
            trackColor="#512DA8"
            onValueChange={(value) => setSmoking(value)}
          ></Switch>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Date and Time: </Text>
          <DatePicker
            style={{ flex: 2, marginRight: 20 }}
            date={date}
            format=""
            mode="datetime"
            placeholder="Select Date and Time"
            minDate="2017-01-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={(date) => {
              setDate(date);
            }}
          ></DatePicker>
        </View>
        <View style={styles.formRow}>
          <Button
            title="Reserve"
            color="#512DA8"
            onPress={() =>
              Alert.alert(
                "Your Reservation OK?",
                `Number of guests: ${guests}
                \nSmoking? ${smoking ? "Yes" : "No"}
                \nDate and Time: ${date}`,
                [
                  {
                    text: "Cancel",
                    onPress: () => resetForm(),
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () => resetForm(),
                  },
                ],
                { cancelable: false }
              )
            }
          />
        </View>
      </Animatable.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  formLabel: {
    fontSize: 18,
    flex: 2,
  },
  formItem: {
    flex: 1,
  },
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

export default Reservation;
