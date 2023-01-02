import { createContext } from "react";
import socketio from "socket.io-client";

export const socket = socketio.connect("http://87.207.19.177:80");
export const SocketContext = createContext();