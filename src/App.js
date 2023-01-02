import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import BackgroundAnimation from "./components/BackgroudAnimation";
import Stage from "./components/Stage";
import StageUser from "./components/StageUser";
import SetGameState from "./components/SetGameState";
import Alert from "./components/Alert";
import ChooseTypePage from "./components/ChooseTypePage";
import { GameContext } from "./components/Context/GameContext";
import { SocketContext, socket } from './components/Context/SocketContext';
import MultiPlayer from "./components/media/MusicPlayer";
import { motion } from "framer-motion";

function App() {
  // console.log("%crerender", "color:green;font-size:12px;font-family: monospacea")
  const [GameData, setGameData] = useState({});

  useEffect(() => {
    if (localStorage.getItem("gameData")) {
      socket.emit("createGame");
    }
    socket.on("joinToGame", (data) => {
      setGameData(data);
      SetGameState("set", "gameData", JSON.stringify(data));
    });
    socket.on("createGame", (data) => {
      setGameData(data);
      SetGameState("set", "gameData", JSON.stringify(data));
    });
    socket.on("refreshTab", (data) => {
      console.log("odświerzono")
      setGameData(data);
      SetGameState("set", "gameData", JSON.stringify(data));
    })
  }, [])

  return (

    <SocketContext.Provider value={socket}>
      <GameContext.Provider value={{ GameData }}>

        {/* That component create background with snowbells */}
        <BackgroundAnimation />
        <motion.div id="modal" className="modal modal-bottom modal-open sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-3xl">Witamy!🎄</h3>
            <p className="py-4">Kliknij głośniczek jeżeli chcesz grać, w ako,pamiamecie świątecznych rytmów!</p>
            <div className="modal-action">
              <MultiPlayer
                urls={[
                  "./bg-music.mp3",
                ]} />
              <label htmlFor="my-modal-6" className="btn" onClick={() => { document.querySelector("#modal").classList.toggle("modal-open") }}>Potem!</label>

            </div>

          </div>
        </motion.div>

        {/* set routes */}
        <Routes>
          <Route
            path="/local/main"
            exact
            element={<Stage gameData={""} />}
          />
          <Route
            path="/local/user"
            exact
            element={<StageUser gameData={""} />}
          />
          <Route path="*" element={<ChooseTypePage />} />
        </Routes>
        <Alert socket={socket} />
        {/* <DownFotterBar /> */}
      </GameContext.Provider>
    </SocketContext.Provider>
  );
}

export default App;
