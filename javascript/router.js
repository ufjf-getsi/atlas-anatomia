// RESPONSÁVEL PELO ROTEAMENTO ATRAVÉS DA URL

import { loadSystemContent } from "./atlas.js";
import { loadHomeCards, loadSystemsCards } from "./home.js";
import { closeMenu } from "./menu.js";
import { getAllSystemsData } from "./services.js";

let routes = {
    "#home": {
        section: "home",
    },
    "#instrucoes": {
        section: "guide",
    },
    "#equipe": {
        section: "team",
    },
    "#sobre": {
        section: "about",
    },
    "#error": {
        section: "error"
    }
}

// adiciona às rotas padrões as rotas dos sistemas 
const createSystemRoutes = ( data ) => {

    data.forEach(route => {
        routes[route.path] = {
            "section": route.section, 
            "id": route.id, 
            "subsystems": route.subsystems ? route.subsystems : [], 
            "url": route.url
        };

        // caso possua um objeto de subsistemas crie as rotas também 
        if(!!route.subsystems)
            createSystemRoutes(route.subsystems);
    });
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
        closeMenu();
    }
}

window.onpopstate = () => {
    handler()
}

// gerencia qual seção da página será exibida 
const handler = async ( location ) => {

    // caso nao tenha recebido por parâmetro
    if(!location) {
        location = window.location.hash;
    }

    const body = document.getElementsByTagName("body")[0];

    //caso seja uma rota inválida, carrega a pág de erro
    if(!routes[location]) {
        body.dataset.show = "error";
    } else {
        
        body.dataset.show = routes[location].section;

        //carrega as infomações de acordo com a seção atual
        switch(routes[location].section) {
            case "atlas":
                loadSystemContent(routes[location].url);
            break;

            case "subsystems":
                loadSystemsCards(routes[location].subsystems);
            break;
                
            case "home": 
                loadHomeCards();
            break;
        }
    } 
}

export { navigate, handler, createRoutes }