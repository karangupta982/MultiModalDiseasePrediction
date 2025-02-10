import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  // user: null,
  // loading: false,
  heartDiseaseData:null,

}

const heartDiseaseSlice = createSlice({
  name: "heartDisease",
  initialState: initialState,
  reducers: {
    setHeartDisease(state, value) {
      state.heartDiseaseData = value.payload
    },
    // setLoading(state, value) {
    //   state.loading = value.payload
    // },
  },
})

export const { setHeartDisease } = heartDiseaseSlice.actions

export default heartDiseaseSlice.reducer
