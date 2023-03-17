import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width
import { width, height, totalSize } from 'react-native-dimension';
import FastImage from 'react-native-fast-image';
const Avatar = props => {
  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#D1179B',
            borderRadius: 3.11,
            paddingTop: deviceHeight * 0.003,
            paddingBottom: deviceHeight * 0.003,
            paddingLeft: deviceWidth * 0.05,
            paddingRight: deviceWidth * 0.04,
            elevation: 27,
            minWidth: deviceWidth * .31,
            maxWidth: deviceWidth * .31,
            maxHeight: deviceWidth * .03,
            minHeight: deviceHeight * .03,
            overflow: 'hidden'
          }}>
          <Text numberOfLines={1} style={styles.avtrname}>{props.Avtarname}</Text>
          <Text numberOfLines={1} style={styles.avtrname1}>{props.Avtarname}</Text>
        </View>

      </TouchableOpacity>

      <View style={{ paddingTop: deviceHeight * 0.010 }}>
        <FastImage resizeMode='cover' progressiveRenderingEnabled={true} source={{ uri: props?.avtrimg, priority: FastImage.priority.high }}
          style={{ height: deviceHeight * 0.20, width: deviceWidth * 0.40, borderRadius: deviceWidth * 0.40 }} />
      </View>
    </View>
  );
};

export default Avatar;
const styles = StyleSheet.create({
  title: {
    fontFamily: 'Monoton-Regular',
    fontSize: totalSize(7),
    color: '#ffff',
    shadowColor: '#f705a7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 20,
    textShadowColor: '#f705a7',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  avtrname: {
    color: '#ED11F3',
    textTransform: 'uppercase',
    shadowColor: '#ED11F3',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: .2,
    shadowRadius: 1,
    textShadowColor: '#ED11F3',
    textShadowRadius: 15,
    fontFamily: 'Futura',
    fontWeight: "800",
    fontSize: totalSize(1.5),
  },
  avtrname1: {
    color: '#fff',
    textTransform: 'uppercase',
    shadowColor: '#f705a7',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: .2,
    shadowRadius: 1,
    // elevation: 20,
    textShadowColor: '#f705a7',
    // textShadowOffset: {width: 4, height: -2},
    textShadowRadius: 10,

    fontFamily: 'Futura',
    fontWeight: "800",
    fontSize: totalSize(1.5),
    // top:-10
    position: "absolute"
  },
});
