import { View, Text, Modal, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Message = ({ message, setMessage }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={message}
      onRequestClose={() => {
        setMessage(!message);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>{message}</Text>
          <TouchableOpacity onPress={() => setMessage("")}>
            <Text>Close</Text>
          </TouchableOpacity>
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

export default Message;
