// DISPONIBILIZA FUNÇÕES CHAMADAS EM OUTROS ARQUIVOS

import i18next from './i18n.js';



// busca os dados do JSON
const fetchData = async (url) => {
    const data = await fetch(url);
    const json = await data.json();
    return json;
}

// carrega o JSON com as informações de todos os sistemas
const getAllSystemsData = async () => {
    const idiomaAtual = i18next.language.split('-')[0] || 'pt';

    const url = `./utils/idiomas/${idiomaAtual}/sistemas.json`;

    //console.log("idioma atual", idiomaAtual);
    //console.log("URL", url);

    // cria uma request de acordo com o endereço atual e com isso podemos
    // chamar o fetch usando a url gerada 
    const request = new Request(url)
    const { systems } = await fetchData(request.url)

    return systems;
}

export { fetchData, getAllSystemsData }