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

    if (!!link.subsystems) {
      // nome da nova dropdown nesse caso dos subsistemas
      let name = link.path.toLowerCase().replace("#", "");

      //gera uma nova dropdown ao invés de um link
      loadDropdown(link.systemName, "subsystem" + name, link.subsystems, content);

    } else {
      const a = document.createElement("a");

      if (!!link.url)
        a.addEventListener("click", () => navigate(link.path, link.url));

      a.innerText = link.systemName;
      content.appendChild(a);
    }
  })

  container.appendChild(content)
  parent.appendChild(container);
}

const toggleDropdown = async (id) => {
  const dropdown = document.querySelector("#" + id);

  dropdown.classList.toggle("active");
  dropdown.children[1].classList.toggle("active");
};

const toggleMenu = () => {

  document.getElementById("menu-sidebar-container").classList.toggle("active");

  toggleSidebar();
};

const closeSidebar = () => {
  
  document.querySelector("#sidebar-wrapper").classList.remove("active");
  document.querySelector("#sidebar-icon").classList.remove("active");
  document.querySelector("#menu-sidebar-container").classList.remove("active");
  document.querySelector("#search-menu-container").classList.remove("active");

}

const toggleSidebar = () => {

  const sidebarWrapper = document.querySelector("#sidebar-wrapper");
  const sidebarIcon = document.querySelector("#sidebar-icon");
  const menuContainer = document.querySelector("#menu-sidebar-container");
  const searchContainer = document.querySelector("#search-menu-container");

  // caso algum dos menus estejam ativos -> fechar
  if (sidebarIcon.classList.contains("active")) {

    if (menuContainer.classList.contains("active"))
      menuContainer.classList.remove("active");

    if (searchContainer.classList.contains("active"))
      searchContainer.classList.remove("active");

    if (document.body.classList.contains("active"))
      document.body.classList.remove("active");
  }

  document.body.classList.toggle("no-scroll");
  sidebarWrapper.classList.toggle("active");
  sidebarIcon.classList.toggle("active");

}

export { loadMenu, toggleMenu, toggleDropdown, toggleSidebar, closeSidebar };
