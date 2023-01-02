import FirstGame from "./games/User/Game_1";
import SendVerifyCode from "./SendVerifyCode";
import { useContext } from "react";
import { GameContext } from "./Context/GameContext";

function StageUser({ gameData }) {
  const { GameData } = useContext(GameContext);
  const value = GameData.roomStage ? GameData.roomStage : 0;

  console.log("StageUser: ", GameData)
  return value === 0 ? (
    <SendVerifyCode />
  ) : value === 1 ? (
    <FirstGame gameData={gameData} />
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

export default StageUser;
