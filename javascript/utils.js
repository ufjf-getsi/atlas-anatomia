// DISPONIBILIZA FUNÇÕES CHAMADAS EM OUTROS ARQUIVOS

// busca os dados do JSON
const fetchData = async (url) => {
    const data = await fetch(url);
    const json = await data.json();
    return json;
}

// carrega o JSON com as informações de todos os sistemas
const getAllSystemsData = async () => {
    const url = "./utils/sistemas.json"; 

    // cria uma request de acordo com o endereço atual e com isso podemos
    // chamar o fetch usando a url gerada 
    const request = new Request(url)
    const { systems } = await fetchData(request.url)

    return systems;
}

export { fetchData, getAllSystemsData }