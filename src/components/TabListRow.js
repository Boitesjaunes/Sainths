import StillNobodyRow from "./StillNobodyRow";
import { useContext } from "react";
import { GameContext } from "./Context/GameContext";

function TabListRow() {
    const { GameData } = useContext(GameContext);
    console.log(GameData.users.length)
    return GameData.users.length ?
        GameData.users.map((player, i) => {
            return (
                <tr key={i}>
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
                    <td className="text-center">1000</td>
                </tr>
            );
        }
        ) : <StillNobodyRow num={0} />

}

export default TabListRow;