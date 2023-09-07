import React, {useState} from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import axios from 'axios';
import {useDispatch} from 'react-redux';

import {SubmitButton, InputBox} from '../Components/UsableComponents';
import {
  windowHeight,
  baseUrl,
  emailPattern,
  passwordPattern,
} from '../Components/Global_Constants';
import {userInfo} from '../redux/slice';

const LoginPage = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const submit = async () => {
    if (!emailPattern.test(email) || email === '') {
      setErrors(prevState => ({
        ...prevState,
        email: true,
      }));
    } else if (!passwordPattern.test(password) || password === '') {
      setErrors(prevState => ({
        ...prevState,
        password: true,
      }));
    } else {
      setIsLoading(true);
      try {
        const response = await axios.post(`${baseUrl}/frontend/users/login`, {
          email,
          password,
        });
        if (response?.data?.success === 1) {
          setIsLoading(false);
          dispatch(userInfo(response?.data?.data));
          setEmail('');
          setPassword('');
          navigation.navigate('DashBoard');
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
          <Text style={styles.text}>Login Page</Text>
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
            title={'Password'}
            value={password}
            setValue={text => {
              setPassword(text),
                setErrors(prevState => ({
                  ...prevState,
                  password: !passwordPattern.test(text),
                }));
            }}
            keyboardType="default"
            placeholder={'Enter password'}
            onBlur={() => {
              setErrors(prevState => ({
                ...prevState,
                password: !passwordPattern.test(password) || password === '',
              }));
            }}
          />
          {errors?.password && (
            <Text style={styles.errorText}>
              please enter atleast 8 characters,with upper case ,lower case, one
              special character,number{' '}
            </Text>
          )}
          <SubmitButton title={'LOGIN'} onPress={submit} />
        </>
      )}
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgb(0, 255, 230)',
    paddingTop: windowHeight * 0.3,
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
