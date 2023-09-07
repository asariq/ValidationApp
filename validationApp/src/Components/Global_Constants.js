import {Dimensions, Platform} from 'react-native';

export const {height: windowHeight, width: windowWidth} =
  Dimensions.get('window');

export const baseUrl = 'https://wrappedinmusic.webbersunited.com:3001/api';

export const regx = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

export const namePattern = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;

export const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

export const phonePattern =
  /^[789]\d{9}$/;

export const passwordPattern =
/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

export const otpPattern = /^[0-9]{6,6}$/;

export const isIos = () => {
  return Platform.OS === 'ios';
};
