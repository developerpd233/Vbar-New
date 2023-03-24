import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Vlogo from '../../assests/Vlogo.png';
import { BASE_URL } from '../../config/WebServices';
import { useSelector } from 'react-redux';
import { totalSize } from 'react-native-dimension';
import arrowback from '../../assests/arrowback.png';
import { useNavigation } from '@react-navigation/native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const Header = (props) => {
    
    const {status} = props
    const navigation = useNavigation();

    const token = useSelector(state => state.signUpToken);
    console.log("🚀 ~ file: index.js:27 ~ Header ~ token:", token)
    const user = useSelector(state => state?.user?.id);

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
            navigation.navigate('Detailscreen', { data: response?.data });
          })
          .catch(function (error) {
            console.log(error);
          });
    
      };
    
    return (
        <View>
        {Platform.OS === 'ios' ? (
            <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                paddingBottom: deviceHeight * 0.06,
            }}>
            {status === 'parent' ? (    
            <TouchableOpacity style={{ alignSelf: 'flex-start', position: 'absolute', left: 0 }} onPress={() => GotoDetail()}>
                <View onPress={() => alert('jjj')}
                style={styles?.avtr}>
                <Text numberOfLines={1} style={styles.avtrname}>Profile</Text>
                <Text numberOfLines={1} style={styles.avtrname1}>Profile</Text>
                </View>
            </TouchableOpacity>
            ) : (
            <TouchableOpacity style={styles.aerrowbackios} onPress={() => {navigation?.goBack()}}>
                <Image
                    style={{ width: '100%', height: '100%' }}
                    source={arrowback}
                />
            </TouchableOpacity>
            )}    
                
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
            {status === 'parent' ? (
            <TouchableOpacity style={{ alignSelf: 'flex-start', position: 'absolute', left: 0 }} onPress={() => GotoDetail()}>
                <View onPress={() => alert('jjj')}
                    style={styles?.avtr}>
                    <Text numberOfLines={1} style={styles.avtrname}>Profile</Text>
                    <Text numberOfLines={1} style={styles.avtrname1}>Profile</Text>
                </View>
            </TouchableOpacity>
            ) : (
            <TouchableOpacity style={styles.aerrowback} onPress={() => {navigation?.goBack()}}>
                <Image
                    style={{ width: '100%', height: '100%' }}
                    source={arrowback}
                />
            </TouchableOpacity>                
            )}
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
        </View>
    );
};

export default Header

const styles = StyleSheet.create({
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
    aerrowback: {
        width: deviceWidth * 0.11,
        height: deviceHeight * 0.03,
        alignSelf: 'flex-start', 
        position: 'absolute', 
        left: 0
    },
    aerrowbackios: {
        width: deviceWidth * 0.1,
        height: deviceHeight * 0.03,
        alignSelf: 'flex-start', 
        position: 'absolute', 
        left: 0
    },
}) 