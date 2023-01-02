import StillNobodyRow from "./StillNobodyRow";
import TabListRow from "./TabListRow";
import { useContext } from "react";
import { GameContext } from "./Context/GameContext";

function TabList({ user }) {
  // State variable to store game data for next use
  const { GameData } = useContext(GameContext);

  return !user ?
    <TabListRow />
    : GameData?.users ? (
      GameData.users.map((player, i) => {
        console.log("działa")
        if (player.login === localStorage.getItem("login")) {
          return (
            <tr key={0}>
              <td>
                <div className="flex items-center space-x-3 justify-start">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12 ">
                      <img
                        src={`https://avatars.dicebear.com/api/avataaars/${player.login}.svg`}
                        alt="Avatar"
                      />
                    </div>
                  </div>
                  <div className="w-full text-center">
                    <div className="font-bold">{player.login}</div>
                  </div>
                </div>
              </td>
              <td className="text-center">{player.points}</td>
              <td className="text-center">0</td>
            </tr>
          )
        } else {
          <StillNobodyRow num={0} />
        }
      })) : <StillNobodyRow num={0} />
}

export default TabList;
