import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  distination: {
    latitude: null,
    longitude: null,
  },
  travelTimeInformation: null,
  type: null,
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin.latitude = action.payload.latitude;
      state.origin.longitude = action.payload.longitude;
    },
    setDistination: (state, action) => {
      state.distination.latitude = action.payload.latitude;
      state.distination.longitude = action.payload.longitude;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const { setOrigin, setDistination, setTravelTimeInformation, setType } =
  locationSlice.actions;

export const selectOrigin = (state) => state.location.origin;
export const selectDistination = (state) => state.location.distination;
export const selectType = (state) => state.location.type;
export const selectTravelTimeInformation = (state) =>
  state.location.travelTimeInformation;

export default locationSlice.reducer;
