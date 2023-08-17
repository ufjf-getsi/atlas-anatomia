const loadSystems = async () => {

    const url = "../_utils/sistemas.json";
    const { systems } = await fetchData(url);

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