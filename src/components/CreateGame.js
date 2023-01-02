import WaitRoom from "./WaitRoom";
import { useContext } from "react";
import { GameContext } from "./Context/GameContext";
import { SocketContext } from "./Context/SocketContext";

function CreateGame() {
  const socket = useContext(SocketContext);
  const { GameData } = useContext(GameContext);
  function eventHandler() {
    socket.emit("createGame");
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center relative flex-col">
      {GameData.id ?
        <WaitRoom />
        :
        <button className="btn btn-error" onClick={() => eventHandler()}>
          Stwórz gre
        </button>
      }
    </div>
  );
}

export default CreateGame;
