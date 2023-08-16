const routes = {
    "/": {
        path: "/index.html",
        title: "Home",
    },
    404: {
        path: "/index.html",
        title: "Home",
    },
    "/team": {
        path: "/equipe.html",
        title: "Equipe"
    },
    "/guide": {
        path: "/instrucoes.html",
        title: "Equipe"
    },
    "/about": {
        path: "/sobre.html",
        title: "Equipe"
    }
}


const navigate = (path) => {
    window.history.pushState(
        {},
        path,
        window.location.origin + path
    )

    handler();
}

window.onpopstate = () => {
    const root = document.getElementById("root");
    root.innerHTML = routes[window.location.pathname];

    handler()
}


const handler = async () => {
    const location = window.location.pathname;

    if(!location.length) {
        location = "/";
    }

    const route = routes[location] || routes[404];
    const html = await fetch(route.path).then(data => data.text());

    const root = document.getElementById("root");
    root.innerHTML = html;
}