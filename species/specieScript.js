let currentPageUrl = 'https://swapi.dev/api/species/'

window.onload = async () => {
    try{
        await loadSpecies(currentPageUrl)
    } catch(error) {
        console.log(error)
        alert ('Erro ao carregar cards')
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
}

async function loadSpecies(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''

    try{
        const response = await fetch(url)
        const responseJson = await response.json()

        responseJson.results.forEach((species) => {
            const card = document.createElement('div')
            card.className = 'cards'
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/species/${species.url.replace(/\D/g, "")}.jpg')`

            const nameBg = document.createElement('div')
            nameBg.className = 'character-name-bg'
            
            const specieName = document.createElement('span')
            specieName.className = 'character-name'
            specieName.innerText = `${convertName(species.name)}`

            mainContent.appendChild(card);
            card.appendChild(nameBg);
            nameBg.appendChild(specieName);

            card.onclick = async () => {
                const modal = document.getElementById('modal')
                modal.style.visibility = 'visible'

                const modalContent = document.getElementById('modal-content')
                modalContent.innerHTML = ''

                const specieImage = document.createElement('div')
                specieImage.className = 'character-image'
                specieImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/species/${species.url.replace(/\D/g, "")}.jpg')`

                const name = document.createElement('span')
                name.className = 'character-details'
                name.innerText = `especie: ${convertName(species.name)}`

                const classification = document.createElement('span')
                classification.className = 'character-details'
                classification.innerText = `classificacao: ${convertClassification(species.classification)}`

                const avaregeHeight = document.createElement('span')
                avaregeHeight.className = 'character-details'
                avaregeHeight.innerText = `altura media: ${convertHeight(species.average_height)} m`

                const avaregeLife = document.createElement('span')
                avaregeLife.className = 'character-details'
                avaregeLife.innerText = `expectativa de vida: ${convertLife(species.average_lifespan)}`

                const language = document.createElement('span')
                language.className = 'character-details'
                language.innerText = `lingua: ${convertLanguage(species.language)}`

                modalContent.appendChild(specieImage)
                modalContent.appendChild(name)
                modalContent.appendChild(classification)
                modalContent.appendChild(avaregeHeight)
                modalContent.appendChild(avaregeLife)
                modalContent.appendChild(language)
            }
        })

        const load = document.getElementById('loader-circle')

        load.style.display = responseJson.results? 'none' : 'flex'
        
        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous

        nextButton.style.visibility = responseJson.next? 'visible' : 'hidden'
        backButton.style.visibility = responseJson.previous? 'visible' : 'hidden'

        currentPageUrl = url

    } catch(error) {
        console.log(error)
        alert ('Erro ao carregar especies')
    }
}

async function loadNextPage() {
    if(!currentPageUrl) return

    try{
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        loadSpecies(responseJson.next)
    } catch(error) {
        console.log(error)
        alert ('Erro ao carregar próxima página')
    }
}

async function loadPreviousPage() {
    if(!currentPageUrl) return

    try{
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        loadSpecies(responseJson.previous)
    } catch(error) {
        console.log(error)
        alert ('Erro ao carregar página anterior')
    }
}

function convertName(name) {
    const nome = {
        human: 'humano'
    }

    return nome[name.toLowerCase()] || name
}

function convertHeight(avaregeHeight) {
    if(avaregeHeight === 'unknown') {
        return 'desconhecida'
    }

    return (avaregeHeight / 100).toFixed(2)
}

function convertLanguage(language) {
    const lingua = {
        'galatic basic': 'galactico basico',
        unknown: 'desconhecida'
    }

    return lingua[language.toLowerCase()] || language
}

function convertClassification(classification) {
    const classificacoes = {
        mammal: 'mami fero',
        sentient: 'autoconsciente',
        gastropod: 'gastropode',
        reptile: 'reptil',
        amphibian: 'anfibio',
        unknown: 'desconhecida'
    }

    return classificacoes[classification.toLowerCase()] || classification
}

function convertLife(avaregeLife) {
    if(avaregeLife === 'unknown') {
        return 'desconhecida'
    }

    return `${avaregeLife} anos`
}

function hideModal() {
    const modal = document.getElementById('modal')
    modal.style.visibility = 'hidden'
}