import TabList from "../../TabList";
import { SocketContext } from "../../Context/SocketContext";
import { useContext, useRef } from "react";

function FirstGame() {
  const socket = useContext(SocketContext);
  const input = useRef("")

  function handleSendInput() {
    socket.emit("stageOne", input.current.value)
  }

  return (
    <div className="h-screen w-screen flex flex-col content-center">
      <div className="w-screen h-2/5 flex justify-end items-start align-top">
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
              <TabList user={true} />
            </tbody>
          </table>
          <br></br>
        </div>

      </div>
      <div className="w-screen flex content-center text-center items-center justify-evenly">
        <input
          ref={input}
          type="text"
          placeholder="Podaj Słowo"
          className="input input-bordered input-success w-3/5 mp-8 max-w-xs self-center z-50"
          onKeyDown={(e) => {
            e.key === "Enter" && handleSendInput();
          }}
        />
        <button className="btn btn-error text-white z-50" onClick={() => handleSendInput()}>✔</button>
      </div>
      <button className="btn bt-primary z-50 absolute bottom-4 left-4" onClick={() => localStorage.clear()}>Zresetuj localStorage</button>
    </div>

  );
}

export default FirstGame;
