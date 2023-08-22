import { showCoordinates } from "./atlas.js";
import { loadSystemsCards } from "./home.js";
import { loadMenu } from "./menu.js";
import { slideLeft, slideRight } from "./navigations.js";


document.addEventListener("DOMContentLoaded", () => {
  window.location = "#home";
  document.getElementById("content").addEventListener("mousedown", (e) => {
    showCoordinates(e);
  });
  document.querySelector(".slide-left").addEventListener("click", ()=>slideLeft());
  document.querySelector(".slide-right").addEventListener("click", ()=>slideRight());

  // inicia a aplicação
  loadSystemsCards();
  loadMenu();
});
