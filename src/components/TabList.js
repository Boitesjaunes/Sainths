import { useState, useEffect } from "react";
import SetGameState from "./SetGameState";

function TabList({ socket, user }) {
  // State variable to store game data for next use
  const [array, setArray] = useState(false);

  // get data from localstorage and apply it to state

  useEffect(() => {
    socket.on("refreshTab", (data) => {
      setArray(data);
    });

    if (!array) {
      SetGameState("get", "gameData").then((res) => {
        res && setArray(res);
        console.log(res);
      });
      SetGameState("get", "GameStats").then((res) => {
        res && setArray(res);
        console.log(res);
      });
    }
  }, []);

  // useEffect(() => {

  // });

  // console.log(array, array.users);
  return !user ?
    array && array.users ? (
      array.users.map((player, i) => {
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
            <td className="text-center">0</td>
          </tr>
        );
      })
    ) : (
      <tr className="bg-green-100" key={0}>
        <td className="text-center"></td>
        <td className="text-center">Jeszcze nikogo nie ma 😒</td>
        <td className="text-center"></td>
      </tr>
    ) :
    array && array.users ? (
      array.users.map((player, i) => {
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
        }

      }))
      : (
        <tr className="bg-green-100" key={0}>
          <td className="text-center"></td>
          <td className="text-center">Jeszcze nikogo nie ma 😒</td>
          <td className="text-center"></td>
        </tr>
      )

    ;
}

export default TabList;
