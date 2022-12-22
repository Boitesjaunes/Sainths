import { useEffect, useState } from "react";
import GameStats from "./SetGameState";
import WaitRoom from "./WaitRoom";

function CreateGame({ socket }) {
  const [createGame, setCreateGame] = useState(false);
  function eventHandler() {
    socket.emit("createGame");
  }

  // on get info about start of room game from serwer set datat to localstorage
  useEffect(() => {
    socket.on("createGame", (data) => {
      GameStats("set", "GameStats", JSON.stringify(data));
      setCreateGame(true);
    });
  });

  return (
    <div className="w-screen h-screen flex justify-center items-center relative flex-col">
      {createGame ? (
        <WaitRoom socket={socket} />
      ) : (
        <button className="btn btn-primary" onClick={() => eventHandler()}>
          Stwórz gre
        </button>
      )}
    </div>
  );
}

export default CreateGame;
