import { h } from "hyperapp";

import "./room.scss";
import card from "../card/card.js";

export default roomData =>
  card([
    h("div", {}, [
      h("div", {}, `Room id: ${roomData.id}`),
      h("div", {}, `Room status: ${roomData.status}`),
      h("div", {}, `Device id: ${roomData.deviceId}`),
      h("hr", {}, [])
    ])
  ]);
