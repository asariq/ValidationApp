import React, {useState} from 'react';
import axios from 'axios';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {SubmitButton, InputBox} from '../Components/UsableComponents';
import {
  windowHeight,
  emailPattern,
  baseUrl,
  phonePattern,
  passwordPattern,
} from '../Components/Global_Constants';

const RegistrationPage = ({navigation}) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    firstName: false,
    email: false,
    phone: false,
    password: false,
  });

  const submit = async () => {
    if (firstName === '') {
      setErrors(prevState => ({
        ...prevState,
        firstName: true,
      }));
    } else if (!emailPattern.test(email) || email === '') {
      setErrors(prevState => ({
        ...prevState,
        email: true,
      }));
    } else if (!phonePattern.test(phone) || phone === '') {
      setErrors(prevState => ({
        ...prevState,
        phone: true,
      }));
    } else if (!passwordPattern.test(password) || password === '') {
      setErrors(prevState => ({
        ...prevState,
        password: true,
      }));
    } else {
      setIsLoading(true);
      try {
        const response = await axios.post(`${baseUrl}/frontend/users`, {
          name: firstName,
          email,
          phone,
          password,
        });
        if (response?.data?.success === 1) {
          setIsLoading(false);
          setEmail('');
          setFirstName('');
          setPhone('');
          setPassword('');
          navigation.navigate('Otp');
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
          <Text style={styles.text}>Registration Page</Text>
          <InputBox
            title={'Name'}
            value={firstName}
            setValue={setFirstName}
            keyboardType={'default'}
            placeholder={'Enter Name'}
            onBlur={() => {
              setErrors(prevState => ({
                ...prevState,
                firstName: firstName === '',
              }));
            }}
          />
          {errors?.firstName && (
            <Text style={styles.errorText}>should not be empty</Text>
          )}

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
            title={'Phone No'}
            value={phone}
            setValue={text => {
              setPhone(text),
                setErrors(prevState => ({
                  ...prevState,
                  phone: !phonePattern.test(text) || phone === '',
                }));
            }}
            keyboardType={'default'}
            placeholder={'Enter phone no'}
            onBlur={() => {
              setErrors(prevState => ({
                ...prevState,
                phone: phone === '',
              }));
            }}
          />
          {errors?.phone && (
            <Text style={styles.errorText}>please enter valid phone</Text>
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

          <SubmitButton title={'REGISTER'} onPress={submit} />

          <Text style={styles.textAlready}>
            Already Have an account Login :
          </Text>
          <SubmitButton
            title={'LOGIN'}
            onPress={() => navigation.navigate('Login')}
          />
        </>
      )}
    </View>
  );
};

export default RegistrationPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgb(0, 255, 230)',
    paddingTop: windowHeight * 0.1,
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
