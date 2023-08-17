const links = [
    {
        title: "Home",
        path: "#home",
    },
    {
        title: "Sistemas",
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
]

const loadMenu = () => {
    const sidebar = document.getElementById("menu-sidebar-container");

    let html = "";

    links.forEach(link => {
        html += `
            <a onclick="navigate('${link.path}')">${link.title}</a>
        `    
    });

    sidebar.innerHTML += html;
}

const toggleMenu = () => {
    
    const menu = document.getElementById("menu");
    const sidebar = document.getElementById("menu-sidebar-container");
    
    menu.classList.toggle("active");
    sidebar.classList.toggle("active");
}

