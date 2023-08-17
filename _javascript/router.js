// RESPONSÁVEL PELO ROTEAMENTO ATRAVÉS DA URL

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

    window.history.pushState(
        {},
        path,
        window.location.origin + path
    )

    handler(path, systemID);
}

window.onpopstate = () => {
    handler()
}

window.onhashchange = () => {
    handler()
}

// gerencia qual seção da página será exibida 
// a navegação pelo menu, url ou pelos cards com links 
const handler = async (location, systemID) => {

    // caso nao tenha recebido por parâmetro
    if(!location) {
        location = window.location.hash
        systemID = routes[location].id || 0;
    }
        
    const body = document.getElementsByTagName("body")[0];
    body.setAttribute("show-data", routes[location].atribute)

    //carrega as infomações do sistema apenas se estiver na seção do atlas
    if(routes[location].atribute == "atlas")
        loadSystemContent(systemID)
}




