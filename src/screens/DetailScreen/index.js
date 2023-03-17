import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import ok from '../../assests/ok.png';
import no from '../../assests/no.png';
import Modal from 'react-native-modal';
import avatr from '../../assests/avatr.png';
import gender from '../../assests/gender.png';
import heart from '../../assests/heart.png';
import drink from '../../assests/Negroni.png';
import smile from '../../assests/smile.png';
import swinming from '../../assests/swiming.png';
import dislike from '../../assests/dislike.png';

import usernameimage from '../../assests/usernameimage.png';
import femaleimage from '../../assests/female.png';
import maleimage from '../../assests/male.png';
import bothgender from '../../assests/bothgender.png';
import arrowback from '../../assests/arrowback.png';
import hearticon from "../../assests/heart.png"

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import Detailbackgound from '../../assests/Detailbackgound.png';
import age from '../../assests/age.png';
import music from '../../assests/lov.png';
import arrowUp from '../../assests/arrowUp.png';
import arrowdown from '../../assests/arrowdown.png';
import {width, height, totalSize} from 'react-native-dimension';
import PayWithStripe from '../../components/Stripe/PayWithStripe';
import {BUtton, TextField} from '../../components';
import {useSelector} from 'react-redux';
import {handleError, handleSuccess} from '../../components/toast';
import FastImage from 'react-native-fast-image';
import {
  initStripe,
  useStripe,
  CardField,
  useConfirmPayment,
} from '@stripe/stripe-react-native';
import BraintreeDropIn from 'react-native-braintree-dropin-ui';
import axios from 'axios';
import { BASE_URL } from '../../config/WebServices';
import ChatScreen from '../Chatscreen';
import { useNavigation } from '@react-navigation/native';

