// ARQUIVO RESPONSÁVEL POR MONTAR A SEÇÃO DAS IMAGENS E INFORMAÇÕES
// A PARTIR DO JSON ESPECÍFICO DE CADA SISTEMA

import { loadNavigations, navigateToImage } from "./navigations.js";
import { navigate } from "./router.js";
import { fetchData, getAllSystemsData } from "./services.js";

let pieceIndex = 0;
let pieces, piecesNumber;

// carrega os dados quando a tela for chamada
const loadSystemContent = async (systemURL) => {

  // começa da imagem 0 
  setPieceIndex(0);

  //se o sistema ainda nao tiver uma URL, navega para a página de erro
  if (!systemURL) {
    navigate("#error");
    return;
  }

  // request pra buscar os dados
  const request = new Request(systemURL);

  // dados do sistema
  const systemData = await fetchData(request.url);
  const { systemName } = systemData;
  pieces = systemData.pieces;
  piecesNumber = pieces.length;

  // inicar navegando para a primeira imagem
  loadNavigations(piecesNumber);
  navigateToImage(pieceIndex, pieces);

  // define o título do sistema
  const mainTitle = document.getElementById("main-title");
  mainTitle.innerHTML = systemName;
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
}

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
