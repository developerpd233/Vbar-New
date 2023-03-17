/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import store from './src/store';
import { persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import {interceptor} from "./src/services/utilities/api/intercepter";
import messaging from '@react-native-firebase/messaging'
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';

MMKV = new MMKVLoader().initialize();
try {
    messaging().setOpenSettingsForNotificationsHandler(async () => {
        // Set persistent value, using the MMKV package just as an example of how you might do it
        MMKV.setBool(openSettingsForNotifications, true)
    })
} catch (error) {
    console.log('error Notifcation Index js', error)
}

// interceptor();

const vbar = () =>{
    return(
    <Provider store={store}>

<NavigationContainer >
            
        <App/>
    </NavigationContainer>
    </Provider>

    )
   

}

AppRegistry.registerComponent(appName, () => vbar);
