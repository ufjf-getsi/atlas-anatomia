let data, images, titles, pinsURL;
let imageIndex = 0;

// busca os dados do JSON
const fetchData = async (url) => {
    const data = await fetch(url);
    const json = await data.json();

    return json;
}

// carrega os dados quando a tela for carregada
const onLoadWindow = async (system) => {

    // carrega o JSON
    const url = "../_utils/sistemas.json";
    let data = await fetchData(url)
    
    const systemName = data.sistemas[system].name;
    const systemURL = data.sistemas[system].src;

    // dados do sistema ( imagens, titulos...)
    const systemData = await fetchData(systemURL)

    images = systemData.images;
    titles = systemData.titles;
    pinsURL = systemData.alfinetes;
    const imagesNumber = images.length;

    loadPins(pinsURL[imageIndex]);
    loadNavigations(imagesNumber)

    // seleciona os elementos no html pra manipular
    const backgroundImage = document.getElementById("content");
    const imageTitle = document.getElementById("image-title");
    const mainTitle = document.getElementById("main-title");
    
    backgroundImage.src = images[imageIndex];
    imageTitle.innerText = titles[imageIndex];
    mainTitle.innerHTML= "Sistema " + systemName;

}

const showCoordinates = (e) => {

    const backgroundImage = document.getElementById("content");
    const dimensions = backgroundImage.width;

    let px = (e.offsetX -10)/dimensions * 100;
    let py = (e.offsetY -50)/dimensions * 100;

    console.log("PosX: ", px.toFixed(2), "PosY: ", py.toFixed(2))
    
}

