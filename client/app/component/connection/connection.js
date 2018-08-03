import { h } from "hyperapp";
import ConnectionStatus from "../connection-status/connection-status.js";

import "./connection.scss";

export default (attributes, children) => (state, actions) => (
  <div class="connection">
    <div class="connection__text">
      Socket connection: {state.connection ? "Connected" : "Disconnected"}
    </div>
    <div class="connection__indicator">
      <ConnectionStatus connection={state.connection} />
    </div>
  </div>
);
