import { h } from "hyperapp";

import "./app.scss";

import Room from "../room/room.js";
import Connection from "../connection/connection.js";
import Container from "../container/container.js";
import Grid from "../grid/grid.js";
import Section from "../section/section.js";

const getRooms = rooms => rooms.map(room => <Room {...room} key={room.id} />);

export default (state, actions) => (
  <Container>
    <h1>Play Room</h1>
    <Section>
      <Connection />
    </Section>
    <Section>
      <Grid>{getRooms(state.rooms)}</Grid>
    </Section>
  </Container>
);
