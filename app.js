var API_KEY = 'c4aaac25f9ce481d8843e8afe6e574cb';
const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');
const default_source = 'the-washington-post';

window.addEventListener("load", async e => {
    updateNews();
    await updateSource();
    sourceSelector.value = default_source;

    sourceSelector.addEventListener('change', e => {
        updateNews(e.target.value);
    })

    if ('serviceWorker' in navigator) {
        try {   
            navigator.serviceWorker.register('sw.js'); 
            console.log('SW registered');
        } catch(error) {
            console.log('SW reg failed');
        }
    }
});

async function updateSource() {
    const resp = await fetch('https://newsapi.org/v1/sources');
    const json = await resp.json();
    sourceSelector.innerHTML = json.sources.map(src=>`<option value="${src.id}">${src.name}</option>`).join('\n');
}

async function updateNews(source=default_source) {
    const resp = await fetch(`https://newsapi.org/v2/everything?q=${source}&from=2018-10-19&sortBy=publishedAt&apiKey=`+API_KEY);
    const json = await resp.json();

    main.innerHTML = json.articles.map(createArticle).join('\n');
}

function createArticle(article) {
    return `
        <div class="article">
            <a href="${article.url}">
                <h2>${article.title}</h2>
                <img src="${article.urlToImage}">
                <p>${article.description}</p>
            </a>
        </div>
    `;
}
