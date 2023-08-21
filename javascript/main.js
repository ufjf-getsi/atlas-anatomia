import { showCoordinates } from "./atlas.js";
import { loadSystemsCards } from "./home.js";
import { loadMenu } from "./menu.js";
import { slideLeft, slideRight } from "./navigations.js";

let pieceIndex = 0;
let piecesNumber = 2;

document.addEventListener("DOMContentLoaded", () => {
  window.location = "#home";
  document.getElementById("content").addEventListener("mousedown", (e) => {
    showCoordinates(e);
  });
  document.querySelector(".slide-left").addEventListener("click", ()=>slideLeft(pieceIndex, piecesNumber));
  document.querySelector(".slide-right").addEventListener("click", ()=>slideRight(pieceIndex, piecesNumber));

  // inicia a aplicação
  loadSystemsCards();
  loadMenu();
});
