import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import andicationimg from '../../assests/andicationimg.png';
import food from '../../assests/food.png';
import potli from '../../assests/potli.png';
import bar from '../../assests/bar.png';
import { BComponent, BUtton } from '../../components';
import LinearGradient from 'react-native-linear-gradient';
import { width, height, totalSize } from 'react-native-dimension';
import vB from '../../assests/vB.png';
import Vlogo from '../../assests/Vlogo.png';
import { AddAlluser, Adduserlocation, Getlocation, getLocationUser } from '../../services/utilities/api/auth';
import { useDispatch, useSelector } from 'react-redux';
import { LocationId } from '../../store/actions';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import ApiSauce from '../../services/networkRequest'
import { BASE_URL } from '../../config/WebServices';

import { UPDATE_LOCATION } from '../../config/WebServices';
const VbarScreen = ({ navigation }) => {

  const token = useSelector(state => state.signUpToken);
  const user = useSelector(state => state?.user?.id);
  const id = useSelector(state => state.qrId);
  const reduxData = useSelector(state => state.LocationId)
  const userImg = useSelector(state => state.userImg);
  const [location, setLocation] = useState([]);
  useEffect(() => {
    getLocation();
  }, [location]);
  const dispatch = useDispatch();
  const getLocation = async () => {
    try {
      let response = await Getlocation(token, id);
     
      // response.data.status == 401  ?
      // navigation.navigate('SignupScreen')
      //  :
        setLocation(response.data.getLocation);
        dispatch(LocationId(response.data.getLocation))
    
   
    } catch (error) {
      console.log("🚀 ~ file: index.js:56 ~ getLocation ~ error", error)
      console.log(error);
    }
  };

  const GoToBar = async () => {
    try {
    const resp = await ApiSauce.putWithToken(UPDATE_LOCATION(4) , token)
    console.log("🚀 ~ file: index.js ~ line 54 ~ GoToBar ~ resp", resp)
    navigation.navigate('BARScreen', { name: 'Bar' , locationId: resp?.newLocation?.id });

      console.log("🚀 ~ file: index.js ~ line 54 ~ GoToBar ~ resp", resp)
      
    } catch (error) {
      console.log("🚀 ~ file: index.js ~ line 56 ~ GoToBar ~ error", error)
      
    }
  };
  const GoTopatilounge = async () => {
    try {
      const resp = await ApiSauce.putWithToken(UPDATE_LOCATION(3) , token)
      console.log("🚀 ~ file: index.js ~ line 54 ~ GoToBar ~ resp", resp)
      navigation.navigate('PatioLounge', { name: 'PatioLounge' , locationId: resp?.newLocation?.id });
  
        console.log("🚀 ~ file: index.js ~ line 54 ~ GoToBar ~ resp", resp)
        
      } catch (error) {
        console.log("🚀 ~ file: index.js ~ line 56 ~ GoToBar ~ error", error)
        
      }

  };
  
  const GoToGamescreen = async () => {
    try {
      const resp = await ApiSauce.putWithToken(UPDATE_LOCATION(2) , token)
      console.log("🚀 ~ file: index.js ~ line 54 ~ GoToBar ~ resp", resp)
      navigation.navigate('GameZonearea', { name: 'GameZonearea' , locationId: resp?.newLocation?.id });
        console.log("🚀 ~ file: index.js ~ line 54 ~ GoToBar ~ resp", resp)
      } catch (error) {
        console.log("🚀 ~ file: index.js ~ line 56 ~ GoToBar ~ error", error) 
      }
  };
  const GoToFoodscreen = async () => {
    try {
      const resp = await ApiSauce.putWithToken(UPDATE_LOCATION(1) , token)
      navigation.navigate('foodArea', { name: 'foodArea' , locationId: resp?.newLocation?.id });
  
        console.log("🚀 ~ file: index.js ~ line 54 ~ GoToBar ~ resp", resp)
        
      } catch (error) {
        console.log("🚀 ~ file: index.js ~ line 56 ~ GoToBar ~ error", error)
        
      }
  };

  const GotoDetail = async item => {

    var axios = require('axios');
    let url = `${BASE_URL}/users/findUser/${user}`;
    var config = {
      method: 'get',
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios(config)
      .then(function (response) {
        console.log('response--=--=-->', response?.data);
        navigation.navigate('Detailscreen', { data: response?.data });
      })
      .catch(function (error) {
        console.log(error);
      });

  };

  return (
    <SafeAreaView style={{ backgroundColor: '#CA60FF' }} >
      <LinearGradient
        colors={['#CA60FF', '#502E78']}
        style={{ height: Dimensions.get('window').height }}
        start={{ x: 93.75, y: 406 }}
        end={{ x: 281.25, y: 406 }}>
        <View style={styles.container}>
        {Platform.OS === 'ios' ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              paddingBottom: deviceHeight * 0.06,
            }}>
          <TouchableOpacity style={{ alignSelf: 'flex-start', position: 'absolute', left: 0 }} onPress={() => GotoDetail()}>
              <View onPress={() => alert('jjj')}
                style={styles?.avtr}>
                <Text numberOfLines={1} style={styles.avtrname}>Profile</Text>
                <Text numberOfLines={1} style={styles.avtrname1}>Profile</Text>
              </View>
          </TouchableOpacity>
              
              
            <View
              style={{ width: deviceWidth * 0.6, height: deviceHeight * 0.14 }}>
              <Image style={{ width: '100%', height: '100%' }} source={Vlogo} />
            </View> 
            <TouchableOpacity style={{ alignSelf: 'flex-start', position: 'absolute', right: 0 }} onPress={() => navigation.navigate('contacts')}>
              <View
                style={styles?.avtr}>
                <Text numberOfLines={1} style={styles.avtrname}>Chats</Text>
                <Text numberOfLines={1} style={styles.avtrname1}>Chats</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              paddingBottom: deviceHeight * 0.04,
            }}>

            <TouchableOpacity style={{ alignSelf: 'flex-start', position: 'absolute', left: 0 }} onPress={() => GotoDetail()}>
                <View onPress={() => alert('jjj')}
                  style={styles?.avtr}>
                  <Text numberOfLines={1} style={styles.avtrname}>Profile</Text>
                  <Text numberOfLines={1} style={styles.avtrname1}>Profile</Text>
                </View>
            </TouchableOpacity>

            <View
              style={{ width: deviceWidth * 0.6, height: deviceHeight * 0.14 }}>
              <Image style={{ width: '100%', height: '100%' }} source={Vlogo} />
            </View>

            <TouchableOpacity style={{ alignSelf: 'flex-start', position: 'absolute', right: 0 }} onPress={() => navigation.navigate('contacts')} >
              <View
                style={styles?.avtr}>
                <Text numberOfLines={1} style={styles.avtrname}>Chats</Text>
                <Text numberOfLines={1} style={styles.avtrname1}>Chats</Text>
              </View>
            </TouchableOpacity>
          </View>
          )}
          {location && location?.length ? <><View style={styles.containerdiv}>
            <BComponent
              functionname={GoToFoodscreen}
              title={location[0]?.location}
              ima={food}
            // data={location[0]}
            /> 
          <BComponent
              functionname={GoToGamescreen}
              ima={andicationimg}
              title={location[1]?.location}
            />
          </View>
            <View style={styles.heading}>
              <Text style={styles.headingText}>choose</Text>
              <Text style={styles.headingText}>your location </Text>
              {/* <Text style={styles.headingText1}>choose</Text> */}
              {/* <Text style={styles.headingText2}>your location </Text> */}
            </View>
            <View style={styles.containerdiv}>
           
               <BComponent
                functionname={GoTopatilounge}
                title="Patio/Lounge"
                ima={potli}
              />
            <BComponent functionname={GoToBar} title={location[3]?.location} ima={bar} /> 
            </View></> : null}
          {Platform.OS === 'ios' ? (
            <View
              style={{
                justifyContent: 'flex-end',
                left: deviceWidth * 0.45,
                top: deviceHeight * 0.05,
                width: deviceWidth * 0.5,
                height: deviceHeight * 0.2,
              }}>
              <Image style={{ width: '100%', height: '100%' }} source={vB} />
            </View>
          ) : (
            <View
              style={{
                justifyContent: 'flex-end',
                left: deviceWidth * 0.35,
                top: deviceHeight * 0.017,
                width: deviceWidth * 0.6,
                height: deviceHeight * 0.3,
              }}>
              <Image style={{ width: '100%', height: '100%' }} source={vB} />
            </View>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView >
  );
};

