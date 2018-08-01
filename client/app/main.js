import { h, app } from "hyperapp";

import "./styles/_global.scss";

import App from "./component/app/app.js";
import actions from "./actions.js";
import state from "./state.js";
import socketProvider from "./socket.js";

const ha = app(state, actions, App, document.body);
const socket = socketProvider(ha);
