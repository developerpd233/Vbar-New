import { Dimensions, TouchableOpacity, View, StyleSheet, ImageBackground, Image, StatusBar } from 'react-native';
import sendimage from '../../assests/sendimage.png'
import smile from '../../assests/smile.png';
import avatr from '../../assests/avatr.png';
import { totalSize } from 'react-native-dimension';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import chatback from '../../assests/chatback.png';
import { ChatBox } from '../../components';
import chatheading from '../../assests/chatheading.png';
import arrowback from '../../assests/arrowback.png';
import { width } from 'react-native-dimension';
import Vlogo from '../../assests/Vlogo.png';
import FastImage from 'react-native-fast-image';
import {Text} from 'react-native'
import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Composer, GiftedChat, InputToolbar, Bubble } from 'react-native-gifted-chat'
import { changeChatSocket, socketOff } from '../../socketChannels';
import { useSelector } from 'react-redux';
import { socket } from '../../socket';
import axios from 'axios';
import { BASE_URL } from '../../config/WebServices';


const ChatScreen = ({ navigation: { goBack, navigate }, route }) => {

  const messageRef = useRef(null);
  const [isSend , setIsSend] = useState(false)
  const fetchSingleUser = route?.params?.data?.user || {};
  const user = useSelector(state => state.user);
  const userImg = useSelector(state => state.userImg);
  const logeduserid = useSelector(state => state.user.id);
  const token = useSelector(state => state.signUpToken);
  const statess = useSelector(state => state);

  const [messages, setMessages] = useState([]);
  //console.log("🚀 ~ file: index.js:34 ~ ChatScreen ~ messages", messages)

  const get = () => {
    let url = `${BASE_URL}/chat/getHistory/${fetchSingleUser?.id}`;
    var config = {
      method: 'get',
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios(config)
      .then(function (response) {
        console.log('responseresponse', response)
        if (response?.data?.status) {
          let data = response?.data?.chatHistory;
          let modifiedData = [];
          for (let i = 0; i < data?.length; i++) {
            console.log('data[i]?.senderId', data[i]?.senderId, fetchSingleUser?.id)
            let obj = { ...data[i], _id: data[i]?.id, text: data[i]?.message, user: { _id: String(data[i]?.receiverId), name:data[i]?.user.name , avatar : fetchSingleUser.id !== data[i].receiverId  ? data[i].user.imageUrl : data[i]?.sender.imageUrl } }//String(fetchSingleUser?.id) === String(data[i]?.senderId) ? : data[i]?.receiverId
            modifiedData.push(obj)
          }
          setMessages(modifiedData);
        }
        console.log('response chat --=--=-->', token, url, response?.data?.chatHistory);
        // navigation.navigate('Detailscreen', { data: response?.data });
      })
      .catch(function (error) {
        console.log('token', statess)
        console.log('error chat --=--=-->', url, error);
      });

  }



  useEffect(() => {
    (async () => await get())();
    const unsubscribe = () => socketOff();
    changeChatSocket(setMessages, String(fetchSingleUser?.id), logeduserid);
    return () => unsubscribe();
  }, [isSend])


  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //     {
  //       _id: 2,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 1,
  //         name: 'React Native',
  //         avatar: 'https://facebook.github.io/react/img/logo_og.png',
  //       },

  //     },
  //   ])
  // }, [])
  const onSend = useCallback((messages = []) => {
    console.log('first', messages)
    try {
      // setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      let message = messages[0];
      let payload = { content: { _id: message?._id, createdAt: new Date()?.toUTCString(), text: message?.text, user: messages[0]?.user }, to: String(fetchSingleUser?.id) }//selected?.userID && selected?.userID?.length ? String(selected?.userID) : socket?.userID }
      console.log('payload', payload)
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      socket.emit('private message', payload);
      setIsSend(!isSend)
    }
    catch (e) {
      console.log('eeeeeeeeeeeeeeeeeee', e)
    }
  }, []);

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={Styles.toolBar}
      />
    )
  }

  const renderSend = (props) => {
    const { text, messageIdGenerator, user, onSend } = props;
    
    if (props.text.trim().length > 0) {
      return (
        <TouchableOpacity style={Styles.sendButton} onPress={() => {
          onSend({ text: text.trim(), user: user, _id: messageIdGenerator() }, true)
        }}>
          <Image source={sendimage} style={Styles.sendButtonIcon} />
        </TouchableOpacity>
      );
    }
    return null;
  };

  const renderComposer = (props) => <Composer {...props}   textInputStyle={Styles.textStyle} />;

  const renderBubble = (props) => {
    return (
      <>
       {/* <Text style={Styles.name}>{props.currentMessage.receiverUser.name}</Text> */}
    <Bubble {...props}
      renderUsernameOnMessage={true}
      wrapperStyle={{
        right: Styles.rightBubble,
        left: Styles.leftBubble,
      }}
      textStyle={{
        right: Styles.rightBubbleText,
        left: Styles.leftBubbleText,
      }}
    />
    </>
    )
  };

  return (
    <ImageBackground source={chatback} resizeMode="cover" style={{ flex: 1 }}  >
      <StatusBar backgroundColor="#CA60FFFF" />
      {Platform.OS === 'ios' ? (
        <TouchableOpacity
          style={Styles.aerrowbackios}
          onPress={() => {
            goBack();
          }}>
          <Image
            style={{ width: '100%', height: '100%' }}
            source={arrowback}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={Styles.aerrowback}
          onPress={() => {
            goBack()
          }}>
          <Image
            style={{ width: '100%', height: '100%' }}
            source={arrowback}
          />
        </TouchableOpacity>
      )}
      {/* <TouchableOpacity
        // style={Styles.aerrowbackios}
        onPress={() => {
          goBack();
        }}>
        <Image style={{ marginTop: 20, marginLeft: 50 }} source={arrowback} />
      </TouchableOpacity> */}
      <View style={{
        justifyContent: 'center', alignItems: 'center',
        marginBottom: deviceHeight * 0.05,
        top: deviceHeight * 0.04,
        borderWidth: 2,
        borderColor: '#D1179B',
        borderRadius: 14,
        shadowColor: '#f705a7',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 50,
        width: '80%',
        alignSelf: 'center',
        padding: 0,
      }}>
        <View style={{
          width: deviceWidth * 0.6, height: deviceHeight * 0.14,
        }}>
          <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={Vlogo} />
        </View>
      </View>
      <GiftedChat
        messages={messages}
        minInputToolbarHeight={80}
        ref={messageRef}
        onSend={messages => onSend(messages)}
        
        user= {{
          _id: String(fetchSingleUser?.id),
          name: user?.name || '',// renderUserName(reduxState?.chatData?.student),
          avatar: userImg
        }}
        // user={{
        //   _id: String(fetchSingleUser?.id) || '',// reduxState?.user?._id,
        //   name:  "dnnd",// renderUserName(reduxState?.chatData?.student),
        //   avatar: messages?.[0]?.receiverUser?.imageUrl || require('../../assests/avatr.png'),//renderUserImage(reduxState?.chatData?.student)
        // }}
        // showUserAvatar={true}
        
        renderUsernameOnMessage={true}
        showAvatarForEveryMessage={true}
        messagesContainerStyle={Styles.messageContainer}
        renderInputToolbar={renderInputToolbar}
        renderComposer={renderComposer}
        renderBubble={renderBubble}
        renderSend={renderSend}
        // renderLoading={() => <CLoading
        //   style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
        //   loading={false || reduxState?.loading} />}
        // loadEarlier={reduxState?.isLoadMoreLoading && !reduxState.isLoadMore}
        // onLoadEarlier={onEndReached}
        // isLoadingEarlier={reduxState?.isLoadMoreLoading || false}
        listViewProps={{
          // onEndReached: () => onEndReached(),
          onEndReachedThreshold: 0.1,
          maxToRenderPerBatch: 20,
          windowSize: 20,
          // isShowFooter: !reduxState?.isLoadMoreLoading && !reduxState?.isLoadMore || false,
        }}
        scrollToBottom={true}
        infiniteScroll={true}
      />
       {/* <FastImage resizeMode='cover' progressiveRenderingEnabled={true} source={{ uri: "https://jaun.nyc3.digitaloceanspaces.com/profile_pics/1670241119457-image", priority: FastImage.priority.high }}
          style={{ height: deviceHeight * 0.20, width: deviceWidth * 0.40, borderRadius: deviceWidth * 0.40 }} /> */}
      {/* <View style={{backgroundColor:'red' , height:200}}>
      <Image  source={"https://jaun.nyc3.digitaloceanspaces.com/profile_pics/1670241119457-image"}/>

      </View> */}
    </ImageBackground>
  )
}




