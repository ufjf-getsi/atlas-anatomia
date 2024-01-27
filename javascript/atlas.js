// ARQUIVO RESPONSÁVEL POR MONTAR A SEÇÃO DAS IMAGENS E INFORMAÇÕES
// A PARTIR DO JSON ESPECÍFICO DE CADA SISTEMA

import { loadNavigations, navigateToImage } from "./navigations.js";
import { fetchData } from "./services.js";

let pieceIndex = 0;
let pieces, piecesNumber;

// carrega os dados quando a tela for chamada
const loadSystemContent = async (systemURL) => {

  // buscar os dados
  const request = new Request(systemURL);
  const systemData = await fetchData(request.url);
  const { systemName } = systemData;
  pieces = systemData.pieces;
  piecesNumber = pieces.length;

  // define o título do sistema
  document.getElementById("main-title").innerHTML = systemName;

  // inicar navegando para a primeira imagem
  setPieceIndex(0);
  loadNavigations(piecesNumber);
  navigateToImage(pieceIndex);
};

const showCoordinates = (e) => {
  const backgroundImage = document.getElementById("content");
  const dimensions = backgroundImage.width;

  let px = (e.offsetX / dimensions) * 100;
  let py = (e.offsetY / dimensions) * 100;

  console.log("PosX: ", px.toFixed(2), "PosY: ", py.toFixed(2));
};

const setPieceIndex = (index) => {
  pieceIndex = index;
};

const getPieceIndex = () => {
  return pieceIndex;
};

const getPiecesNumber = () => {
  return pieces.length;
};

const incPieceIndex = () => {
  pieceIndex =
    pieceIndex >= pieces.length - 1 ? pieces.length - 1 : pieceIndex + 1;
  return pieceIndex;
};

const decPieceIndex = () => {
  pieceIndex = pieceIndex <= 0 ? 0 : pieceIndex - 1;
  return pieceIndex;
};

const getPieces = () => {
  return pieces;
};

export {
  loadSystemContent,
  showCoordinates,
  getPieceIndex,
  setPieceIndex,
  getPiecesNumber,
  incPieceIndex,
  decPieceIndex,
  getPieces
};
