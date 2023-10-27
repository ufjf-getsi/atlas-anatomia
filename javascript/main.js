import { showCoordinates } from "./atlas.js";
import { loadHomeCards } from "./home.js";
import { loadMenu, toggleMenu } from "./menu.js";
import { slideLeft, slideRight } from "./navigations.js";
import { navigate } from "./router.js";
import { createRoutes } from './router.js';

document.addEventListener("DOMContentLoaded", () => {
  window.location = "#home";
  //document.getElementById("content").addEventListener("mousedown", (e) => {
   // showCoordinates(e);
  //});
  document.querySelector("#menu-container").addEventListener("click", ()=>toggleMenu());
  document.querySelector(".slide-left").addEventListener("click", ()=>slideLeft());
  document.querySelector(".slide-right").addEventListener("click", ()=>slideRight());
  document.querySelector(".logoPrincipal").addEventListener("click", ()=>navigate("#home"));

  // inicia a aplicação
  createRoutes();
  loadHomeCards();
  loadMenu();
});
