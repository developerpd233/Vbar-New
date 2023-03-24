import React, {useRef, useState} from 'react';
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
  Linking,
} from 'react-native';
import signupAvatr from '../../assests/signupAvatr.png';
import {TextField, Selecter, BUtton} from '../../components';
import LinearGradient from 'react-native-linear-gradient';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import {width, height, totalSize} from 'react-native-dimension';
import Vlogo from '../../assests/Vlogo.png';
import {createUser, verifyOTP} from '../../services/utilities/api/auth';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {addUserDetail, getToken} from '../../store/actions';
import {handleError} from '../../components/toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useEffect} from 'react';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
import messaging from '@react-native-firebase/messaging';
import ApiSauce from '../../services/networkRequest';
import { AutoFillForm } from '../../config/WebServices';
const SignUp = ({navigation}) => {
  const [userDetails, setUserDetails] = useState()
  const nameRef = useRef(null);
  const drinkRef = useRef(null);
  const songRef = useRef(null);
  const hobbiesRef = useRef(null);
  const disLikesRef = useRef(null);

  const [relation, setrelation] = useState('');
  const [age, setage] = useState('');
  const [email, setEmail] = useState();
  const [privacyCheck, setPrivacyCheck] = useState(false);
  const [agreeCheck, setAgreeCheck] = useState(false);

  const [Identify, setIdentify] = useState('');
  const [interest, setinterest] = useState('');
  const [name, setName] = useState('');
  const [drink, setDrink] = useState('');
  const [song, setSong] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [dislikes, setDislikes] = useState('');
  const [error, setError] = useState('');
  const [fcmToken, setFcmToken] = useState('');
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const [items2, setitems2] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Male & Female', value: 'Male & Female'},
  ]);
  const [items3, setitems3] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Non-Binary', value: 'Non-Binary'},
  ]);
  const [items, setitems] = useState([
    {label: '18 - 20', value: '18 - 20'},
    {label: '21-25', value: '21-25'},
    {label: '26-30', value: '26-30'},
    {label: '31-35', value: '31-35'},
    {label: '36-40', value: '36-40'},
    {label: '41 or above', value: '41 or above'},
  ]);
  const [items4, setitems4] = useState([
    {label: 'Casual', value: 'Casual'},
    {label: 'Friendly', value: 'Friendly'},
    {label: 'Intimate', value: 'Intimate'},
  ]);
  const [loading, setloading] = useState(false);

  const dispatch = useDispatch();
  const id = useSelector(state => state?.qrId);
  const token = useSelector(state => state.signUpToken);
  const userEmail = useSelector(state => state?.user?.email);


  const handleSetItem = async token => {
    try {
      await AsyncStorage.setItem('TOKEN', token);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    checkToken();
    autoFillDetail();
  }, []);
  const checkToken = async () => {
    const fcmToken = await messaging().getToken();

    const FCM = fcmToken;
    setFcmToken(FCM);
  };

  const handleSignUp = async () => {
    if (privacyCheck == false || agreeCheck == false) {
      setError('Please check Privacy and User agreement checkbox.');
      return false;
    }

   
    if (!name?.length) {
      setError('Please Enter Username');
    } else if (!Identify?.length) {
      setError('Please Select Identify');
    } else if (!interest?.length) {
      setError('Please Select Interest');
    } else if (!age?.length) {
      setError('Please Select Age');
    } else if (!relation?.length) {
      setError('Please Select Relationship');
    } else if (!drink?.length) {
      setError('Please Enter Favorite Drink');
    } else if (!song?.length) {
      setError('Please Enter Favorite Song');
    } else if (!hobbies?.length) {
      setError('Please Enter Hobbies');
    } else if (!dislikes?.length) {
      setError('Please Enter Dislikes');
    } else {
      setError('');
    }
    if (
      name &&
      Identify &&
      interest &&
      age &&
      relation &&
      drink &&
      song &&
      hobbies &&
      dislikes &&
      !error?.length
    ) {
      setloading(true);

      console.log(relation + ' user age and relat ' + age);

      try {
        let response = await createUser(
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
          fcmToken,
        );

        if (response.data.status === 'verify') {
          navigation.navigate('OTP', {
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
            fcmToken,
          });
        } else if (response.data.newUser.todayOtpVerified == true) {
          let respons = await verifyOTP(
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
            'false_otp',
            fcmToken,
            'true',
          );

          console.log('Verify OPT');

          if (respons?.data.msg == 'User email successfully verified by OTP.') {
            dispatch(addUserDetail(response?.data?.newUser));
            dispatch(getToken(response.data.token));
            handleSetItem(response.data.token);
            navigation.navigate('SelfiScreen');
          } else {
            alert('Server Error');
          }
        } else {
          dispatch(addUserDetail(response?.data?.newUser));
          dispatch(getToken(response.data.token));
          handleSetItem(response.data.token);
          navigation.navigate('SelfiScreen');
        }

        setloading(false);
      } catch (error) {
        console.log(
          '🚀 ~ file: index.js ~ line 146 ~ handleSignUp ~ error',
          error,
        );
        handleError(error?.response?.data?.error);
        setloading(false);
      }
    } else {
    }
  };
  const getIdentify = value => {
    setIdentify(value);
  };
  const getInterested = value => {
    setinterest(value);
  };
  const getAge = value => {
    setage(value);
  };
  const getRelationship = value => {
    setrelation(value);
  };

  const autoFillDetail = async () => {
    try{
      const apiData = await ApiSauce.getWithoutToken(AutoFillForm(userEmail));
      console.log("🚀 ~ file: index.js:269 ~ autoFillDetail ~ apiData", apiData)
      setUserDetails(JSON.parse(apiData.UserDetails))
      const hhh = JSON.parse(apiData.UserDetails)
      console.log("🚀 ~ file: index.js:278 ~ autoFillDetail ~ hhh", hhh)
      setEmail(hhh?.[0]?.email)
      setName(hhh?.[0]?.name)
      setrelation(hhh?.[0]?.relationPreference        )
      setage(hhh?.[0]?.age)
      setIdentify(hhh?.[0]?.identity)
      setinterest(hhh?.[0]?.interest)
      setDrink(hhh?.[0]?.favDrink)
      setSong(hhh?.[0]?.favSong        )
      setHobbies(hhh?.[0]?.hobbies)
      setDislikes(hhh?.[0]?.petPeeve        )
  
      console.log("🚀 ~ file: index.js:45 ~ SignUp ~ email", email)
   
   
    }catch(err){
    console.log("🚀 ~ file: index.js:269 ~ autoFillDetail ~ err", err)

    }
  };
  return (
    <LinearGradient
      colors={['#CA60FF', '#502E78']}
      style={{
        height: Dimensions.get('window').height,
        ...(Platform.OS === 'ios' && {paddingTop: 40}),
      }}
      start={{x: 93.75, y: 669.5}}
      end={{x: 281.25, y: 669.5}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}>
        <ScrollView>
          <View style={styles.container}>
            {Platform.OS === 'ios' ? (
              <View style={styles.titleView}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      width: deviceWidth * 0.5,
                      height: deviceHeight * 0.2,
                    }}>
                    <Image
                      style={{
                        width: '100%',
                        height: '100%',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        resizeMode: 'contain',
                      }}
                      source={Vlogo}
                    />
                  </View>

                </View>
                <View
                  style={{
                    width: deviceWidth * 0.3,
                    height: deviceHeight * 0.3,
                    position: 'absolute',
                    left: deviceWidth * 0.62,
                  }}>
                  <Image
                    source={signupAvatr}
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.titleView}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      width: deviceWidth * 0.5,
                      height: deviceHeight * 0.2,
                    }}>
                    <Image
                      style={{
                        width: '100%',
                        height: '100%',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        resizeMode: 'contain',
                      }}
                      source={Vlogo}
                    />
                  </View>

                </View>
                <View
                  style={{
                    width: deviceWidth * 0.3,
                    height: deviceHeight * 0.3,
                    position: 'absolute',
                    left: deviceWidth * 0.62,
                  }}>
                  <Image
                    source={signupAvatr}
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              </View>
            )}
            <View style={{paddingBottom: 50}}>
              <View style={{marginBottom: 10}}>
                <TextField
                  label="My Name"
                  placeholder="User Name"
                  value={name}
                  setValue={setName}
                  ref={nameRef}
                  returnKeyType="next"
                />
              </View>
              <View style={{marginBottom: 5}}>
                <TextField
                  label="Email"
                  placeholder="User Email"
                  value={email }
                  setValue={setEmail}
                  ref={nameRef}
                  returnKeyType="next"
                />
              </View>
              <View style={{zIndex: 10, marginBottom: 10}}>
                <Selecter
                  items={items3}
                  labels="I Identify As."
                  placeholder="I Identify As"
                  value={Identify}
                  onPress={value => setIdentify(value)}
                  getIdentify={getIdentify}
                />
              </View>
              <View style={{zIndex: 9, marginBottom: 5}}>
                <Selecter
                  items={items2}
                  onPress={value => setinterest(value)}
                  labels="I’m Interested in:"
                  value={interest}
                  getInterested={getInterested}
                />
              </View>
              <View style={{zIndex: 8, marginBottom: 5}}>
                <Selecter
                  items={items}
                  labels="My Age:"
                  placeholder="My Age :"
                  value={age}
                  onPress={value => setage(value)}
                  getAge={getAge}
                />
              </View>
              <View style={{zIndex: 7, marginBottom: -5}}>
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

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <BouncyCheckbox
                  fillColor="red"
                  unfillColor="#FFFFFF"
                  onPress={() => {
                    setPrivacyCheck(!privacyCheck);
                  }}
                />
                <Text
                  style={{color: '#fff'}}
                  onPress={() =>
                    navigation.navigate('ContentManagment', {val: 'privacy'})
                  }>
                  Privacy Policy
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <BouncyCheckbox
                  fillColor="red"
                  unfillColor="#FFFFFF"
                  onPress={() => {
                    setAgreeCheck(!agreeCheck);
                  }}
                />
                <Text
                  style={{color: '#fff'}}
                  onPress={() =>
                    navigation.navigate('ContentManagment', {val: 'terms'})
                  }>
                  User Agreement Acknowledgment
                </Text>
              </View>

              <Text style={styles.errorText}>{error}</Text>
              <View style={styles.buttView}>
                <BUtton
                  loading={loading}
                  functionName={handleSignUp}
                  type="scan"
                  title="Sign up"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default SignUp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  titleView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: deviceHeight * -0.01,
    flexDirection: 'row',
  },
  title: {
    fontFamily: 'Monoton-Regular',
    fontSize: totalSize(7),
    color: '#D1179B',
    textShadowColor: '#D1179B',
    textShadowOffset: {width: 1, height: -4},
    textShadowRadius: 10,
  },
  title1: {
    fontFamily: 'Monoton-Regular',
    fontSize: totalSize(6.8),
    color: '#ffff',
    position: 'absolute',
    top: deviceHeight * 0.0,
    left: deviceWidth * 0.008,
    right: deviceWidth * 0,
    bottom: deviceHeight * 0,
    textShadowColor: '#D1179B',
    textShadowOffset: {width: 5, height: 4},
    textShadowRadius: 30,
  },

  textVie: {
    marginTop: 15,
  },
  buttView: {
    marginTop: 0,
    paddingBottom: 40,
  },
  errorText: {
    marginTop: 20,
    color: 'red',
    fontSize: totalSize(1.6),
  },
});
