import React, {useState} from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import axios from 'axios';

import {SubmitButton, InputBox} from '../Components/UsableComponents';
import {
  windowHeight,
  baseUrl,
  otpPattern,
  emailPattern,
  isIos,
} from '../Components/Global_Constants';

const OtpPage = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    otp: false,
  });

  const submit = async () => {
    if (!emailPattern.test(email) || email === '') {
      setErrors(prevState => ({
        ...prevState,
        email: true,
      }));
    } else if (!otpPattern.test(password) || password === '') {
      setErrors(prevState => ({
        ...prevState,
        otp: true,
      }));
    } else {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${baseUrl}/frontend/users/otp-verification`,
          {
            email,
            otp: password,
          },
        );
        if (response?.data?.success === 1) {
          setIsLoading(false);
          setEmail('');
          setPassword('');
          navigation.navigate('Login');
        } else {
          setIsLoading(false);
          alert(JSON.stringify(response?.data?.msg));
        }
      } catch (error) {
        setIsLoading(false);
        alert('Error occured-please enter valid otp');
      }
    }
  };

  const resetOtp = async () => {
    if (!emailPattern.test(email) || email === '') {
      alert('please enter valid email to resend');
      setErrors(prevState => ({
        ...prevState,
        email: true,
      }));
    } else {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${baseUrl}/frontend/users/resent-otp`,
          {
            email,
          },
        );
        if (response?.data?.success === 1) {
          setIsLoading(false);
          alert('Otp sent please check mail');
        } else {
          setIsLoading(false);
          alert(JSON.stringify(response?.data?.msg));
        }
      } catch (error) {
        setIsLoading(false);
        alert('Error occured');
      }
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <>
          <Text style={styles.text}>Otp Page</Text>
          <InputBox
            title={'Email'}
            value={email}
            setValue={text => {
              setEmail(text),
                setErrors(prevState => ({
                  ...prevState,
                  email: !emailPattern.test(text),
                }));
            }}
            keyboardType={'email-address'}
            placeholder={'eg:abc@gmail.com'}
            onBlur={() => {
              setErrors(prevState => ({
                ...prevState,
                email: !emailPattern.test(email) || email === '',
              }));
            }}
          />
          {errors?.email && (
            <Text style={styles.errorText}>please enter valid email</Text>
          )}
          <InputBox
            title={'Otp'}
            value={password}
            setValue={text => {
              setPassword(text),
                setErrors(prevState => ({
                  ...prevState,
                  otp: !otpPattern.test(text),
                }));
            }}
            keyboardType="numeric"
            placeholder={'Enter one time otp'}
            onBlur={() => {
              setErrors(prevState => ({
                ...prevState,
                otp: !otpPattern.test(password) || password === '',
              }));
            }}
          />
          {errors?.otp && (
            <Text style={styles.errorText}>please enter 6 digits</Text>
          )}
          <SubmitButton title={'validate email'} onPress={submit} />
          <Text style={styles.textAlready}>Did not got otp ?</Text>
          <SubmitButton
            title={'Resend Otp'}
            onPress={() => {
              resetOtp();
            }}
          />
        </>
      )}
    </View>
  );
};

export default OtpPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgb(0, 255, 230)',
    paddingTop: isIos() ? windowHeight * 0.3 : windowHeight * 0.2,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  textAlready: {
    fontSize: 18,
    fontWeight: '400',
    color: 'white',
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
});
