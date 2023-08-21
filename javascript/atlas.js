// ARQUIVO RESPONSÁVEL POR MONTAR A SEÇÃO DAS IMAGENS E INFORMAÇÕES 
// A PARTIR DO JSON ESPECÍFICO DE CADA SISTEMA

import { loadNavigations, navigateToImage } from "./navigations.js";
import { fetchData, getAllSystemsData } from "./utils.js";

let pieceIndex = 0;
let pieces, piecesNumber;

// carrega os dados quando a tela for chamada
const loadSystemContent = async (system) => {

    const data = await getAllSystemsData()
    const systemURL = data[system].url;

     //se o sistema ainda nao tiver uma URL, navega para a página de erro
    if(!systemURL) {
        navigate("#error")
        return;
    }

    // dados do sistema
    const systemData = await fetchData(systemURL)
    const { systemName } = systemData;
    pieces = systemData.pieces; 
    piecesNumber = pieces.length;

    // inicar navegando para a primeira imagem 
    loadNavigations(piecesNumber)
    navigateToImage(pieceIndex, pieces)

    // define o título do sistema
    const mainTitle = document.getElementById("main-title");
    mainTitle.innerHTML = systemName;

}

const showCoordinates = (e) => {

    const backgroundImage = document.getElementById("content");
    const dimensions = backgroundImage.width;

    let px = (e.offsetX -10)/dimensions * 100;
    let py = (e.offsetY -50)/dimensions * 100;

    console.log("PosX: ", px.toFixed(2), "PosY: ", py.toFixed(2))
    
}

export { loadSystemContent, showCoordinates}