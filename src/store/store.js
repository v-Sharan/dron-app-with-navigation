import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./slice/locationSclice";

export default configureStore({
  reducer: {
    location: locationReducer,
  },
});
