const proxyBase = "nodejs-serverless-function-express-12usq6vcg.vercel.app/api/";

async function search() {
    const searchTerm = document.getElementById('searchInput').value;
    const response = await fetch(`${proxyBase}/search?query=${encodeURIComponent(searchTerm)}`);
    const data = await response.json();

    const results = document.getElementById('results');
    results.innerHTML = '';

    data.results.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.title;
        li.style.cursor = 'pointer';
        li.onclick = () => playAudio(item.audioUrl);
        results.appendChild(li);
    });
}

function playAudio(url) {
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = url;
    audioPlayer.play();
}