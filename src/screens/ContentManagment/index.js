import React, {useRef, useState, useEffect} from 'react';
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
  TouchableOpacity,
  Linking,
} from 'react-native';
import signupAvatr from '../../assests/signupAvatr.png';
import {TextField, Selecter, BUtton} from '../../components';
import LinearGradient from 'react-native-linear-gradient';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import {width, height, totalSize} from 'react-native-dimension';
import Vlogo from '../../assests/Vlogo.png';
import {createUser} from '../../services/utilities/api/auth';
import ApiSauce from '../../services/networkRequest';
import arrowback from '../../assests/arrowback.png';
import {CONTENT_MANAGMENT} from '../../config/WebServices';
import {useNavigation} from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';
import {useWindowDimensions} from 'react-native';

const index = props => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation();
  const pageName = props?.route?.params?.val;
  const [page, setPage] = useState();
  console.log("🚀 ~ file: index.js:36 ~ index ~ page", page)
  useEffect(() => {
    handleApi();
  }, []);
  const handleApi = async () => {
    try {
      const responce = await ApiSauce.getWithoutToken(
        CONTENT_MANAGMENT(pageName),
      );
      console.log('Debug', responce?.content_pages);
      setPage(responce?.content_pages);
    } catch (err) {
      console.log('debuger', err);
    }
  };
  const source = {
    html:page !== undefined ? `${page?.page_text}` : `<h1 style="font-size=20">No Data</h1>`,
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
          {Platform.OS === 'ios' ? (
            <TouchableOpacity
              style={styles.aerrowbackios}
              onPress={() => {
                navigation.goBack();
                // navigation.navigate('SignupScreen');
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
                navigation.goBack();
                // navigation.navigate('SignupScreen');
              }}>
              <Image
                style={{width: '100%', height: '100%'}}
                source={arrowback}
              />
            </TouchableOpacity>
          )}

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
            <View style={{padding: 20}}>
              <View style={{marginBottom: 10}}>
                <ScrollView style={styles.scrollView}>
                  <Text style={styles.titleText}>{page?.title}</Text>
                  <RenderHtml contentWidth={width} source={source} />
                  {/* <Text style={{color: '#fff', textAlign: 'left'}}>
                    {page?.page_text}
                  </Text> */}
                </ScrollView>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default index;
/*   */
const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    paddingBottom: 20,
    color: '#fff',
    fontWeight: 'bold',
  },

  aerrowback: {
    left: deviceWidth * 0.03,
    width: deviceWidth * 0.1,
    height: deviceHeight * 0.02,
    top: deviceHeight * 0.1,
    zIndex: 9,
  },
  aerrowbackios: {
    left: deviceWidth * 0.03,
    width: deviceWidth * 0.1,
    height: deviceHeight * 0.02,
    top: deviceHeight * 0.1,
    zIndex: 9,
  },
});
