function renderDetail(data, title){
    const detail = document.getElementById("courses-detail");
    console.log(title);
    detail.innerHTML = `
        <h2>${title}</h3>
        <p>${data.description}</p>
    `;
}