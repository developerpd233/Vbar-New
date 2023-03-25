import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Vector from '../../assests/vector.png';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import {width, height, totalSize} from 'react-native-dimension';
const BComponent = props => {
  return (
    <View
      style={{
        backgroundColor: 'rgba(209, 23, 156,0.25)',
        padding: 2,
        shadowColor: 'red',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.7,

        elevation: 15,

        borderRadius: deviceWidth * 0.009,
      }}>
      <TouchableOpacity
        onPress={props.functionname}
        style={styles.mainContenBox}>
        <ImageBackground
          source={Vector}
          imageStyle={{
            position: 'absolute',
            width: deviceWidth * 0.32,
            height: deviceHeight * 0.25,
            top: deviceHeight * -0.1,
          }}
          resizeMode="contain"
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            backgroundColor: 'black',
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View>
              <Text style={styles.boxTitle}>{props.title}</Text>
            </View>

            <View style={styles.vectro}>
              <Image style={{width:"100%",height:"100%", resizeMode:'contain'}}  source={{uri:props.ima}} />
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default BComponent;
const styles = StyleSheet.create({
  titleView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    flexDirection: 'row',
  },

  containerdiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    height: '100%',

    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#000',
  },
  boxTitle: {
    fontFamily: 'Futura Md BT',
    color: '#fff',
    fontSize: totalSize(2.5),
    fontWeight: '700',
    textTransform: 'capitalize',
    color: 'white',
    shadowColor: '#f705a7',
    textShadowColor: '#f705a7',
    textShadowOffset: {width: -4, height: -1.04},
    textShadowRadius: 15,
    textAlign: 'center',
  },
  vectro: {
    width: deviceWidth * 0.15 ,
    height: deviceHeight * 0.07,
  },
  mainContenBox: {
    borderRadius: 4.8,
    width: deviceWidth * 0.4,
    height: deviceHeight * 0.15,
    borderWidth: deviceWidth * 0.01,
    borderColor: '#fff',
  },
});
