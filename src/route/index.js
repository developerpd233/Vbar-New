import React, { useState, useEffect } from 'react';
import {
  SignUp,
  QrCode,
  SelfiScreen,
  VbarScreen,
  GameZoneScreen,
  Foodarea,
  PatioLounge,
  BarScreen,
  ChatScreen,
  DeatailScreen,
  SplashScreen,
  Payment,
  Success,
  False,
  Contacts,
  OTP,
  ContentManagment
} from '../screens';
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Platform, Text, Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { connectionSocket } from '../socket';
import socket from '../socket';
import { addSocketUser, socketUser } from '../store/actions';

const Stack = createNativeStackNavigator();

const Routing = () => {

  const token = useSelector(state => state.signUpToken);
  const user = useSelector(state => state.user);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  const [Splashscreen, setSplashscreen] = useState(true);
  useEffect(() => {
    // (async () => {
    //   await connectionSocket(user, dispatch);
    // })();

    setTimeout(() => {
      setSplashscreen(false);
    }, 4000);
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        // this.navigate(url);
      });
    } else {
      Linking.addEventListener('url', handleOpenURL());
    }
  })

  const handleOpenURL = (event) => { // 
    console.log('first', event)
    // alert('ddd')
    // this.navigate(event.url);
  }

  const linking = {
    prefixes: ['VbarApp://'],
    config: {
      initialRouteName: 'qrScreen',
      screens: {
        Success: {
          path: 'Success'
        },
        False: {
          path: 'False'
        }
      }
    }
  };

  return (
      <Stack.Navigator
      
       
        screenOptions={{
          headerShown: false,
        }}>

{Splashscreen ? (
          <Stack.Screen
            options={{
              headerShown: false,
              title: '',
              headerStyle: {
                backgroundColor: '#CA60FF',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },

            }}
            name="splashscreen"
            component={SplashScreen}
          />
        ) : null}
       

        <Stack.Screen
          options={{
            headerShown: false,
            title: '',
            statusBarColor: '#D1179B',
            headerStyle: {
              backgroundColor: '#CA60FF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          name="qrScreen"
          component={QrCode}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            title: '',
            statusBarColor: '#CA60FF',
            headerStyle: {
              backgroundColor: '#CA60FF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          name="SignupScreen"
          component={SignUp}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            title: '',
            statusBarColor: '#CA60FF',
            headerStyle: {
              backgroundColor: '#CA60FF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          name="SelfiScreen"
          component={SelfiScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            title: '',
            statusBarColor: '#CA60FF',
            headerStyle: {
              backgroundColor: '#CA60FF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          name="QRVbarscreen"
          component={VbarScreen}
        />

        <Stack.Screen
          options={{
            headerShown: false,
            title: '',
            statusBarColor: '#CA60FF',
            headerStyle: {
              backgroundColor: '#CA60FF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          name="GameZonearea"
          component={GameZoneScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            title: '',
            statusBarColor: '#CA60FF',
            headerStyle: {
              backgroundColor: '#CA60FF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          name="foodArea"
          component={Foodarea}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            title: '',
            statusBarColor: '#CA60FF',
            headerStyle: {
              backgroundColor: '#CA60FF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          name="PatioLounge"
          component={PatioLounge}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            title: '',
            statusBarColor: '#CA60FF',
            headerStyle: {
              backgroundColor: '#CA60FF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          name="BARScreen"
          component={BarScreen}
        />

        <Stack.Screen
          options={{
            headerShown: false,
            title: '',
            statusBarColor: '#CA60FF',
            headerStyle: {
              backgroundColor: '#CA60FF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          name="Detailscreen"
          component={DeatailScreen}
        />

<Stack.Screen
          options={{
            headerShown: false,
            title: '',
            statusBarColor: '#CA60FF',
            headerStyle: {
              backgroundColor: '#CA60FF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          name="ContentManagment"
          component={ContentManagment}
        />

        <Stack.Screen
          options={{
            headerShown: false,
            title: '',
            statusBarColor: '#CA60FF',
            headerStyle: {
              backgroundColor: '#CA60FF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          name="Chatscreen"
          component={ChatScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            title: '',
            statusBarColor: '#CA60FF',
            headerStyle: {
              backgroundColor: '#CA60FF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          name="paymentScreen"
          component={Payment}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            title: '',
            statusBarColor: '#CA60FF',
            headerStyle: {
              backgroundColor: '#CA60FF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          name="Success"
          component={Success}
        />

        <Stack.Screen
          options={{
            headerShown: false,
            title: '',
            statusBarColor: '#CA60FF',
            headerStyle: {
              backgroundColor: '#CA60FF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          name="False"
          component={False}
        />

        <Stack.Screen
          options={{
            headerShown: false,
            title: '',
            statusBarColor: '#CA60FF',
            headerStyle: {
              backgroundColor: '#CA60FF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          name="contacts"
          component={Contacts}
        />
 <Stack.Screen
          options={{
            headerShown: false,
            title: '',
            statusBarColor: '#CA60FF',
            headerStyle: {
              backgroundColor: '#CA60FF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          name="OTP"
          component={OTP}
        />
      </Stack.Navigator>

  );
};

export default Routing;
