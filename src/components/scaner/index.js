import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Button,
  Image,
  Dimensions,
} from 'react-native';
import { totalSize } from 'react-native-dimension';

import QRCodeScanner from 'react-native-qrcode-scanner';
import Qrimage from '../../assests/Qrimage.png';
import { qrScan } from '../../services/utilities/api/auth';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { storeId } from '../../store/actions';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connectionSocket } from '../../socket';

const Scaner = () => {
  const navigation = useNavigation();
  const [scan, setScan] = useState(true);
  const [result, setResult] = useState();

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await connectionSocket(user, dispatch);
    })();
  },[])

  const getValueIntoLocalStorage = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
      navigation.navigate('QRVbarscreen');
           
        } else {
      navigation.navigate('SignupScreen');
            
        }
    } catch (error) {
        return null
    }
};
  const onSuccess = async e => {
    try {
      let response = await qrScan(e.data);
      dispatch(storeId(response.data.qrId));
      setResult(e.data);
    navigation.navigate('SignupScreen');
      
    } catch (error) {
      console.log('qrscan error--->', error?.response);
    }
  };

  const startScan = () => {
    setScan(true);
    setResult();
    console.log(result, 'scxanResult');
  };
  const handle = () => {
    dispatch(storeId(1));
    navigation.navigate('SignupScreen');
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ justifyContent: 'center' }}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>

            {!scan && (
              <View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Image style={styles.qimage} source={Qrimage} />
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.ButtonsView}
                    onPress={startScan}>
                    <Text style={styles.bView}>Scan</Text>
                  </TouchableOpacity>
                </View>
                
              </View>
            )}
            {scan && (

              <View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <QRCodeScanner
                    reactivate={true}
                    showMarker={true}
                    ref={node => {
                      scanner => node;
                    }}
                    onRead={onSuccess}
                    containerStyle={{ ...styles.qimage, height: deviceWidth * 1, }}
                    cameraContainerStyle={{ ...styles.qimage, width: '100%', height: deviceWidth * .6, position: 'absolute', overflow: 'hidden', backgroundColor: '#EEEEEE99', borderColor: '#00FF00', borderWidth: 2 }}
                    markerStyle={{ ...styles.qimage, borderColor: 'transparent' }}
                    cameraStyle={{ ...styles.qimage, height: deviceWidth * .6 }}
                    bottomViewStyle={{ width: '100%' }}
                  />
                </View>
                
              </View>
            )}

          </View>
       
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Scaner;
const styles = StyleSheet.create({
  scrollView: {},
  qimage: {
    width: deviceWidth * 0.6,
    height: deviceWidth * 0.6,
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    marginTop: -32,
    paddingBottom: 50,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'yellow',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: 'red',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  ButtonsView: {
    marginTop: deviceHeight * 0.02,
    backgroundColor: '#D1179B',
    width: deviceWidth * 0.6,
    height: deviceHeight * 0.07,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#f705a7',
    borderRadius: deviceWidth * 0.009,

    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 120,
    elevation: 20,
  },
  ButtonsView1: {
    marginTop: deviceHeight * 0.02,
    backgroundColor: '#D1179B',
    width: deviceWidth * 0.4,
    height: deviceHeight * 0.05,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 50,
    shadowColor: '#f705a7',
    borderRadius: 5,

    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    bottom: deviceHeight * 0.02,
  },
  bView: {
    fontSize: totalSize(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontFamily: 'Futura',
    fontWeight: '600',
  },
});
