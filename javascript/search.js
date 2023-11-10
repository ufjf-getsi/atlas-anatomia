
import { getRoutes, navigate } from "./router.js";
import { toggleSidebar } from './menu.js'

const toggleSearchMenu = () => {
    const searchContainer = document.querySelector("#search-menu-container");
    searchContainer.classList.toggle("active");

    toggleSidebar();
}

let searchContent = "";
let routes = getRoutes();

const setSearchContent = (value) => {

    searchContent = value.toLowerCase();

    if(searchContent)
        search();
    
    // limpar os resultados
    else showResults();
}

const search = () => {

    if(!searchContent)
        return;

    let date = Object.values(routes)
        .filter(route => !!route.systemName)
        .filter(route => searchContent.length < 3 ? 
            String(route.systemName).toLowerCase().startsWith(searchContent)
                : 
            String(route.systemName).toLowerCase().includes(searchContent)
    )

    showResults(date);
}


const showResults = ( results ) => {
    const resultsContainer = document.querySelector("#search-results-container");
    resultsContainer.innerHTML = "";

    results.forEach(date => {

        const item = document.createElement("div");
        item.classList.add("result-item");
        console.log(date)
        item.addEventListener("click", () => navigate(date.path))
        const itemTitle = document.createElement("p");
        itemTitle.innerText = date.systemName;
        item.appendChild(itemTitle);
        resultsContainer.appendChild(item)
    });
}


export { toggleSearchMenu, setSearchContent, toggleSidebar, search }