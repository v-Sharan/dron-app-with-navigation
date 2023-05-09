import { ActivityIndicator } from "react-native";
import { View, Text, Modal, StyleSheet } from "react-native";

const Loading = ({ loading }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={loading}
      onRequestClose={() => {
        setLoading(!loading);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ActivityIndicator size={"large"} color={"#00ff00"} />
          <Text>Loading..</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Loading;
