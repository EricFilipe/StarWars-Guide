let currentPageUrl = 'https://swapi.dev/api/starships/'

window.onload = async () => {
    try{
       await loadShips(currentPageUrl)
    } catch(error) {
        console.log(error)
        alert ('Erro ao carregar cards')
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
}

async function loadShips(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''

    try{
        const response = await fetch(url)
        const responseJson = await response.json();

        responseJson.results.forEach(async (ships) => {
            const card = document.createElement('div')
            card.className = 'cards'
            let urlImg = `https://starwars-visualguide.com/assets/img/starships/${ships.url.replace(/\D/g, "")}.jpg`
            const resposta = await fetch(urlImg)
            if(resposta.status == '404'){
                urlImg = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'
            }
            card.style.backgroundImage = `url('${urlImg}')`

            const shipNameBG = document.createElement('div')
            shipNameBG.className = 'character-name-bg'

            const shipName = document.createElement('span')
            shipName.className = 'character-name'
            shipName.innerText = `${ships.name}`

            mainContent.appendChild(card)
            card.appendChild(shipNameBG)
            shipNameBG.appendChild(shipName)

            card.onclick = async () => {
                const modal = document.getElementById('modal')
                modal.style.visibility = 'visible'

                const modalContent = document.getElementById('modal-content')
                modalContent.innerHTML = ''

                const shipsImage = document.createElement('div')
                shipsImage.className = 'character-image'
                let urlImg = `https://starwars-visualguide.com/assets/img/starships/${ships.url.replace(/\D/g, "")}.jpg`
                const resposta = await fetch(urlImg)
                if(resposta.status == '404'){
                    urlImg = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'
                }
                shipsImage.style.backgroundImage = `url('${urlImg}')`

                const name = document.createElement('span')
                name.className = 'character-details'
                name.innerText = `nome: ${ships.name}`

                const model = document.createElement('span')
                model.className = 'character-details'
                model.innerText = `modelo: ${ships.model}`

                const cost = document.createElement('span')
                cost.className = 'character-details'
                cost.innerText = `custo: ${convertCost(ships.cost_in_credits)}`

                const length = document.createElement('span')
                length.className = 'character-details'
                length.innerText = `tamanho: ${convertLength(ships.length)}`

                const maxSpeed = document.createElement('span')
                maxSpeed.className = 'character-details'
                maxSpeed.innerText = `velocidade: ${convertSpeed(ships.max_atmosphering_speed)}`

                const crew = document.createElement('span')
                crew.className = 'character-details'
                crew.innerText = `equipe: ${ships.crew}`

                const passengers = document.createElement('span')
                passengers.className = 'character-details'
                passengers.innerText = `passageiros: ${convertPassengers(ships.passengers)}`

                const shipClass = document.createElement('span')
                shipClass.className = 'character-details'
                shipClass.innerText = `classe: ${ships.starship_class}`

                modalContent.appendChild(shipsImage)
                modalContent.appendChild(name)
                modalContent.appendChild(model)
                modalContent.appendChild(cost)
                modalContent.appendChild(length)
                modalContent.appendChild(maxSpeed)
                modalContent.appendChild(crew)
                modalContent.appendChild(passengers)
                modalContent.appendChild(shipClass)
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
        alert ('Erro ao carregar naves')
    }
}

async function loadNextPage() {
    if(!currentPageUrl) return;

    try{
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadShips(responseJson.next)
    } catch(error) {
        console.log(error)
        alert ('Erro ao carregar próxima página')
    }
}

async function loadPreviousPage() {
    if(!currentPageUrl) return;

    try{
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadShips(responseJson.previous)
    } catch(error) {
        console.log(error)
        alert ('Erro ao carregar página anterior')
    }
}


function hideModal() {
    const modal = document.getElementById('modal')
    modal.style.visibility = 'hidden'
}

function convertCost(cost) {
    if(cost === 'unknown'){
        return 'desconhecido'
    }
   
    return `${cost} creditos`
}

function convertLength(length) {
    if(length === 'unknown'){
        return 'desconhecido'
    }
    if(length >= 1000){
        return `${(length / 1000).toFixed(3)}m`
    }

    return `${length}m`
}

function convertSpeed(maxSpeed) {
    if(maxSpeed === 'unknown'){
        return 'desconhecida'
    }
    if(maxSpeed >= 1000){
        return `${(maxSpeed / 1000).toFixed(3)}km/h`
    }

    return `${maxSpeed}km/h`
}

function convertPassengers(passengers) {
    if(passengers === 'unknown'){
        return 'desconhecido'
    }

    return `${passengers}`
}