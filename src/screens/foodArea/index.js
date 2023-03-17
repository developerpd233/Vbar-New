import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image, TouchableOpacity, ActivityIndicator, Platform, RefreshControl
} from 'react-native';
import food from '../../assests/food.png';
import avatr from '../../assests/avatr.png';
import { PlayArea } from '../../components';
import { Header } from '../../components';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import LinearGradient from 'react-native-linear-gradient';
import { width, height, totalSize } from 'react-native-dimension';
import Vlogo from '../../assests/Vlogo.png';
import { useSelector } from 'react-redux';
import {
  usersbylocation,
  Adduserlocation,
  findOneuser,
  getLocationUser,
} from '../../services/utilities/api/auth';
import arrowback from '../../assests/arrowback.png';
import { UPDATE_LOCATION } from '../../config/WebServices';
import ApiSauce from '../../services/networkRequest'

const Foodarea = ({ navigation = { goBack, navigate }, route }) => {

  const [placeholder, setplaceholder] = useState(false);
  const { name, locationId } = route.params;
  const id = useSelector(state => state.qrId);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = useSelector(state => state.signUpToken);
  const [refreshing, setRefreshing] = React.useState(false);
  const currentuserid = useSelector(state => state?.user?.id);


  const reduxData = useSelector(state => state.LocationId);
  // console.log('reduxfood area----->>', reduxData);
  useEffect(() => {
    GotoDetail();
    // setplaceholder(name); 
    // getLocation();

    // console.log('useef');
  }, [navigation]);

  useEffect(() => {
    (async () => {
      let response = await getLocationUser(token, locationId);
      let users = response.data.users.users;
      setUsers(users)
      // console.log('users', users)
      setLoading(false);
    })()
  }, [])


  // console.log('redxu-------->>',reduxData);
  const GotoDetail = async item => {
    console.log("🚀 ~ file: index.js:67 ~ GotoDetail ~ item:", item)
    var axios = require('axios');
    let url = `http://134.122.30.185:8000/api/users/findUser/${item?.id}`;
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

  const GotoChatScreen = async (item) => {

    if(currentuserid == item.id){
      alert("You Can't Chat with your own user!");
      return;
    }
    var axios = require('axios');
    let url = `http://134.122.30.185:8000/api/users/findUser/${item?.id}`;
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
        navigation.navigate('Chatscreen', { data: response?.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const Gotodropscreen = async (val, param) => {

    try {
      const obj = reduxData.find((el) => el?.location === param?.name);

      await ApiSauce.putWithToken(UPDATE_LOCATION(obj?.id), token)
        .then((resp) => {
          console.log("🚀 ~ file: index.js ~ line 54 ~ GoToBar ~ resp------------", resp)
          navigation.replace(val, { ...param, locationId: resp?.newLocation?.id });

          console.log("🚀 ~ file: index.js ~ line 54 ~ GoToBar ~ resp", resp)
        })
        .catch((err) => {
          console.log('errrrrrrrrrrrrrr', err)
        })


    } catch (error) {
      console.log("🚀 ~ file: index.js ~ line 56 ~ GoToBar ~ error", error?.response?.data)

    }

    // console.log('val, param', val, param)
    // console.log('reduxData', reduxData)
    // if (param.name == 'Patio/lounge') {
    //   const newArr = reduxData.filter(el => el?.location == 'Lounge');
    //   console.log(newArr[0]?.id, 'newarr');
    // } else {
    // const newArr = reduxData.filter((el) => el?.location === param?.name);
    // // console.log(newArr[0]?.id, 'newarr');
    // try {
    //   console.log(token);
    //   var axios = require('axios');
    //   var data = '';

    //   var config = {
    //     method: 'put',
    //     url: `http://134.122.30.185:8000/api/users/update-user-location/${newArr[0].id}`,
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   };
    //   axios(config)
    //     .then(function (response) {
    //       console.log("🚀 ~ file: index.js ~ line 125 ~ response", response?.data)
    //       console.log('firstfirstfirstfirstfirstfirstfirstfirstfirstfirstfirstfirstfirstfirstfirst22222222222', response?.data)
    //       // console.log(JSON.stringify(response.data));
    //       navigation.replace(val, { ...param, locationId: response?.data?.newLocation?.id });

    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // } catch (error) {
    //   console.log('error', error)
    //   console.log(error);
    //   // }
    // }
  }

  const getLocation = async () => {
    try {
      let response = await usersbylocation(token, id);
      console.log(response, 'ress');
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    (async () => {
      let response = await getLocationUser(token, locationId);
      console.log("🚀 ~ file: index.js ~ line 44 ~ response", response)
      let users = response.data.users.users;
      setUsers(users)
      // console.log('users', users)
      setLoading(false);
      setRefreshing(false)
    })()
    // wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <LinearGradient
      colors={['#CA60FF', '#502E78']}
      style={{ height: Dimensions.get('window').height, ...(Platform.OS === 'ios' && { paddingTop: 40 }) }}
      start={{ x: 93.75, y: 406 }}
      end={{ x: 281.25, y: 406 }}>
      <View style={styles.container}>
        <Header status={"component"}/>
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
          {!loading ? users && users?.length ? <View style={styles.container1}>
            <PlayArea
              plce={name}
              // items={items}
              avatr={avatr}
              areaname="Food Area"
              andicationimg={food}
              avtrname="olivia emma"
              Gocghat={GotoChatScreen}
              GotoDetail={GotoDetail}
              droppScreen={Gotodropscreen}
              users={users}
            />
          </View> : <Text style={{justifyContent:'center' , alignSelf:'center'}}> No User Available </Text> : <ActivityIndicator color={'white'} size='large' />}
        </ScrollView>

      </View>
    </LinearGradient>
  );
};

export default Foodarea;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 24,
    // paddingBottom: 95,
  },
  container1: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 60,
    marginBottom: 30,
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
    top: deviceHeight * 0.002,
    left: deviceWidth * 0.15,
    right: 0,
    bottom: deviceHeight * 0.002,

    textShadowColor: '#D1179B',
    textShadowOffset: { width: 5, height: 4 },
    textShadowRadius: 30,
  },

  pad: {
    paddingTop: 40,
  },
  aerrowback: {
    // left: deviceWidth * -0.01,
    width: deviceWidth * 0.11,
    height: deviceHeight * 0.03,
    top: deviceHeight * 0.03,
    zIndex: 1,
  },
  aerrowbackios: {
    width: deviceWidth * 0.1,
    height: deviceHeight * 0.03,
    top: deviceHeight * 0.03,
    // marginTop: deviceHeight * 0.02,
    position: 'relative',
    zIndex: 1,
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

{/*
{Platform.OS === 'ios' ? (
  <TouchableOpacity
    style={styles.aerrowbackios}
    onPress={() => {
      navigation?.goBack();
    }}>
    <Image
      style={{ width: '100%', height: '100%' }}
      source={arrowback}
    />
  </TouchableOpacity>
) : (
  <TouchableOpacity
    style={styles.aerrowback}
    onPress={() => {
      navigation?.goBack();
    }}>
    <Image
      style={{ width: '100%', height: '100%' }}
      source={arrowback}
    />
  </TouchableOpacity>
)}
{Platform.OS === 'ios' ? (
  <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: deviceHeight * 0.02,
      // marginTop: deviceHeight * 0.05,
      zIndex: 0,
    }}>
    <View
      style={{ width: deviceWidth * 0.6, height: deviceHeight * 0.14 }}>
      <Image style={{ width: '100%', height: '100%' }} source={Vlogo} />
    </View>
    <TouchableOpacity style={{ alignSelf: 'flex-start', position: 'absolute', right: 0, top: 0 }} onPress={() => navigation.navigate('contacts')} >
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
      paddingBottom: deviceHeight * 0.02,
      zIndex: 0,
    }}>
    <View
      style={{ width: deviceWidth * 0.6, height: deviceHeight * 0.14 }}>
      <Image style={{ width: '100%', height: '100%' }} source={Vlogo} />
    </View>
    <TouchableOpacity style={{ alignSelf: 'flex-start', position: 'absolute', right: 0, top: 0 }} onPress={() => navigation.navigate('contacts')} >
      <View
        style={styles?.avtr}>
        <Text numberOfLines={1} style={styles.avtrname}>Chats</Text>
        <Text numberOfLines={1} style={styles.avtrname1}>Chats</Text>
      </View>
    </TouchableOpacity>
  </View>
)}
*/}
