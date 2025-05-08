// ARQUIVO RESPONSÁVEL POR MONTAR OS CARDS DA HOME
// A PARTIR DO JSON GERAL DE SISTEMAS

import { navigate } from "./router.js";
import { getAllSystemsData } from "./services.js";

const loadHomeCards = async () => {

  const systems = await getAllSystemsData();
  loadSystemsCards(systems);
}

const loadSystemsCards = async (systems) => {

  const container = document.getElementById("systems-grid");
  container.innerHTML = "";

  systems.forEach((data) => {
    const card = document.createElement("div");
    card.classList.add("system-card");
    const img = document.createElement("img");
    img.src = data.image;
    img.loading = "lazy"

    //caso nao tenha url e nem subsistemas, bloqueia a navegação
    if ( !data.locked && (!!data.url || !!data.subsystems) ) {
      img.addEventListener("click", () => navigate(data.path));
    } else {
      card.setAttribute("blocked", true);
    }
    card.appendChild(img);
    const p = document.createElement("p");
    p.classList.add("system-name");
    p.innerText = data.systemName;

    card.appendChild(p);
    container.appendChild(card)
  });
};

const updateHomeTitle = (title) => {
  const titleElement = document.getElementById("home-title");
  titleElement.innerText = title; 
}

export { loadSystemsCards, loadHomeCards, updateHomeTitle};
