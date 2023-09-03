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
    a.addEventListener("click", () => navigate(data.path, data.id));
    const img = document.createElement("img");
    img.src = data.image;
    img.classList.add(isSystemReady(data.url));
    const p = document.createElement("p");
    p.classList.add("system-name");
    p.innerText = data.systemName;
    a.appendChild(img);
    div.appendChild(a);
    div.appendChild(p);
    container.appendChild(div);
  });
};

const isSystemReady = (url) => {
  if (!url) return "blocked";
  else return "available";
};

export { loadSystemsCards };
