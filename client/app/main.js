import { app } from "hyperapp";

import "./styles/_global.scss";

import appView from "./component/app/app.js";
import actions from "./actions.js";
import state from "./state.js";
import socketProvider from "./socket.js";

const ha = app(state, actions, appView, document.body);
const socket = socketProvider(ha);
