import { showCoordinates } from "./atlas.js";
import { loadHomeCards } from "./home.js";
import { loadMenu, toggleMenu } from "./menu.js";
import { slideLeft, slideRight, finishImageLoading } from "./navigations.js";
import { navigate, createRoutes } from "./router.js";
import { setSearchContent, search, toggleSearchMenu, loadSearchContents } from './search.js'
import { hideContent } from "./pins.js";

document.addEventListener("DOMContentLoaded", () => {
  window.location = "#home";
  document.getElementById("content").addEventListener("mousedown", (e) => {
    showCoordinates(e);
  });
  document.querySelector("#sidebar-icon").addEventListener("click", () => toggleMenu());
  document.querySelector(".slide-left").addEventListener("click", () => slideLeft());
  document.querySelector(".slide-right").addEventListener("click", () => slideRight());
  document.querySelector(".logoPrincipal").addEventListener("click", () => navigate("#home"));
  document.querySelector("#search").addEventListener("click", () => toggleSearchMenu())
  document.querySelector("#search-button").addEventListener("click", () => search())
  document.querySelector("#search-input").addEventListener("input", (e) => setSearchContent(e.target.value))
  document.querySelector("#content").addEventListener("load", () => finishImageLoading());
  document.querySelector(".tooltip-card").addEventListener("click", () => hideContent());
  document.querySelector("#tooltip-close-button").addEventListener("click", () => hideContent());

  // inicia a aplicação
  createRoutes();
  loadHomeCards();
  loadMenu();
  loadSearchContents();
});
