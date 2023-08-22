// ARQUIVO QUE GERA AS NAVEGAÇÕES NO MENU E GERENCIA O MESMO

import { navigate } from "./router.js";
import { getAllSystemsData } from "./utils.js";

// links já definidos
const links = [
  {
    title: "Home",
    path: "#home",
  },
  {
    title: "Sistemas",
    dropdown: "subsistemas",
    path: "#atlas",
  },
  {
    title: "Instruções",
    path: "#instrucoes",
  },
  {
    title: "Equipe",
    path: "#equipe",
  },
  {
    title: "Sobre",
    path: "#sobre",
  },
];

const loadMenu = async () => {
  const sidebar = document.getElementById("menu-sidebar-container");
  let html = "";

  links.forEach((link) => {
    if (!!link.dropdown) {
      const a = document.createElement("a");
      a.classList.add("dropdown");
      a.id = link.dropdown;
      a.addEventListener("click", () => toggleDropdown(link.dropdown));
      a.innerText = link.title;
      const div = document.createElement("div");
      div.id = "content-" + link.dropdown;
      div.classList.add("dropdown-content");
      a.appendChild(div);
      sidebar.appendChild(a);
    } else {
      const a = document.createElement("a");
      a.onclick = () => navigate(link.path);
      a.innerText = link.title;
      sidebar.appendChild(a);
    }
  });
};

// gera as navegações dinamicamente com o arquivo geral de sistemas
const loadSystemsLinks = async () => {
  const data = await getAllSystemsData();
  const systemLinks = [];

  data.forEach((link) => {
    const a = document.createElement("a");
    a.addEventListener("click", () => navigate(link.path, link.id));
    a.innerText = link.systemName;
    systemLinks.push(a);
  });
  return systemLinks;
};

// gera as navegações dinamicamente com o arquivo geral de sistemas
const loadSubsystems = async () => {
  const data = await getAllSystemsData();
  let html = "";

  data.forEach((link) => {
    const a = document.createElement("a");
    a.onclick = () => navigate(link.path, link.id);
    a.innerText = link.systemName;
    html += a.outerHTML;
  });

  return html;
};

const toggleDropdown = async (id) => {
  const dropdown = document.getElementById(id);
  const dropdownContent = document.getElementById("content-" + id);

  dropdown.classList.toggle("active");

  const systemLinks = await loadSystemsLinks();
  systemLinks.forEach((link) => {
    dropdownContent.appendChild(link);
  });
};

const toggleMenu = () => {
  const menu = document.getElementById("menu-container");
  const sidebar = document.getElementById("menu-sidebar-container");
  const sidebarWrapper = document.getElementById("sidebar-wrapper");

  sidebarWrapper.classList.toggle("active");
  menu.classList.toggle("active");
  sidebar.classList.toggle("active");
};

const closeMenu = () => {
  const menu = document.getElementById("menu-container");
  const sidebar = document.getElementById("menu-sidebar-container");
  const sidebarWrapper = document.getElementById("sidebar-wrapper");

  sidebarWrapper.classList.remove("active");
  menu.classList.remove("active");
  sidebar.classList.remove("active");
};


export { loadMenu, toggleMenu, closeMenu, toggleDropdown };
