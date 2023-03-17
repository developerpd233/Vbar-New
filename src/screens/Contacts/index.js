import React, { useState, useEffect } from 'react';

import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    Image, TouchableOpacity, ActivityIndicator
} from 'react-native';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import LinearGradient from 'react-native-linear-gradient';
import { totalSize } from 'react-native-dimension';
import Vlogo from '../../assests/Vlogo.png';
import VBAR from '../../assests/VBAR.png';
import { useSelector } from 'react-redux';
import arrowback from '../../assests/arrowback.png';
import age from '../../assests/age.png';
import smile from '../../assests/smile.png';
import avatr from '../../assests/avatr.png';
import swinming from '../../assests/swinming.png';
import heart from '../../assests/heart.png';
import gender from '../../assests/gender.png';
import { handleError } from '../../components/toast';
import FastImage from 'react-native-fast-image';
import { BASE_URL } from '../../config/WebServices';

const Contacts = ({ navigation = { goBack, navigate }, route }) => {

    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = useSelector(state => state.signUpToken);

    useEffect(() => {
        setLoading(true);
        get();
    }, [])

    const get = () => {
        var axios = require('axios');
        let url = `${BASE_URL}/chat/getContacts`;
        var config = {
            method: 'get',
            url: url,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios(config)
            .then(function (response) {
                console.log('response', response?.data);
                if (response?.data?.status === 'success') {
                    setContacts(response?.data?.users)
                }
            })
            .catch(function (error) {
                console.log('errrrrrrrrrrrrrr', error?.response?.data)
                handleError(error?.response?.data?.error || error?.response?.data)
            })
            .finally(() => setLoading(false))

    };

    const GotoChatScreen = async (id) => {
        var axios = require('axios');
        let url = `${BASE_URL}/users/findUser/${id}`;
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
                handleError(error?.response?.data?.error || error?.response?.data)
            });
    };

    const renderListItem = (contact, i) => {
        console.log('contact', contact)
        return (
            <TouchableOpacity
                key={i}
                onPress={() => GotoChatScreen(contact?.id)}
                style={{ ...styles.userListItem, alignItems: 'center'}}>
                <View style={styles.userListItemAvatarContainer}>
                    <FastImage progressiveRenderingEnabled={true} resizeMode='cover' source={{ uri: contact?.imageUrl, priority: FastImage.priority.high }} style={{ height: '100%', width: '100%' }} />
                </View>
                <View style={{ ...styles.userListItemLeft, justifyContent: 'center' }}>
                    

                {Platform.OS === 'ios' ? (
                         <View style={styles.headingRow} >
                         <Text style={{...styles.userListItemTitle,marginLeft:50}}  numberOfLines={1} >{contact?.name || ''}</Text>
                     </View>   
                     ) : (
                        <View style={{...styles.headingRow}} >
                        <Text style={{...styles.userListItemTitle,marginLeft:50}}  numberOfLines={1} >{contact?.name || ''}</Text>
                    </View>
                    )}
                   
                <View style={{ ...styles.userListItemLeft, marginLeft:0, flexDirection:'row' }}>
                    <View style={styles.headingRow}>
                        <Image style={styles.userImage2} source={swinming} />
                        <Text style={{...styles.userListItemText,marginLeft:4}}>
                            {contact?.relationPreference}
                        </Text>
                    </View>
                    <View style={{...styles.headingRow,marginLeft:-11}} >
                        <Text style={{...styles.userListItemText}}>
                            <View style={{ ...styles?.userImage}} ><Image style={{...styles.userImage,marginTop:2}} source={heart} /></View> {contact?.interest}
                        </Text>
                    </View>
                    </View> 
                </View>
            </TouchableOpacity>
        )
    };

    return (
        <LinearGradient
            colors={['#CA60FF', '#502E78']}
            style={{ height: Dimensions.get('window').height }}
            start={{ x: 93.75, y: 406 }}
            end={{ x: 281.25, y: 406 }}>
            <View style={styles.container}>
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
                            paddingBottom: deviceHeight * 0.04,
                            // marginTop: deviceHeight * 0.05,
                            zIndex: 0,
                        }}>
                        <View
                            style={{ width: deviceWidth * 0.6, height: deviceHeight * 0.1 }}>
                            <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={VBAR} />
                        </View>
                    </View>
                ) : (
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingBottom: deviceHeight * 0.05,
                            zIndex: 0,
                        }}>
                        <View
                            style={{ width: deviceWidth * 0.6, height: deviceHeight * 0.1 }}>
                            <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={VBAR} />
                        </View>
                    </View>
                )}
                <ScrollView>
                    {!loading ? contacts && contacts?.length ? <View style={styles.container1}>
                        {contacts?.map((contact, i) => { return renderListItem(contact, i) })}
                    </View> : null : <ActivityIndicator color={'white'} size='large' />}
                </ScrollView>
            </View>
        </LinearGradient>
    );
};

export default Contacts;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        // paddingBottom: 95,
    },
    container1: {
        flex: 1,
    },

    title: {
        fontFamily: 'Monoton-Regular',
        fontSize: totalSize(7.2),
        color: '#D1179B',

    
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
        marginTop: deviceHeight * 0.02,
        position: 'relative',
        zIndex: 1,
    },

    userList: {
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    userListItem: {
        borderRadius: 10,
       
       
        borderColor: '#D1179B',
        borderBottomWidth:1,
        borderWidth: 0,
    
        //elevation: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
        flexDirection: 'row',
    },
    userListItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userListItemAvatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 42,
        borderWidth: 1,
        borderColor: '#000',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userListItemAvatar: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    userListItemLeft: {
        flexDirection: 'column',
        flex: 1,
        marginLeft: 15,
        marginTop:5
    },
    userListItemTitle: {
        marginRight: 15,
        fontSize: 18,
        color: '#FFF',
        marginTop:-2
    },
    userListItemText: {
        marginRight: 25,
        fontSize: 13,
        color: '#FFF',
        alignItems: 'center',
        marginTop: 0
    },
    headingRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        
        alignItems: 'center',
    },

    listItemText: {
        marginRight: 15,
        fontSize: 11,
        color: '#B4B4B4',
        // marginTop: 5
    },
    userImage: {
        width: 13,
        height: 13,
    justifyContent:'center',
        resizeMode: 'contain',
        alignItems: 'center',
    },
    userImage2: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
        alignItems: 'center',
        marginLeft:0,
        paddingRight:10
    }
});
