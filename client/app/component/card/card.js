import { h } from "hyperapp";
import "./card.scss";

export default content =>
  h("div", { class: "card" }, [h("div", { class: "card__content" }, content)]);
