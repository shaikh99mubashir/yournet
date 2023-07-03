import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  cart: any[];
  contact: any[];
  trackComplaint: any[];
  companyData: any;
  notification: any[];
  userNickName: any;
  deviceToken: any;
  whoWeAre: any;
  termAndCondition: any;
  faqs: any[];
  packagesPlans: any;
}

const initialState: UserState = {
  cart: [],
  contact: [],
  trackComplaint: [],
  companyData: '',
  notification: [],
  userNickName: '',
  deviceToken: '',
  whoWeAre: '',
  termAndCondition: '',
  faqs: [],
  packagesPlans: '',
};

export const userSlice: any = createSlice({
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
    companyName: (state, action: PayloadAction<any>) => {
      state.companyData = action.payload;
      // console.log(action.payload, ' : companyName Data Updated in Redux');
    },
    nickname: (state, action: PayloadAction<any[]>) => {
      state.userNickName = action.payload;
      // console.log(action.payload, ' : nickname Updated in Redux');
    },
    pushNotification: (state, action: PayloadAction<any[]>) => {
      state.notification = action.payload;
      // console.log(action.payload, ' : pushNotification Updated in Redux');
    },
    deviceToken: (state, action: PayloadAction<any[]>) => {
      state.deviceToken = action.payload;
      // console.log(action.payload, ' : deviceToken Updated in Redux');
    },
    whoWeAre: (state, action: PayloadAction<any[]>) => {
      state.whoWeAre = action.payload;
      // console.log(action.payload, ' : whoWeAre Updated in Redux');
    },
    termAndCondition: (state, action: PayloadAction<any[]>) => {
      state.termAndCondition = action.payload;
      // console.log(action.payload, ' : termAndCondition Updated in Redux');
    },
    faqsData: (state, action: PayloadAction<any[]>) => {
      state.faqs = action.payload;
      // console.log(action.payload, ' : faqs Updated in Redux');
    },
    packagesPlans: (state, action: PayloadAction<any[]>) => {
      state.packagesPlans = action.payload;
      // console.log(action.payload, ' : packagesPlans Updated in Redux');
    },
    logout: () => {
      return initialState; // Reset the state to the initial state
    },
  },
});

export const {
  addToCart,
  contactData,
  trackComplaint,
  companyName,
  logout,
  nickname,
  pushNotification,
  deviceToken,
  whoWeAre,
  termAndCondition,
  faqsData,
  packagesPlans,
} = userSlice.actions;

export const selectUser = (state: {user: UserState}) => state.user.cart;
export const selectContact = (state: {user: UserState}) => state.user.contact;
export const selectTrackComplaint = (state: {user: UserState}) =>
  state.user.trackComplaint;
export const selectCompanyName = (state: {user: UserState}) =>
  state.user.companyData;
export const selectNickName = (state: {user: UserState}) =>
  state.user.userNickName;
export const selectNotification = (state: {user: UserState}) =>
  state.user.notification;
export const selectDeviceToken = (state: {user: UserState}) =>
  state.user.deviceToken;
export const selectWhoWeAre = (state: {user: UserState}) => state.user.whoWeAre;
export const selectTermAndCondition = (state: {user: UserState}) =>
  state.user.termAndCondition;
export const selectFaqs = (state: {user: UserState}) => state.user.faqs;
export const selectPackagesPlans = (state: {user: UserState}) => state.user.packagesPlans;

export default userSlice.reducer;
