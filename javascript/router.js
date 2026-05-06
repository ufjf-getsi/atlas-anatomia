// RESPONSÁVEL PELO ROTEAMENTO ATRAVÉS DA URL

import { loadSystemContent, updateSystemName } from "./atlas.js";
import { loadHomeCards, loadSystemsCards, updateHomeTitle } from "./home.js";
import { closeSidebar } from "./menu.js";
import { getAllSystemsData } from "./services.js";
import i18next from './i18n.js';

let routes = [
    { path: "#home",       section: "home"    },
    { path: "#instrucoes", section: "guide"   },
    { path: "#equipe",     section: "team"    },
    { path: "#sobre",      section: "about"   },
    { path: "#contatos",   section: "contact" },
    { path: "#error",      section: "error"   },
];

// quantas rotas fixas (não vindas de sistemas.json) existem
const BASE_ROUTES_COUNT = routes.length;

// adiciona às rotas padrões as rotas dos sistemas
const createSystemRoutes = (data, parent = "") => {
    data.forEach(route => {
        routes.push({
            "path": route.path,
            "systemName": route.systemName,
            "section": route.section,
            "id": routes.length,
            "subsystems": route.subsystems || [],
            "parents": parent,
            "url": route.url
        });

        if (!!route.subsystems) {
            createSystemRoutes(route.subsystems, parent + " > " + route.systemName);
        }
    });
}

const getRoutes = () => routes;

const createRoutes = async () => {
    // remove rotas de sistemas antigas; mantém só as fixas
    // (necessário para poder rechamar createRoutes ao trocar idioma)
    routes.length = BASE_ROUTES_COUNT;

    const data = await getAllSystemsData();
    createSystemRoutes(data);
}

const navigate = (path) => {
    handler(path);

    if (path != "#error") {
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

const isInvalidRoute = (route) => {
    if ((route.section == "atlas" && (!route.url || route.url == ""))
        || (route.section == "subsystems" && (!route.subsystems || !route.subsystems.length)))
        return true;
    else return false;
}

// gerencia qual seção da página será exibida
const handler = async (location) => {

    if (!location) {
        location = window.location.hash;
    }

    const body = document.getElementsByTagName("body")[0];
    let atualRoute = routes.find((route) => route.path == location);

    if (!atualRoute || isInvalidRoute(atualRoute)) {
        body.dataset.show = "error";
    } else {
        body.dataset.show = atualRoute.section;

        switch (atualRoute.section) {
            case "atlas":
                updateHomeTitle(atualRoute.systemName);
                updateSystemName(atualRoute.systemName);
                loadSystemContent(atualRoute.url);
                break;

            case "subsystems":
                updateHomeTitle(atualRoute.systemName);
                loadSystemsCards(atualRoute.subsystems);
                break;

            case "home":
                updateHomeTitle(i18next.t('home.selectSystem', 'Selecione um sistema:'));
                loadHomeCards();
                break;
        }
    }
}

export { navigate, handler, createRoutes, getRoutes }