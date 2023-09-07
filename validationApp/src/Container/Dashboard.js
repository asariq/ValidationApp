import React, {useState} from 'react';
import {View, StyleSheet, Text, Alert, ImageBackground} from 'react-native';
import {useSelector} from 'react-redux';

import {windowHeight, windowWidth} from '../Components/Global_Constants';

const DashBoard = ({navigation}) => {
  const userInfo = useSelector(state => state?.valueData?.user);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/image/back.jpeg')}
        style={styles.innerContainer}>
        <Text style={styles.textDetail}>Welcome to the club user</Text>
        <Text style={styles.textDetail}>Name:{userInfo?.name}</Text>
        <Text adjustsFontSizeToFit={true} numberOfLines={1} style={styles.textDetail}>
          Email:{userInfo?.email}
        </Text>
        <Text style={styles.textDetail}>Phone:{userInfo?.phone}</Text>
      </ImageBackground>
    </View>
  );
};

export default DashBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  innerContainer: {
    height: windowHeight * 0.7,
    width: windowWidth * 0.8,
    borderRadius: 16,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    elevation: 12,
    shadowOffset: {width: 1, height: 1},
    shadowColor: 'black',
    shadowOpacity: 0.5,
    paddingTop: windowHeight * 0.05,
    paddingHorizontal: windowWidth * 0.06,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  textDetail: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
});
