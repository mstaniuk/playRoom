import { h } from "hyperapp";
import "./card.scss";

export default (attr, children) => (
  <div
    class={`card ${
      attr.backgroundColor ? "card--border-" + attr.backgroundColor : ""
    }`}
  >
    <div class="card__content">{children}</div>
  </div>
);
