import { h, app } from "hyperapp";
import io from "socket.io-client";
const state = {
  rooms: []
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
  }
};

const view = (state, actions) =>
  h("div", {}, [
    ...state.rooms.map(room =>
      h("div", {}, [h("div", {}, room.id), h("div", {}, room.status)])
    )
  ]);

const ha = app(state, actions, view, document.getElementById("app"));

const socket = io("http://localhost:3000");

socket.on("updateState", function(data) {
  data.state.forEach(room => ha.addRoom(room));
});
