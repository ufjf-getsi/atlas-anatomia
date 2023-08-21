// ARQUIVO QUE GERA AS NAVEGAÇÕES NO MENU E GERENCIA O MESMO

// links já definidos 
const links = [
    {
        title: "Home",
        path: "#home",
    },
    {
        title: "Sistemas",
        dropdown: "subsistemas",
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

        if(!!link.dropdown) {
            html += `
                <a class="dropdown" id="${link.dropdown}" onclick="toggleDropdown('${link.dropdown}')">${link.title}
                <div id="content-${link.dropdown}" class="dropdown-content" ></div>
                </a>
            `
        }else {
            html += `
                <a onclick="navigate('${link.path}')">${link.title}</a>
            `
        }
    });

    //html += await loadSystemsLinks()

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

// gera as navegações dinamicamente com o arquivo geral de sistemas
const loadSubsystems = async () => {
    
    const data = await getAllSystemsData();
    let html = "";

    data.forEach(link => {
        html += `
            <a onclick="navigate('${link.path}', ${link.id})">${link.systemName}</a>
        `    
    })

    return html;
}


const toggleDropdown = async (id) => {
    const dropdown = document.getElementById(id); 
    const dropdownContent = document.getElementById("content-"+id); 
       
    dropdown.classList.toggle("active");
    
    dropdownContent.innerHTML = await loadSystemsLinks();

}

const toggleMenu = () => {
    
    const menu = document.getElementById("menu-container");
    const sidebar = document.getElementById("menu-sidebar-container");
    const sidebarWrapper = document.getElementById("sidebar-wrapper");

    sidebarWrapper.classList.toggle("active")
    menu.classList.toggle("active");
    sidebar.classList.toggle("active");
}

const closeMenu = () => {
    
    const menu = document.getElementById("menu-container");
    const sidebar = document.getElementById("menu-sidebar-container");
    const sidebarWrapper = document.getElementById("sidebar-wrapper");

    sidebarWrapper.classList.remove("active")
    menu.classList.remove("active");
    sidebar.classList.remove("active");
}

