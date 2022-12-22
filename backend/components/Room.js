class Room {
  constructor(id, room_key, users, mainUser) {
    this.id = id;
    this.room_key = room_key;
    this.users = users;
    this.mainUser = mainUser;
  }

  set() {
    return {
      id: this.id,
      room_key: this.room_key,
      users: this.users,
      mainUser: this.mainUser,
    };
  }
}
exports.Room = Room;
