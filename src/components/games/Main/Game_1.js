import { useState, useEffect } from "react";
import TabList from "../../TabList";
import { isMobile } from "react-device-detect";

function FirstGame({ socket, gameData }) {
  const [choosenSong, setchoosenSong] = useState();
  const [InputValue, setInputValue] = useState("");
  const [Words, setWords] = useState([]);
  const [WordsElements, setWordsElements] = useState();

  let allPlayers = [
    {
      id: 1,
      name: "Jack",
      points: 0,
      chances: 20,
    },
    {
      id: 2,
      name: "Arya",
      points: 0,
      chances: 20,
    },
    {
      id: 3,
      name: "Jack",
      points: 0,
      chances: 20,
    },
    {
      id: 4,
      name: "Arya",
      points: 0,
      chances: 20,
    },
    {
      id: 5,
      name: "Jack",
      points: 0,
      chances: 20,
    },
  ];
  const [chances, setchances] = useState(allPlayers[0].chances);

  const [points, setpoints] = useState(allPlayers[0].points);

  const [User, setUser] = useState({
    id: allPlayers[0].id,
    name: allPlayers[0].name,
  });

  // console.clear();
  const hidep =
    "text-normal m-4 font-bold text-center text-white border-b-white border-solid border-b-2 text-opacity-0";

  let words = `Przybieżeli do Betlejem pasterze Grając skocznie Dzieciąteczku na lirze Oddawali swe ukłony w pokorze Tobie z serca ochotnego o Boże`;

  useEffect(() => {
    setchoosenSong(words.split(" "));
  }, []);

  useEffect(() => {
    setWordsElements(
      choosenSong &&
        choosenSong.map((item, i) => {
          return <p className={hidep}>{Words && Words[i] ? Words[i] : ""}</p>;
        })
    );
  }, [InputValue]);

  useEffect(() => {
    setWords(choosenSong && choosenSong);
  });
  // const rndNumber = Math.floor(Math.random() * 0);
  // console.log(choosenSong && choosenSong[rndNumber]);

  function handleTry(e) {
    e.preventDefault();
    setInputValue("");
    let b = choosenSong.findIndex(
      (word) => word.toLocaleLowerCase() === InputValue.toLocaleLowerCase()
    );

    b !== -1 && setpoints(points + 1);
    if (b !== -1) {
      console.log(choosenSong[b]);
    }
    setchances(chances - 1);

    if (chances === 0) {
    }

    b !== -1 &&
      document
        .querySelector(`.world-list>p:nth-child(${b + 1})`)
        .classList.replace("text-opacity-0", "text-opacity-100");
  }

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
          Punkty: {points ? points : 0}
        </p>
        <p className="absolute top-0 left-32 text-white text-2xl">
          Szanse: {chances ? chances : 20}
        </p>
        <div className="world-list h-3/5 flex flex-row flex-wrap justify-center items-start content-around w-2/4">
          {WordsElements
            ? WordsElements
            : choosenSong &&
              choosenSong.map((item, i) => {
                return (
                  <p className={hidep}>{Words && Words[i] ? Words[i] : ""}</p>
                );
              })}
        </div>
        <br></br>
        <input
          type="text"
          placeholder="Podaj Słowo"
          value={InputValue}
          className="input input-bordered input-success w-full max-w-xs"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onKeyDown={(e) => {
            e.key === "Enter" && handleTry(e);
          }}
        />
      </div>
    </>
  );
}

export default FirstGame;
