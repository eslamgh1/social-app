import { createSlice } from '@reduxjs/toolkit'

//1st- create Type
 type InitialStateType={
  token: string| null ;

};

//2nd- Assign type to varibale
const initialState : InitialStateType = {
  token: null,
}

const authSlice = createSlice({
  name: 'auth',

  // this property could take type in same step
  // initialState : initialState
  initialState,

  reducers: {
    clearUserData: function(prevState){
      prevState.token =null;
    },

    setUserToken: function(state,action){
      state.token= action.payload;
    }

  }
})

export default authSlice.reducer

export const { clearUserData ,setUserToken} = authSlice.actions