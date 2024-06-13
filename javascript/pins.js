// RESPONSÁVEL PELA MANIPULAÇÃO DO ALFINETE 

import { getPieceIndex, getPieces } from "./atlas.js   ";

let isShowingPin = false;
let atualPinIndex = 0;
let atualPins = [];

window.addEventListener("resize", () => {
    loadPins(atualPins);
})

const loadPins = async (pinsData) => {

    // ao trocar de imagem esconder as informações
    hideContent();
    atualPins = pinsData;

    //valor em porcentagem
    let PINS_SIZE = 0.05;
    let dimensions = document.getElementById("content").width;
    let pinDimension = dimensions * PINS_SIZE;

    const pinsArea = document.querySelector("#pins-area");
    pinsArea.innerHTML = "";
    pinsData.forEach((pin, i) => {
        const b = document.createElement("button");
        b.classList.add("pin");
        b.id = `pin_${i}`;
        b.onclick = () => togglePin(i);
        pinsArea.appendChild(b);
        resolvePinColor(pin.color, b.id);

        // desconta uma porcentagem no x por conta da imagem
        // desconta no y pro alfinete ficar posicionado em cima do ponto
        let px = ((pin.x * dimensions - (0.15 * pinDimension)) / dimensions) * 100;
        let py = ((pin.y * dimensions - (0.95 * pinDimension)) / dimensions) * 100;
        b.style = `width:${PINS_SIZE * 100}%; position: absolute; margin: 0; padding: 0; left: ${px}%;top: ${py}%;`;
    });
}

const togglePin = (index) => {

    if (isShowingPin && (atualPinIndex == index)) {
        isShowingPin = false;
        hideContent();
        return;
    }

    // atualizo o index do alfinete atual 
    atualPinIndex = index;
    isShowingPin = true;
    loadPinContent(index);
}

// carrega as informações do alfinete
const loadPinContent = async (index) => {
    
    const pinData = getPieces()[getPieceIndex()].pins[index];
    let { title, description, placement, color } = pinData;

    if(!placement)
        placement = "bottom"

    const pin = document.querySelector(`#pin_${index}`);
    const tooltip = document.querySelector("#tooltip");
    const tooltipTitle = document.querySelector("#tooltip-title");
    const tooltipContent = document.querySelector("#tooltip-content");
    const tooltipDescription = document.querySelector("#tooltip-description");

    // atualiza informações do alfinete
    tooltipTitle.innerText = title;

    if (color == "red" && !!description) {
        tooltipContent.innerText = description;
        tooltipDescription.setAttribute('data-show', 'true');
    } else tooltipDescription.removeAttribute('data-show');

    tooltipTitle.setAttribute('color', color);
    tooltip.setAttribute('data-show', 'true');

    Popper.createPopper(pin, tooltip, {
        placement
    });

}

// esconde o conteudo do alfinete
const hideContent = () => {

    document.querySelector("#tooltip").removeAttribute('data-show');
    document.querySelector("#tooltip-description").removeAttribute('data-show');
}

// personaliza as cores do alfinete 
const resolvePinColor = (color, id) => {

    const pin = document.querySelector("#" + id);

    if (color == 'red') {
        pin.setAttribute('color', 'red');
    } else {
        pin.setAttribute('color', 'blue');
    }
}

export { loadPins, loadPinContent, hideContent }
