import React, { useState, useEffect } from "react";
import TabOfPlayers from "./TabOfPlayers";
import SetGameState from "./SetGameState";

function WaitRoom({ socket }) {
  // State variable to store game data for next use
  const [array, setArray] = useState([]);

  // get data from localstorage and apply it to state
  useEffect(() => {
    SetGameState("get", "GameStats").then((e) => {
      setArray(e);
    });
  });

  return (
    <>
      <div className="w-full text-center mb-12 flex justify-center">
        <h1 className="text-3xl text-white">Kod do gry:</h1>
        <h1 className="text-5xl text-white ml-8 text-red-400">
          {array && array.id}
        </h1>
      </div>
      <TabOfPlayers socket={socket} btn={"true"} />
    </>
  );
}

export default WaitRoom;
