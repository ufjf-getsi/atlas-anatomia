
import { getRoutes } from "./router.js";
import { toggleSidebar } from './menu.js'

const toggleSearchMenu = () => {
    const searchContainer = document.querySelector("#search-container");
    searchContainer.classList.toggle("active");

    toggleSidebar();
}

const routes = getRoutes();

let searchContent = "";

const setSearchContent = (value) => {
    searchContent = value;
    console.log(searchContent)
}

export { toggleSearchMenu, setSearchContent, toggleSidebar }