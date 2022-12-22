// function to get and set localstorage data
// usage: SetGameState("set/get", "key of local storage", if set "data")

async function SetGameState(type, name, value, ...args) {
  // const ab = await get(name);
  // return JSON.stringify(ab);
  switch (type) {
    case "set":
      set(name, value);
      break;
    case "get":
      return get(name);

    default:
      console.warn("Something went wrong");
      return localStorage.getItem("gameState");
  }
}

// that function count the time and get async data from the localstorage.
// must be async cause of size of data
// Use is in SetGameState function
function get(name) {
  return asyncLocalStorage
    .getItem(name)
    .then((item) => {
      return item;
    })
    .catch((error) => {
      console.error("Error with GET gameState: " + error);
    });
}

// that function count the time and set data to the localstorage.
// must be async cause of size of data
// Use is in SetGameState function
function set(name, value) {
  asyncLocalStorage.setItem(name, value).catch((error) => {
    console.error("Error with SAVE gameState: " + error);
  });
}

// that function add asynchronously to the get and set local storage.
const asyncLocalStorage = {
  setItem: async function (key, value) {
    await null;
    return localStorage.setItem(key, value);
  },
  getItem: async function (key) {
    await null;
    return JSON.parse(localStorage.getItem(key));
  },
};

export default SetGameState;
