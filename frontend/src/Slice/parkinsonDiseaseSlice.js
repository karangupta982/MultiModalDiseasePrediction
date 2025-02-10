import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  // user: null,
  // loading: false,
  parkinsonDiseaseData:null,

};

const parkinsonDiseaseSlice = createSlice({
  name: "parkinsonDisease",
  initialState: initialState,
  reducers: {
    setParkinsonDisease(state, value) {
      state.parkinsonDiseaseData = value.payload
    },
    // setLoading(state, value) {
    //   state.loading = value.payload
    // },
  },
})

export const { setParkinsonDisease } = parkinsonDiseaseSlice.actions

export default parkinsonDiseaseSlice.reducer