export default VbarScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  titleView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: deviceHeight * 0.02,
    flexDirection: 'row',
  },
  title: {
    fontFamily: 'Monoton-Regular',
    fontSize: totalSize(7.2),
    color: '#D1179B',

    textShadowColor: '#D1179B',
    textShadowOffset: { width: 7, height: 2 },
    textShadowRadius: 10,
  },
  title1: {
    fontFamily: 'Monoton-Regular',
    fontSize: totalSize(7),
    color: '#ffff',
    position: 'absolute',
    top: deviceHeight * 0.005,
    left: deviceWidth * 0.155,
    right: 0,
    bottom: deviceHeight * 0.001,

    textShadowColor: '#D1179B',
    textShadowOffset: { width: 5, height: 4 },
    textShadowRadius: 30,
  },

  containerdiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: deviceHeight * 0.16,
  },

  boxTitle: {
    color: '#fff',
    textTransform: 'capitalize',
    color: 'white',
    textShadowColor: 'rgba(255, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },

  heading: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: deviceHeight * 0.02,
    paddingBottom: deviceHeight * 0.02,
  },
  headingText: {
    fontFamily: 'Futura Md BT',
    fontSize: totalSize(4),
    textTransform: 'capitalize',
    color: 'white',
    textShadowColor: 'rgba(255, 0, 0, 0.50)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 25,
    fontWeight: '700',
  },
  headingText1: {
    fontFamily: 'Futura Md BT',
    color: '#D1179B',
    fontSize: totalSize(4),
    textTransform: 'capitalize',
    textShadowColor: 'rgba(255, 0, 0, 0.50)',
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 3,
    fontWeight: '700',
    top: deviceHeight * 0.99,
    position: 'absolute',
  },
  headingText2: {
    fontFamily: 'Futura Md BT',
    color: '#D1179B',
    fontSize: totalSize(4),
    textTransform: 'capitalize',
    textShadowColor: 'rgba(255, 0, 0, 0.50)',
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 3,
    fontWeight: '700',
    top: deviceHeight * 0.99,
    position: 'absolute',
  },

  avtr: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avtrname: {
    color: '#ED11F3',
    textTransform: 'uppercase',
    shadowColor: '#ED11F3',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 1,
    textShadowColor: '#ED11F3',
    textShadowRadius: 15,
    fontFamily: 'Futura',
    fontWeight: "800",
    fontSize: totalSize(1.6),
  },
  avtrname1: {
    color: '#fff',
    textTransform: 'uppercase',
    shadowColor: '#f705a7',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 1,
    textShadowColor: '#f705a7',
    textShadowRadius: 10,
    fontFamily: 'Futura',
    fontWeight: "800",
    fontSize: totalSize(1.6),
    position: "absolute"
  },
});








