/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useCallback, useEffect } from 'react';
import Routing from './src/route';

import { Provider, useDispatch, useSelector } from 'react-redux';

import store from './src/store';
import { persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  TouchableOpacity,
  View,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';

import { initStripe, useStripe , CardField, useConfirmPayment ,   } from '@stripe/stripe-react-native';
import Toast from 'react-native-toast-message';
// import RNBootSplash from "react-native-bootsplash";
import { useNavigation } from '@react-navigation/native';
import { connectionSocket } from './src/socket';
import {interceptor} from "./src/services/utilities/api/intercepter";
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';
import { requestNotifications } from 'react-native-permissions';
 
const App = (props) => {

  MMKV = new MMKVLoader().initialize();

  interceptor();
  const user = useSelector(state => state.user);
  const [openSettingsForNotifications] = useMMKVStorage('openSettingsForNotifications', MMKV, false)

const navigation = useNavigation();
console.log("🚀 ~ file: App.js:39 ~ App ~ navigation", navigation)
const {confirmPayment, loading} = useConfirmPayment();
const dispatch = useDispatch();

  const { handleURLCallback } = useStripe();

async function requestUserPermission() {
  try {
    const authStatus = await messaging().requestPermission();
const notiStatus =    await messaging().requestPermission({ providesAppNotificationSettings: true });
console.log('notiStatus', notiStatus)
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
console.log('enabledenabledenabled', authStatus, )
  if (enabled) {
    try {
    const token = await messaging().getToken();
    await requestNotifications(['alert', 'badge', 'sound']);
    const instanceId = await iid().get();
    const registrationToken = await messaging().getToken();
    console.log('registrationToken', registrationToken)
      
    } catch (error) {
      console.log('errorerrorerror =>>>>>>>>>', error)
      
    }
    storeFCM(token)
    

  }
  } catch (error) {
    storeFCM('token')

    console.log('errorerrorObject', error)
    
  }
  
}
useEffect(() => {
  if (openSettingsForNotifications) {
    console.log('openSettingsForNotifications', openSettingsForNotifications)
  }
}, [openSettingsForNotifications])

useEffect(() => {
  messaging()
      .getDidOpenSettingsForNotification()
      .then(async didOpenSettingsForNotification => {
          if (didOpenSettingsForNotification) {
            console.log('didOpenSettingsForNotification', didOpenSettingsForNotification)
          }
      })
}, [])


useEffect(() => {
  (async () => {
    await connectionSocket(user, dispatch);
  })();
}, []);

const storeFCM = async (FCM_TOKEN) => {
  try {
    const FCM = FCM_TOKEN
    console.log(":rocket: ~ file: App.js ~ line 41 ~ storeFCM ~ FCM", FCM)
    await AsyncStorage.setItem('FCM_TOKEN', FCM)
  } catch (e) {
    AsyncStorage.setItem('FCM_TOKEN', FCM)
    console.log(":rocket: ~ file: App.js ~ line 25 ~ storeFCM ~ e", e)
  }
}
useEffect(() => {

  messaging().requestPermission().then((flag)=>{
    console.log("registeredregisteredregisteredregistered", flag);
  }).catch((err)=>{
    console.log("messagemessagemessagemessage", err);
  });

  messaging().registerDeviceForRemoteMessages().then((flag)=>{
    console.log("registeredregisteredregisteredregistered", flag);
  }).catch((err)=>{
    console.log("messagemessagemessagemessage", err);
  });
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage,
    );
    const data=  JSON.parse(remoteMessage.data.user)

    navigation.navigate('Chatscreen' ,{data: {user: data}})
    // navigation.navigate(remoteMessage.data.type);
  });
  // Assume a message-notification contains a "type" property in the data payload of the screen to open
try {
  
} catch (error) {
  console.log("🚀 ~ file: App.js:74 ~ useEffect ~ error", error)
  
}
  
try {
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage
        );
          const data=  JSON.parse(remoteMessage.data.user)
          console.log("🚀 ~ file: App.js:93 ~ useEffect ~ data", data)


        navigation.navigate('Chatscreen' ,{data: {user: data}})
        // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
      // setLoading(false);
    });
} catch (error) {
  console.log("🚀 ~ file: App.js:92 ~ useEffect ~ error", error)
  
}

  // Check whether an initial notification is available
  
}, []);

