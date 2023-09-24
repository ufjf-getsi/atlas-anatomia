// ARQUIVO RESPONSÁVEL POR MONTAR OS CARDS DA HOME
// A PARTIR DO JSON GERAL DE SISTEMAS

import { navigate } from "./router.js";
import { getAllSystemsData } from "./services.js";

const loadHomeCards = async () => {
  
  const systems = await getAllSystemsData();
  loadSystemsCards(systems);
}

const loadSystemsCards = async ( systems ) => {
  
  const container = document.getElementById("systems-grid");
  container.innerHTML = "";

  systems.forEach((data) => {
    const div = document.createElement("div");
    div.classList.add("system-card");
    const a = document.createElement("a");
    const img = document.createElement("img");
    img.src = data.image;

    //caso nao tenha url e nem subsistemas, bloqueia a navegação
    if(!!data.url || !!data.subsystems) {
      a.addEventListener("click", () => navigate(data.path));
      a.appendChild(img);
    } else {
      const box = document.createElement("div");
      box.classList.add("block");
      box.appendChild(img);
      a.appendChild(box);
    }
    const p = document.createElement("p");
    p.classList.add("system-name");
    p.innerText = data.systemName;
    
    div.appendChild(a);
    div.appendChild(p);
    container.appendChild(div);
  });
};

export { loadSystemsCards, loadHomeCards };
