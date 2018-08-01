import { h } from "hyperapp";

import "./room.scss";
import Card from "../card/card.js";

export default ({ id, status, deviceId }) => (
  <Card backgroundColor={status === "free" ? "green" : "gray"}>
    <ul>
      <li>Room id: {id}</li>
      <li>Room status: {status}</li>
      <li>Device id: {deviceId}</li>
    </ul>
  </Card>
);
