// ARQUIVO QUE GERA AS NAVEGAÇÕES NO MENU E GERENCIA O MESMO

import { navigate } from "./router.js";
import { getAllSystemsData } from "./services.js";

// links já definidos
const links = [
  {
    title: "Home",
    path: "#home",
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

  const systemsData = await getAllSystemsData();
  const sidebar = document.querySelector("#menu-sidebar-container");

  links.forEach((link) => {
    const a = document.createElement("a");
      a.onclick = () => navigate(link.path);
      a.innerText = link.title;
      sidebar.appendChild(a);
  });

  // carrega a dropdown com o array dos sistemas e a sidebar sendo o pai
  loadDropdown("sistemas", "systems", systemsData, sidebar);
};

// recebe um objeto e gera um dropdown a partir desse
const loadDropdown = (dropdownName, id, data, parent) => {
  
  const container = document.createElement("div");
    const title = document.createElement("a");
    title.innerText = dropdownName;
    title.onclick = () => toggleDropdown(container.id);
  container.appendChild(title);
  container.className = "dropdown";
  container.id = id;
    
  const content = document.createElement("div");
    content.className = "dropdown-content";
  
    data.forEach((link) => {

      if(!!link.subsystems) {
        // nome da nova dropdown nesse caso dos subsistemas
        let name = link.systemName.toLowerCase().replace(" ", "");
        
        //gera uma nova dropdown ao invés de um link
        loadDropdown(link.systemName, "subsystem" + name, link.subsystems, content);

      } else {
        const a = document.createElement("a");

        if(!!link.url)
          a.addEventListener("click", () => navigate(link.path, link.url));
        
        a.innerText = link.systemName;
        content.appendChild(a);
      }
    })
  
  container.appendChild(content)
  parent.appendChild(container);
}

const toggleDropdown = async (id) => {
  const dropdown = document.querySelector("#"+id);
  
  dropdown.classList.toggle("active");
  dropdown.children[1].classList.toggle("active")
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
