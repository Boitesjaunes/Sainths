import React, { useState, useEffect } from "react";
import TabOfPlayers from "./TabOfPlayers";
import { isMobile } from "react-device-detect";
import SetGameState from "./SetGameState";

function SendVerifyCode({ socket }) {
  const [codeVerify, setVerifyCode] = useState("");
  const [joinToGame, setJoinToGame] = useState(false);
  const [login, setLogin] = useState("");
  // const [playersCount, setPlayerCount] = useState(0);
  const [pending, setPending] = useState(false);
  const [upPaddingStatus, setupPaddingStatus] = useState(true)

  useEffect(() => {
    socket.on("joinToGame", (data) => {
      setJoinToGame(data);
      console.table([data]);
    });
    socket.on("message", (data) => {
      data.type === "error" && setPending(false);
      data.type === "error" && setupPaddingStatus(true)
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("joinToGame", { id: codeVerify, login: login });
    SetGameState("set", "login", login)
  }

  return (
    <>
      <div className={`w-screen h-screen flex  items-center relative flex-col 
      ${upPaddingStatus ? isMobile ? " justify-start pt-16" : " justify-center" : isMobile ? " justify-start pt-0" : " justify-center"}`}>
        {!joinToGame ? (
          <form
            className="form flex-col flex items-center"
            onSubmit={(e) => {
              setPending(true);
              handleSubmit(e);
              setupPaddingStatus(false)
            }}
          >
            <h1 className="text-4xl font-bold text-white">Dołącz do gry</h1>
            <br />
            <hr></hr>
            <input
              type="text"
              placeholder="Podaj kodzik wariacie!"
              value={codeVerify}
              className="input input-bordered input-error w-full max-w-x"
              onChange={(e) => setVerifyCode(e.target?.value)}
            />
            <br />
            <input
              type="text"
              placeholder="Twój Login"
              value={login}
              className="input input-bordered input-error w-full max-w-xs"
              onChange={(e) => setLogin(e.target?.value)}
            />
            <br></br>
            {!pending ? (
              <button className="btn bg-red-500 text-white border-none hover:bg-red-600">
                Dołącz!
              </button>
            ) : (
              <button className="btn loading bg-red-400">Dołącz!</button>
            )}
          </form>
        ) : (
          <TabOfPlayers socket={socket} btn={false} />
        )}
      </div>
    </>
  );
}

export default SendVerifyCode;
