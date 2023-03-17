import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';

import arrow from '../../assests/arrow.png';
import droGame from '../../assests/droGame.png';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import { width, height, totalSize } from 'react-native-dimension';
const GAmeDropDown = props => {
  // console.log(props, 'game dropdown');
  const [open, setOpen] = useState(false);
  // const [items, setItems] = useState([
  //   {label: 'Game Area', value:'GameZonearea', param: {name:'Game Area'}},
  //   {label: 'Food Area', value:'foodArea', param: {name:'Food Area'}},
  //   {
  //     label: 'Portuge/lounge',
  //     value:'PatioLounge',
  //     param: {name: 'Portuge/Lounge'},
  //   },
  //   {label: 'Bar', value: 'BARScreen', param: {name: 'Bar'}},
  // ]);

  return (
    <View>
      <TouchableOpacity onPress={() => setOpen(!open)} >
        <View style={styles.maincontainerDRop}>
          <Text style={{ color: '#fff', paddingLeft: deviceWidth * 0.008}}>
            {/* {props.plce} */}Change Area
          </Text>

          <Image source={arrow} />
        </View>
      </TouchableOpacity>
      {open && (
        <View
          style={{
            width: deviceWidth * 0.32,
            // backgroundColor: 'rgba(255, 255, 255, 0.19)',
            height: deviceHeight * 0.15,
            position: 'absolute',
            top: deviceHeight * 0.04,
            borderWidth: 1,
            borderColor: '#D1179B',
            backgroundColor: '#000',
          }}>
          <View style={styles.absol} >
            <BlurView blurType="light" blurAmount={100} >

            </BlurView>
          </View>

          <View>
            <TouchableOpacity>
              <Text style={styles.avtrname}>Patio/lounge</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.avtrname1}
              onPress={() =>
                props.droppScreen('PatioLounge', { name: 'Lounge' })
              }>
              <Text style={styles.avtrname1}>Patio/lounge</Text>
              <View
                style={{
                  left: deviceWidth * 0.28,
                  top: deviceHeight * 0.011,
                  position: 'absolute',
                }}>
                <Image source={droGame} />
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <Text style={styles.avtrname}>Game Area</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.avtrname1}
              onPress={() =>
                props.droppScreen('GameZonearea', { name: 'Game Area' })
              }>
              <Text style={styles.avtrname1}>Game Area</Text>
              <View
                style={{
                  left: deviceWidth * 0.28,
                  top: deviceHeight * 0.011,
                  position: 'absolute',
                }}>
                <Image source={droGame} />
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <Text style={styles.avtrname}>Bar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.avtrname1}
              onPress={() => props.droppScreen('BARScreen', { name: 'Bar' })}>
              <Text style={styles.avtrname1}>Bar</Text>
              <View
                style={{
                  left: deviceWidth * 0.28,
                  top: deviceHeight * 0.011,
                  position: 'absolute',
                }}>
                <Image source={droGame} />
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <Text style={styles.avtrname}>Food Area</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.avtrname1}
              onPress={() =>
                props.droppScreen('foodArea', { name: 'Food Area' })
              }>
              <Text style={styles.avtrname1}>Food Area</Text>
              <View
                style={{
                  left: deviceWidth * 0.28,
                  top: deviceHeight * 0.011,
                  position: 'absolute',
                }}>
                <Image source={droGame} />
              </View>
            </TouchableOpacity>
          </View>
        </View>


      )}
    </View>

  );
};

export default GAmeDropDown;
const styles = StyleSheet.create({
  maincontainerDRop: {
    backgroundColor: '#D1179B',
    borderWidth: 1,
    borderColor: '#D1179B',
    width: deviceWidth * 0.4,
    marginLeft:-10,
    paddingRight:deviceWidth * 0.006,
    // alignSelf:'center',

    paddingTop: deviceHeight * 0.008,
    paddingBottom: deviceHeight * 0.008,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dbox: {
    backgroundColor: 'yellow',
    flexDirection: 'row',
  },
  dboxcontainer: {
    backgroundColor: 'black',
    height: 100,
    transition: 3,
    transitionDelay: 1,
  },
  dboxcontainer1: {
    backgroundColor: 'black',
    height: 0,
  },
  avtrname: {
    color: '#ED11F3',
    textTransform: 'uppercase',
    shadowColor: '#ED11F3',
    shadowOffset: { width: -1, height: 1 },
    shadowOpacity: .2,
    shadowRadius: 1,
    // elevation: 20,
    textShadowColor: '#ED11F3',
    // textShadowOffset: {width: 4, height: -2},
    textShadowRadius: 15,

    fontFamily: 'Futura',
    fontWeight: '800',
    fontSize: totalSize(1.3),
    paddingLeft: deviceWidth * 0.009,
    paddingBottom: deviceHeight * 0.009,
    paddingTop: deviceHeight * 0.009,
  },
  avtrname1: {
    width: deviceWidth * 0.5,
    color: '#fff',
    textTransform: 'uppercase',
    shadowColor: '#f705a7',
    shadowOffset: { width: -1, height: 1 },
    shadowOpacity: .2,
    shadowRadius: 1,
    // elevation: 20,
    textShadowColor: '#f705a7',
    // textShadowOffset: {width: 4, height: -2},
    textShadowRadius: 10,
    //  flexDirection:"row",
    // backgroundColor:"red",
    fontFamily: 'Futura',
    fontWeight: '800',
    fontSize: totalSize(1.3),
    // flexDirection:"row",
    // justifyContent:"space-between",
    // top:-10
    position: 'absolute',
    paddingLeft: deviceWidth * 0.009,
    paddingBottom: deviceHeight * 0.009,
    paddingTop: deviceHeight * 0.009,
  },
  //   aerrowup: {
  //     backgroundColor: 'red',
  //   },
  absol: {
    position: 'absolute',
    top: 2,
    left: 0,
    bottom: 2,
    right: 1,
    // borderWidth: 2,
    borderColor: 'red',
    backgroundColor: '#000',
    opacity: 0.8
  },
});
