import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
import socketIO from "socket.io-client";
// import SendVerifyCode from "./components/SendVerifyCode";
import BackgroundAnimation from "./components/BackgroudAnimation";
// import { isMobile } from "react-device-detect";
import Stage from "./components/Stage";
import StageUser from "./components/StageUser";
import SetGameState from "./components/SetGameState";
import Alert from "./components/Alert";
// import { themeChange } from "theme-change";
// import DownFotterBar from "./components/DownFotterBar";

const socket = socketIO.connect("http://192.168.0.213:80");

function App() {
  // const [gameStatus, setGameStatus] = useState(false);
  const [IsIdentifyData, setIsIdentifyData] = useState();

  // check if user are refresh or reconect to site and set status isconnetc to send data to serwer
  SetGameState("get", "game_Identify").then((response) => {
    response ? setIsIdentifyData(true) : setIsIdentifyData(false);
  });

  useEffect(() => {
    if (!IsIdentifyData) {
      socket.on("joinToGame", (data) => {
        SetGameState("set", "gameData", JSON.stringify(data));
      });
    }
  });
  return (
    <>
      {/* That component create background with snowbells */}
      <BackgroundAnimation />

      {/* set routes */}
      <Alert socket={socket} />
      <Routes>
        <Route
          path="/main"
          exact
          element={<Stage value={0} socket={socket} gameData={""} />}
        />
        <Route
          path="*"
          element={<StageUser value={0} socket={socket} gameData={""} />}
        />
      </Routes>
      {/* <DownFotterBar /> */}
    </>
  );
}

export default App;
