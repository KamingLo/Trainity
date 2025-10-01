function Iframe(link){
    document.getElementById("video").innerHTML = `
        <iframe 
        id="youtube"
        src="https://www.youtube.com/embed/${link}" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
        </iframe>
    `;
}

function renderIframe(link){
    document.getElementById("youtube").setAttribute(
        "src", 
        `https://www.youtube.com/embed/${link}`
    );
}