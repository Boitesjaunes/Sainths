// import { auth0Middleware } from 'auth0-socketio';
console.clear()
import dotenv from 'dotenv';
import express from "express";
import path from "path";
import { createServer } from 'http';
import { Server } from 'socket.io'; //replaces (import io from 'socket.io')
import cors from "cors";
import { v4 as uuidv4 } from 'uuid';
const __dirname = path.resolve();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "http://87.207.19.177:3000", },
});
dotenv.config();
app.use(cors());


// const withAuthorization = auth0Middleware();

// io.use(withAuthorization);


function RandomIntBetweenAndUnic(count) {
  let arrayOfInts = [];
  let arrayWithInts = [];
  for (let i = count - 1; i >= 0; i--) {
    arrayOfInts.push(i)
  }
  for (let i = count - 1; i >= 0; i--) {
    const a = Math.floor(Math.random() * i)
    arrayWithInts.push(arrayOfInts[a]);
    arrayOfInts.splice(a, 1);
  }
  return arrayWithInts;

}
// usage
// console.log(RandomIntBetweenAndUnic(100))

const maxRoomPlayers = 10;

// array to save players
function Room(id, roomKey, users, mainUser, mainUserID, roomStage, status) {
  return {
    id: id,
    roomKey: roomKey,
    users: users,
    mainUser: mainUser,
    mainUserID: mainUserID,
    roomStage: roomStage,
    status: status
  };
}

let rooms = [];

// generate code for game id
function generateKey() {
  return Math.floor(Math.random() * 90000) + 10000;
}

// set adress to api
app.use("/", (req, res) => {
  res.setHeader('Set-Cookie', 'visited=true; Max-Age=3000; HttpOnly, Secure');
  res.sendFile(path.join(__dirname, "/index.html"));
});

io.on("connection", (socket) => {
  // {
  // io.of("/").adapter.on("create-room", (room) => {
  //   console.log(`room ${room} was created`);
  // });

  // io.of("/").adapter.on("join-room", (room, id) => {
  //   console.log(`socket ${id} has joined room ${room}`);
  // });
  // socket.userId = socket.handshake.query.id;
  // console.log(socket.id);
  // }

  // set are exist or create new room object and send it to main user

  socket.on("createGame", () => {
    // found elemet in array of rooms

    const found = rooms.find(
      (element) => element.mainUser === socket.handshake.address
    );
    if (found) {
      found.mainUserID = socket.id;
    }
    const room = !found
      ? Room(generateKey(), uuidv4(), [], socket.handshake.address, socket.id, 0, "waiting")
      : found;
    // if room exist don't create another one

    if (room) {
      socket.join("Room_" + room.id);
      // console.log(socket.adapter.rooms);
      rooms.push(room);
      socket.emit("createGame", room);
    } else {
      socket.emit("createGame", room);
    }
  });
  //   // found elemet in array of rooms

  //   const found = rooms.find(
  //     (element) => element.mainUser === socket.handshake.address
  //   );
  //   if (found) {
  //     found.mainUserID = socket.id;
  //   }
  //   const room = !found
  //     ? Room(generateKey(), uuidv4(), [], socket.handshake.address, socket.id, 0, "waiting")
  //     : found;
  //   // if room exist don't create another one

  //   if (room) {
  //     socket.join("Room_" + room.id);
  //     // console.log(socket.adapter.rooms);
  //     rooms.push(room);
  //     socket.emit("createGame", room);
  //   } else {
  //     socket.emit("createGame", room);
  //   }
  // });
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
      // if (found.status === "waiting") {
      if (found.users.length <= maxRoomPlayers) {
        socket.join("Room_" + found.id);

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
            socket.emit("joinToGame", found);
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
            // console.log("pokoje", socket.adapter.rooms);
          }
        } else {
          const a = found.users.find((user) => user.ip === socket.handshake.address)
          if (a) {
            // console.log(socket.handshake.address)
            socket.emit("message", {
              type: "error",
              title: "Błąd",
              value: `Jeżeli próbujesz ponownie dołączyć wpisz poprawny nick: ${a.login}`,
            });
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
    }
    //   else {
    //     socket.emit("message", {
    //       type: "error",
    //       title: "Błąd",
    //       value: "Nie możesz dołączyć do gry która sie już rozpoczeła"
    //     })
    //   }
    // } 
    else {
      socket.emit("message", {
        type: "error",
        title: "Błąd",
        value: "nie ma takiego pokoju",
      });

    }
  });
  socket.on("startGame", (data) => {
    let found = rooms.find((room) => String(room.id) === String(data?.id) && String(room.roomKey) === String(data?.roomKey));
    if (found) {
      found.status = "active";
      found.roomStage = 1;
      let usersRand = RandomIntBetweenAndUnic(found.users.length);

      socket.emit("refreshTab", found);
      socket.emit("message", {
        type: "succes",
        title: "Zaczynamy gre!",
        value: "Powodzonka! 🤗",
      });
      // console.dir(socket.adapter.rooms.get("Room_" + found.id));
      // console.dir(io.adapter.rooms.get("Room_" + found.id));
      console.log(io.rooms);

      socket.in("Room_" + found.id).emit("refreshTab", found);
      socket.in("Room_" + found.id).emit("message", {
        type: "succes",
        title: "Zaczynamy gre!",
        value: "Powodzonka! 🤗",
      });
    } else {
      socket.emit("message", {
        type: "error",
        title: "Błąd",
        value: "Pokój jest pusty!",
      });
    }


  });
  socket.on("stageOne", (data) => {
    RandomIntBetweenAndUnic(100)
    console.log(data)
  })
  socket.on("disconnect", () => {
    // console.log("disconnect");
    //find players from  tab index by socet.id and change it status to offline
    const a = rooms.find((item) =>
      item.users.find((user) => user.socketID === socket.id)
    );
    const b = a?.users.find((user) => user.socketID === socket.id);
    if (b) {
      b.onlineStatus = false;
    }

    // console.log("🔥: A user disconnected" + socket.id);
    // console.table(a?.users)
  });
});

httpServer.listen(process.env.PORT, () => {
  console.log("listening on http://87.207.19.177:3000/");
});
