
import { getRoutes } from "./router.js";

const search = () => {
    const sidebar = document.querySelector("#sidebar-wrapper");
    const container = document.querySelector("#search-container");
    console.log("A")

    sidebar.classList.add("active");
    container.classList.add("active")

    document.querySelector("#close-search").addEventListener("click", () => {
        container.classList.remove("active")
    });
}

const routes = getRoutes();

let searchContent = "";

const setSearchContent = (value) => {
    searchContent = value;
    console.log(searchContent)
}



export { search, setSearchContent }