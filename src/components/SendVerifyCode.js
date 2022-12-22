import React, { useState, useEffect } from "react";
import TabOfPlayers from "./TabOfPlayers";

function SendVerifyCode({ socket }) {
  const [codeVerify, setVerifyCode] = useState("");
  const [joinToGame, setJoinToGame] = useState(false);
  const [login, setLogin] = useState("");
  // const [playersCount, setPlayerCount] = useState(0);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    socket.on("joinToGame", (data) => {
      setJoinToGame(data);
      console.table([data]);
    });
    socket.on("message", (data) => {
      data.type === "error" && setPending(false);
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("joinToGame", { id: codeVerify, login: login });
  }

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center relative flex-col">
        {!joinToGame ? (
          <form
            className="form flex-col flex items-center"
            onSubmit={(e) => {
              setPending(true);
              handleSubmit(e);
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
          // <p>
          //   Jesteś w pokoju {status} łacznie z {playersCount}
          // </p>
          <>
            {/* <div className="w-full text-center mb-8 flex justify-center">
              <h1 className="text-3xl text-white">Poczekalnia: </h1>

              <h1 className="text-5xl text-white ml-8 text-red-400">
                {joinToGame.id && joinToGame.id}
              </h1>
            </div> */}
            <TabOfPlayers socket={socket} btn={false} />
          </>
        )}
      </div>
    </>
  );
}

export default SendVerifyCode;
