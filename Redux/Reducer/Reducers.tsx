import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  cart: any[];
  contact:any[];
  trackComplaint:any[];
  companyData:any[];
  notification:any[];
  userNickName:any ;
  deviceToken:any
}

const initialState: UserState = {
  cart: [],
  contact:[],
  trackComplaint:[],
  companyData:[],
  notification:[],
  userNickName:'',
  deviceToken:'',
}; 

export const userSlice : any = createSlice({
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
      // console.log(action.payload, ' : nickname Updated in Redux');
    },
    pushNotification: (state, action: PayloadAction<any[]>) => {
      state.notification = action.payload;
      // console.log(action.payload, ' : nickname Updated in Redux');
    },
    deviceToken: (state, action: PayloadAction<any[]>) => {
      state.deviceToken = action.payload;
      // console.log(action.payload, ' : deviceToken Updated in Redux');
    },
    logout: () => {
      return initialState; // Reset the state to the initial state
    },
   
  },
});


export const {addToCart,contactData,trackComplaint,companyName,logout,nickname,pushNotification,deviceToken} = userSlice.actions;

export const selectUser = (state: {user: UserState}) => state.user.cart;
export const selectContact = (state: {user: UserState}) => state.user.contact;
export const selectTrackComplaint = (state: {user: UserState}) => state.user.trackComplaint;
export const selectCompanyName = (state: {user: UserState}) => state.user.companyData;
export const selectNickName = (state: {user: UserState}) => state.user.userNickName;
export const selectNotification = (state: {user: UserState}) => state.user.notification;
export const selectDeviceToken = (state: {user: UserState}) => state.user.deviceToken;

export default userSlice.reducer;
