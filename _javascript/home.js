// ARQUIVO RESPONSÁVEL POR MONTAR OS CARDS DA HOME
// A PARTIR DO JSON GERAL DE SISTEMAS

const loadSystemsCards = async () => {

    const systems = await getAllSystemsData();

    const container = document.getElementById("systems-grid");
    let html = "";

    systems.forEach(data => {
        html += `
        <div class="system-card">
            <a onclick="navigate('${data.path}', '${data.id}')">
                <img src='${data.image}' class="${isSystemReady(data.url)}">
            </a>
            <p class="system-name">${data.systemName}</p>
        </div>
        `
    });

    container.innerHTML = html;

}

const isSystemReady = (url) => {
    if(!url)
        return "blocked"
    else return "";
}