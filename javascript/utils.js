// DISPONIBILIZA FUNÇÕES CHAMADAS EM OUTROS ARQUIVOS

// busca os dados do JSON
const fetchData = async (url) => {
    const data = await fetch(url);
    const json = await data.json();
    return json;
}

// carrega o JSON com as informações de todos os sistemas
const getAllSystemsData = async () => {
    const url = "utils/sistemas.json"; // URL remota, não local.
    const { systems } = await fetchData(url);
    return systems;
}

export { fetchData, getAllSystemsData }