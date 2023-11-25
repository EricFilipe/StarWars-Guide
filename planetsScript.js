let currentPageUrl = 'https://swapi.dev/api/planets'

window.onload = async () => {
    try{
        await loadPlanets(currentPageUrl)
    } catch(error) {
        console.log(error)
        alert('Erro ao carregar cards')
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
}

async function loadPlanets(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML= ''

    try{
        const response = await fetch(url)
        const responseJson = await response.json()

        responseJson.results.forEach(async (planets) => {
            const card = document.createElement('div')
            card.className = 'cards-planets'
            let urlImg = `https://starwars-visualguide.com/assets/img/planets/${planets.url.replace(/\D/g, "")}.jpg`
            const resposta = await fetch(urlImg)
            if(resposta.status == '404'){
                urlImg = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'
            }
            card.style.backgroundImage = `url('${urlImg}')`

            const planetNameBG = document.createElement('div')
            planetNameBG.className = 'character-name-bg'

            const planetName = document.createElement('span')
            planetName.className = 'character-name'
            planetName.innerText = `${planets.name}`

            planetNameBG.appendChild(planetName)
            card.appendChild(planetNameBG)

            card.onclick = async () => {
                const modal = document.getElementById('modal')
                modal.style.visibility = 'visible'

                const modalContent = document.getElementById('modal-content')
                modalContent.innerHTML = ''

                const planetImage = document.createElement('div')
                planetImage.className = 'character-image'
                let urlImg = `https://starwars-visualguide.com/assets/img/planets/${planets.url.replace(/\D/g, "")}.jpg`
                const resposta = await fetch(urlImg)
                if(resposta.status == '404'){
                urlImg = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'
                }
                planetImage.style.backgroundImage = `url('${urlImg}')`

               const name = document.createElement('span')
               name.className = 'character-details'
               name.innerText = `nome: ${planets.name}`

               const population = document.createElement('span')
               population.className = 'character-details'
               population.innerText = `populacao: ${convertPopulation(planets.population)}`

               const terrain = document.createElement('span')
               terrain.className = 'character-details'
               terrain.innerText = `terreno: ${convertTerrain(planets.terrain)}`

               const climate = document.createElement('span')
               climate.className = 'character-details'
               climate.innerText = `clima: ${convertClimate(planets.climate)}`

               const surfaceWater = document.createElement('span')
               surfaceWater.className = 'character-details'
               surfaceWater.innerText = `superficie de agua: ${convertSurface(planets.surface_water)}`

               const diameter = document.createElement('span')
               diameter.className = 'character-details'
               diameter.innerText = `diametro: ${convertDiameter(planets.diameter)}`

               const rotationPeriod = document.createElement('span')
               rotationPeriod.className = 'character-details'
               rotationPeriod.innerText = `periodo de rotacao: ${convertRotaion(planets.rotation_period)}`

               const orbitalPeriod = document.createElement('span')
               orbitalPeriod.className = 'character-details'
               orbitalPeriod.innerText = `periodo orbital: ${convertOrbital(planets.orbital_period)}`

               modalContent.appendChild(planetImage)
               modalContent.appendChild(name)
               modalContent.appendChild(population)
               modalContent.appendChild(terrain)
               modalContent.appendChild(climate)
               modalContent.appendChild(surfaceWater)
               modalContent.appendChild(diameter)
               modalContent.appendChild(rotationPeriod)
               modalContent.appendChild(orbitalPeriod)
            }

            mainContent.appendChild(card)
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
        alert('Error ao carregar os planetas')
    }
}

async function loadNextPage() {
    if(!currentPageUrl) return;

    try{
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadPlanets(responseJson.next)
    } catch(error) {
        console.log(error)
        alert('Erro aop carregar a próxima página')
    }
}

async function loadPreviousPage() {
    if(!currentPageUrl) return;

    try{
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadPlanets(responseJson.previous)
    } catch(error) {
        console.log(error)
        alert('Erro aop carregar a página anterior')
    }
}

function hideModal() {
    const modal = document.getElementById('modal')
    modal.style.visibility = 'hidden'
}

function convertPopulation(population) {
    if(population === 'unknown'){
        return 'desconhecida'
    }
    if(population >= 1000 && population <= 999999){
        return `${(population / 1000).toFixed(3)} mi l`
    }
    if(population >= 1000000 && population <= 999999999){
        return `${(population / 1000000).toFixed(1)} mi lhoes`
    }
    if(population >= 1000000000 && population <= 999999999999){
        return `${(population / 1000000000).toFixed(1)} bi lhoes`
    }
    if(population >= 1000000000000){
        return `${(population / 1000000000000).toFixed(1)} tri lhao`
    }
}

function convertRotaion(rotationPeriod) {
    if(rotationPeriod === 'unknown'){
        return 'desconhecido'
    }

    return `${rotationPeriod} dias`
}

function convertOrbital(orbitalPeriod) {
    if(orbitalPeriod === 'unknown'){
        return 'desconhecido'
    }

    return `${orbitalPeriod} dias`
}

function convertDiameter(diameter) {
    if(diameter === 'unknown'){
        return 'desconhecido'
    }

    return `${(diameter / 1000).toFixed(3)} km`
}

function convertSurface(surfaceWater) {
    if(surfaceWater === 'unknown'){
        return 'desconhecida'
    }

    return `${surfaceWater}%`
}

function convertTerrain(terrain) {
    const terrenos = {
        desert: 'deserto',
        'grasslands, mountains': 'pastagens, montanhas',
        'jungle, rainforests' : 'selva, floretas tropicais',
        'tundra, ice caves, mountain ranges': 'tundra, cavernas de gelo, cadeia de montanhas',
        'swamp, jungles': 'pantano, selva',
        'gas giant': 'gigante gasoso',
        'forests, mountains, lakes': 'florestas, montanhas, lagos',
        'grassy hills, swamps, forests, mountains': 'colinas gramadas, pantano, florestas, montanhas',
        'cityscape, mountains': 'paisagem urbana, montanhas',
        ocean: ' oceano',
        'rock, desert, mountain, barren': 'rochoso, deserto, montanhas, arido',
        'scrublands, savanna, canyons, sinkholes': 'matagais, savanas, desfiladeiro, buracos',
        'volcanoes, lava rivers, mountains, caves': 'vulcoes, rios de lava, montanhas, cavernas',
        'jungle, forests, lakes, rivers': 'selva, florestas, lagos, rios',
        'airless asteroid': 'asteroide sem ar',
        'glaciers, mountains, ice canyons': 'geleiras, montanhas, desfiladeiros de gelo',
        'fungus forests': 'florestas de fungos',
        'mountains, fields, forests, rock arches': 'montanhas, campos, florestas, arcos rochosos',
        'caves, desert, mountains, volcanoes': 'cavernas, deserto, montanhas, vulcanos',
        grass: 'grama',
        cityscape: 'paisagem urbana',
        'plains, urban, hills, forests': 'planicies, urbano, colinas, floresta',
        'jungles, oceans, urban, swamps': 'selvas, oceanos, urbano, pantanos',
        'urban, oceans, swamps, bogs': 'urbano, oceanos, pantanos',
        'oceans, savannas, mountains, grasslands': 'oceanos, savanas, montanhas, pastagens',
        'rocky islands, oceans': 'ilhas rochosas, oceanos',
        'plains, seas, mesas': 'planicies, mares',
        'mountains, seas, grasslands, deserts': 'montanhas, mares, pastagens, desertos',
        'deserts, mountains': 'desertos, montanhas',
        unknown: 'desconhecido'
    }

    return terrenos[terrain.toLowerCase()] || terrain
}

function convertClimate(climate) {
    const clima = {
        'temperate, moist': 'temperado, umido',
        'hot, humid': 'quente, umido',
        'artificial temperate ': 'temperado artificial',
        'temperate, arid, windy': 'temperado, arido, ventoso',
        'temperate, arid': 'temperado, arido',
        'temperate, tropical': 'temperado, tropical',
        frigid: 'gelado',
        tropical: 'tropical',
        hot: 'quente',
        arid: 'arido',
        temperate: 'temperado',
        frozen: 'congelado',
        murky: 'escuro',
        polluted: 'poluido',
        unknown: 'desconhecido'
    }

    return clima[climate.toLowerCase()] || climate
}

function convertImage(planets) {
    if(planets.url === 'unknown') return '2'
}