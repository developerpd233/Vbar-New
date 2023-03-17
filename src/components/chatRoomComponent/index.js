import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  Platform
} from 'react-native';
import Union from '../../assests/Union.png';
import avatr from '../../assests/avatr.png';
import UnionRight from '../../assests/UnionRight.png';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const ChatBox = ({data, nav}) => {
  const hellobaby = ({item}) => {
    // console.log('item =====', item);
    return (
      <View>
     {Platform.OS === 'ios'?( <View>
      <View style={styles.main}>
        <TouchableOpacity onPress={() => nav.navigate(item.screen)}>
          <View style={styles.profilebox}>
            <Image style={styles.avtrimgchat} source={avatr} />
            <Text style={styles.profilename}>{item.title}</Text>
          </View>
        </TouchableOpacity>
        <View>
          <ImageBackground source={Union} style={styles.chatboxdesignios}>
            <Text style={{color:"#000000"}}>{item.textmsg}</Text>
          </ImageBackground>
          <View style={styles.indication}></View>
          <View style={styles.indicationuper}></View>
        </View>
      </View>
      <View style={styles.main2}>
        <View style={styles.profilebox}>
          <Image style={styles.avtrimgchat} source={avatr} />
          <Text style={styles.profilename}>{item.title}</Text>
        </View>
        <View>
          <ImageBackground source={UnionRight} style={styles.chatboxinverseios}>
            {/* <Text>tect</Text> */}
          </ImageBackground>
          <View style={styles.indicationright}></View>
          <View style={styles.indicationupeRright}></View>
        </View>
       
      </View>
   
    </View>):( <View>
      <View style={styles.main}>
        <TouchableOpacity onPress={() => nav.navigate(item.screen)}>
          <View style={styles.profilebox}>
            <Image style={styles.avtrimgchat} source={avatr} />
            <Text style={styles.profilename}>{item.title}</Text>
          </View>
        </TouchableOpacity>
        <View>
          <ImageBackground source={Union} style={styles.chatboxdesign}>
          <Text style={{color:"#000000",left:deviceWidth * 0.09,}}>{item.textmsg}</Text>
          </ImageBackground>
          <View style={styles.indication}></View>
          <View style={styles.indicationuper}></View>
        </View>
      </View>
      <View style={styles.main2}>
        <View style={styles.profilebox}>
          <Image style={styles.avtrimgchat} source={avatr} />
          <Text style={styles.profilename}>{item.title}</Text>
        </View>
        <View>
          <ImageBackground source={UnionRight} style={styles.chatboxinverse}>
          <Text style={{color:"#000000",left:deviceWidth * -0.01,}}>{item.textmsg}</Text>
          </ImageBackground>
          <View style={styles.indicationright}></View>
          <View style={styles.indicationupeRright}></View>
        </View>
       
      </View>
   
    </View>)}
    </View>
    );
  };

  return (


    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      renderItem={hellobaby}
      />
    
  );
};

export default ChatBox;
const styles = StyleSheet.create({
  main: {
    width: deviceWidth * 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:deviceHeight *0.05
  },
  avtrimgchat: {
    width: deviceWidth * 0.1,
    height: deviceHeight * 0.05,
    marginTop: deviceHeight * 0.01,
  },
  chatboxdesign: {
    width: deviceWidth * 0.7,
    height: deviceHeight * 0.17,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: deviceHeight * 0.02,

    left: deviceWidth * -0.01,
  },
  chatboxdesignios:{
    width: deviceWidth * 0.6,
    height: deviceHeight * 0.10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: deviceHeight * 0.02,

    // left: deviceWidth * -0.01,
  },

  main2: {
    width: deviceWidth * 0.87,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingBottom: deviceHeight * 0.06,
  },
  chatboxinverse: {
    width: deviceWidth * 0.6,
    height: deviceHeight * 0.17,

    right: deviceWidth * 0.01,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 10,
  },
  chatboxinverseios:{
    width: deviceWidth * 0.6,
    height: deviceHeight * 0.10,

    // right: deviceWidth * 0.01,
    justifyContent: 'center',
    alignItems: 'flex-end',
    // padding: 10,
  },

  profilename: {
    fontFamily: 'Futura',
    fontSize: 14,
    color: '#ffff',
    shadowColor: '#f705a7',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 20,
    textShadowColor: '#f705a7',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    fontWeight: '900',
  },
  profilebox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
