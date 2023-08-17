// ARQUIVO QUE GERA AS NAVEGAÇÕES NO MENU E GERENCIA O MESMO

// links já definidos 
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

const loadMenu = async () => {

    const sidebar = document.getElementById("menu-sidebar-container");
    let html = "";

    links.forEach(link => {
        html += `
            <a onclick="navigate('${link.path}')">${link.title}</a>
        `    
    });

    html += await loadSystemsLinks()

    sidebar.innerHTML += html;

}

// gera as navegações dinamicamente com o arquivo geral de sistemas
const loadSystemsLinks = async () => {
    
    const data = await getAllSystemsData();
    let html = "";

    data.forEach(link => {
        html += `
            <a onclick="navigate('${link.path}', ${link.id})">${link.systemName}</a>
        `    
    })

    return html;
}

const toggleMenu = () => {
    
    const menu = document.getElementById("menu");
    const sidebar = document.getElementById("menu-sidebar-container");
    
    menu.classList.toggle("active");
    sidebar.classList.toggle("active");
}

