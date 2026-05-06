// DISPONIBILIZA FUNÇÕES CHAMADAS EM OUTROS ARQUIVOS
import i18next from './i18n.js';

// busca os dados do JSON
const fetchData = async (url) => {
    const data = await fetch(url);
    const json = await data.json();
    return json;
}
 
// traduz recursivamente os systemName de uma arvore de sistemas
const translateSystems = (arr) => arr.map(s => {
    const key = (s.path || '').replace('#', '');
    return {
        ...s,
        systemName: key
            ? i18next.t(`systems.${key}`, s.systemName || '')
            : s.systemName,
        subsystems: s.subsystems ? translateSystems(s.subsystems) : s.subsystems,
    };
});
 
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
    return translateSystems(data.systems);
}
 
export { fetchData, getAllSystemsData }