import { h } from "hyperapp";

import "./grid.scss";

const wrapElement = element => <div class="grid__element">{element}</div>;

const getGridItems = elements =>
  Array.isArray(elements) ? elements.map(wrapElement) : wrapElement(elements);

export default (props, children) => (
  <div class="grid">{getGridItems(children)}</div>
);
