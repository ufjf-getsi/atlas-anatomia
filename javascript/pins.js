// RESPONSÁVEL PELA MANIPULAÇÃO DO ALFINETE 

import { getPieceIndex , getPieces } from "./atlas.js   ";

const loadPins = async (pinsData) => {

    const pinsArea = document.getElementById("pins-area");
    pinsArea.innerHTML= "";
    pinsData.forEach((pin, i) => {
        const b = document.createElement("button");
        b.classList.add("pin");
        b.id = `pin_${i}`;
        b.addEventListener("mouseover", () => loadPinContent(i));
        b.addEventListener("mouseout", () => hideContent(i));
        b.style = `position: absolute; left: ${pin.x * 100}%;top: ${pin.y * 100}%;`;
        b.innerHTML = resolvePinColor(pin.color);
        pinsArea.appendChild(b);
    });

}

// carrega as informações do alfinete
const loadPinContent = async (index) => {
    
    const pinData = getPieces()[getPieceIndex()].pins[index];
    const { title, description, placement } = pinData;

    const pin = document.getElementById(`pin_${index}`);
    const tooltipTitle = document.getElementById("tooltip-title");
    const tooltipContent = document.getElementById("tooltip-content");

    // atualiza informações do alfinete
    tooltipTitle.innerText = title;
    tooltipContent.innerText =  description;

    // carrega o alfinete na tela
    showContent(pin, placement)

}

// mostra o conteudo do alfinete na tela
const showContent = (pin, placement = "bottom") => {

    const tooltip = document.getElementById("tooltip");

    Popper.createPopper(pin, tooltip, {
        placement
    });

    tooltip.setAttribute('show-data','true');

}

// esconde o conteudo do alfinete
const hideContent = () => {

    const tooltip = document.getElementById("tooltip");
    tooltip.removeAttribute('show-data');
}   

// retorna a imagem de acordo com tipo
const resolvePinColor = (color) => {

    const tooltipTitle = document.getElementById("tooltip-title");

    if(color == 'red') {
        tooltipTitle.setAttribute('color','red');
        return `<img src="./imagens/alfinete_vermelho.png" style="width: 100%" />`
    } else {
        tooltipTitle.setAttribute('color','blue');
        return `<img src="./imagens/alfinete_azul.png" style="width: 100%" />`
    }
}

export { loadPins, loadPinContent, showContent, hideContent }
