
const toggleMenu = () => {
    
    const menu = document.getElementById("menu-container");
    const sidebar = document.getElementById("menu-sidebar-container");
    menu.classList.toggle("active");
    sidebar.classList.toggle("active");
}