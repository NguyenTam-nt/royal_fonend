import io from "socket.io-client";
import { API } from "../../contains/api";
const socket = io(API, {
  transports: ["websocket"],
});

export default socket;
