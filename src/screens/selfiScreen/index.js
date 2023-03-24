import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  StyleSheet,
  ScrollView,
  Image,
  PermissionsAndroid,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Selfiheader, BUtton } from '../../components';
import selfibg from '../../assests/selfibg.png';
import cameraedit from '../../assests/cameraedit.png';
import flip from '../../assests/flip.png';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';
import { color } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { connectionSocket } from '../../socket';
import { handleError } from '../../components/toast';
import { myProfile } from '../../store/actions';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const SelfiScreen = ({ navigation }) => {
  const [Flip, setFlip] = useState(true);
  const [{ cameraRef }, { takePicture }] = useCamera(null);
  const [cameraPreview, setCameraPreview] = useState(false);
  const [imgUri, setImgUri] = useState('');
  const [Loading, setLoading] = useState(false);
  const [loading, setloading] = useState(false);
  const [count, setCount] = useState(false);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await connectionSocket(user, dispatch);
    })();
  }, []);
  const token = useSelector(state => state.signUpToken);

  const GoToVbarr = () => {
    setloading(true);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("x-amz-acl", "public-read");

    var formdata = new FormData();
    let objImg = {
      uri: imgUri,
      type: 'image/jpg',
      name: 'image'
    }
    formdata.append("file", objImg);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://134.122.30.185:8000/api/users/uploadImage", requestOptions)
      .then(response => response.json())
      .then(result => {
        dispatch(myProfile(result?.image?.imageUrl))
        setloading(false);
        navigation.navigate('QRVbarscreen')
      })
      .catch(error => {
        setCount(true);
        if (count) {
          handleError(error?.response?.data)
        } else {
          setTimeout(() => {
            GoToVbarr();
          }, 0);
        }
        setloading(false);
        console.log('catch error', error)
      });





  };
 
  const captureHandle = async () => {
    try {
      const data = await takePicture();
      setImgUri(data?.uri);
      setCameraPreview(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (

    <ImageBackground
      style={{ height: Dimensions.get('window').height, ...(Platform.OS === 'ios' && { paddingTop: 40 }) }}
      source={selfibg}
      resizeMode="cover">
      {Loading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.container1}>
              <View style={styles.hedCentr}>
                <Selfiheader />
              </View>
              <View style={styles.hedCentr1}>
                {Platform.OS === 'ios' ? (
                  <View style={styles.proviewIos}>
                    {cameraPreview ? (
                      <RNCamera
                        ref={cameraRef}
                        mirrorImage={true}
                        type={
                          !Flip
                            ? RNCamera.Constants.Type.front
                            : RNCamera.Constants.Type.back
                        }
                        style={styles.preview}>
                        <TouchableOpacity onPress={captureHandle}>
                          <View></View>
                        </TouchableOpacity>
                      </RNCamera>
                    ) : (
                      // null
                      <Image
                        style={styles.proviewimage}
                        source={{ uri: imgUri }}
                      />
                    )}
                  </View>
                ) : (
                  <View style={styles.proview}>
                    {cameraPreview ? (
                      <RNCamera
                      captureAudio={false}
                        ref={cameraRef}
                        mirrorImage={true}
                        type={
                          !Flip
                            ? RNCamera.Constants.Type.front
                            : RNCamera.Constants.Type.back
                        }
                        style={styles.preview}>
                        <TouchableOpacity onPress={captureHandle}>
                          <View></View>
                        </TouchableOpacity>
                      </RNCamera>
                    ) : (
                      // null
                      <Image
                        style={styles.proviewimage}
                        source={{ uri: imgUri }}
                      />
                    )}
                  
                  </View>
                )}
                {Platform.OS === 'ios' ? (<View
                  style={{
                    width: 50,
                    height: 50,
                    right: deviceWidth * 0.3,
                    marginTop: deviceHeight * -0.06,
                    zIndex: 9,
                    borderRadius: 100,
                  }}>
                  <TouchableOpacity onPress={() => setFlip(!Flip)}>
                    <Image
                      style={{ width: '100%', height: '100%' }}
                      source={flip}
                    />
                  </TouchableOpacity>
                </View>) : (<View
                  style={{
                    width: deviceWidth * 0.11,
                    height: deviceHeight * 0.06,
                    right: deviceWidth * 0.2,
                    marginTop: deviceHeight * -0.06,
                    zIndex: 9,
                    borderRadius: deviceWidth * 0.9,
                  }}>
                  <TouchableOpacity onPress={() => setFlip(!Flip)}>
                    <Image
                      style={{ width: '100%', height: '100%' }}
                      source={flip}
                    />
                  </TouchableOpacity>
                </View>)}

                <View
                  style={{
                    width: deviceWidth * 0.11,
                    height: deviceHeight * 0.06,
                    left: deviceWidth * 0.2,
                    marginTop: deviceHeight * -0.05,
                    zIndex: 9,
                    borderRadius: deviceWidth * 0.9,
                  }}>
                  {Platform.OS === 'ios' ? (<View
                    style={{
                      width: 50,
                      height: 50,
                      left: deviceWidth * 0.14,
                      marginTop: deviceHeight * -0.02,
                      zIndex: 9,
                      borderRadius: deviceWidth * 0.9,
                    }}>
                    <TouchableOpacity onPress={captureHandle}>
                      <Image
                        style={{ width: '100%', height: '100%' }}
                        source={cameraedit}
                      />
                    </TouchableOpacity>
                  </View>) : (<View
                    style={{
                      width: deviceWidth * 0.11,
                      height: deviceHeight * 0.06,
                      left: deviceWidth * 0.04,
                      marginTop: deviceHeight * -0.01,
                      zIndex: 9,
                      borderRadius: deviceWidth * 0.9,
                    }}>
                    <TouchableOpacity onPress={captureHandle}>
                      <Image
                        style={{ width: '100%', height: '100%' }}
                        source={cameraedit}
                      />
                    </TouchableOpacity>
                  </View>)}
                </View>
                {imgUri ? (

                  <TouchableOpacity
                    style={styles.retakeios}
                    onPress={() => {
                      setCameraPreview(!cameraPreview);
                      setImgUri('');
                    }}>
                    <Text style={{ color: '#fff' }}>Re-Take</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
              {Platform.OS === 'ios' ? (<View style={styles.hedCentrios}>
                <View style={styles.hedCentrtwoios}>
                  <Text style={styles.selfiText}>Why a selfie?</Text>
                  <Text style={styles.selfiTextone}>
                    So you can see how people look tonight!
                  </Text>
                  <Text style={styles.selfiTexttwo}>
                    #NoFiltersNoCatfishingNoUploads
                  </Text>
                </View>
              </View>) : (<View style={styles.hedCentr}>
                <View style={styles.hedCentrtwo}>
                  <Text style={styles.selfiText}>Why a selfie?</Text>
                  <Text style={styles.selfiTextone}>
                    So you can see how people look tonight!
                  </Text>
                  <Text style={styles.selfiTexttwo}>
                    #NoFiltersNoCatfishingNoUploads
                  </Text>
                </View>
              </View>)}
              <View style={{ paddingTop: deviceHeight * 0.1 }}>
                {/* <BUtton
             // functionName={captureHandle}
             functionName={() => setCameraPreview(!cameraPreview)}
             type="scan"
             title="Take A selfie"
           /> */}
              </View>
              {imgUri ? (
                <View style={{ bottom: deviceHeight * 0.05 }}>
                  <BUtton functionName={GoToVbarr} type="scan" title="Next" loading={loading} />
                </View>
              ) : null}
              {!cameraPreview && !imgUri && (
                <View style={{ paddingTop: deviceHeight * 0.0 }}>
                  <BUtton
                    type="scan"
                    title="Take A selfie"
                    functionName={() => setCameraPreview(!cameraPreview)}
                  />
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </ImageBackground>

  );
};

export default SelfiScreen;
const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  container1: {
  },
  hedCentr1: {
    top: deviceHeight * -0.03,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hedCentr: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selfiText: {
    fontSize: 16,
    color: '#FFF',
    lineHeight: 16,
    fontFamily: 'Futura',
    fontWeight: '900',
  },
  selfiTextone: {
    fontSize: 14,
    color: '#FFF',
    fontFamily: 'Futura',
    top: deviceHeight * 0.02,
  },
  selfiTexttwo: {
    fontSize: 14,
    color: '#FFF',
    fontFamily: 'Futura',
    top: deviceHeight * 0.03,
  },
  hedCentrtwo: {
    marginTop: deviceHeight * 0.0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  proview: {
    backgroundColor: 'rgba(209, 23, 155, 1)',
    borderWidth: 5,
    borderColor: '#D1179B',
    borderRadius: deviceWidth * 0.6,
    shadowColor: '#f705a7',
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 20,
    width: deviceWidth * 0.8,
    height: deviceHeight * 0.4,
  },
  proviewIos: {
    backgroundColor: 'rgba(209, 23, 155, 1)',
    borderWidth: 5,
    borderColor: '#D1179B',
    borderRadius: deviceWidth * 1,
    shadowColor: '#f705a7',
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 20,
    width: deviceWidth * 0.85,
    height: deviceHeight * 0.4,
    top: deviceHeight * 0.04,
    left: deviceWidth * 0.01
  },
  proviewimage: {
    width: '100%',
    height: '100%',
    borderRadius: deviceWidth * 0.6,
    left: deviceWidth * 0.001,
    top: deviceHeight * -0.0,
  },
  preview: {
    borderWidth: 2,
    borderColor: '#D1179B',
    shadowColor: '#f705a7',
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 20,
    width: deviceWidth * 0.85,
    height: deviceHeight * 0.40,
    borderRadius: deviceWidth * 0.6,
    overflow: 'hidden',
    right: deviceWidth * 0.01,
    bottom: deviceHeight * 0.001,
  },
  retake: {
    backgroundColor: '#D1179B',
    width: deviceWidth * 0.2,
    height: deviceHeight * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: deviceHeight * 0.02,
  },
  retakeios: {
    backgroundColor: '#D1179B',
    width: deviceWidth * 0.2,
    height: deviceHeight * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: deviceHeight * 0.04,
  },
  hedCentrios: {
    marginTop: deviceHeight * 0.04,
    justifyContent: "center",
    alignItems: "center"
  },
  hedCentrtwoios: {
    justifyContent: "center",
    alignItems: "center"
  }
});
