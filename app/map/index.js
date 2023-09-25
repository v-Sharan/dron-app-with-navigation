import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import {
  selectDistination,
  selectType,
} from "../../src/store/slice/locationSclice";

import axios from "axios";
import Message from "../../src/components/Message";

const Map = () => {
  const [loading, setLoading] = useState(false);
  const location = useSelector(selectDistination);
  const type = useSelector(selectType);

  console.log(location);

  const sendLocation = (type) => {
    setLoading(true);
    axios
      .post("https://madical-uav.onrender.com/api/medicaluav", {
        ...location,
        type,
      })
      .then((res) => {
        Alert.alert(res.data.message);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          height: "85%",
        }}
      >
        <MapView
          style={{
            width: "100%",
            height: "100%",
          }}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.005,
            }}
            title="Marker"
          />
        </MapView>
      </View>
      <View style={{ marginVertical: 20, alignItems: "center" }}>
        <TouchableOpacity
          style={{
            backgroundColor: "black",
            borderRadius: 10,
            padding: 10,
            width: "70%",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            sendLocation(type);
          }}
        >
          <Text
            style={{
              textAlign: "center",
              padding: 10,
              fontSize: 20,
              color: "white",
            }}
          >
            Confirm Location
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Map;
