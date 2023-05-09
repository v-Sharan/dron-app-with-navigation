import { useState, useEffect } from "react";
import { ScrollView, View, Text } from "react-native";
import { OptionSelect, Footer } from "../src";
import { StatusBar } from "expo-status-bar";
import { Stack, useRouter } from "expo-router";
import * as LocalAuthentication from "expo-local-authentication";
import * as Location from "expo-location";
import * as SMS from "expo-sms";

import { useDispatch } from "react-redux";
import { setDistination, setType } from "../src/store/slice/locationSclice";

import { fireRemoveBg, CarCrash, Cardiac, Epilepsy, hara, snake } from "../src";
import { FlatList } from "react-native-gesture-handler";

const types = [
  { type: "Fire", key: 1, img: fireRemoveBg },
  { type: "Road Accident", key: 2, img: CarCrash },
  { type: "Cardiac Arrest", key: 3, img: Cardiac },
  { type: "Epilepsy", key: 4, img: Epilepsy },
  { type: "Harassment", key: 5, img: hara },
  { type: "Snake Bite", key: 6, img: snake },
];

export default function Page() {
  const [location, setLocation] = useState();
  const [error, setError] = useState("");
  let tempType = "";

  const router = useRouter();
  const dispatch = useDispatch();

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setError("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
    dispatch(
      setDistination({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
    );
  };

  const sendSms = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync(
        "6382758504",
        `location for Harassment latitude:${location.latitude} longitude:${location.longitude}`
      );
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  async function authenticate() {
    const result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      if (tempType === "Harassment") {
        sendSms();
      }
      setTimeout(() => {
        router.push("/map");
      }, 500);
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: () => (
            <Text style={{ fontSize: 30 }}>Flying Escort</Text>
          ),
        }}
      />
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FlatList
          data={types}
          renderItem={({ item }) => (
            <View
              style={{
                marginVertical: 10,
                padding: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <OptionSelect
                title={item.type}
                onPressHandle={() => {
                  dispatch(setType(item.type));
                  tempType = item.type;
                  authenticate();
                }}
                imgUrl={item.img}
                dimesion={100}
              />
            </View>
          )}
          estimatedItemSize={200}
          numColumns={2}
        />
      </View>
      <StatusBar style="light" backgroundColor="black" />
      <Footer />
    </ScrollView>
  );
}