const DeatailScreen =  ({navigation: {goBack, navigate}, route}) => {
console.log('....................' , route)


  const user = useSelector(state => state.user);
  const token = useSelector(state => state.signUpToken);

  const [showDetails, setShowDetails] = useState(false);
  const [isModalVisible, setModalVisible] = useState(true);
  const [isModalEmail, setIsModalEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [errror, setErrror] = useState('');
  const [isPaid, setIsPiad] = useState(false);
  
  const [selfUser, setSelfUser] = useState(user || {});
  
  const [subLoading, setSubLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const {confirmPayment} = useStripe();

  const fetchSingleUser = route?.params?.data?.user || {};
  console.log("🚀 ~ file: index.js:78 ~ DeatailScreen ~ fetchSingleUser:", fetchSingleUser)
  console.log("token" ,fetchSingleUser);
  const data = [
    {heading:'Age :',name: fetchSingleUser?.age, icon: age},
    {heading:'Favorite Drink :',name: fetchSingleUser?.favDrink, icon: drink},
    {heading:'Favorite Song :',name: fetchSingleUser?.favSong, icon: music},
    {heading:'Relationship Preference :',name: fetchSingleUser?.relationPreference, icon:smile },

    {heading:'Hobbies :',name: fetchSingleUser?.hobbies, icon:swinming },
    {heading:'Dislikes :',name: fetchSingleUser?.petPeeve, icon: dislike},
  ];
 
  console.log("ssdsads");
  console.log(data);
  const {initPaymentSheet, presentPaymentSheet, retrievePaymentIntent} =
    useStripe();
   
  useEffect(() => {
    getUser();
  }, []);

  console.log('ispaid', isPaid);

  useEffect(() => {
   
    if(selfUser.id == fetchSingleUser?.id){
      setIsPiad(true);
    }else{
      if (selfUser && Object.keys(selfUser)?.length && (selfUser?.stripeSubscribed || selfUser?.paidUserIds?.length)
      ) {
       
        setIsPiad( selfUser?.stripeSubscribed || selfUser?.paidUserIds?.includes(fetchSingleUser?.id)); //selfUser?.oneTimePaid
        // dispatch(addUserDetail(selfUser))
  
      }
    }

    
  }, [selfUser]);

  const handleLog = logText => {

    var axios = require('axios');

    let body = {logText: JSON.stringify(logText)};
    let url = `${BASE_URL}/logs/store`;
    axios
      .post(url, body)
      .then(function (response) {
        console.log('responseresponseresponse', response);
        console.log(
          'Logs ',
          response,
        );
         //setSelfUser({ ...response?.data?.user, paidUserIds: response?.data?.paidUserIds })
      })
      .catch(function (error) {
        console.log('errorerrorerror', error);
        // console.log('error, ', error?.response?.data);
      });
  };

  const toggleModal = () => {
    try {
      setModalVisible(!isModalVisible);
      handleLog('try');
    } catch (error) {
      handleLog(error);
    }
  };
  const fetchPaymentIntentClientSecret = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/paypal/client_token`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(
        '🚀 ~ file: index.js:111 ~ fetchPaymentIntentClientSecret ~ response',
        response,
      );
      const {clientToken} = await response.data;

      return clientToken;
    } catch (error) {
      console.log(
        '🚀 ~ file: index.js:121 ~ fetchPaymentIntentClientSecret ~ error',
        error,
      );
    }
  };

  const handlePayPress = async () => {
    const res = await fetchPaymentIntentClientSecret();
    console.log('🚀 ~ file: index.js:123 ~ handlePayPress ~ res', res);
    try {
      BraintreeDropIn.show({
        clientToken: res,

        countryCode: 'US', //apple pay setting
        currencyCode: 'USD', //apple pay setting
        // orderTotal:'Total Price',
        googlePay: false,
        applePay: false,
        vaultManager: false,
        payPal: false,
        cardDisabled: false,
        darkTheme: true,
      })
        // .then(result => {
        //   console.log("🚀 ~ file: index.js:162 ~ handlePayPress ~ result", result)
        // })
        .then(result => handeFunc(result))
        .catch(error => {
          console.log(
            '🚀 ~ file: Checkout.js:169 ~ consthandle_order= ~ error',
            error,
          );
          if (error.code === 'USER_CANCELLATION') {
            // update your UI to handle cancellation
          } else {
            // update your UI to handle other errors
            // for 3D secure, there are two other specific error codes: 3DSECURE_NOT_ABLE_TO_SHIFT_LIABILITY and 3DSECURE_LIABILITY_NOT_SHIFTED
          }
        });
    } catch (error) {
      console.log(
        '🚀 ~ file: Checkout.js:182 ~ consthandle_order= ~ error',
        error,
      );
    }
  };
  const handeFunc = async res => {
    try {
      const response = await axios.post(
        `${BASE_URL}/paypal/checkout`,
        {
          nonceFromTheClient: `${res.nonce}`,
          deviceDataFromTheClient: `${res.deviceData}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('🚀 ~ file  ndeFunc ~ response', response);
      if (response?.data?.status === 'success') {
        oneTimeSuccessCallBack2();
      }
    } catch (error) {
      alert('Some Thing went wrng');
      console.log('🚀 ~ file: index.js:208 ~ handeFunc ~ error', error);
    }

    const {clientSecret} = await response.json();

    return clientSecret;
  };

  const getUser = () => {
    var axios = require('axios');
    let url = `${BASE_URL}/users/findUser/${user?.id}`;
    var config = {
      method: 'get',
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios(config)
      .then(function (response) {
        console.log(
          'response?.dataresponse?.dataresponse?.dataresponse?.dataresponse?.dataresponse?.data',
          response?.data,
        );
        console.log("Fas");
        setSelfUser({
          ...response?.data?.user,
          paidUserIds: response?.data?.paidUserIds,
        });
      })
      .catch(function (error) {
        console.log('error, ', error?.response?.data);
      });
  };

  const openPaymentSheet = async (clientSecret, customerId) => {
    console.log("Open Payment Sheet");
    try {
      const {paymentIntent} = await retrievePaymentIntent(clientSecret);
      const {error} = await initPaymentSheet({
        customerId: customerId,
        merchantDisplayName: 'VBar',
        // customerEphemeralKeySecret: 'ek_test_YWNjdF8xSk1zZ2NDWm5vTk9OZnF4LDJkNDhCWlFWT2FjcGwwdElpU2I2dmR1UkJva3h3aXc_00Qo8TANRs',//ephemeralKey,
        paymentIntentClientSecret: paymentIntent?.clientSecret,
      });

      if (!error) {
        handleLog(paymentIntent);

        setTimeout(async () => {
          console.log("Settimeout");
          let clientSecret = paymentIntent?.clientSecret;
          const res = await presentPaymentSheet({clientSecret});
          let err = res?.error;
          if (err) {
            if (!err.code === 'Canceled') {
              handleError(`${error.message}`);
            } else {
              // callBack && callBack();
            }
          } else {
            handleLog(res);
            setIsModalEmail(false);
            setShowDetails(true);
            handleSuccess('Payment Successfully Done!');
            getUser();
            handleLog(error);
          }
        }, 500);
      }
    } catch (err) {
      console.log('openPaymentSheet', err);
      handleError(err);
      handleLog(err);

      // errorPopup('Error', err.message);
    }
  };

  const showCredianls = async (token, customerId) => {
    try {
      BraintreeDropIn.show({
        clientToken: token,

        countryCode: 'US', //apple pay setting
        currencyCode: 'USD', //apple pay setting
        // orderTotal:'Total Price',
        googlePay: false,
        applePay: false,
        vaultManager: false,
        payPal: false,
        cardDisabled: false,
        darkTheme: true,
      })

        .then(result => {
          console.log(
            '🚀 ~ file: index.js:334 ~ showCredianls ~ result',
            result,
            customerId,
          );

          createSubscription(customerId, result.nonce);
        })
        .catch(error => {
          console.log(
            '🚀 ~ file: Checkout.js:169 ~ consthandle_order= ~ error',
            error,
          );
          if (error.code === 'USER_CANCELLATION') {
            // update your UI to handle cancellation
          } else {
            // update your UI to handle other errors
            // for 3D secure, there are two other specific error codes: 3DSECURE_NOT_ABLE_TO_SHIFT_LIABILITY and 3DSECURE_LIABILITY_NOT_SHIFTED
          }
        });
    } catch (error) {
      console.log(
        '🚀 ~ file: Checkout.js:182 ~ consthandle_order= ~ error',
        error,
      );
    }
  };

  const createSubscription = (customerId, nonce) => {
    let priceId = 'price_1MG0lLJS9L689CIWscbN4d8B';
    var axios = require('axios');
    let body = {customerId: customerId, paymentMethodNonce: nonce};
    let url = `${BASE_URL}/paypal/subscription-payment-method`;
    var config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(url, body, config)
      .then(function (response) {
        let res = response?.data;
        console.log(
          '--------------------->>>>>>>>>>>>>> createSubscription',
          res,
        );
        if (res?.status === 'success') {
          oneTimeSuccessCallBack();
          console.log('res--=--=-->>>>>>>>', res);
          setSubLoading(false);
          
        }
      })
      .catch(function (error) {
        console.log('createSubscription error: ', error?.response?.data);
        handleError(error?.response?.data);
      });
  };

  const subscribe = () => {
   
    var axios = require('axios');
    let body = {email: user?.email, name: user?.name};
    let url = `http://134.122.30.185:8000/api/paypal/subscription-customer-token`;
    var config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(url, body, config)
      .then(function (response) {
        console.log('🚀 ~ file: index.js:367 ~ response', response);
        let res = response?.data;
        if (res?.status === 'success') {
          console.log('res--=--=-->>>>>>>>', res);
          showCredianls(res?.clientToken, res?.customerId);
        }
      })
      .catch(function (error) {
        console.log('error, ', error);
        handleError(error);
      });
    // setErrror('')
    // } else {
    //   setErrror('Please enter correct email')
    // }
  };

  const oneTimeSuccessCallBack2 = async () => {
    var axios = require('axios');
    let url = `${BASE_URL}/paid/setUserPaidFor`;
    var config = {
      method: 'post',
      data: {paidForUser: String(fetchSingleUser?.id)},
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios(config)
      .then(function (response) {
        console.log('oneTimeSuccessCallBack2 response', response?.data);
        if (response?.data.status === 'success') {
          setModalVisible(!isModalVisible);
          setShowDetails(true);
          handleSuccess('Payment Successfully Done!');
          getUser();
        }
      })
      .catch(function (error) {
        console.log('oneTimeSuccessCallBack2 error: ', error?.response?.data);
      });
  };

  const oneTimeSuccessCallBack = async () => {
    console.log('imeSuccessCallBack responsimeSuccessCallBack respons');
    var axios = require('axios');
    let url = `http://134.122.30.185:8000/api/stripe/payment-intents-success`;
    var config = {
      method: 'post',
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios(config)
      .then(function (response) {
        console.log('oneTimeSuccessCallBack response', response?.data);
        if (response?.data?.status === 'success') {
          setModalVisible(!isModalVisible);
          setShowDetails(true);
          handleSuccess('Payment Successfully Done!');
          getUser();
        }
      })
      .catch(function (error) {
        console.log('oneTimeSuccessCallBack error: ', error?.response?.data);
      });
  };

  return (
    <ImageBackground
      source={Detailbackgound}
      resizeMode="cover"
      style={{
        height: Dimensions.get('window').height,
        ...(Platform.OS === 'ios' && {paddingTop: 40}),
      }}>
      <ScrollView>
        <View style={styles.container}>
          {Platform.OS === 'ios' ? (
            <TouchableOpacity
              style={styles.aerrowbackios}
              onPress={() => {
                goBack();
              }}>
              <Image
                style={{width: '100%', height: '100%'}}
                source={arrowback}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.aerrowback}
              onPress={() => {
                goBack();
              }}>
              <Image
                style={{width: '100%', height: '100%'}}
                source={arrowback}
              />
            </TouchableOpacity>
          )}

          <View style={styles.containerDetail}>
            <View style={{paddingBottom: 10, paddingTop: 50}}>
              <FastImage
                style={{width: 200, height: 200, borderRadius: 100}}
                resizeMode="cover"
                source={{
                  uri: fetchSingleUser?.imageUrl || '',
                  priority: FastImage.priority.high,
                }}
              />
            </View>
            <View style={styles.usernamecontainer}>
              <Text style={styles.username}>{fetchSingleUser?.name}</Text>
              <Text style={styles.username1}>{fetchSingleUser?.name}</Text>
            </View>
            {/* <TouchableOpacity onPress={() => setIsModalEmail(true)} >
              <Text>mdoaklsjjdjkha</Text>
            </TouchableOpacity> */}
          </View>
         
          <View style={styles.usernamedtaView}>
            <View style={styles.usernamedta}>
              { fetchSingleUser?.identity == "Male" && <Image style={[styles.userImage]} source={maleimage} />}
              { fetchSingleUser?.identity == "Female" && <Image style={[styles.userImage]} source={femaleimage} />}
              { fetchSingleUser?.identity == "Non-Binary" && <Image resizeMode='contain' style={[styles.userImage,{width:20}]} source={bothgender} />}
  
              <View>
                <Text style={styles.usernamedtaname}>
                  {fetchSingleUser?.identity}
                </Text>
              </View>
            </View>
            <View style={styles.usernamedtaView1}></View>
          </View>
          <View style={styles.usernamedtaView}>
            <View style={styles.usernamedta}>
            <View >

            {Platform.OS === 'ios' ? <Text style={styles.usernamedtaname}>
                I <Image style={[styles.userImage,styles.userInterest]} source={heart} /> {fetchSingleUser?.interest}
              </Text> 

              : <Text style={styles.usernamedtaname}>
                I <Image resizeMode='contain' style={[styles.userImage,styles.userInterest00]} source={heart} />   {fetchSingleUser?.interest}
              </Text> }

              </View>
            </View>
            <View style={styles.usernamedtaView1}></View>
          </View>
          <View style={styles.containerDetail}>

          {  selfUser.id !== fetchSingleUser?.id &&
           <View  style={styles.usernamecontainer} >
              <Text  style={styles.username} onPress={() => navigate('Chatscreen', route.params)}>Chat</Text>
              <Text style={styles.username1} onPress={() => navigate('Chatscreen', route.params)}>Chat</Text>
            </View>}

          </View> 
         
          {showDetails ? (
            <TouchableOpacity
              style={styles.Showwmore}
              onPress={() => setShowDetails(false)}>
              <Text style={styles.showmoreText}>Less Detail</Text>
              <Text style={styles.showmoreText1}>Less Detail</Text>
              <Image source={arrowdown} />
            </TouchableOpacity>
          ) : (
            <>
               
              <TouchableOpacity
                style={[styles.Showwmore]}
                onPress={() =>
                  isPaid ? setShowDetails(!showDetails) : toggleModal()
                }>
                <Text style={styles.showmoreText}>More About Me</Text>
                <Text style={styles.showmoreText1}>More About Me</Text>
                <Image source={arrowUp} />
              </TouchableOpacity>


            
              {/* <TouchableOpacity style={[styles.Showwmore]} onPress={() => setShowPayment(!showPayment)}>
             <Text style={styles.showmoreText}>More About Me</Text>
             <Text style={styles.showmoreText1}>More About Me</Text>
             <Image source={arrowUp} />
           </TouchableOpacity> */}

              {showPayment && (
                <>
                  <CardField
                    postalCodeEnabled={true}
                    placeholders={{
                      number: '4242 4242 4242 4242',
                    }}
                    cardStyle={{
                      backgroundColor: '#FFFFFF',
                      textColor: '#000000',
                    }}
                    style={{
                      width: '100%',
                      height: 50,
                      marginVertical: 30,
                    }}
                    onCardChange={cardDetails => {
                      console.log('cardDetails', cardDetails);
                    }}
                    onFocus={focusedField => {
                      console.log('focusField', focusedField);
                    }}
                  />
                  <TouchableOpacity
                    style={{width: '80%'}}
                    onPress={handlePayPress}>
                    <BUtton
                      title={'Pay Now'}
                      btnView={{
                        margin: 10,
                        alignSelf: 'center',
                        justifyContent: 'center',
                      }}
                      style={{margin: 10, alignSelf: 'center', marginLeft: 70}}
                      disabled={false}
                      loading={subLoading}
                      functionName={() => {
                        handlePayPress();
                      }}
                    />
                  </TouchableOpacity>
                </>
              )}
            </>
          )}

          {showDetails && (
            <View
              style={{
                backgroundColor: 'black',
                marginTop: deviceWidth * 0.03,
                borderRadius: 8,
                borderColor: '#D1179B',
                borderWidth: 2,
                shadowColor: '#f705a7',
                shadowOffset: {width: 2, height: 20},
                shadowOpacity: 1,
                shadowRadius: deviceWidth * 0.07,
                elevation: 5,
              }}>
              {data.map((val) => (
                <View
                  style={{
                    ...styles.usernamedtaView,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      ...styles.usernamedtaname1,
                      alignSelf: 'flex-start',
                      marginBottom: 10,
                      marginLeft: 6,
                    }}>
               {val.heading}
                  </Text>
                  <View
                    style={{
                      // ...styles.usernamedta,
                      borderColor: '#D1179B',
                      borderWidth: 2,
                      justifyContent:'flex-start',
                      flexDirection:'row',
                      alignItems:'flex-start',
                      padding: 8,
                      paddingLeft:40,
                      width: '90%',
                      borderRadius: 6,
                    }}>
                      <Image style={styles.userImage} source={val.icon} />
                      <Text style={{color:'#FFF' ,width:200, height:20 , paddingLeft:10 ,   fontFamily: 'Futura',
    fontWeight: '400',}}>{val?.name}</Text>
                    {/* <View> */}
                      {/* <Text st>
                        {val?.name}
                      </Text> */}
                    {/* </View> */}
                  </View>
                </View>
              ))}

              {/* <View style={{ ...styles.usernamedtaView, justifyContent: 'center', alignItems: 'center', marginTop: 0 }}>
                <Text style={{ ...styles.usernamedtaname1, alignSelf: 'flex-start', marginBottom: 10, marginLeft: 6 }}> Favorite Drink :</Text>
                <View style={{ ...styles.usernamedta, borderColor: '#D1179B', borderWidth: 2, padding: 8, width: '90%', borderRadius: 6 }}>
                  <View style={styles.usernimg}>
                    <Image style={[styles.userImage]} source={drink} />
                  </View>
                  <View >
                    <Text style={styles.usernamedtaname}>
                      {fetchSingleUser?.favDrink}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{ ...styles.usernamedtaView, justifyContent: 'center', alignItems: 'center', marginTop: 0 }}>
                <Text style={{ ...styles.usernamedtaname1, alignSelf: 'flex-start', marginBottom: 10, marginLeft: 6 }}>Favorite Song :</Text>
                <View style={{ ...styles.usernamedta, borderColor: '#D1179B', borderWidth: 2, padding: 8, width: '90%', borderRadius: 6 }}>
                  <View style={styles.usernimg}>
                    <Image style={[styles.userImage , {width:35, height:35}]} source={music} />
                  </View>
                  <View>
                    <Text style={styles.usernamedtaname}>
                      {fetchSingleUser?.favSong}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{ ...styles.usernamedtaView, justifyContent: 'center', alignItems: 'center', marginTop: 0 }}>
                <Text style={{ ...styles.usernamedtaname1, alignSelf: 'flex-start', marginBottom: 10, marginLeft: 6 }}>Relationship : </Text>
                <View style={{ ...styles.usernamedta, borderColor: '#D1179B', borderWidth: 2, padding: 8, width: '90%', borderRadius: 6 }}>
                  <View style={styles.usernimg}>
                    <Image style={styles.userImage} source={smile} />
                  </View>
                  <View>
                    <Text style={styles.usernamedtaname}>
                      {console.log('fetchSingleUser', fetchSingleUser)}
                      {fetchSingleUser?.relationPreference}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{ ...styles.usernamedtaView, justifyContent: 'center', alignItems: 'center', marginTop: 0 }}>
                <Text style={{ ...styles.usernamedtaname1, alignSelf: 'flex-start', marginBottom: 10, marginLeft: 6 }}>Hobbies : </Text>
                <View style={{ ...styles.usernamedta, borderColor: '#D1179B', borderWidth: 2, padding: 8, width: '90%', borderRadius: 6 }}>
                  <View style={styles.usernimg}>
                    <Image style={styles.userImage} source={swinming} />
                  </View>
                  <View>
                    <Text style={styles.usernamedtaname}>
                      {fetchSingleUser?.hobbies}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{ ...styles.usernamedtaView, justifyContent: 'center', alignItems: 'center', marginTop: 0 }}>
                <Text style={{ ...styles.usernamedtaname1, alignSelf: 'flex-start', marginBottom: 10, marginLeft: 6 }}>Dislikes : </Text>
                <View style={{ ...styles.usernamedta, borderColor: '#D1179B', borderWidth: 2, padding: 8, width: '90%', borderRadius: 6 }}>
                  <View style={styles.usernimg}>
                    <Image style={styles.userImage} source={dislike} />
                  </View>
                  <View>
                    <Text style={styles.usernamedtaname}>
                      {fetchSingleUser?.petPeeve}
                    </Text>
                  </View>
                </View>
              </View> */}
            </View>
          )}

          <View>
            <TouchableOpacity
              title="Showmodal"
              onPress={() =>
                isPaid ? setShowDetails(!showDetails) : toggleModal()
              }
            />

            <Modal
              style={{alignItems: 'center', justifyContent: 'center', flex: 1}}
              isVisible={!isModalVisible}>
              {/* <View
                style={{
                  // backgroundColor: '#f705a7',
                  width: deviceWidth * 0.87,
                  height: deviceHeight * 0.65,
                  // justifyContent: 'space-between',
                  alignItems: 'center',
                  flex: .8,
                  paddingLeft: deviceWidth * 0.03,
                  paddingRight: deviceWidth * 0.03,
                  borderRadius: deviceWidth * 0.05,
                }}> */}
              <TouchableOpacity
                // onPress={() => onClick('oneTime')}
                style={{
                  flex: 1,
                  backgroundColor: '#fff',
                  width: deviceWidth * 0.7,
                  // height: deviceHeight * 0.35,
                  alignItems: 'center',
                  borderRadius: deviceWidth * 0.02,
                  // opacity: 0.7,
                  borderColor: '#f705a7',
                  borderWidth: deviceWidth * 0.005,
                  justifyContent: 'space-between',
                  marginBottom: 10,
                  overflow: 'hidden',
                  padding: 20,
                }}>
                <Text style={styles.showmoreText1time}>One-Time</Text>
                <View
                  style={{
                    // marginTop: deviceHeight * 0.03,
                    flexDirection: 'column',
                    alignItems: 'center',
                    // right: deviceWidth * 0.02,
                    // justifyContent: 'center'
                  }}>
                  {/* <Image source={ok} /> */}
                  <Text
                    numberOfLines={2}
                    style={{
                      // left: deviceWidth * 0.02,
                      fontFamily: 'Futura',
                      fontSize: totalSize(1.7),
                      color: '#000',
                      shadowColor: '#f705a7',
                      // padding: deviceWidth * .03,
                      marginVertical: 5,
                      shadowOffset: {width: 10, height: 2},
                      shadowOpacity: 1,
                      shadowRadius: deviceWidth * 0.07,
                    }}>
                    Want to know more personal details about{' '}
                    {fetchSingleUser?.name}?
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={{
                      // left: deviceWidth * 0.02,
                      fontFamily: 'Futura',
                      fontSize: totalSize(1.7),
                      color: '#000',
                      shadowColor: '#f705a7',
                      marginVertical: 5,
                      // paddingHorizontal: deviceWidth * 0.05,
                      shadowOffset: {width: 10, height: 2},
                      shadowOpacity: 1,
                      shadowRadius: deviceWidth * 0.07,
                    }}>
                    Click "Pay Now" to view {fetchSingleUser?.name} extended
                    profile.
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Futura',
                      fontSize: totalSize(1.6),
                      color: '#000',
                      shadowColor: '#f705a7',
                      // lineHeight: 20,
                    }}>
                    $ 0.99
                  </Text>
                </View>
                <BUtton
                  title={'Pay Now'}
                  btnView={{
                    margin: 10,
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}
                  style={{margin: 10, alignSelf: 'center'}}
                  disabled={false}
                  loading={subLoading}
                  functionName={() => {
                    handlePayPress();
                  }}
                />
                {/* <PayWithStripe
                    callBack={() => {
                      toggleModal();
                      oneTimeSuccessCallBack();
                      setShowDetails(true);

                      oneTimeSuccessCallBack2();
                    }}
                    title='Pay Now'
                    amount={'25'} /> */}
                {/* <View>

                    <BUtton
            title={'Paynoew'}
            btnView={{margin:10}} 
            style={{ margin: 10 }}
            disabled={false}
            loading={false}
            functionName={() =>alert}
            
            />
                    </View> */}
              </TouchableOpacity>

              <TouchableOpacity
                // onPress={() => onClick('month')}
                style={{
                  flex: 1,
                  backgroundColor: '#fff',
                  width: deviceWidth * 0.7,
                  // height: deviceHeight * 0.35,
                  alignItems: 'center',
                  borderRadius: deviceWidth * 0.02,
                  // opacity: 0.7,
                  borderColor: '#f705a7',
                  borderWidth: deviceWidth * 0.005,
                  justifyContent: 'space-between',
                  marginBottom: 10,
                  overflow: 'hidden',
                  padding: 20,
                }}>
                <Text style={styles.showmoreText1time}>Monthly</Text>
                <View
                  style={{
                    // marginTop: deviceHeight * 0.03,
                    flexDirection: 'column',
                    alignItems: 'center',
                    // right: deviceWidth * 0.02,
                  }}>
                  <Text
                    numberOfLines={2}
                    style={{
                      // left: deviceWidth * 0.02,
                      fontFamily: 'Futura',
                      fontSize: totalSize(1.7),
                      color: '#000',
                      shadowColor: '#f705a7',
                      // padding: deviceWidth * .03,
                      marginVertical: 5,
                      shadowOffset: {width: 10, height: 2},
                      shadowOpacity: 1,
                      shadowRadius: deviceWidth * 0.07,
                    }}>
                    Want VIP status to view unlimited extended profiles?
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={{
                      // left: deviceWidth * 0.02,
                      fontFamily: 'Futura',
                      fontSize: totalSize(1.7),
                      color: '#000',
                      shadowColor: '#f705a7',
                      marginVertical: 5,
                      // paddingHorizontal: deviceWidth * 0.05,
                      shadowOffset: {width: 10, height: 2},
                      shadowOpacity: 1,
                      shadowRadius: deviceWidth * 0.07,
                    }}>
                    Click "Subscribe Now"
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: 'Futura',
                    fontSize: totalSize(1.6),
                    color: '#000',
                    shadowColor: '#f705a7',
                  }}>
                  $ 4.99 per Month
                </Text>
                <BUtton
                  title={'Pay Now'}
                  btnView={{
                    margin: 10,
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}
                  style={{margin: 10, alignSelf: 'center'}}
                  disabled={false}
                  loading={subLoading}
                  functionName={() => {
                    subscribe();
                  }}
                />
                {/* <PayWithStripe
                    callBack={() => {
                      setIsPiad(true);
                      toggleModal();
                      setShowDetails(true)
                    }}
                    title='Suscribe for a month'
                    amount={'25'} /> */}
              </TouchableOpacity>
              {/* </View> */}
              <TouchableOpacity
                title="Hide modal"
                style={{
                  backgroundColor: '#f705a7',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 42,
                  width: deviceWidth * 0.5,
                  marginTop: 20,
                  // width: deviceWidth * 0.35,
                  // top: deviceHeight * 0.08,
                  // borderRadius: deviceWidth * 0.02,
                  borderRadius: 10,
                }}
                onPress={toggleModal}>
                <Text
                  style={{
                    // left: deviceWidth * 0.01,
                    fontFamily: 'Futura',
                    fontSize: totalSize(2.2),
                    color: '#fff',
                    shadowColor: '#f705a7',
                    shadowOffset: {width: 10, height: 2},
                    shadowOpacity: 1,
                    shadowRadius: deviceWidth * 0.07,
                    alignItems: 'center',
                  }}>
                  Close
                </Text>
              </TouchableOpacity>
            </Modal>
            {console.log('isModalEmail', isModalEmail)}
            {/* <Modal style={{ alignItems: 'center' }} isVisible={isModalEmail}>
              <View
                style={{
                  // backgroundColor: '#f705a7',
                  width: deviceWidth * 0.87,
                  height: deviceHeight * 0.4,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  // flexDirection: 'row',
                  paddingLeft: deviceWidth * 0.03,
                  paddingRight: deviceWidth * 0.03,
                  borderRadius: deviceWidth * 0.05,
                  borderRadius: deviceWidth * 0.02,
                  opacity: 1,
                  borderColor: '#f705a7',
                  borderWidth: deviceWidth * 0.005,
                }}>
                <View style={styles.textVie}>
                  <TextField
                    label="Email"
                    placeholder="Email"
                    value={email}
                    setValue={setEmail}
                  />
                </View>

                <Text style={styles?.errorText} >{errror}</Text>
                <View style={styles.buttView}>
                  <BUtton
                    functionName={() => subscribe()}
                    type="scan"
                    loading={subLoading}
                    disabled={subLoading}
                    title="Subscribe"
                  />
                  <Text></Text>
                  <BUtton
                    functionName={() => { toggleModal(); setIsModalEmail(false) }}
                    type="scan"
                    title="Close"
                  />

                </View>
              </View>

            </Modal> */}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default DeatailScreen;
const styles = StyleSheet.create({
  containerDetail: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
    // paddingBottom:70
  },
  Showwmore: {
    borderWidth: 1,
    borderColor: 'rgba(209, 23, 155, 1)',
    backgroundColor: '#fff',
    paddingBottom: deviceHeight * 0.005,
    paddingTop: deviceHeight * 0.005,
    borderRadius: deviceWidth * 0.009,
    marginTop: deviceHeight * 0.03,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: deviceWidth * 0.04,
  },

  ChatBox: {
    borderWidth: 1,
    borderColor: 'rgba(209, 23, 155, 1)',
    backgroundColor: '#fff',
    paddingBottom: deviceHeight * 0.005,
    paddingTop: deviceHeight * 0.005,
    borderRadius: deviceWidth * 0.009,
    marginTop: deviceHeight * 0.03,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width:'30%',
    left:'20%'
    
  },
  showmoreText: {
    fontFamily: 'Futura',
    fontSize: totalSize(2.1),
    color: '#f705a7',
    shadowColor: '#f705a7',
    shadowOffset: {width: 10, height: 2},
    shadowOpacity: 1,
    shadowRadius: deviceWidth * 0.07,
    elevation: 5,
    textShadowColor: '#f705a7',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    left: deviceWidth * 0.08,
  },
  chatText:{
    //left: deviceWidth * 0.35,
  },
  showmoreText1: {
    fontFamily: 'Futura',
    fontSize: totalSize(2.1),
    color: '#ffff',
    shadowColor: '#f705a7',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 1,
    shadowRadius: deviceWidth * 0.07,
    elevation: 5,
    textShadowColor: '#f705a7',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    top: deviceHeight * 0.003,
    left: deviceWidth * 0.08,
    position: 'absolute',
  },
  showmoreText1time: {
    fontFamily: 'Futura',
    fontSize: totalSize(2.1),
    color: '#ffff',
    shadowColor: '#f705a7',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 1,
    shadowRadius: deviceWidth * 0.07,
    elevation: 5,
    textShadowColor: '#f705a7',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    // top: deviceHeight * 0.03,
    // left: deviceWidth * 0.08,
    // position: 'absolute',
  },
  container: {
    // flex: 1,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 190,
  },
  usernamecontainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#f705a7',
    shadowColor: '#f705a7',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 1,
    shadowRadius: 10,
    // elevation: 20,
    //paddingTop: deviceHeight * 0.01,
    paddingBottom: deviceHeight * 0.01,
    paddingRight: deviceWidth * 0.07,
    paddingLeft: deviceWidth * 0.07,
    borderRadius: deviceWidth * 0.009,
    marginTop: deviceHeight * 0.02,
    // width:deviceWidth * 0.0001
  },

  username: {
    fontFamily: 'Futura',
    fontSize: totalSize(2.1),
    color: '#f705a7',
    shadowColor: '#f705a7',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: deviceWidth * 0.07,
    elevation: 5,
    textShadowColor: '#f705a7',
    textShadowOffset: {width: 2, height: 3},
    textShadowRadius: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    paddingTop:'3%'
  },
  username1: {
    fontFamily: 'Futura',
    fontSize: totalSize(2.1),
    color: '#ffff',
    shadowColor: '#f705a7',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: deviceWidth * 0.07,
    elevation: 5,
    textShadowColor: '#f705a7',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    top: deviceHeight * 0.001,
    left: deviceWidth * 0.07,
    position: 'absolute',
    paddingTop:'2%'
  },
  usernamedta: {
    flexDirection: 'row',
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  usernamedtaView1: {
    width: deviceWidth * 0.9,
    height: deviceHeight * 0.01,
    top: deviceHeight * 0.025,
    backgroundColor: 'rgba(209, 23, 155, 0.25)',
    shadowColor: '#f705a7',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 50,
  },
  usernamedtaView: {
    // borderBottomWidth: deviceWidth * 0.001,
    shadowColor: '#f705a7',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 1,
    shadowRadius: 1,
    // elevation: 20,
    marginTop: deviceHeight * 0.01,
    paddingTop: deviceHeight * 0.01,
    paddingBottom: deviceHeight * 0.03,
  
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  usernamedtaname: {
    color: '#ffff',
    fontSize: totalSize(1.8),
    fontFamily: 'Futura',
    fontWeight: '400',
    left: deviceWidth * 0.03,
  //  backgroundColor:'green',
  //  textAlign:'center',
  },
  usernimg: {
    width: deviceWidth * 0.03,
    height: deviceHeight * 0.03,
    top: deviceHeight * 0.004,
    minWidth: 20,
    minHeight: 20,
    resizeMode: 'contain',
  },
  userInterest:{
    minWidth: 20,
    minHeight: 20,
    marginTop:-5,
    
  },
  userInterest00:{
    width:22,
    height:22,
    
    backgroundColor:'red'
  },
  userImage: {
    width: deviceWidth * 0.03,
    height:deviceHeight * 0.03,
    overflow:"visible"
    // resizeMode: 'contain'
  },
  usernamedtaname1: {
    color: 'rgba(255, 255, 255, 0.35)',
    fontSize: totalSize(1.8),
    fontFamily: 'Futura',
    fontWeight: '400',
    left: deviceWidth * 0.03,
  
  },

  aerrowback: {
    left: deviceWidth * -0.01,
    width: deviceWidth * 0.1,
    height: deviceHeight * 0.02,
    top: deviceHeight * 0.03,
    zIndex: 9,
  },
  aerrowbackios: {
    width: deviceWidth * 0.1,
    height: deviceHeight * 0.03,
    // top: deviceHeight * 0.05,
    // marginTop: deviceHeight * 0.05,
    position: 'relative',
    zIndex: 9,
  },

  titleView: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: deviceHeight * -0.01,
    flexDirection: 'row',
    left: deviceWidth * 0.18,
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
    marginTop: 20,
    width: '100%',
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

{
  /* <ImageBackground
    source={Detailbackgound}
    resizeMode="cover"
    style={{height: Dimensions.get('window').height}}
    > */
}
{
  /* <View style={styles.container} > */
}

{
  /* </View> */
}
{
  /* </ImageBackground> */
}
{
  /* </SafeAreaView> */
}
