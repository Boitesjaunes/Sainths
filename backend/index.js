console.clear()

require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const http = require("http").Server(app);
const cors = require("cors");
app.use(cors());
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://192.168.0.213:3000",
  },
});
const { v1: uuidv1, v4: uuidv4 } = require("uuid");
const maxRoomPlayers = 10;

// array to save players
function Room(id, roomKey, users, mainUser, roomStage) {
  return {
    id: id,
    roomKey: roomKey,
    users: users,
    mainUser: mainUser,
    roomStage: roomStage,
  };
}

let rooms = [];

// generate code for game id
function generateKey() {
  return Math.floor(Math.random() * 90000) + 10000;
}

// set adress to api
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

socketIO.on("connection", (socket) => {
  // socket.userId = socket.handshake.query.id;
  console.log(socket.id);

  // set are exist or create new room object and send it to main user
  socket.on("createGame", () => {
    // found elemet in array of rooms

    const found = rooms.find(
      (element) => element.mainUser === socket.handshake.address
    );
    const room = !found
      ? Room(generateKey(), uuidv4(), [], socket.handshake.address, 0)
      : found;
    // if room exist don't create another one

    if (room) {
      socket.join("Room_" + room.id);
      console.log(socket.adapter.rooms);
      rooms.push(room);
      socket.emit("createGame", room);
    } else {
      socket.emit("createGame", room);
    }
  });

  socket.on("joinToGame", (data) => {
    let found = rooms.find((room) => String(room.id) === String(data.id));
    const user = {
      login: data.login,
      socketID: socket.id,
      ip: socket.handshake.address,
      points: 0,
      onlineStatus: true,
    };
    if (found) {
      if (found.users.length <= maxRoomPlayers) {
        socket.join("Room_" + found.id);

        console.log("pokoje", socket.adapter.rooms);
        if (found.users.find((user) => user.login === data.login)) {
          let a = found.users.find((user) => user.login === data.login);
          if (a.onlineStatus) {
            socket.emit("message", {
              type: "error",
              title: "Błąd",
              value: "istnieje gracz o takim samym nicku i jest aktywny",
            });
          } else {
            a.socketID = socket.id;
            a.onlineStatus = true;
            socket.emit("joinToGame", a);
            socket.emit("message", {
              type: "succes",
              title: "Udało się! 🥳🥂",
              value: "Powróciłeś do nas!",
            });
            socket.in("Room_" + found.id).emit("message", {
              type: "info",
              title: "Jest i on! 🎈🎀",
              value: data.login + " Powrócił do gry!",
            });
            socket.in("Room_" + found.id).emit("refreshTab", found);
          }
        } else {
          found.users.push(user);
          socket.emit("joinToGame", found);
          socket.emit("message", {
            type: "succes",
            title: "Udało się! 🥳🥂",
            value: "Dołączyłeś do gry!",
          });
          socket.in("Room_" + found.id).emit("message", {
            type: "info",
            title: "Rodzinka się powieksza! 🎈🎀",
            value: data.login + " Dołączył do gry!",
          });
          socket.in("Room_" + found.id).emit("refreshTab", found);
        }
      } else {
        socket.emit("message", {
          type: "error",
          title: "Błąd",
          value: "Ten pokój osiągnął juz maksymalną ilość graczy 😥",
        });
      }
      // console.log(rooms);
      // console.table(rooms[0]?.users);
    } else {
      socket.emit("message", {
        type: "error",
        title: "Błąd",
        value: "nie ma takiego pokoju",
      });

    }
  });

  // // get login and code from client and chech if it pas
  // socket.on("verifyCode", (verifyCode) => {
  //   // console.log(sendVerifyCode, verifyCode);

  //   // if pas then add to room and check if there is player in this same  player
  //   if (sendVerifyCode === Number(verifyCode.key)) {
  //     socket.join("gra");

  //     if (
  //       !arrayOfPlayers.find((player) => {
  //         if (player.login === verifyCode.login) {
  //           return player;
  //         }
  //       })
  //     ) {
  //       arrayOfPlayers.push(verifyCode);
  //     }
  //     console.log(socket.rooms);
  //     // console.log(arrayOfPlayers);

  //     // start object send to the MAIN player
  //     socket.emit("joinToGame", {
  //       count: socket.adapter.rooms.get("gra").size,
  //       status: "success",
  //       players: arrayOfPlayers,
  //     });

  //     // send refresh object (if some player join all get status)
  //     socketIO.in("gra").emit("refreshGameTab", {
  //       count: socket.adapter.rooms.get("gra").size,
  //       status: "success",
  //       players: arrayOfPlayers,
  //     });
  //     //  src for room location
  //     //   var room = socket.sockets.adapter.rooms["my_room"]
  //     // console.dir(socket.adapter.rooms.get("gra").size);
  //     console.dir(socket.adapter.rooms.get("gra"));
  //   }
  // });

  // // listner to start game
  // socket.on("startGame", () => {
  //   console.log("start game");
  //   socketIO.in("gra").emit("startGame", { players: arrayOfPlayers, stage: 1 });
  //   console.log(socket.rooms);
  // });

  // // fuction to get code for game room from MAIN client
  // socket.on("getCode", () => {
  //   console.log("dostałem get code i wysyłam: " + sendVerifyCode);

  //   socket.emit("mainVerifyCode", sendVerifyCode);
  // });

  socket.on("disconnect", () => {
    //find players from  tab index by socet.id and change it status to offline
    const a = rooms.find((item) =>
      item.users.find((user) => user.socketID === socket.id)
    );
    const b = a?.users.find((user) => user.socketID === socket.id);
    if (b) {
      b.onlineStatus = false;
    }

    console.log("🔥: A user disconnected: ", b);
  });
});

http.listen(process.env.PORT, () => {
  console.log("listening on http://192.168.67.242/");
});
