// RESPONSÁVEL PELO ROTEAMENTO ATRAVÉS DA URL

import { loadSystemContent } from "./atlas.js";
import { closeMenu } from "./menu.js";
import { getAllSystemsData } from "./utils.js";

let routes = {
    "#home": {
        atribute: "home",
    },
    "#instrucoes": {
        atribute: "guide",
    },
    "#equipe": {
        atribute: "team",
    },
    "#sobre": {
        atribute: "about",
    },
    "#error": {
        atribute: "error"
    }
}

// adiciona às rotas padrões as navegações dos sistemas 
// a partir do json geral
const createSystemRoutes = async () => {
    
    const data = await getAllSystemsData();

    data.forEach(link => {
        routes[link.path] = {"atribute": "atlas", "id": link.id};
    });
}

createSystemRoutes()

const navigate = (path, systemID) => {
    handler(path, systemID);

    if(path != "#error") {
        window.history.pushState(
            {},
            path,
            window.location.origin + path
        )
        closeMenu();
    }
}

window.onpopstate = () => {
    handler()
}

// gerencia qual seção da página será exibida 
// a navegação pelo menu, url ou pelos cards com links 
const handler = async (location, systemID) => {

    // caso nao tenha recebido por parâmetro
    if(!location) {
        location = window.location.hash
        systemID = routes[location] ? routes[location].id : 0;
    }

    const body = document.getElementsByTagName("body")[0];

    //caso seja uma rota inválida, carrega a pág de erro 403
    if(!routes[location]) {
        body.dataset.show = "error";
    } else {
        
        body.dataset.show = routes[location].atribute;

        //carrega as infomações do sistema apenas se estiver na seção do atlas
        if(routes[location].atribute == "atlas") {
            loadSystemContent(systemID)
        }
    } 
}




export { navigate, handler }