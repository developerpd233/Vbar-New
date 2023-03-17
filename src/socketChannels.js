import _ from "lodash";
import { GiftedChat } from "react-native-gifted-chat";
import { useSelector } from "react-redux";
import { toggleStatus } from "../store/actions/Common";
import { socket } from "./socket";
 import {openNotification,renderNotificationText} from "./helper";





export const changeChatSocket = (setMessages, userID , logeduserid) => {
  
    // const reduxState = useSelector((state)=>{console.log(state,",,,,,,,,,,,,,,,,,")})
    // console.log(reduxState);

    
    try {
    if (socket) {
        socket.on('private message', ({ content, from, to }) => {

            console.log("This "+userID+" "+logeduserid);
            console.log('responseresponseresponseresponse', { content, from, to })
            let res = content;// { text: content, user: { from }, createdAt: new Date(), _id: `${from}${content?.text}` }
            //console.log('changeChatSocket socketon', logeduserid);
            if(logeduserid == to && userID == from){
                setMessages && setMessages(previousMessages => GiftedChat.append(previousMessages, res));
            }                   

        });
    }} catch (err) {
        console.log('changeChatSocket', err)
    }
};

export const socketOff = () => {
    socket.off();
}