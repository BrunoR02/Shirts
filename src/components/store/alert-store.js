import { createSlice, configureStore} from "@reduxjs/toolkit"

const initialState = {
  type: "",
  text: "",
  alertOn: false,
}

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers:{
    createAlert(state, action){
      state.type = action.payload.type
      state.text = action.payload.text
      state.alertOn = true
    },
    closeAlert(state){
      state.alertOn = false
      state.type = ""
      state.text = ""
    }
  }
})

const store = configureStore({
  reducer: alertSlice.reducer
})

export const actions = alertSlice.actions

export default store