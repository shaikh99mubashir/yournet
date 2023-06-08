import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  cart: any[];
  contact:any[];
  trackComplaint:any[];
  companyData:any[];
  userNickName:any ;
}

const initialState: UserState = {
  cart: [],
  contact:[],
  trackComplaint:[],
  companyData:[],
  userNickName:'',
}; 

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<any[]>) => {
      state.cart = action.payload;
      // console.log(action.payload, ' : Cart Data Updated in Redux');
    },
    contactData: (state, action: PayloadAction<any[]>) => {
      state.contact = action.payload;
      // console.log(action.payload, ' : Contact Data Updated in Redux');
    },
    trackComplaint: (state, action: PayloadAction<any[]>) => {
      state.trackComplaint = action.payload;
      // console.log(action.payload, ' : Track complaint Data Updated in Redux');
    },
    companyName: (state, action: PayloadAction<any[]>) => {
      state.companyData = action.payload;
      // console.log(action.payload, ' : companyName Data Updated in Redux');
    },
    nickname: (state, action: PayloadAction<any[]>) => {
      state.userNickName = action.payload;
      console.log(action.payload, ' : nickname Updated in Redux');
    },
    logout: () => {
      return initialState; // Reset the state to the initial state
    },
   
  },
});


export const {addToCart,contactData,trackComplaint,companyName,logout,nickname} = userSlice.actions;

export const selectUser = (state: {user: UserState}) => state.user.cart;
export const selectContact = (state: {user: UserState}) => state.user.contact;
export const selectTrackComplaint = (state: {user: UserState}) => state.user.trackComplaint;
export const selectCompanyName = (state: {user: UserState}) => state.user.companyData;
export const selectNickName = (state: {user: UserState}) => state.user.userNickName;

export default userSlice.reducer;
