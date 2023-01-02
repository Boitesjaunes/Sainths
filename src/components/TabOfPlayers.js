// import { computeHeadingLevel } from "@testing-library/react";
// import { useState, useEffect } from "react";
import TabList from "./TabList";
import { isMobile } from "react-device-detect";
import { useContext } from "react";
import { GameContext } from "./Context/GameContext";
import { SocketContext } from "./Context/SocketContext";

function TabOfPlayers({ btn, main }) {
  const socket = useContext(SocketContext);
  const { GameData } = useContext(GameContext);

  return isMobile ? (
    <div className="w-screen h-screen flex justify-top items-center mb-8  flex-col">
      <table className="table w-screen bg-base-300">
        <thead>
          <tr className="bg-base-300">
            <th className="text-center pl-0 whitespace-normal w-[20vw]">Nazwa</th>
            <th className="text-center pl-0 whitespace-normal w-[20vw]">
              Ogólna Punktacja
            </th>
            <th className="text-center pl-0 whitespace-normal w-[20vw]">
              Aktualna Punktacja
            </th>
          </tr>
        </thead>
        <tbody>
          <TabList user={main ? false : true} />
        </tbody>
      </table>
      <br></br>
      {btn ? (
        <button
          className="btn btn-error mt-12 text-white"
          onClick={socket.emit("startGame", GameData)}
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
    <div className={"w-3/5 flex items-center flex-col"}>
      <table className="table table-compact w-full">
        <thead>
          <tr>
            <th className="text-center w-[20vw]">Nazwa</th>
            <th className="text-center w-[20vw]">Punktacja Ogólna</th>
            <th className="text-center w-[20vw]">Punktacja Aktualna</th>
          </tr>
        </thead>
        <tbody>
          <TabList user={main ? false : true} />
        </tbody>
      </table>
      {btn ? (
        <button
          className="btn btn-error mt-12 text-white"
          onClick={(e) => { e.preventDefault(); socket.emit("startGame", GameData); }}>
          Zaczynajmy!
        </button>
      ) : (

        <button className="btn loading">Oczekiwanie</button>
      )}
    </div>
  );
}

export default TabOfPlayers;
