

let currentPageUrl = 'https://swapi.dev/api/films/'

window.onload = async () => {
    try{
        await loadFilms(currentPageUrl)
    } catch(error) {
        console.log(error)
        alert ('Erro ao carrgar cards')
    }
}

async function loadFilms(url) {
   const mainContent = document.getElementById('main-content')
   mainContent.innerHTML = ''
        
   try{
        const response = await fetch(url)
        const responseJson = await response.json()

        responseJson.results.forEach((movies) => {
            const card = document.createElement('div')
            card.className = 'cards'
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/films/${movies.url.replace(/\D/g, "")}.jpg')`

            const movieNameBG = document.createElement('div')
            movieNameBG.className = 'character-name-bg'

            const movieName = document.createElement('span')
            movieName.className = 'character-name'
            movieName.innerText = `${movies.title}`

            mainContent.appendChild(card);
            card.appendChild(movieNameBG);
            movieNameBG.appendChild(movieName);

            card.onclick = () => {
                const modal = document.getElementById('modal')
                modal.style.visibility = 'visible'

                const modalContent = document.getElementById('modal-content')
                modalContent.innerHTML = ''

                const releaseDate = document.createElement('span')
                releaseDate.className = 'character-details'
                releaseDate.innerText = `data de lancamento: ${formatData(movies.release_date)}`

                const episode = document.createElement('span')
                episode.className = 'character-details'
                episode.innerText = `episodio: ${movies.episode_id}`

                const director = document.createElement('span')
                director.className = 'character-details'
                director.innerText = `diretor: ${movies.director}`

                const sinopse = document.createElement('span')
                sinopse.className = 'film-details'
                sinopse.innerText = `${movies.opening_crawl}`

                modalContent.appendChild(releaseDate)
                modalContent.appendChild(episode)
                modalContent.appendChild(director)
                modalContent.appendChild(sinopse)
            }
        })
   
        const load = document.getElementById('loader-circle')

        load.style.display = responseJson.results? 'none' : 'flex' 

    } catch(error) {
        console.log(error)
        alert ('Erro ao carregar filmes')
    }
}

function hideModal() {
    const modal = document.getElementById('modal')
    modal.style.visibility = 'hidden'
}

function formatData(releaseDate) {
    const data = releaseDate
    const newData = data.split('-').reverse().join('/')

    return newData
}