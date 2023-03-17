import React, { useRef, useState } from 'react';
import {
  Image,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import signupAvatr from '../../assests/signupAvatr.png';
import { TextField, Selecter, BUtton } from '../../components';
import LinearGradient from 'react-native-linear-gradient';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import { width, height, totalSize } from 'react-native-dimension';
import Vlogo from '../../assests/Vlogo.png';
import { createUser, verifyOTP } from '../../services/utilities/api/auth';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addUserDetail, getToken } from '../../store/actions';
import { handleError } from '../../components/toast';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignUp = ({ navigation, route }) => {
  console.log("🚀 ~ file: index.js ~ line 29 ~ SignUp ~ route", route)

  // const [relation, setrelation] = useState('qwe');
  // const [age, setage] = useState('18 - 20');
  // const [Identify, setIdentify] = useState('Male');
  // const [interest, setinterest] = useState('Male');
  // const [name, setName] = useState('qwe');
  // const [drink, setDrink] = useState('qwe');
  // const [song, setSong] = useState('qwe');
  // const [hobbies, setHobbies] = useState('qwe');
  // const [dislikes, setDislikes] = useState('qwe');


  const [code, setCode] = useState();
  console.log("🚀 ~ file: index.js ~ line 43 ~ SignUp ~ code", code)
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const id = useSelector(state => state?.qrId);
  const token = useSelector(state => state.signUpToken);
  console.log('--->', token);
  console.log('id----->', id);

  const handleSetItem = async (token)=>{
    console.log('token', token)
    try {
      await AsyncStorage.setItem("TOKEN", token);
  } catch (error) {
      console.log('error', error)
  }
  };

  const handleSignUp = async () => {
    const { name, Identify, interest, age, relation, drink, song, hobbies, dislikes, id, email , fcmToken } = route?.params || {}
    setloading(true);

    try {
      let response = await verifyOTP(
        name,
        Identify,
        interest,
        age,
        relation,
        drink,
        song,
        hobbies,
        dislikes,
        id,
        email,
        code,
        fcmToken
      );
      console.log('tokentokentokentokentokentokentoken', response)
      if (response.data.status === 'failed') {
        handleError(response.data.message);
      } else {
        dispatch(addUserDetail(response?.data?.user))
        dispatch(getToken(response.data.token));
        handleSetItem(response.data.token)

        navigation.navigate('SelfiScreen');
        
      }

      setloading(false);
      // navigation.navigate('SelfiScreen');
      // console.log(response.data.token, '===>signup');
    } catch (error) {
      console.log("🚀 ~ file: index.js ~ line 96 ~ handleSignUp ~ error", error, name,
        Identify,
        interest,
        age,
        relation,
        drink,
        song,
        hobbies,
        dislikes,
        id,
        email,
        fcmToken,
        code)
      handleError(error?.response?.data?.error);
      // console.log('Error: ', error?.response?.data);
      setloading(false);
      // console.log('Error: ', error?.response?.data?.msg);
      // navigation.navigate('SelfiScreen');
    }


  };


  return (
    // <SafeAreaView >
    <LinearGradient
      colors={['#CA60FF', '#502E78']}
      style={{ height: Dimensions.get('window').height, ...(Platform.OS === 'ios' && { paddingTop: 40 }) }}
      start={{ x: 93.75, y: 669.5 }}
      end={{ x: 281.25, y: 669.5 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}>
        <ScrollView>
          <View style={styles.container}>
            {Platform.OS === 'ios' ? (
              <View style={styles.titleView}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <View
                    style={{
                      width: deviceWidth * 0.5,
                      height: deviceHeight * 0.2,
                    }}>
                    <Image
                      style={{ width: '100%', height: '100%', alignSelf: 'center', justifyContent: 'center', resizeMode: 'contain' }}
                      source={Vlogo}
                    />
                  </View>
                  {/* <Text style={styles.title}>Sign in</Text>
                        <Text style={styles.title1}>Sign in</Text> */}
                </View>
                <View
                  style={{
                    width: deviceWidth * 0.3,
                    height: deviceHeight * 0.3,
                    position: 'absolute',
                    left: deviceWidth * .62,
                  }}>
                  <Image
                    source={signupAvatr}
                    style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.titleView}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <View
                    style={{
                      width: deviceWidth * 0.5,
                      height: deviceHeight * 0.2,
                    }}>
                    <Image
                      style={{ width: '100%', height: '100%', alignSelf: 'center', justifyContent: 'center', resizeMode: 'contain' }}
                      source={Vlogo}
                    />
                  </View>
                  {/* <Text style={styles.title}>Sign in</Text>
                      <Text style={styles.title1}>Sign in</Text> */}
                </View>
                <View
                  style={{
                    width: deviceWidth * 0.3,
                    height: deviceHeight * 0.3,
                    position: 'absolute',
                    left: deviceWidth * .62,
                  }}>
                  <Image
                    source={signupAvatr}
                    style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                  />
                </View>
              </View>
            )}
            <View style={{ paddingBottom: 50, justifyContent: 'center', flexDirection: 'column', display: 'flex', alignItems: 'center' }}>
            <Text style={styles.otpText} >Please Enter OTP</Text>
              <OTPInputView
                style={{ width: '80%', height: 300, alignSelf: 'center' }}
                pinCount={4}
                secureTextEntry={true}
                code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                onCodeChanged={code => { setCode(code) }}
                autoFocusOnLoad
                // onCodeFilled={()=> handleSignUp()}
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}

              />
            </View>
            {/* <Text style={styles.errorText} >{error}</Text> */}
            <View style={styles.buttView}>
              <BUtton
                loading={loading}
                functionName={handleSignUp}
                type="scan"
                title="Verify"
              />
            </View>

            {/* <View style={{ paddingBottom: 50 }}>
                <View style={{ marginBottom: 10 }}>
                  <TextField
                    label="My Name"
                    placeholder="User Name"
                    value={name}
                    setValue={setName}
                    ref={nameRef}
                    returnKeyType="next"
                  />
                </View>
                <View style={{ marginBottom: 10 }}>
                  <TextField
                    label="Email"
                    placeholder="User Email"
                    value={email}
                    setValue={setEmail}
                    ref={nameRef}
                    returnKeyType="next"
                  />
                </View>
                <View style={{ zIndex: 10, marginBottom: 10 }}>
                  <Selecter
                    items={items3}
                    labels="I Identify As"
                    placeholder="I Identify As"
                    value={Identify}
                    onPress={value => setIdentify(value)}
                    getIdentify={getIdentify}
                  />
                </View>
                <View style={{ zIndex: 9, marginBottom: 10 }}>
                  <Selecter
                    items={items2}
                    onPress={value => setinterest(value)}
                    labels="I’m Interested in:"
                    value={interest}
                    getInterested={getInterested}
                  />
                </View>
                <View style={{ zIndex: 8 }}>
                  <Selecter
                    items={items}
                    labels="My Age:"
                    placeholder="My Age :"
                    value={age}
                    onPress={value => setage(value)}
                    getAge={getAge}
                  />
                </View>
                <View style={{ zIndex: 7 }}>
                  <Selecter
                    items={items4}
                    labels="My Relationship Preference "
                    placeholder="My Relationship:"
                    value={relation}
                    onPress={value => setrelation(value)}
                    getRelationship={getRelationship}
                  />
                </View>
                <View style={styles.textVie}>
                  <TextField
                    label="My favorite drink:"
                    placeholder="My Favorite Drink"
                    value={drink}
                    setValue={setDrink}
                    ref={drinkRef}
                    onSubmitEditing={() => songRef?.current?.focus()}
                    returnKeyType="next"
                  />
                </View>
                <View style={styles.textVie}>
                  <TextField
                    label="My favorite song: "
                    placeholder="My Favorite Song"
                    value={song}
                    setValue={setSong}
                    ref={songRef}
                    onSubmitEditing={() => hobbiesRef?.current?.focus()}
                    returnKeyType="next"
                  />
                </View>
                <View style={styles.textVie}>
                  <TextField
                    label="My Hobbies :"
                    placeholder="My Hobbies"
                    value={hobbies}
                    setValue={setHobbies}
                    ref={hobbiesRef}
                    onSubmitEditing={() => disLikesRef?.current?.focus()}
                    returnKeyType="next"
                  />
                </View>
                <View style={styles.textVie}>
                  <TextField
                    label="My Dislikes :"
                    placeholder="My Dislikes"
                    value={dislikes}
                    setValue={setDislikes}
                    ref={disLikesRef}
                  />
                </View>
                <Text style={styles.errorText} >{error}</Text>
                <View style={styles.buttView}>
                  <BUtton
                    loading={loading}
                    functionName={handleSignUp}
                    type="scan"
                    title="Sign up"
                  />
                </View>
              </View> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
    // </SafeAreaView>
  );
};

export default SignUp;
const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
  buttView: {
    marginTop: 0,
    paddingBottom: 40,
  },

  otpText: {
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
    marginTop: 50,
  },
});
