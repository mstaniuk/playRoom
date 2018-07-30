import { h } from "hyperapp";
import "./connection-status.scss";

export default isConnected =>
  h(
    "div",
    {
      class: `connection-status connection-status--${
        isConnected ? "connected" : "disconnected"
      }`
    },
    []
  );
