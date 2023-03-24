import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image, TouchableOpacity, ActivityIndicator, Platform, RefreshControl
} from 'react-native';
import { Header } from '../../components';
import LinearGradient from 'react-native-linear-gradient';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import { totalSize } from 'react-native-dimension';
import { getLocationUser } from '../../services/utilities/api/auth';
import { useSelector } from 'react-redux';
import { PlayArea } from '../../components';
import ApiSauce from '../../services/networkRequest'
import { BASE_URL, UPDATE_LOCATION } from '../../config/WebServices';
import avatr from '../../assests/avatr.png';
import food from '../../assests/food.png';
import andicationimg from '../../assests/andicationimg.png';
import potli from '../../assests/potli.png';
import bar from '../../assests/bar.png';

const ComponentsScreen = ({ navigation, route })=> {
    const { name, locationId, location } = route.params;
    
    const token = useSelector(state => state.signUpToken);
    const id = useSelector(state => state.qrId);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const currentuserid = useSelector(state => state?.user?.id);
    const reduxData = useSelector(state => state.LocationId);
    let area_img = [food,andicationimg,potli,bar]
    
    useEffect(() => {
      (async () => {
        let response = await getLocationUser(token, locationId);
        let users = response.data.users.users;
        setUsers(users)
        setLoading(false);
      })()
    }, [])

  const GotoDetail = async item => {

      var axios = require('axios');
      let url = `${BASE_URL}/users/findUser/${item?.id}`;
      var config = {
        method: 'get',
        url: url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios(config)
        .then(function (response) {
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
      let url = `${BASE_URL}/users/findUser/${item?.id}`;
      var config = {
        method: 'get',
        url: url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios(config)
        .then(function (response) {
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
            navigation.replace(val, { ...param, locationId: resp?.newLocation?.id });
          })
          .catch((err) => {
            console.log('errrrrrrrrrrrrrr', err)
          })
  
  } catch (error) {
  console.log("🚀 ~ file: index.js:104 ~ Gotodropscreen ~ error:", error)
  }
  }

    
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    (async () => {
      let response = await getLocationUser(token, locationId);
      let users = response.data.users.users;
      setUsers(users)
      setLoading(false);
      setRefreshing(false)
    })()
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
              avatr={avatr}
              areaname={name}
              location={location}
              andicationimg={area_img[locationId-1]}
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

export default ComponentsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  container1: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 60,
    marginBottom: 30,
  },
  
  containerdiv: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: deviceHeight * 1.5,
  },
  
});

