import React, { useState, useEffect } from "react";
import TabOfPlayers from "./TabOfPlayers";

function MainTabList({ socket }) {
  const [joinToGame, setJoinToGame] = useState(false);
  const [login, setLogin] = useState("");

  useEffect(() => {
    socket.on("refreshGameTab", (data) => {
      setJoinToGame(data);
    });
  }, []);
  return <TabOfPlayers login={login} joinToGame={joinToGame} socket={socket} />;
}

export default MainTabList;
