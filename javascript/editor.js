import { getPinsData, loadPins, createPin } from "./pins.js";


 
// define temporariamente alfinetes para montagem do JSON
let pinsJSON = [];
let pin = {};
let pinTitle = "";

const setPinTitle = (title) => {
    pinTitle = title;
}

const updatePin = (data) => {
    pin = data;
}

const addPinToPinsData = () => {
    pinsJSON.push(pin);
    
    const pinsData = getPinsData();
    
    //renderiza os alfinetes da imagem + alfinetes salvos temporáriamente
    loadPins([...pinsData, pin])
}

const setPin = (isSettingPins, px, py) => {

    let pin = {};
    const pinsData = getPinsData();

    if(isSettingPins) {
        pin.id = pinsData.length;
        pin.title = pinTitle;
        pin.description = "";
        pin.placement = "left";
        pin.color = "black";
        pin.x = Number(px.toFixed(2));
        pin.y = Number(py.toFixed(2));
    }

    updatePin(pin);
    const pinsArea = document.querySelector("#pins-area");

    // toda vez que testa um alfinete em uma posição temporária, renderiza novamente
    loadPins(pinsData);
    createPin(pin, pin.id, pinsArea)
}

const createEditionMenu = () => {
    const card = document.querySelector(".image-card");
    const container = document.createElement("div");
    container.id = "edition-menu";
    card.appendChild(container);

    const input = document.createElement("input")
    input.type = "text";
    input.id = "pin-title";
    input.addEventListener("input", (e) => setPinTitle(e.target.value));
    container.appendChild(input);

    const button = document.createElement("button");
    button.classList.add("add-button");
    button.addEventListener("click", () => addPinToPinsData());
    button.innerText = "ADICIONAR";
    container.appendChild(button);

    const addedPins = document.createElement("button");
    addedPins.id = "added-pins";
    addedPins.addEventListener("click", () => console.log(pinsJSON));
    addedPins.innerText = "GERAR JSON";
    container.appendChild(addedPins);
}

export { createEditionMenu, setPin }