export default ChatScreen;


const Styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },

  hedStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D1179B',
    borderRadius: 14,
    shadowColor: '#f705a7',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 20,
    top: -0,
  },
  title: {
    fontFamily: 'Monoton-Regular',
    fontSize: 50,
    color: '#ffff',
    shadowColor: '#f705a7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 20,
    textShadowColor: '#D1179B',
    textShadowOffset: { width: 4, height: 3 },
    textShadowRadius: 10,
    fontWeight: '400',
  },
  titlesub: {
    fontFamily: 'Monoton-Regular',
    fontSize: 50,
    color: '#ffff',
    shadowColor: '#f705a7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 20,

    textShadowColor: '#D1179B',
    textShadowOffset: { width: 4, height: 3 },
    textShadowRadius: 10,
    fontWeight: '400',
  },
  hedsub: {
    fontFamily: 'Futura',
    fontSize: 14,
    color: '#ffff',
    shadowColor: '#D1179B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 20,
    textShadowColor: '#D1179B',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    fontWeight: '900',
  },
  aerrowback: {
    left: deviceWidth * 0.03,
    width: deviceWidth * 0.11,
    height: deviceHeight * 0.03,
    top: deviceHeight * 0.03,
  },
  aerrowbackios: {
    left: deviceWidth * 0.03,
    width: deviceWidth * 0.1,
    height: deviceHeight * 0.03,
    // top: deviceHeight * 0.05,
    marginTop: deviceHeight * 0.05,
    position: 'relative',
  },
  inputFild1: {
    backgroundColor: '#fff',
    borderColor: '#D1179B',
    borderWidth: 2,
    // paddingTop: 12,
    // paddingBottom: 12,
    // paddingLeft: 20,
    fontSize: totalSize(2),
    borderRadius: deviceWidth * 0.03,
    color: '#ffff',
    width: deviceWidth * 0.7,
    height: deviceHeight * 0.08, paddingLeft: deviceWidth * 0.18
  },
  fileldios: {
    backgroundColor: '#fff',
    borderColor: '#D1179B',
    borderWidth: deviceWidth * 0.005,
    // paddingTop: deviceHeight*0.04,
    // paddingBottom: deviceHeight*0.05,
    // paddingLeft: 20,
    fontSize: totalSize(2),
    borderRadius: deviceWidth * 0.03,
    color: '#000',
    width: deviceWidth * 0.7,
    height: deviceHeight * 0.08, paddingLeft: deviceWidth * 0.12
  },
  fullContainer: {
    flex: 1,
  },

  messageContainer: {
    paddingBottom: 40,
    paddingHorizontal: 15
  },

  toolBar: {
    backgroundColor: 'white',
    borderTopWidth: 0,
    margin: 15,
    borderRadius: 8,
    padding: 0,
    overflow: 'hidden',
    paddingVertical: 10,
  },

  textStyle: {
    fontSize: 16,
    // fontFamily: Theme.font.regular,
    color: '#D1179B',
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 0,
    marginLeft: 0,
    marginBottom: 0,
  },

  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 42,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D1179B',//Theme['light'].colors.primary,
    marginHorizontal: 10
  },
  sendButtonIcon: {
    // fontSize: 14,
    // color: 'white',//Theme['light'].colors.tertiary
  },


  rightBubble: {
    backgroundColor: '#D1179B',//Theme['light'].colors.fieldBackgroundColor,
    color: 'black',
    borderColor: '#D1179B',
    borderWidth: 2,
    shadowColor: '#f705a7',
    elevation: 4,
    borderWidth: 2,
    borderColor: '#D1179B',
    borderRadius: 14,
    shadowColor: '#f705a7',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 12,
  },
  rightBubbleText: {
    // fontFamily: Theme.font.regular,
    fontSize: 16,
    fontFamily: 'Futura',
    fontSize: 14,
    color: 'white',
    fontWeight: '900',

  },
  leftBubble: {
    backgroundColor: 'white',//Theme['light'].colors.fieldBackgroundColor,
    color: 'black',
    borderColor: '#D1179B',
    borderWidth: 2,
    shadowColor: '#f705a7',
    elevation: 4,
    borderWidth: 2,
    borderColor: '#D1179B',
    borderRadius: 14,
    shadowColor: '#f705a7',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 12,
  },
  leftBubbleText: {
    fontSize: 16,
    fontFamily: 'Futura',
    fontSize: 14,
    color: '#D1179B',
    fontWeight: '900',
  },
});
