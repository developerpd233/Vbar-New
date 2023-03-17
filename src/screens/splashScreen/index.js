import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import splash from '../../assests/splash.png';


const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const SplashScreen = ({navigation, route}) => {
 
  return (
    <ImageBackground
   source={splash}
      style={{height: Dimensions.get('window').height}}>
     
    </ImageBackground>
  );
};

export default SplashScreen;
