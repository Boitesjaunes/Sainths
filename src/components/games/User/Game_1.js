import { useState, useEffect } from "react";
import TabList from "../../TabList";
import { isMobile } from "react-device-detect";

function FirstGame({ socket, gameData }) {
  console.clear();
  console.dir(gameData);

  return (
    <div className="w-screen h-screen flex justify-end items-start align-top">
      <div className="flex m-4 justify-end align-top">
        <table className="table w-full bg-base-300">
          <thead>
            <tr className="bg-base-300">
              <th className="text-center whitespace-normal">Nazwa</th>
              <th className="text-center whitespace-normal">
                Punktacja Ogólna
              </th>
              <th className="text-center whitespace-normal">
                Punktacja Aktualna
              </th>
            </tr>
          </thead>
          <tbody>
            <TabList array={gameData} />
          </tbody>
        </table>
        <br></br>
        {/* <Chart
          type={"bar"}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
          data={{
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [
              {
                label: "# of Votes",
                data: [12, 19, 3, 5, 2, 3],
                borderWidth: 1,
              },
            ],
          }}
        /> */}
        {/* {btn ? (
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
      )} */}
      </div>
    </div>
  );
}

export default FirstGame;
