import { h, app } from "hyperapp";

import roomView from "../room/room.js";
import connectionStatusView from "../connection-status/connection-status.js";

export default (state, actions) =>
  h("div", {}, [
    h("h1", {}, "Play Room"),
    h("div", {}, [
      state.connection ? "connected" : "disconnected",
      connectionStatusView(state.connection)
    ]),
    ...state.rooms.map(roomView)
  ]);
