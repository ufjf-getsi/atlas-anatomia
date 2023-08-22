// ARQUIVO RESPONSÁVEL POR GERENCIAR AS NAVEGAÇÕES ENTRE IMAGENS
// E CARREGAR OS ALFINETES DE ACORDO COM A IMAGEM NA TELA

import { decPieceIndex, getPieces, incPieceIndex } from "./atlas.js";
import { loadPins } from "./pins.js";

// carrega as navegações para navegar pelas imagens
const loadNavigations = (piecesNumber) => {
  let links = "";

  for (let i = 0; i < piecesNumber; i++) {
    const b = document.createElement("button");
    b.classList.add("selectors");
    b.classList.add(resolve(i));
    b.id = `item_${i}`;
    b.onclick = () => navigateToImage(i);
    links += b.outerHTML;
  }

  const navigations = document.getElementById("navigations");
  navigations.innerHTML = links;
};

// marca o primeiro item (i == 0) como selecionado assim que carrega as imagens
const resolve = (i) => {
  if (!i) return "selected";
};

// navega para a imagem de acordo com o index
const navigateToImage = (index) => {
  // carrega os alfinetes da imagem
  loadPins(getPieces()[index].pins);

  const backgroundImage = document.getElementById("content");
  const imageTitle = document.getElementById("image-title");

  // seletores
  const willBeSelected = document.getElementById(`item_${index}`);
  const selected = document.getElementsByClassName("selected");

  // atualiza os seletores indicando qual imagem está sendo carregada
  selected[0] ? selected[0].classList.remove("selected") : {};
  willBeSelected.classList.add("selected");

  backgroundImage.src = getPieces()[index].image;
  imageTitle.innerText = getPieces()[index].title;
};

const slideRight = () => {
  navigateToImage(incPieceIndex());
};

const slideLeft = () => {
    navigateToImage(decPieceIndex());
};

export { loadNavigations, navigateToImage, slideRight, slideLeft };
