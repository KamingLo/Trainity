function renderDetail(data, title){
    const detail = document.getElementById("courses-detail");
    detail.innerHTML = `
        <h2>${title}</h3>
        <p>${data.description}</p>
    `;
}