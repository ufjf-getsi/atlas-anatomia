// RESPONSÁVEL PELA MANIPULAÇÃO DO ALFINETE 

import { getPieceIndex , getPieces } from "./atlas.js   ";

const loadPins = async (pinsData) => {

    const pinsArea = document.getElementById("pins-area");
    pinsArea.innerHTML =  "";
    pinsData.forEach((pin, i) => {
        const b = document.createElement("button");
        b.classList.add("pin");
        b.id = `pin_${i}`;
        b.addEventListener("mouseover", () => loadPinContent(i));
        b.addEventListener("mouseout", () => hideContent(i));
        b.style = `position: absolute; left: ${pin.x * 100}%;top: ${pin.y * 100}%;`;
        pinsArea.appendChild(b);
        resolvePinColor(pin.color, b.id);
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

// personaliza as cores do alfinete 
const resolvePinColor = (color, id) => {
    
    const pin = document.querySelector("#"+id);
    const tooltipTitle = document.querySelector("#tooltip-title");

    if(color == 'red') {
        pin.setAttribute('color','red');
        tooltipTitle.setAttribute('color','red');
    } else {  
        pin.setAttribute('color','blue');
        tooltipTitle.setAttribute('color','blue');
    } 
}

export { loadPins, loadPinContent, showContent, hideContent }
