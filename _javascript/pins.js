const loadPins = async (pinsImageURL) => {

    const pinsData = await fetchData(pinsImageURL);
    const { pins } = pinsData; 

    const pinsArea = document.getElementById("pins-area");
    pinsArea.innerHTML= "";

    let pinsHTML = "";

    pins.forEach((pin, i) => {
        pinsHTML += `<button id="pin_${i}" class="pin" onmouseover="loadPinContent(${i}) " onmouseout="hideContent(${i})" style="position: absolute; left: ${pin.posX};top: ${pin.posY};">
            ${resolvePinType(pin.type)}            
        </button>`
    });

    pinsArea.innerHTML += pinsHTML;
}

// carrega as informações do alfinete de acordo com a URL dos alfinetes a atual imagem
const loadPinContent = async (index) => {
    
    const pinsData = await fetchData(pinsURL[imageIndex]);
    const { pins } = pinsData; 
    const { description, placement } = pins[index];

    const pin = document.getElementById(`pin_${index}`);
    const tooltip = document.getElementById("tooltip");

    // insere a descrição como conteúdo do alfinete
    tooltip.innerText =  description;

    // carrega o alfinete na tela
    showContent(index, pin, tooltip, placement)

}

// mostra o conteudo do alfinete na tela
const showContent = (index, pin, tooltip, placement = "bottom") => {

    Popper.createPopper(pin, tooltip, {
        placement
    });

    tooltip.classList.remove("hide")
    tooltip.classList.add("show")

}

// esconde o conteudo do alfinete
const hideContent = (index) => {

    const tooltip = document.getElementById("tooltip");
    
    tooltip.classList.remove("show")
    tooltip.classList.add("hide")
}   

// retorna a imagem de acordo com tipo
const resolvePinType = (type) => {
    if(type == 'red') 
        return `<img src="../_imagens/alfinete_vermelho.png" style="width: 100%" />`
    else return `<img src="../_imagens/alfinete_azul.png" style="width: 100%" />`
}