useEffect(() => {
  const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    console.log("🚀 ~ file: App.js:114 ~ unsubscribe ~ remoteMessage", remoteMessage)
    
    const data=  JSON.parse(remoteMessage.data.user)
    PushNotification.localNotification({
      
      message: remoteMessage?.notification?.body,
      title: remoteMessage?.notification?.title,
    });
    PushNotification.configure({
      onNotification: function (notification) {
        if (notification.userInteraction) {
        navigation.navigate('Chatscreen' ,{data: {user: data}})
          // Handle notification click

        }
    
      },
    });
    
    // if(remoteMessage.onOpen()){
    //   console.log('1-------------------', 1)
    // } else {
    //   console.log('2---------------', 2)
    // }
          console.log("🚀 ~ file  : App.js:93 ~ useEffect ~ data", data)


        // navigation.navigate('Chatscreen' ,{data: {user: data}})
  });
  return unsubscribe;
}, []);
const fetchPaymentIntentClientSecret = async () => {
  const response = await fetch(`http://134.122.30.185:7000/stripe/create-payment-intent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      currency: 'usd',
      // paymentMethodType:'Card'
    }),
  });
  console.log("🚀 ~ file: App.js:152 ~ fetchPaymentIntentClientSecret ~ response", response)

  const {clientSecret} = await response.json();

  return clientSecret;
};

const handlePayPress = async () => {

  
  try {
  const clientSecret = await fetchPaymentIntentClientSecret();
  const billingDetails = {
    email: 'developerpd233@gmail.com',
  };
  try {
    const {paymentIntent, error} = await confirmPayment(clientSecret, {
      paymentMethodType:'Card',
      
      paymentMethodData: {
        billingDetails,
      },
    });
    console.log("🚀 ~ file: App.js:182 ~ handlePayPress ~ paymentIntent", paymentIntent , error)
  } catch (error) {
    console.log("🚀 ~ file: App.js:184 ~ handlePayPress ~ error", error)
    
  }
  
    console.log("🚀 ~ file: App.js:167 ~ handlePayPress ~ clientSecret", clientSecret)
    
    
  } catch (error) {
    console.log("🚀 ~ file: App.js:170 ~ handlePayPress ~ error", error)
    
  }

  // Fetch the intent client secret from the backend.
};

  const handleDeepLink = useCallback(
    async (url) => {
      if (url) {
        const stripeHandled = await handleURLCallback(url);
        if (stripeHandled) {
          // This was a Stripe URL - you can return or add extra handling here as you see fit
        } else {
          // This was NOT a Stripe URL – handle as you normally would
        }
      }
    },
    [handleURLCallback]
  );

  useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      handleDeepLink(initialUrl);
    };

    getUrlAsync();
    try {
    requestUserPermission()
      
    } catch (error) {
      console.log('errorerrorerrorerrorerrorerrorerror', error)
      
    }
    const deepLinkListener = Linking.addEventListener(
      'url',
      (event) => {
        handleDeepLink(event?.url);
      }
    );

    return () => deepLinkListener.remove();
  }, [handleDeepLink]);

  let stripeConfig = {
    publishableKey: "pk_test_51LQ0OXJS9L689CIWWcUIY70aBnPIeN3O6atdzjE08ulzdfCIR1me4ygADcGLB85hCfvqUxTY77uJhHEWeLuloc8i004BmP88tT",
    merchantIdentifier: "merchant.identifier",
  };

  useEffect(() => {
    (async () => {
      await initStripe(stripeConfig);
    })();
  }, []);

  return (
    <>
   {/* <Provider store={store}> */}
    {/* </Provider> */}

      <PersistGate loading={null} persistor={persistor}>
  
        <Routing />
      </PersistGate>
      <Toast ref={(ref) => Toast.setRef(ref)} />
      </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
