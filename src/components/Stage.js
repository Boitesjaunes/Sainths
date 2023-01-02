import CreateGame from "./CreateGame";
import FirstGame from "./games/Main/Game_1";
import { useContext } from "react";
import { GameContext } from "./Context/GameContext";

function Stage({ gameData }) {
  const { GameData } = useContext(GameContext);
  const value = GameData.roomStage ? GameData.roomStage : 0;

  console.log(GameData.roomStage)
  return value === 0 ? (
    <CreateGame />
  ) : value === 1 ? (
    <FirstGame gameData={gameData}></FirstGame>
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
