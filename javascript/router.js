// RESPONSÁVEL PELO ROTEAMENTO ATRAVÉS DA URL

import { loadSystemContent } from "./atlas.js";
import { loadHomeCards, loadSystemsCards } from "./home.js";
import { closeSidebar } from "./menu.js";
import { getAllSystemsData } from "./services.js";

let routes = [
    {
        path: "#home",
        section: "home",
    },
    {
        path: "#instrucoes",
        section: "guide",
    },
    {
        path: "#equipe",
        section: "team",
    },
    {
        path: "#sobre",
        section: "about",
    },
    {
        path: "#error",
        section: "error"
    }
]

// adiciona às rotas padrões as rotas dos sistemas 
const createSystemRoutes = ( data ) => {
    data.forEach(route => {
        routes.push({
            "path": route.path,
            "systemName": route.systemName,
            "section": route.section, 
            "id": routes.length, 
            "subsystems": route.subsystems ? route.subsystems : [], 
            "url": route.url
        });

        // caso possua um objeto de subsistemas crie as rotas também 
        if(!!route.subsystems)
            createSystemRoutes(route.subsystems);
    });
}

const getRoutes = () => {
    return routes;
}

const createRoutes = async () => {

    const data = await getAllSystemsData();
    createSystemRoutes(data);
}

const navigate = ( path ) => {
    handler(path);

    if(path != "#error") {
        window.history.pushState(
            {},
            path,
            window.location.origin + window.location.pathname + path
        )
        closeSidebar();
    }
}

window.onpopstate = () => {
    handler()
}

const isInvalidRoute = ( route ) => {
    
    if(( route.section == "atlas" && ( !route.url || route.url == "" ))
        || ( route.section == "subsystems" && ( !route.subsystems || !route.subsystems.length ))) 
            return true;
    else return false;
}

// gerencia qual seção da página será exibida 
const handler = async ( location ) => {

    // caso nao tenha recebido por parâmetro
    if(!location) {
        location = window.location.hash;
    }

    const body = document.getElementsByTagName("body")[0];
    let atualRoute = routes.find((route) => route.path == location)

    //caso seja uma rota inválida, carrega a pág de erro
    if(isInvalidRoute(atualRoute)) {
        body.dataset.show = "error";
    } else {
        
        body.dataset.show = atualRoute.section;

        //carrega as infomações de acordo com a seção atual
        switch(atualRoute.section) {
            case "atlas":
                loadSystemContent(atualRoute.url);
            break;

            case "subsystems":
                loadSystemsCards(atualRoute.subsystems);
            break;
                
            case "home": 
                loadHomeCards();
            break;
        }
    } 
}

export { navigate, handler, createRoutes, getRoutes }