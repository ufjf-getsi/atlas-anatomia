// RESPONSÁVEL PELA MANIPULAÇÃO DO ALFINETE 

import { getPieceIndex , getPieces } from "./atlas.js   ";


let pinsData = [];

const setPinsData = (data) => {
    pinsData = data;
}

window.addEventListener("resize", () => {
    loadPins(pinsData);
})

const loadPins = async ( pinsData ) => {

    setPinsData(pinsData);

    const pinsArea = document.querySelector("#pins-area");
    pinsArea.innerHTML =  "";
    pinsData.forEach((pin, i) => {
        createPin(pin, i, pinsArea);
    });
}

// define temporariamente alfinetes para montagem do JSON

let pinsJSON = [];
let pin = {};

let pinTitle = "";

const setPinTitle = (title) => {
    pinTitle = title;
}

const setPinData = (data) => {
    pin = data;
}

const setPin = (isSettingPins, px, py) => {

    console.log(pinsData.length)
    let pin = {};
    if(isSettingPins) {
        pin.id = pinsData.length;
        pin.title = pinTitle;
        pin.description = "";
        pin.placement = "left";
        pin.color = "black";
        pin.x = px;
        pin.y = py;
    }

    setPinData(pin);
    const pinsArea = document.querySelector("#pins-area");
    loadPins(pinsData);
    createPin(pin, pin.id, pinsArea)
}

const createPin = ( pinData, i, pinsArea ) => {

    //valor em porcentagem
    let PINS_SIZE = 0.05;
    let dimensions = document.getElementById("content").width;
    let pinDimension = dimensions*PINS_SIZE;
    
    const pin = document.createElement("button");
    pin.classList.add("pin");
    pin.id = `pin_${i}`;
    pin.addEventListener("mouseover", () => loadPinContent(i));
    pin.addEventListener("mouseout", () => hideContent(i));

    pinsArea.appendChild(pin);
    resolvePinColor(pinData.color, pin.id);

    // desconta uma porcentagem no x por conta da imagem
    // desconta no y pro alfinete ficar posicionado em cima do ponto
    let px = ((pinData.x*dimensions -(0.15*pinDimension))/dimensions) * 100;
    let py = ((pinData.y*dimensions -(0.95*pinDimension))/dimensions) * 100;
    pin.style = `width:${PINS_SIZE*100}%; position: absolute; margin: 0; padding: 0; left: ${px}%;top: ${py}%;`;
}

const createAddPinButton = () => {

   // createEditionMenu();

    const container = document.querySelector("#container");
    const addPinButton = document.createElement("button");
    addPinButton.classList.add("add-button");
    addPinButton.addEventListener("click", () => addPinToPinsData())
    container.appendChild(addPinButton);

    const input = document.createElement("input")
    input.type = "text";
    input.id = "pin-title";
    input.addEventListener("change", (e) => setPinTitle(e.target.value))
    container.appendChild(input)
}

const createEditionMenu = () => {
    const card = document.querySelector("#atlas");
    const container = document.createElement("div");
    container.id = "edition-menu";

    card.appendChild(container);
}

const addPinToPinsData = () => {
    pinsJSON.push(pin);
    console.log(pinsJSON)
    loadPins([...pinsData, pin])
}


// carrega as informações do alfinete
const loadPinContent = async (index) => {
    
    const pinData = getPieces()[getPieceIndex()].pins[index];
    if(!pinData)
        return;
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
    } else if(color == 'blue') {  
        pin.setAttribute('color','blue');
    } else {  
        pin.setAttribute('color','black');
    } 
}

export { loadPins, loadPinContent, showContent, hideContent, setPin, createAddPinButton }
