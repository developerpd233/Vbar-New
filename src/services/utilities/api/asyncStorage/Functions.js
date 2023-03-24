import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {TOKEN, USER} from "./Constants";

export const _setDataToAsyncStorage = async (key, data) => {
    try {
        await AsyncStorage.setItem(key, data);
    } catch (error) {
        console.log('error', error)
    }
};

export const getValueIntoAsyncStorage = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value
        } else {
            return null
        }

    } catch (error) {
        return null
    }
};

export const getTokenAndSetIntoHeaders = async (token) => {
    if (token) {
        axios.defaults.headers['Authorization'] = `Bearer ${token}`;

    } else {
        let accessToken = await getValueIntoLocalStorage(TOKEN);
        console.log("🚀 ~ file: Functions.js ~ line 35 ~ getTokenAndSetIntoHeaders ~ accessToken", accessToken)

        if (accessToken) {
            axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

        }
    }
};

export const removeUserDetail = async () => {
    await AsyncStorage.removeItem(TOKEN);
};

export const getValueIntoLocalStorage = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value
        } else {
            return null
        }

    } catch (error) {
        return null
    }
};

export const getToken = async (value) => {
    let token;

    if(value) {
        token = value
    } else {
        token = await getValueIntoLocalStorage(TOKEN)
    }

    if (token !== null) {
        axios.defaults.headers['Authorization'] = `Bearer ${token}`;
        return token;
    } else {
        return null
    }
};
