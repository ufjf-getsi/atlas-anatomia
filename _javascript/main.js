let pieceIndex = 0;
let pieces, piecesNumber;

// busca os dados do JSON
const fetchData = async (url) => {
    const data = await fetch(url);
    const json = await data.json();

    return json;
}

// carrega os dados quando a tela for chamada
const onLoadWindow = async (system) => {

    // carrega o JSON com as informações de todos os sistemas
    const url = "../_utils/sistemas.json";
    const data = await fetchData(url)
    const systemURL = data.systems[system].url;

    // dados do sistema
    const systemData = await fetchData(systemURL)
    const { systemName } = systemData;
    pieces = systemData.pieces; 
    piecesNumber = pieces.length;

    // inicar navegando para a primeira imagem 
    loadNavigations(piecesNumber)
    navigateToImage(pieceIndex)

    // define o título do sistema
    const mainTitle = document.getElementById("main-title");
    mainTitle.innerHTML= "Sistema " + systemName;

}

const showCoordinates = (e) => {

    const backgroundImage = document.getElementById("content");
    const dimensions = backgroundImage.width;

    let px = (e.offsetX -10)/dimensions * 100;
    let py = (e.offsetY -50)/dimensions * 100;

    console.log("PosX: ", px.toFixed(2), "PosY: ", py.toFixed(2))
    
}

