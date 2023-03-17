import React from 'react';
import { View, Image, StyleSheet, Dimensions, Platform } from 'react-native';
import sheader from '../../assests/sheader.png';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import Vlog from '../../assests/Vlogo.png'
function Selfiheader() {
  return (
    <View>
      {Platform.OS === 'ios' ? (
        <View
          style={{
            marginTop: deviceHeight * 0.04,
            bottom: deviceHeight * 0.06,
            width: deviceWidth * 0.7,
            height: deviceHeight * 0.17,
          }}>
          <Image style={{ width: '100%', height: '100%' }} source={Vlog} />
        </View>
      ) : (
        <View
          style={{
            marginTop: deviceHeight * 0.05,
            bottom: deviceHeight * 0.06,
            width: deviceWidth * 0.7,
            height: deviceHeight * 0.17,
          }}>
          <Image style={{ width: '100%', height: '100%' }} source={Vlog} />
        </View>
      )}
    </View>
  );
}

export default Selfiheader;
const styles = StyleSheet.create({});
