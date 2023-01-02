import TabOfPlayers from "./TabOfPlayers";
import { useContext } from "react";
import { GameContext } from "./Context/GameContext";

function WaitRoom() {
  const { GameData } = useContext(GameContext);

  return (
    <>
      <div className="w-full text-center mb-12 flex justify-center">
        <h1 className="text-3xl text-white self-center ">Kod do gry:</h1>
        <h1 className="text-5xl ml-8 text-red-400">
          {GameData && GameData.id}
        </h1>
      </div>
      <TabOfPlayers btn={"true"} main={true} />
    </>
  );
}

export default WaitRoom;
