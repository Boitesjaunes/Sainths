// import { computeHeadingLevel } from "@testing-library/react";
// import { useState, useEffect } from "react";
import TabList from "./TabList";
import { isMobile } from "react-device-detect";

function TabOfPlayers({ socket, btn, main }) {
  // const [Login, setLogin] = useState(login ? login : "anon");
  // const [playerArray, setPlayerArray] = useState(false);

  // useEffect(() => {
  //   socket.on("refreshGameTab", (data) => {
  //     setPlayerArray(data);
  //   });
  // });

  return isMobile ? (
    <div className="w-screen h-screen flex justify-top items-center mb-8  flex-col">
      <table className="table w-screen bg-base-300">
        <thead>
          <tr className="bg-base-300">
            <th className="text-center pl-0 whitespace-normal">Nazwa</th>
            <th className="text-center pl-0 whitespace-normal">
              Punktacja Ogólna
            </th>
            <th className="text-center pl-0 whitespace-normal">
              Punktacja Aktualna
            </th>
          </tr>
        </thead>
        <tbody>
          <TabList socket={socket} user={main ? false : true} />
        </tbody>
      </table>
      <br></br>
      {btn ? (
        <button
          className="btn btn-error mt-12 text-white"
          onClick={socket.emit("startGame", "startGame")}
        >
          Zaczynajmy!
        </button>
      ) : (
        <button className="btn loading w-2/5 mt-8 bg-red-400 text-white">
          Oczekiwanie
        </button>
      )}
    </div>
  ) : (
    <div className={"w-3/5"}>
      <table className="table table-compact w-full">
        <thead>
          <tr>
            <th className="text-center">Nazwa</th>
            <th className="text-center">Punktacja Ogólna</th>
            <th className="text-center">Punktacja Aktualna</th>
          </tr>
        </thead>
        <tbody>
          <TabList socket={socket} user={main ? false : true} />
        </tbody>
      </table>
      {btn ? (
        <button
          className="btn btn-error mt-12 text-white"
          onClick={(e) => {
            e.preventDefault();
            socket.emit("startGame", "startGame");
          }}
        >
          Zaczynajmy!
        </button>
      ) : (
        
        <button className="btn loading">Oczekiwanie</button>
      )}
    </div>
  );
}

export default TabOfPlayers;
