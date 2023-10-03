// ARQUIVO RESPONSÁVEL POR GERENCIAR AS NAVEGAÇÕES ENTRE IMAGENS
// E CARREGAR OS ALFINETES DE ACORDO COM A IMAGEM NA TELA

import { decPieceIndex, getPieces, incPieceIndex, setPieceIndex } from "./atlas.js";
import { loadPins } from "./pins.js";

// carrega as navegações para navegar pelas imagens
const loadNavigations = (piecesNumber) => {
  
  const navigations = document.querySelector("#navigations");
  navigations.innerHTML = "";

  for (let i = 0; i < piecesNumber; i++) {
    const b = document.createElement("button");
    b.classList.add("selectors");
    if(!i)
      b.classList.add("selected");
    b.id = `item_${i}`;
    b.onclick = () => navigateToImage(i);
    navigations.appendChild(b);
  }

};

// navega para a imagem de acordo com o index
const navigateToImage = (index) => {

  //atualizo o index da imagem atual no estado
  setPieceIndex(index);

  // carrega os alfinetes da imagem
  loadPins(getPieces()[index].pins);

  const backgroundImage = document.querySelector("#content");
  const imageTitle = document.querySelector("#image-title");

  // seletores
  const willBeSelected = document.querySelector(`#item_${index}`);
  const selected = document.querySelector(".selected");

  // atualiza os seletores indicando qual imagem está sendo carregada
  selected.classList.remove("selected");
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
