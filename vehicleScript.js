let currentPageUrl = 'https://swapi.dev/api/vehicles/'

window.onload = async () => {
    try{
        await loadVehicles(currentPageUrl)
    } catch(error) {
        console.log(error)
        alert ('Erro ao carregar cards')
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
}

async function loadVehicles(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''

    try{
        const response = await fetch(url)
        const responseJson = await response.json()

        responseJson.results.forEach(async (vehicles) => {
            const card = document.createElement('div')
            card.className = 'cards'
            let urlImg = `https://starwars-visualguide.com/assets/img/vehicles/${vehicles.url.replace(/\D/g, "")}.jpg`
            const resposta = await fetch(urlImg)
            if(resposta.status == '404') {
                urlImg = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'
            }
            card.style.backgroundImage = `url(${urlImg})`

            const nameBg = document.createElement('div')
            nameBg.className = 'character-name-bg'
            
            const vehicleName = document.createElement('span')
            vehicleName.className = 'character-name'
            vehicleName.innerText = `${vehicles.name}`

            mainContent.appendChild(card);
            card.appendChild(nameBg);
            nameBg.appendChild(vehicleName);

            card.onclick = async () => {
                const modal = document.getElementById('modal')
                modal.style.visibility = 'visible'

                const modalContent = document.getElementById('modal-content')
                modalContent.innerHTML = ''

                const vehicleImage = document.createElement('div')
                vehicleImage.className = 'character-image'
                let urlImg = `https://starwars-visualguide.com/assets/img/vehicles/${vehicles.url.replace(/\D/g, "")}.jpg`
                const resposta = await fetch(urlImg)
                if(resposta.status == '404') {
                    urlImg = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'
                }
                vehicleImage.style.backgroundImage = `url(${urlImg})`

                const name = document.createElement('span')
                name.className = 'character-details'
                name.innerText = `nome: ${vehicles.name}`

                const model = document.createElement('span')
                model.className = 'character-details'
                model.innerText = `modelo: ${vehicles.model}`

                const cost = document.createElement('span')
                cost.className = 'character-details'
                cost.innerText = `custo: ${convertCost(vehicles.cost_in_credits)}`

                const length = document.createElement('span')
                length.className = 'character-details'
                length.innerText = `tamanho: ${convertLength(vehicles.length)}`

                const speed = document.createElement('span')
                speed.className = 'character-details'
                speed.innerText = `velocidade: ${convertSpeed(vehicles.max_atmosphering_speed)}`

                const crew = document.createElement('span')
                crew.className = 'character-details'
                crew.innerText = `equipe: ${vehicles.crew}`

                const passengers = document.createElement('span')
                passengers.className = 'character-details'
                passengers.innerText = `passageiros: ${convertPassengers(vehicles.passengers)}`

                const vehicleClass = document.createElement('span')
                vehicleClass.className = 'character-details'
                vehicleClass.innerText = `classe: ${vehicles.vehicle_class}`

                modalContent.appendChild(vehicleImage)
                modalContent.appendChild(name)
                modalContent.appendChild(model)
                modalContent.appendChild(cost)
                modalContent.appendChild(length)
                modalContent.appendChild(speed)
                modalContent.appendChild(crew)
                modalContent.appendChild(passengers)
                modalContent.appendChild(vehicleClass)
                
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

        loadVehicles(responseJson.next)
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

        loadVehicles(responseJson.previous)
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
   
    return `${(cost / 1000).toFixed(3)} creditos`
}

function convertLength(length) {
    if(length === 'unknown'){
        return 'desconhecido'
    }

    return `${length}m`
}

function convertSpeed(speed) {
    if(speed === 'unknown'){
        return 'desconhecida'
    }

    return `${speed} km/h`
}

function convertPassengers(passengers) {
    if(passengers === 'unknown'){
        return 'desconhecido'
    }

    return `${passengers}`
}