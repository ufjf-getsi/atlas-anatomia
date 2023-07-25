
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
    const imageTitle = document.getElementById("imageTitle");
    const mainTitle = document.getElementById("mainTitle");
    
    backgroundImage.src = images[imageIndex];
    imageTitle.innerText = titles[imageIndex];
    mainTitle.innerHTML= "Sistema " + systemName;

}

// carrega as navegações paranavegar pelas imagens
const loadNavigations = (imagesNumber) => {

    let links = "";
    
    for(let i=0; i<imagesNumber; i++) {
        links += `<button class="selectors ${resolve(i)}" onClick=navigateToImage(${i}) id="item_${i}"></button>`
    }

    const navigations = document.getElementById("navigations");
    navigations.innerHTML = links;
}

const loadPins = async (pinsURL) => {

    const pinsData = await fetchData(pinsURL);
    const { pins } = pinsData; 

    const pinsArea = document.getElementById("pinsArea");
    pinsArea.innerHTML= "";

    let pinsHTML = "";

    pins.forEach(pin => {
        pinsHTML += `<div class="alfinete" style="position: absolute; left: ${pin.posX};top: ${pin.posY};">
            ${resolvePinType(pin.type)}            
        </div>`
    });

    pinsArea.innerHTML += pinsHTML;
}

// marca o primeiro item (i == 0) como selecionado assim que carrega as imagens
const resolve = (i) => {
    if(!i)
        return "selected";
}

// retorna a imagem de acordo com tipo (true = vermelho ; false = azul)
const resolvePinType = (type) => {
    if(type) 
        return `<img src="../_imagens/alfinete_vermelho.png" style="width: 50px" />`
    else return `<img src="../_imagens/alfinete_azul.png" style="width: 50px" />`
}

// navega para a página/imagem de acordo com o index
const navigateToImage = (index) => {
    
    // começa a carregar os alfinetes
    loadPins(pinsURL[index])

    const backgroundImage = document.getElementById("content");
    const imageTitle = document.getElementById("imageTitle");

    // seletores
    const willBeSelected = document.getElementById(`item_${index}`);
    const selected = document.getElementsByClassName("selected");   

    // atualiza os seletores indicando qual imagem está sendo carregada 
    selected[0] ? selected[0].classList.remove("selected") : {};
    willBeSelected.classList.add("selected");

    backgroundImage.src = images[index];
    imageTitle.innerText = titles[index];

}

const slideRight = () => {
	imageIndex++;

	if(imageIndex >= images.length){
		imageIndex=0;
	}

	navigateToImage(imageIndex);
}

const slideLeft = () => {
	imageIndex--;

	if(imageIndex < 0){
		imageIndex=images.length-1;
	}

	navigateToImage(imageIndex);
}

const showCoordinates = (e) => {

    const backgroundImage = document.getElementById("content");
    const dimensions = backgroundImage.width;

    let px = (e.offsetX -10)/dimensions * 100;
    let py = (e.offsetY -50)/dimensions * 100;

    console.log("PosX: ", px.toFixed(2), "PosY: ", py.toFixed(2))
}

