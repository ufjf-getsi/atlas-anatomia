// DISPONIBILIZA FUNÇÕES CHAMADAS EM OUTROS ARQUIVOS
//import i18next from './i18n.js';

// busca os dados do JSON
const fetchData = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Falha ao carregar ${url}: ${res.status} ${res.statusText}`);
    }
    return await res.json();
};
 
// carrega o JSON com as informacoes de todos os sistemas, ja traduzido
const getAllSystemsData = async () => {
    const res = await fetch('./utils/sistemas.json');
    if (!res.ok) {
        throw new Error('utils/sistemas.json nao foi encontrado');
    }
 
    // alguns servidores devolvem index.html quando o arquivo nao existe
    // confere o conteudo antes de fazer JSON.parse.
    const text = await res.text();
    if (text.trim().startsWith('<')) {
        throw new Error('utils/sistemas.json retornou HTML — arquivo nao existe');
    }
 
    const data = JSON.parse(text);
    return data.systems;
}
 
export { fetchData, getAllSystemsData }