// carrega as navegações para navegar pelas imagens
const loadNavigations = (imagesNumber) => {

    let links = "";
    
    for(let i=0; i<imagesNumber; i++) {
        links += `<button class="selectors ${resolve(i)}" onClick=navigateToImage(${i}) id="item_${i}"></button>`
    }

    const navigations = document.getElementById("navigations");
    navigations.innerHTML = links;
}

// marca o primeiro item (i == 0) como selecionado assim que carrega as imagens
const resolve = (i) => {
    if(!i)
        return "selected";
}

// navega para a página/imagem de acordo com o index
const navigateToImage = (index) => {
    
    // começa a carregar os alfinetes
    loadPins(pinsURL[index])

    const backgroundImage = document.getElementById("content");
    const imageTitle = document.getElementById("image-title");

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