import FirstGame from "./games/User/Game_1";
import SendVerifyCode from "./SendVerifyCode";

function StageUser({ value, socket, gameData }) {
  return value === 0 ? (
    <SendVerifyCode socket={socket} />
  ) : value === 1 ? (
    <FirstGame socket={socket} gameData={gameData} />
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
