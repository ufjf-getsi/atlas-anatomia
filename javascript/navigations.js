// ARQUIVO RESPONSÁVEL POR GERENCIAR AS NAVEGAÇÕES ENTRE IMAGENS
// E CARREGAR OS ALFINETES DE ACORDO COM A IMAGEM NA TELA

import { decPieceIndex, getPieceIndex, getPieces, incPieceIndex, setPieceIndex } from "./atlas.js";
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

const finishImageLoading = () => {

  document.querySelector("#container").setAttribute("isLoading", false);
  document.querySelector("#image-title").innerText = getPieces()[getPieceIndex()].title;
  
  loadPins(getPieces()[getPieceIndex()].pins);
}

// navega para a imagem de acordo com o index
const navigateToImage = (index) => {
  
  setPieceIndex(index);

  document.querySelector("#container").setAttribute("isLoading", true);
  document.querySelector("#content").src = getPieces()[index].image;
  
  if(getPieces()[index].title)
    document.querySelector("#image-title").innerText = "carregando...";

  // seletores
  const willBeSelected = document.querySelector(`#item_${index}`);
  const selected = document.querySelector(".selected");
  
  // atualiza os seletores indicando qual imagem está sendo carregada
  selected.classList.remove("selected");
  willBeSelected.classList.add("selected");
  
};

const slideRight = () => {
  navigateToImage(incPieceIndex());
};

const slideLeft = () => {
  navigateToImage(decPieceIndex());
};

export { loadNavigations, navigateToImage, slideRight, slideLeft, finishImageLoading };
