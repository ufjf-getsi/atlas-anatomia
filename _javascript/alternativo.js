

// carregar a página quando a tela for carregada
const onLoadWindow = () => {

    // recebe o JSON por localStorage  
    const data = JSON.parse(localStorage.data);
    console.log("DATA: ", data);

    const mainTitle = data[0];
    images = data[1];
    titles = data[2];
    const imagesNumber = images.length;
    
    // selecionando os elementos no html pra manipular
    const container = document.getElementById("content");
    const title = document.getElementById("title");
    const navigations = document.getElementById("navigations");

    // carregando os selectores para navegar pelas imagens
    let links = "";
    for(let i=0; i<imagesNumber; i++) {
        links += `<button class="selectors ${resolve(i)}" onClick=navigateToImage(${i}) id="item_${i}"></button>`
    }

    navigations.innerHTML = links;
    container.innerHTML = `<object data="${images[0]}" >`
    title.innerText = mainTitle;
}

// função que marca o primeiro item como selecionado assim que inicia as imagens
const resolve = (i) => {
    if(!i)
        return "selected";
}

// navega para a página/imagem de acordo com o index
const navigateToImage = (index) => {
    
    let fileName = images[index];
	let title = titles[index];
	let target = `<object id="loadedFile" data="${fileName}"/>'`;

    const container = document.getElementById("content");
    const imgTitle = document.getElementById("title");
    const willBeSelected = document.getElementById(`item_${index}`);
    const selected = document.getElementsByClassName("selected");   

    // atualiza os seletores indicando qual imagem está sendo carregada 
    selected[0] ? selected[0].classList.remove("selected") : {};
    willBeSelected.classList.add("selected");

    container.innerHTML = target;
    imgTitle.innerText = title;
}

function slideRight(){
	imageIndex++;

	if(imageIndex >= images.length){
		imageIndex=0;
	}

	navigateToImage(imageIndex);
}

function slideLeft(){
	imageIndex--;

	if(imageIndex < 0){
		imageIndex=images.length-1;
	}

	navigateToImage(imageIndex);
}
