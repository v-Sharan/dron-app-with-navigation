import { Stack } from "expo-router";
import { Provider } from "react-redux";
import Store from "../src/store/store";

export default () => {
  return (
    <Provider store={Store}>
      <Stack />
    </Provider>
  );
};
