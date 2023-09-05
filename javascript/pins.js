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
    const { title, description, placement, color} = pinData;

    const pin = document.querySelector(`#pin_${index}`);
    const tooltipTitle = document.querySelector("#tooltip-title");
    const tooltipContent = document.querySelector("#tooltip-content");

    // atualiza informações do alfinete
    tooltipTitle.innerText = title;
    tooltipContent.innerText =  description;

    // carrega o alfinete na tela
    showContent(pin, placement, color)

}

// mostra o conteudo do alfinete na tela
const showContent = (pin, placement = "bottom", pinColor) => {

    const tooltip = document.querySelector("#tooltip");
    const tooltipTitle = document.querySelector("#tooltip-title");

    Popper.createPopper(pin, tooltip, {
        placement
    });

    tooltipTitle.setAttribute('color', pinColor);
    tooltip.setAttribute('data-show','true');
}

// esconde o conteudo do alfinete
const hideContent = () => {

    const tooltip = document.querySelector("#tooltip");
    tooltip.removeAttribute('data-show');
}   

// personaliza as cores do alfinete 
const resolvePinColor = (color, id) => {
    
    const pin = document.querySelector("#"+id);
    
    if(color == 'red') {
        pin.setAttribute('color','red');
    } else {  
        pin.setAttribute('color','blue');
    } 
}

export { loadPins, loadPinContent, showContent, hideContent }
