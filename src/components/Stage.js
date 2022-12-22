// import { useState } from "react";
import CreateGame from "./CreateGame";
import FirstGame from "./games/Main/Game_1";

function Stage({ value, socket, gameData }) {
  return value === 0 ? (
    <CreateGame socket={socket} />
  ) : value === 1 ? (
    <FirstGame socket={socket} gameData={gameData}></FirstGame>
  ) : value === 2 ? (
    <p>{value}</p>
  ) : value === 3 ? (
    <p>{value}</p>
  ) : value === 4 ? (
    <p>{value}</p>
  ) : (
    value === 5 && <p>{value}</p>
  );
}

export default Stage;
