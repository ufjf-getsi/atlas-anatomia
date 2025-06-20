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
  
  const maxColumns = 5;
  const cardWidth = 180;  
  const gap = 85;         
  const maxWidth = 1220;  
  let columns = maxColumns; 

  if (systems.length % 3 === 0) {
    columns = 3;  // 6, 9 => 3 colunas
  } else if (systems.length % 4 === 0) {
    columns = 4;  // 8, 12 => 4 colunas
  } 

  const totalWidth = (cardWidth * columns) + (gap * (columns - 1));
  const containerWidth = Math.min(totalWidth, maxWidth);

  container.style.maxWidth = `${containerWidth}px`;

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
