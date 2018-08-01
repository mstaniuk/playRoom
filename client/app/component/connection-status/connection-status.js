import { h } from "hyperapp";
import "./connection-status.scss";

const getClass = connection =>
  `connection-status connection-status--${
    connection ? "connected" : "disconnected"
  }`;

export default ({ connection }) => <div class={getClass(connection)} />;
