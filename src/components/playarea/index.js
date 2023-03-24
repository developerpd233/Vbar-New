import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
  Image
} from 'react-native';
import { Avatar, BComponent, GAmeDropDown } from '../../components';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const PlayArea = props => {


  const [infoText, setInfoText] = useState(false);

  const [infoText2, setInfoText2] = useState(false);
  const [infoText3, setInfoText3] = useState(false);
  const [infoText4, setInfoText4] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState('');

  const { users } = props;
  const handleInfo = index => {
    setSelectedIndex(index);
    setInfoText(!infoText);
  };
  
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}>
      {users && users?.length ? users?.map((item, index) => {
   
        return (
          <View style={{ paddingBottom: 10}} key={index} >
            <View
              key={index}
              style={{
                height: deviceHeight * 0.2,
                marginBottom: 12,
              }}>
              <View>

                <Avatar avtrimg={item?.imageUrl} Avtarname={item.name} />

                <View style={styles.infoView}>
                  <TouchableOpacity onPress={() => props.GotoDetail(item)}>
                    <Text style={styles.info}>info</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => props.Gocghat(item)}>  
                    <Text style={styles.chat}>chat</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {(users?.length < 2 ? true : [index + 1] % 2 === 0) && (
              <View
                style={{
                  zIndex: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: deviceHeight * -0.03,
                  marginTop: deviceHeight * 0.05,
                  right: deviceWidth * (users?.length < 2 ? -0.25 : 0.2),
                }}>
                <View style={[styles.componentb]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginLeft: 10,
                      zIndex: 1,
                    }}>
                    <GAmeDropDown
                      droppScreen={props.droppScreen}
                      plce={props.plce}
                      location={props.location}
                    />
                  </View>
                  <BComponent
                    title={props.areaname}
                    ima={props.andicationimg}
                  />
                </View>
              </View>
            )}
          </View>
        );
      }) : null}


    </View>
  );

};

export default PlayArea;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  titleView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
    flexDirection: 'row',
  },
  title: {
    fontFamily: 'Monoton-Regular',
    fontSize: 70,
    color: '#ffff',
    shadowColor: '#f705a7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 20,
    textShadowColor: '#D1179B',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    fontWeight: '900',
  },
  avtrname: {
    shadowColor: '#f705a7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 20,
    textShadowColor: '#D1179B',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  containerdiv: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: deviceHeight * 1.5,
  },
  info: {
    flex: 1,
    zIndex: 2,
    fontFamily: 'Futura',
    fontSize: 14,
    color: '#ffff',
    shadowColor: '#f705a7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: .2,
    shadowRadius: 10,
    elevation: 20,
    textShadowColor: '#D1179B',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    fontWeight: '900',
  },
  chat: {
    zIndex: 2,
    fontFamily: 'Futura',
    fontSize: 14,
    color: '#ffff',
    shadowColor: '#f705a7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: .2,
    shadowRadius: 10,
    elevation: 20,
    textShadowColor: '#D1179B',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    fontWeight: '900',
  },
  infoView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    zIndex: 9,
  },
  componentb: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingBottom: deviceHeight * 0.07,
    paddingTop: deviceHeight * 0.07,
  },
});
