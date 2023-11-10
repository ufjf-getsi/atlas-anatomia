
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
    else {
        const resultsContainer = document.querySelector("#search-results-container");
        resultsContainer.innerHTML = "";
    }
}

const search = () => {

    if(!searchContent)
        return;

    let results = routes
        .filter(route => !!route.systemName)
        .filter(route => searchContent.length < 3 ? 
            String(route.systemName).toLowerCase().startsWith(searchContent)
                : 
            String(route.systemName).toLowerCase().includes(searchContent)
    )
    
    showResults(results);
}


const showResults = ( results ) => {
    const resultsContainer = document.querySelector("#search-results-container");
    resultsContainer.innerHTML = "";

    results.forEach(data => {
        const item = document.createElement("div");
        item.classList.add("result-item");
        item.addEventListener("click", () => searchNavigate(data))
        const itemTitle = document.createElement("p");
        itemTitle.innerText = data.systemName;
        item.appendChild(itemTitle);
        resultsContainer.appendChild(item)
    });
}

const searchNavigate = (data) => {
    if(!!data.url)
        navigate(data.path)
} 


export { toggleSearchMenu, setSearchContent, toggleSidebar, search }