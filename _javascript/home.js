
// busca os dados do JSON
const fetchData = async (url) => {
    
    const data = await fetch(url);
    const json = await data.json();

    return json;
}

const loadSystems = async () => {

    const url = "../_utils/sistemas.json";
    const { systems } = await fetchData(url);

    const container = document.getElementById("systems-grid");

    let html = "";

    systems.forEach(data => {
        html += `
        <div class="system-card">
            <a href="menu.html">
                <img src='${data.image}'>
            </a>
            <div class="system-name"><a href="menu.html">${data.systemName}</a></div>
        </div>
        `
    });

    container.innerHTML = html;

}