import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Qrimage from '../../assests/Qrimage.png'
import LinearGradient from 'react-native-linear-gradient';
import { totalSize } from 'react-native-dimension';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import { BUtton, Scaner } from '../../components';
import { useDispatch } from 'react-redux';
import { storeId } from '../../store/actions';
import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';


const QrCode = ({ navigation }) => {

  const dispatch = useDispatch();

  const handle = () => {
    dispatch(storeId('1'));
    navigation.navigate('SignupScreen');
  };
  // useEffect(() => {
  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage,
  //     );
  //   // navigation.navigate('Chatscreen');

  //     // navigation.navigate(remoteMessage.data.type);
  //   });
  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open
  // try {
    
  // } catch (error) {
  //   console.log("🚀 ~ file: App.js:74 ~ useEffect ~ error", error)
    
  // }
    
  // // try {
  // //   messaging()
  // //     .getInitialNotification()
  // //     .then(remoteMessage => {
  // //       if (remoteMessage) {
  // //         console.log(
  // //           'Notification caused app to open from quit state:',
  // //           remoteMessage
  // //         );
  // //   // navigation.navigate('Chatscreen');

  // //         // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
  // //       }
  // //       // setLoading(false);
  // //     });
  // // } catch (error) {
  // //   console.log("🚀 ~ file: App.js:92 ~ useEffect ~ error", error)
    
  // // }
  // // try {
  // //   messaging().onNotification = (notification) => {
  // //     console.log('NOTIFICATIONNOTIFICATIONNOTIFICATION:', notification);
  // //     if (notification.foreground) {
  // //       console.log('first', notification)
  // //       //Diplay the remote notification 
  // //        //This->do not work (loop and notification when app closes)
  // //       //PushNotification.localNotification({message:notification.message,details:{repeted:true}})
  // //      //Temporal solution
  // //     //  Alert.alert('News from Team', notification.message);
  // //     }
  // //   }
  // // } catch (error) {
    
  // // }
  // //   // Check whether an initial notification is available
    
  // // }, []);
  // const handle = () => {
  //   // alert("ok")
  //   navigation.navigate('SignupScreen');
  // };

  return (
    <SafeAreaView>
      <LinearGradient
        colors={['#CA60FF', '#502E78']}
        style={{ height: Dimensions.get('window').height }}
        start={{ x: 93.75, y: 669.5 }}
        end={{ x: 281.25, y: 669.5 }}>

        <ScrollView>
          <View style={styles.container}>
            <View style={styles.titleView}>
              <Text style={styles.title}>QR Code</Text>
              <Text style={styles.title}>Scan Screen</Text>
              <Text style={styles.title1}>QR Code</Text>
              <Text style={styles.title1}>Scan Screen</Text>
            </View>
            <View style={styles.ScannerView}>
              <Scaner />
              </View>
             {/*<View style={styles.buttView}><BUtton functionName={handle} type="scan" title="Go Signup" /></View> */}
             </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default QrCode;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontFamily: 'Monoton-Regular',
    fontSize: totalSize(4.0),
    color: '#D1179B',


    textShadowColor: '#D1179B',
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 4,

  },
  title1: {
    fontFamily: 'Monoton-Regular',
    fontSize: totalSize(4),
    color: '#ffff',
    top: deviceHeight * -0.14,
    left: deviceWidth * 0,
    right: deviceWidth * 0,
    bottom: deviceHeight * 0,


    textShadowColor: '#D1179B',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 40,
  },

  titleView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: deviceWidth * 0.01,
    paddingBottom: 0,
  },
  ScannerView: {
    paddingBottom: deviceWidth * 0.05,
  },
  ScButtons: {
    fontFamily: 'Futura',
    fontSize: totalSize(2),
    color: '#FFF',
  },
});
