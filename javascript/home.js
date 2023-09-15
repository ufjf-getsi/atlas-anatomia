// ARQUIVO RESPONSÁVEL POR MONTAR OS CARDS DA HOME
// A PARTIR DO JSON GERAL DE SISTEMAS

import { navigate } from "./router.js";
import { getAllSystemsData } from "./services.js";

const loadSystemsCards = async () => {
  const systems = await getAllSystemsData();

  const container = document.getElementById("systems-grid");
  let html = "";

  systems.forEach((data) => {
    const div = document.createElement("div");
      div.classList.add("system-card");
    const a = document.createElement("a");
    const img = document.createElement("img");
      img.src = data.image;

    if(isSystemReady(data.url)) {
      a.addEventListener("click", () => navigate(data.path, data.id));
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

const isSystemReady = (url) => {
  return !!url;
};

export { loadSystemsCards };
