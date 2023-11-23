// RESPONSÁVEL PELA MANIPULAÇÃO DO ALFINETE 

import { getPieceIndex , getPieces } from "./atlas.js   ";


let pinsData = [];

const setPinsData = (data) => {
    pinsData = data;
}

window.addEventListener("resize", () => {
    loadPins(pinsData);
})

const loadPins = async (pinsData) => {

    setPinsData(pinsData);

    //valor em porcentagem
    let PINS_SIZE = 0.05;
    let dimensions = document.getElementById("content").width;
    let pinDimension = dimensions*PINS_SIZE;
    
    const pinsArea = document.querySelector("#pins-area");
    pinsArea.innerHTML =  "";
    pinsData.forEach((pin, i) => {
        const b = document.createElement("button");
        b.classList.add("pin");
        b.id = `pin_${i}`;

        b.addEventListener("mouseover", () => loadPinContent(i));
        b.addEventListener("mouseout", () => hideContent(i));
        
        pinsArea.appendChild(b);
        resolvePinColor(pin.color, b.id);

        // desconta uma porcentagem no x por conta da imagem
        // desconta no y pro alfinete ficar posicionado em cima do ponto
        let px = ((pin.x*dimensions -(0.15*pinDimension))/dimensions) * 100;
        let py = ((pin.y*dimensions -(0.95*pinDimension))/dimensions) * 100;
        b.style = `width:${PINS_SIZE*100}%; position: absolute; margin: 0; padding: 0; left: ${px}%;top: ${py}%;`;
    });
}

// carrega as informações do alfinete
const loadPinContent = async (index) => {
    
    const pinData = getPieces()[getPieceIndex()].pins[index];
    let { title, description, placement, color} = pinData;

    if(!placement)
        placement = "bottom"

    const pin = document.querySelector(`#pin_${index}`);
    const tooltip = document.querySelector("#tooltip");
    const tooltipTitle = document.querySelector("#tooltip-title");
    const tooltipContent = document.querySelector("#tooltip-content");

    // atualiza informações do alfinete
    tooltipTitle.innerText = title;
    tooltipContent.innerText =  description;

    tooltipTitle.setAttribute('color', color);
    tooltip.setAttribute('data-show','true');

    Popper.createPopper(pin, tooltip, {
        placement
    });

    if(color == "red")
        pin.addEventListener('click', () => showDescription());

}

// mostra a descrição do alfinete na tela
const showDescription = () => {
    const tooltipDescription = document.querySelector("#tooltip-description");
    tooltipDescription.setAttribute('data-show','true');
}

// esconde o conteudo do alfinete
const hideContent = () => {

    const tooltip = document.querySelector("#tooltip");
    const tooltipDescription = document.querySelector("#tooltip-description");
    tooltip.removeAttribute('data-show');
    tooltipDescription.removeAttribute('data-show');
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

export { loadPins, loadPinContent }
