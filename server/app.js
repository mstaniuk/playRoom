const express = require("express");
const http = require("http");
const socket = require("socket.io");
const { createStore } = require("redux");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const server = http.createServer(app);
const io = socket(server);

// Redux
// Redux: actions
const CREATE_OR_UPDATE = "CREATE_OR_UPDATE";

const createOrUpdate = room => ({
  type: CREATE_OR_UPDATE,
  room
});

// Redux: reducer helpers
const updateRoom = oldRoom => newRoom =>
  oldRoom.id === newRoom.id ? Object.assign({}, oldRoom, newRoom) : oldRoom;

const isRoomInCollection = collection => room =>
  collection.findIndex(collectedRoom => collectedRoom.id === room.id) > -1;

// Redux: reducers
const createOrUpdateReducer = (state, action) =>
  action.room.id != null
    ? isRoomInCollection(state)(action.room)
      ? state.map(updateRoom(action.room))
      : [...state, action.room]
    : state;

// Redux: store
const initialState = [];
const store = createStore((state = initialState, action) => {
  switch (action.type) {
    case CREATE_OR_UPDATE:
      return createOrUpdateReducer(state, action);
    default:
      return state;
  }
}, initialState);

// Middleware
app.use(express.static(path.resolve(__dirname, "../client/")));
app.use(bodyParser.json());

// Routing
app.post("/update", function(req, res) {
  try {
    store.dispatch(createOrUpdate(req.body));
    io.emit("updateState", { state: store.getState() });

    res.json({ success: true });
  } catch (e) {
    res.json({ success: false });
    console.error(e);
  }
});

const clientError = (req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
};

const serverError = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500);
  res.json({ message: err.message, error: err.stack });
};

// Error handling
app.use(clientError);
app.use(serverError);

// Socket events
const onSocketConnection = socket => {
  io.emit("updateState", { state: store.getState() });
};

io.on("connection", onSocketConnection);

// Server
server.listen(3000, () => {
  console.log("App started on port 3000");
});
