import { useEffect } from "react";
import TabList from "../../TabList";


function FirstGame({ gameData }) {

  // const hidep =
  //   "text-normal m-4 font-bold text-center text-white border-b-white border-solid border-b-2 text-opacity-0";

  // let words = `Przybieżeli do Betlejem pasterze Grając skocznie Dzieciąteczku na lirze Oddawali swe ukłony w pokorze Tobie z serca ochotnego o Boże`;

  useEffect(() => {
    // setchoosenSong(words.split(" "));
  }, []);

  return (
    <>
      <div className="w-screen h-screen flex justify-end items-start align-top absolute">
        <div className="flex m-4 justify-end align-top absolute">
          <table className="table w-full bg-base-300 absolute">
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
        </div>
      </div>
      <div className="w-screen h-screen flex justify-center items-center relative flex-col">
        <p className="absolute top-0 left-0 text-white text-2xl">
        </p>
        <p className="absolute top-0 left-32 text-white text-2xl">
        </p>
        <div className="world-list h-3/5 flex flex-row flex-wrap justify-center items-start content-around w-2/4">
        </div>
        <br></br>

      </div>
    </>
  );
}

export default FirstGame;
