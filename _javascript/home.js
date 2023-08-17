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
                <img src='${data.image}'>
            </a>
            <div class="system-name"><a>${data.systemName}</a></div>
        </div>
        `
    });

    container.innerHTML = html;

}