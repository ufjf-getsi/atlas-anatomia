
import { getRoutes, navigate } from "./router.js";
import { toggleSidebar } from './menu.js'
//import { getAllSystemsData, fetchData } from "./services.js";

const toggleSearchMenu = () => {
    const searchContainer = document.querySelector("#search-menu-container");
    searchContainer.classList.toggle("active");

    toggleSidebar();
}

let searchContent = "";
let routes = [];

const loadSearchContents = async () => {
    routes = getRoutes();

    // -> pesquisa por meio dos alfinetes e imagens...
    //const systemsData = await getAllSystemsData();
    //loadAllPiecesData(systemsData);
    //let pieces = [];
    //console.log("All pieces", pieces)
}

/* const loadPieceData = async (url, path) => {

    let systemContent = await fetchData(url); 
    let systemPieces = systemContent.pieces;

    /////////
    pieces.push({path, systemPieces})
} */

/* const loadAllPiecesData = ( data ) => {
    
    data.forEach((system) => {
        if(!!system.subsystems)
            loadAllPiecesData(system.subsystems)
        else {
            if(!!system.url)
                loadPieceData(system.url, system.path)
        }
    })   
} */

const setSearchContent = (value) => {

    searchContent = value.toLowerCase();

    if(searchContent)
        setTimeout(search, 500);
    
    // limpar os resultados
    else {
        const resultsContainer = document.querySelector("#search-results-container");
        resultsContainer.innerHTML = "";
    }
}

const search = () => {

    if(!searchContent)
        return;

    let routeResults = routes
        .filter(route => !!route.systemName)
        .filter(route => searchContent.length < 3 ? 
            String(route.systemName).toLowerCase().startsWith(searchContent)
                : 
            String(route.systemName).toLowerCase().includes(searchContent)
    )

    showResults( routeResults );
}

const showResults = ( results ) => {
    const resultsContainer = document.querySelector("#search-results-container");
    resultsContainer.innerHTML = "";

    results.forEach(data => {
        const item = document.createElement("div");
        item.classList.add("result-item");
        item.addEventListener("click", () => navigate(data.path))
        const itemTitle = document.createElement("p");
        itemTitle.innerText = data.systemName || data.title;
        item.appendChild(itemTitle);
        resultsContainer.appendChild(item)
    });
}

export { toggleSearchMenu, setSearchContent, toggleSidebar, search, loadSearchContents }