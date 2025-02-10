import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  // user: null,
  // loading: false,
  diabetesData:null,
}

const diabetesSlice = createSlice({
  name: "diabetes",
  initialState: initialState,
  reducers: {
    setDiabetes(state, value) {
      state.diabetesData = value.payload
    },
    // setLoading(state, value) {
    //   state.loading = value.payload
    // },
  },
})

export const { setDiabetes } = diabetesSlice.actions

export default diabetesSlice.reducer
