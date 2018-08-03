import { h } from "hyperapp";

import "./room.scss";
import Card from "../card/card.js";

export default ({ id, status, deviceId }) => (
  <Card>
    <div class={`room ${status.toLowerCase() === "free" ? "room--free" : ""}`}>
      <div class="room__header">
        Room
        <h2 class="room__title">{id}</h2>
      </div>
      <div class="room__content">
        Status
        <div class="room__status">
          {status.toLowerCase() === "free" ? "Free" : "Occupied"}
        </div>
      </div>
      <div class="room__footer">
        Observed by
        <div class="room__device">{deviceId}</div>
      </div>
    </div>
  </Card>
);
