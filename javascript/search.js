
import { getRoutes, navigate } from "./router.js";
import { toggleSidebar } from './menu.js'
import i18next, { tSystem } from './i18n.js';


const toggleSearchMenu = () => {
    
    document.querySelector("#search-menu-container").classList.toggle("active");

    toggleSidebar();
}

let searchContent = "";
let routes = [];

const loadSearchContents = async () => {
    routes = getRoutes();
}


const setSearchContent = (value) => {

    searchContent = value.toLowerCase();

    if(searchContent)
        setTimeout(search, 500);
    
    // limpar os resultados
    else {
        document.querySelector("#search-results-container").innerHTML = "";
    }
}

const search = () => {

    if(!searchContent)
        return;

    const matches = (route) => {
        // route.systemName é PT — traduz pra comparar contra o que o usuário digitou
        const translated = String(tSystem(route.systemName) || "").toLowerCase();
        return searchContent.length < 3
            ? translated.startsWith(searchContent)
            : translated.includes(searchContent);
    };
    
    const routeResults = routes
       .filter(route => !!route.systemName)
        .filter(matches);

    showResults( routeResults );
}

const showResults = ( results ) => {
    const resultsContainer = document.querySelector("#search-results-container");
    resultsContainer.innerHTML = "";

    results.forEach(data => {
        const item = document.createElement("div");
        item.classList.add("result-item");
        item.addEventListener("click", () => navigate(data.path));
            const itemTitle = document.createElement("p");
            itemTitle.innerText = i18next.t(data.systemName || data.title || "");
        item.appendChild(itemTitle);
            const itemParents = document.createElement("p");
            itemParents.classList.add("item-parents");
        if (data.parents) {
            itemParents.innerText = data.parents
                .split(" > ")
                .map(seg => seg.trim() ? i18next.t(seg.trim()) : "")
                .filter(Boolean)
                .join(" > ");
        }        
        item.appendChild(itemParents);

        resultsContainer.appendChild(item);
    });
}

export { toggleSearchMenu, setSearchContent, toggleSidebar, search, loadSearchContents }