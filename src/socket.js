import { useSelector } from "react-redux";
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
    });
    socket.on('connect', () => {
    });
    socket.on('connect_error', (err) => {
    });
    socket.onAny((event, ...args) => {
    });
};

export { connectionSocket, socket, setGlobalSocketConnection };