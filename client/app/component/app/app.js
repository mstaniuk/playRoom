import { h } from "hyperapp";

import "./app.scss";

import Room from "../room/room.js";
import ConnectionStatus from "../connection-status/connection-status.js";
import Container from "../container/container.js";

const getRooms = rooms => rooms.map(room => <Room {...room} key={room.id} />);

export default (state, actions) => (
  <Container>
    <h1>Play Room</h1>
    <div>
      {state.connection ? "connected" : "disconnected"}
      <ConnectionStatus connection={state.connection} />
    </div>
    <div>{getRooms(state.rooms)}</div>
  </Container>
);
