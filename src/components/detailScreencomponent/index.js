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
  FlatList,
  TouchableOpacity,
} from 'react-native';
import avatr from '../../assests/avatr.png';
import prosmall from '../../assests/prosmall.png';
import gender from '../../assests/gender.png';
import heart from '../../assests/heart.png';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import Detailbackgound from '../../assests/Detailbackgound.png';

import {width, height, totalSize} from 'react-native-dimension';
const Detaildcreencomponet = () => {
  const [showDetails, setShowDetails] = useState(false);
  return (
   
      <ImageBackground
        source={Detailbackgound}
        resizeMode="cover"
        style={{height:Dimensions.get('window').height}}>
           <ScrollView>
        <View style={styles.container}>
          <View style={styles.containerDetail}>
            <View style={{paddingBottom:10,paddingTop:50}}>
              <Image style={{width: 178, height: 178}} source={avatr} />
            </View>
            <View style={styles.usernamecontainer}>
              {/* <Image style={styles.username} source={usernmae}/> */}
              <Text style={styles.username}>user name</Text>
              <Text style={styles.username1}>user name</Text>
            </View>
          </View>
          <View style={styles.usernamedtaView}>
            <View style={styles.usernamedta}>
              <View style={styles.usernimg}>
                <Image source={prosmall} />
              </View>
              <View>
                <Text style={styles.usernamedtaname}>Martha Nielsen</Text>
              </View>
            </View>
            <View style={styles.usernamedtaView1}></View>
          </View>
          <View style={styles.usernamedtaView}>
            <View style={styles.usernamedta}>
              <View style={styles.usernimg}>
                <Image source={gender} />
              </View>
              <View>
                <Text style={styles.usernamedtaname}>Female</Text>
              </View>
            </View>
            <View style={styles.usernamedtaView1}></View>
          </View>
           <View style={styles.usernamedtaView}>
        <View style={styles.usernamedta}>
          <View style={styles.usernimg}>
            <Image source={heart} />
          </View>
          <View>
            <Text style={styles.usernamedtaname}> Male</Text>
          </View>
        </View>
        <View style={styles.usernamedtaView1}></View>
      </View>
          {showDetails && (
            <View>
              <View style={styles.usernamedtaView}>
                <View style={styles.usernamedta}>
                  <View style={styles.usernimg}>
                    <Image source={heart} />
                  </View>

                  <View>
                    <Text style={styles.usernamedtaname}>
                      <Text style={styles.usernamedtaname1}>Age:</Text> Male
                    </Text>
                  </View>
                </View>

                <View style={styles.usernamedtaView1}></View>
              </View>
              <View style={styles.usernamedtaView}>
                <View style={styles.usernamedta}>
                  <View style={styles.usernimg}>
                    <Image source={heart} />
                  </View>
                  <View>
                    <Text style={styles.usernamedtaname}>
                      <Text style={styles.usernamedtaname1}>
                        Favorite drink :
                      </Text>{' '}
                      Male
                    </Text>
                  </View>
                </View>
                <View style={styles.usernamedtaView1}></View>
              </View>
              <View style={styles.usernamedtaView}>
                <View style={styles.usernamedta}>
                  <View style={styles.usernimg}>
                    <Image source={heart} />
                  </View>
                  <View>
                    <Text style={styles.usernamedtaname}>
                      <Text style={styles.usernamedtaname1}>
                        Favorite song :
                      </Text>{' '}
                      Male
                    </Text>
                  </View>
                </View>
                <View style={styles.usernamedtaView1}></View>
              </View>
              <View style={styles.usernamedtaView}>
                <View style={styles.usernamedta}>
                  <View style={styles.usernimg}>
                    <Image source={heart} />
                  </View>
                  <View>
                    <Text style={styles.usernamedtaname}>
                      <Text style={styles.usernamedtaname1}>Hobbies</Text> Male
                    </Text>
                  </View>
                </View>
                <View style={styles.usernamedtaView1}></View>
              </View>
              <View style={styles.usernamedtaView}>
                <View style={styles.usernamedta}>
                  <View style={styles.usernimg}>
                    <Image source={heart} />
                  </View>
                  <View>
                    <Text style={styles.usernamedtaname}>
                      <Text style={styles.usernamedtaname1}>Dislikes:</Text>{' '}
                      Male
                    </Text>
                  </View>
                </View>
                <View style={styles.usernamedtaView1}></View>
              </View>
            </View>
          )}
          <TouchableOpacity  onPress={() => setShowDetails(!showDetails)}>
            <Text>showmore</Text>
          </TouchableOpacity>
        
        </View>
        </ScrollView>
      </ImageBackground>
    
  );
};

export default Detaildcreencomponet;
const styles = StyleSheet.create({
  containerDetail: {
    justifyContent: 'center',
    alignItems: 'center',
    // paddingBottom:70
  },
  container: {
    // flex: 1,
    paddingLeft: 24,
    paddingRight: 24,
    // paddingBottom:190
  },
  usernamecontainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#f705a7',
    shadowColor: '#f705a7',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 1,
    shadowRadius: 10,
    // elevation: 20,
    // paddingTop: deviceHeight * 0.01,
    // paddingBottom: deviceHeight * 0.01,
    paddingRight: deviceWidth * 0.07,
    paddingLeft: deviceWidth * 0.07,
    borderRadius: deviceWidth * 0.009,
    marginTop: deviceHeight * 0.05,
    // width:deviceWidth * 0.0001
  },

  username: {
    fontFamily: 'Futura',
    fontSize: totalSize(2.2),
    color: '#f705a7',
    shadowColor: '#f705a7',
    shadowOffset: {width: 10, height: 2},
    shadowOpacity: 1,
    shadowRadius: deviceWidth * 0.07,
    elevation: 5,
    textShadowColor: '#f705a7',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  username1: {
    fontFamily: 'Futura',
    fontSize: totalSize(2.1),
    color: '#ffff',
    shadowColor: '#f705a7',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 1,
    shadowRadius: deviceWidth * 0.07,
    elevation: 5,
    textShadowColor: '#f705a7',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    top: deviceHeight * 0.001,
    left: deviceWidth * 0.07,
    position: 'absolute',
  },
  usernamedta: {
    flexDirection: 'row',
  },
  usernamedtaView1: {
    width: deviceWidth * 0.9,
    height: deviceHeight * 0.01,
    top: deviceHeight * 0.025,
    backgroundColor: 'rgba(209, 23, 155, 0.25)',
    shadowColor: '#f705a7',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 50,
  },
  usernamedtaView: {
    borderBottomWidth: deviceWidth * 0.001,

    shadowColor: '#f705a7',
    shadowOffset: {width: 5, height: 1},
    shadowOpacity: 1,
    shadowRadius: 1,
    // elevation: 20,
    marginTop: deviceHeight * 0.03,
    paddingBottom: deviceHeight * 0.02,
  },
  usernamedtaname: {
    color: '#ffff',
    fontSize: totalSize(1.8),
    fontFamily: 'Futura',
    fontWeight: '400',
    left: deviceWidth * 0.03,
  },
  usernimg: {
    width: deviceWidth * 0.03,
    height: deviceHeight * 0.03,
    top: deviceHeight * 0.002,
  },
  usernamedtaname1: {
    color: 'rgba(255, 255, 255, 0.35)',
    fontSize: totalSize(1.8),
    fontFamily: 'Futura',
    fontWeight: '400',
    left: deviceWidth * 0.03,
  },
});
