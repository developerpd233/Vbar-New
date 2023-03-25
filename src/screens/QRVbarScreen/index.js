import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  RefreshControl
} from 'react-native';

import andicationimg from '../../assests/andicationimg.png';
import food from '../../assests/food.png';
import potli from '../../assests/potli.png';
import bar from '../../assests/bar.png';
import {BComponent, Header} from '../../components';
import LinearGradient from 'react-native-linear-gradient';
import {totalSize} from 'react-native-dimension';
import vB from '../../assests/vB.png';
import {Getlocation} from '../../services/utilities/api/auth';
import {useDispatch, useSelector} from 'react-redux';
import {LocationId} from '../../store/actions';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import ApiSauce from '../../services/networkRequest';

import {UPDATE_LOCATION} from '../../config/WebServices';
const VbarScreen = ({navigation}) => {
  const token = useSelector(state => state.signUpToken);
  const id = useSelector(state => state.qrId);
  const [location, setLocation] = useState([]);
  console.log('🚀 ~ file: index.js:33 ~ location:', location);

  useEffect(() => {


    getLocation();
  }, [location]);

  const dispatch = useDispatch();

  const getLocation = async () => {
    try {
      let response = await Getlocation(token, id);
      console.log("🚀 ~ file: index.js:43 ~ getLocation ~ token:", token)
      setLocation(response.data.getLocation);
      dispatch(LocationId(response.data.getLocation));
    } catch (error) {
      console.log('🚀 ~ file: index.js:56 ~ getLocation ~ error', error);
      console.log(error);
    }
  };

  const GoToSwitchscreen = async i => {
    try {
      const resp = await ApiSauce.putWithToken(UPDATE_LOCATION(i), token);
      let names = ['food Area', 'Game Area', 'Patio/Lounge', 'Bar'];
      navigation.navigate('ComponentsScreen', {
        name: names[i - 1],
        locationId: resp?.newLocation?.id,
        location:location,
      });
    } catch (error) {
      console.log('🚀 ~ file: index.js:67 ~ GoToSwitchscreen ~ error:', error);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: '#CA60FF'}}>
      <LinearGradient
        colors={['#CA60FF', '#502E78']}
        style={{height: Dimensions.get('window').height}}
        start={{x: 93.75, y: 406}}
        end={{x: 281.25, y: 406}}>
        <View style={styles.container}>
          <Header status={'parent'} />
          {/* {users && users?.length ? users?.map((item, index) => { */}
           
          <ScrollView horizontal={false}>
              {location && location?.length ? (
              
              <View style={{ flexDirection:"row",   flexWrap: 'wrap',justifyContent: 'space-between',}}>
              
              
              {location.map((val,index) => {
                const {location ,id,room_image  } = val

                console.log("Cool");
                console.log(room_image);
                
                return (
                  <View style={{width:"50%",alignItems:"center"}}>  
                  <BComponent
                    functionname={() => {
                      GoToSwitchscreen(id);
                    }}
                    title={location}
                    ima={room_image}
                    // data={location[0]}
                  />
                  
                {(location?.length < 2 ? true : [index + 1] % 2 === 0) && (
                  <View style={styles.heading}>
                  <Text style={styles.headingText}>choose</Text>
                  <Text style={styles.headingText}>your location</Text>
                </View>
                )}
                </View>
                );

              })}
              </View>
              
              //   {/* <BComponent
              //     functionname={() => {
              //       GoToSwitchscreen(1);
              //     }}
              //     title={location[0]?.location}
              //     ima={food}
              //     // data={location[0]}
              //   />
              //   <BComponent
              //     functionname={() => {
              //       GoToSwitchscreen(2);
              //     }}
              //     ima={andicationimg}
              //     title={location[1]?.location}
              //   /> */}
          
              // {/* <View style={styles.containerdiv}>
              //   <BComponent
              //     functionname={() => {
              //       GoToSwitchscreen(3);
              //     }}
              //     title="Patio/Lounge"
              //     ima={potli}
              //   />
              //   <BComponent
              //     functionname={() => {
              //       GoToSwitchscreen(4);
              //     }}
              //     title={location[3]?.location}
              //     ima={bar}
              //   />
              // </View> */}
            // </>
          ) : null}
          {Platform.OS === 'ios' ? (
            <View
              style={{
                justifyContent: 'flex-end',
                left: deviceWidth * 0.45,
                top: deviceHeight * 0.05,
                width: deviceWidth * 0.5,
                height: deviceHeight * 0.2,
              }}>
              <Image style={{width: '100%', height: '100%'}} source={vB} />
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
              <Image style={{width: '100%', height: '100%'}} source={vB} />
            </View>
          )}
         </ScrollView>

        </View>
      </LinearGradient>
    </SafeAreaView>
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
    textShadowOffset: {width: 7, height: 2},
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
    textShadowOffset: {width: 5, height: 4},
    textShadowRadius: 30,
  },

  containerdiv: {
    //flexDirection: 'row',
    backgroundColor:"red",
    //justifyContent: 'space-between',
    //height: deviceHeight * 0.16,
  },

  boxTitle: {
    color: '#fff',
    textTransform: 'capitalize',
    color: 'white',
    textShadowColor: 'rgba(255, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },

  heading: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: deviceHeight * 0.02,
    paddingBottom: deviceHeight * 0.02,
    right: deviceWidth * 0.2 ,
    height:65,
    width:200,
    marginVertical:15,
  },
  headingText: {
    fontFamily: 'Futura Md BT',
    fontSize: totalSize(4),
    textTransform: 'capitalize',
    color: 'white',
    textShadowColor: 'rgba(255, 0, 0, 0.50)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 25,
    fontWeight: '700',
  },
  headingText1: {
    fontFamily: 'Futura Md BT',
    color: '#D1179B',
    fontSize: totalSize(4),
    textTransform: 'capitalize',
    textShadowColor: 'rgba(255, 0, 0, 0.50)',
    textShadowOffset: {width: 4, height: 4},
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
    textShadowOffset: {width: 4, height: 4},
    textShadowRadius: 3,
    fontWeight: '700',
    top: deviceHeight * 0.99,
    position: 'absolute',
  },
});
