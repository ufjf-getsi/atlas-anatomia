const routes = {
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
    "#esqueletico": {
        atribute: "atlas",
        id: 0,
    },
    "#articular": {
        atribute: "atlas",
        id: 1,
    },
    "#muscular": {
        atribute: "atlas",
        id: 2,
    },
    "#nervoso": {
        atribute: "atlas",
        id: 3,
    },
    "#circulatorio": {
        atribute: "atlas",
        id: 4,
    },
    "#respiratorio": {
        atribute: "atlas",
        id: 5,
    },
    "#digestorio": {
        atribute: "atlas",
        id: 6,
    },
    "#urinario": {
        atribute: "atlas",
        id: 7,
    },
    "#genital-feminino": {
        atribute: "atlas",
        id: 8,
    },
    "#genital-masculino": {
        atribute: "atlas",
        id: 9,
    },
}

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