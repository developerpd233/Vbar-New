import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import selfibg from '../../assests/selfibg.png';
import Vlogo from '../../assests/Vlogo.png';
import { BUtton, TextField } from '../../components';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import arrowback from '../../assests/arrowback.png';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export const Payment = ({ navigation, route }) => {

  const { goBack } = useNavigation();
  const token = useSelector(state => state.signUpToken);
  const [cardNumber, setCardnumber] = useState();
  const [Name, setName] = useState();
  const [Cvc, setCvc] = useState();
  const [Expire, SetExpire] = useState();

  console.log('params', route?.params);

  const { type, user } = route?.params

  const handle = async () => {
    console.log(cardNumber, Name, Cvc, Expire, "=>>>>>>payment")
    if (cardNumber?.length && Name?.length && Cvc?.length && Expire?.length) {
      // navigation.navigate('Detailscreen');
      try {
        var axios = require('axios');
        let url = `http://134.122.30.185:8000/api/payment/one-time-payment?${287}`;
        var config = {
          method: 'post',
          url: url,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        console.log('config', config)
        await axios(config)
          .then(function (response) {
            console.log('response--=--=-->', response?.data);
            // navigation.navigate('Detailscreen', { data: response?.data });
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (e) {
        console.log('eeeeeee', e)
      }
      alert("payment-Done")
    }
  }
  return (
    <ImageBackground
      style={{ height: Dimensions.get('window').height * 1.2 }}
      source={selfibg}
      resizeMode="cover">
      <View style={styles.container}>
        <TouchableOpacity
          // style={Styles.aerrowbackios}
          onPress={() => {
            goBack && goBack();
          }}>
          <Image style={{ marginTop: 20, marginLeft: 50 }} source={arrowback} />
        </TouchableOpacity>
        <View style={styles.containercenter}>
          <View style={{ width: deviceWidth * 0.5, height: deviceHeight * 0.12 }}>
            <Image style={{ width: '100%', height: '100%' }} source={Vlogo} />
          </View>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={100}>
          <ScrollView>
            <View style={styles.containerFielsd}>
              <View style={styles.containerFielsdsingle}>
                <TextField
                  label="Card Number :"
                  placeholder="Card Number"
                  value={cardNumber}
                  setValue={setCardnumber}
                />
              </View>
              <View style={styles.containerFielsdsingle}>
                <TextField
                  label="Name:"
                  placeholder="Name"
                  value={Name}
                  setValue={setName}
                />
              </View>
              <View style={styles.containerFielsdsingle}>
                <TextField
                  label="Cvc:"
                  placeholder="Cvc"
                  value={Cvc}
                  setValue={setCvc}
                />
              </View>
              <View style={styles.containerFielsdsingle}>
                <TextField
                  label="Exipire-Date :"
                  placeholder="Exipire-Date "
                  value={Expire}
                  setValue={SetExpire}
                />
              </View>


            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <View>
          <BUtton title="Submit" functionName={handle} />
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  containercenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerFielsd: {
    marginTop: deviceHeight * 0.09,
  },
  containerFielsdsingle: {
    marginBottom: deviceHeight * 0.03,
  },
});
