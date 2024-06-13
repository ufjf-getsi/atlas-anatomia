// ARQUIVO RESPONSÁVEL POR GERENCIAR AS NAVEGAÇÕES ENTRE IMAGENS
// E CARREGAR OS ALFINETES DE ACORDO COM A IMAGEM NA TELA

import { decPieceIndex, getPieceIndex, getPieces, incPieceIndex, setPieceIndex } from "./atlas.js";
import { loadPins } from "./pins.js";

// carrega as navegações para navegar pelas imagens
const loadNavigations = (piecesNumber) => {

  const navigations = document.querySelector("#navigations");
  navigations.innerHTML = "";

  for (let i = 0; i < piecesNumber; i++) {
    const d = document.createElement("div");
    d.classList.add("selectors");
    if(!i)
      d.classList.add("selected");
    d.id = `item_${i}`;
    d.onclick = () => handleNavigations(i);
    navigations.appendChild(d);
  }
};

const handleNavigations = (index) => {
  document.querySelector("#item_"+index).scrollIntoView({ behavior: "smooth", inline: "center"});
  navigateToImage(index);
}

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
  document.querySelector("#image-title").innerText = "Carregando...";

  // seletores
  const willBeSelected = document.querySelector(`#item_${index}`);
  const selected = document.querySelector(".selected");
  
  // atualiza os seletores indicando qual imagem está sendo carregada
  selected.classList.remove("selected");
  willBeSelected.classList.add("selected");

};

const slideRight = () => {
  handleNavigations(incPieceIndex());
};

const slideLeft = () => {
  handleNavigations(decPieceIndex());
};

export { loadNavigations, navigateToImage, slideRight, slideLeft, finishImageLoading };
