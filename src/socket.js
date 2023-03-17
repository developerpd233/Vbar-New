// import { io } from "socket.io-client";


import { useSelector } from "react-redux";
// const socket = io(URL, { autoConnect: false });

// export default null;//socket || null;

import io from "socket.io-client";

import { BASE_URL_ONLY } from "./config/WebServices";

const URL = BASE_URL_ONLY;
let socket = null;

const setGlobalSocketConnection = (data) => {
    socket = data;
};

const connectionSocket = async (user, dispatch) => {
    socket = io.connect(`${URL}`, {
        auth: { username: String(user?.id), userID: String(user?.id) },
        transports: ['websocket'],
        // path: '/events',
    });
    // console.log('socket.auth', socket.auth)
    socket.on('connect', () => {
        // console.log('EVENTS SOCKET CONNECTED');
    });
    socket.on('connect_error', (err) => {
        //console.log('EVENTS SOCKET ERROR', err?.message);
    });
    socket.onAny((event, ...args) => {
       // console.log('event, args', event, args);
    });
};

export { connectionSocket, socket, setGlobalSocketConnection };