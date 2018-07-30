import { h, app } from "hyperapp";
import io from "socket.io-client";

import "./styles/_global.scss";

import roomView from "./component/room/room.js";
import connectionStatusView from "./component/connection-status/connection-status.js";

const state = {
  rooms: [],
  connection: false
};

const actions = {
  addRoom: room => state => {
    const index = state.rooms.findIndex(savedRoom => savedRoom.id === room.id);
    return index < 0
      ? Object.assign(
          {},
          {
            rooms: [...state.rooms, room]
          }
        )
      : Object.assign({}, state, {
          rooms: state.rooms.map(
            savedRoom =>
              savedRoom.id === room.id
                ? Object.assign({}, savedRoom, room)
                : savedRoom
          )
        });
  },
  setConnection: status => state =>
    Object.assign({}, state, { connection: state })
};

const view = (state, actions) =>
  h("div", {}, [
    h("h1", {}, "Play Room"),
    h("div", {}, [
      state.connection ? "connected" : "disconnected",
      connectionStatusView(state.connection)
    ]),
    ...state.rooms.map(roomView)
  ]);

const ha = app(state, actions, view, document.getElementById("app"));

const socket = io("http://localhost:3000");

socket.on("connect", function(data) {
  ha.setConnection(true);
});

socket.on("disconnect", function(data) {
  ha.setConnection(false);
});

socket.on("updateState", function(data) {
  data.state.forEach(room => ha.addRoom(room));
});
