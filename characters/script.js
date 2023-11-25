let currentPageUrl = 'https://swapi.dev/api/people/'


window.onload = async () => {
    try{
        await loadCharacters(currentPageUrl)
    } catch(error) {
        console.log(error);
        alert('Erro ao carregar cards')
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')
    
    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
};

async function loadCharacters(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''; // limpar os resultados anteriores
    

    try {

        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach(async (character) => {
            const card = document.createElement('div')
            card.className = 'cards'
            let urlImg = `https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg`
            const resposta = await fetch(urlImg)
            if(resposta.status == '404'){
                urlImg = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'
            }
            card.style.backgroundImage = `url('${urlImg}')`

            const characterNameBG = document.createElement('div')
            characterNameBG.className = 'character-name-bg'

            const characterName = document.createElement('span')
            characterName.className = 'character-name'
            characterName.innerText = `${character.name}`

            characterNameBG.appendChild(characterName)
            card.appendChild(characterNameBG)

            card.onclick = async () => {
                const modal = document.getElementById('modal')
                modal.style.visibility = 'visible'

                const modalContent = document.getElementById('modal-content')
                modalContent.innerHTML = ''

                const characterImage = document.createElement('div')
                characterImage.className = 'character-image'
                let urlImg = `https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg`
                const resposta = await fetch(urlImg)
                if(resposta.status == '404'){
                urlImg = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'
                }
                characterImage.style.backgroundImage = `url('${urlImg}')`

                const name = document.createElement('span')
                name.className = 'character-details'
                name.innerText = `Nome: ${character.name}`

                const characterheight = document.createElement('span')
                characterheight.className = 'character-details'
                characterheight.innerText = `Altura: ${convertHeight(character.height)}`

                const mass = document.createElement('span')
                mass.className = 'character-details'
                mass.innerText = `Peso: ${convertMass(character.mass)}`

                const eyeColor = document.createElement('span')
                eyeColor.className = 'character-details'
                eyeColor.innerText = `Cor dos olhos: ${convertEyeColor(character.eye_color)}`

                const birthYear = document.createElement('span')
                birthYear.className = 'character-details'
                birthYear.innerText = `Nascimento: ${convertBirthYear(character.birth_year)}`

                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(characterheight)
                modalContent.appendChild(mass)
                modalContent.appendChild(eyeColor)
                modalContent.appendChild(birthYear)
            }

            mainContent.appendChild(card)
        });

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
        alert('Erro ao carregar os personagens')
        console.log(error)
    }
}

async function loadNextPage() {
    if(!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)

    } catch(error) {
        console.log(error)
        alert('Erro ao carregar a próxima página')
    }
}

async function loadPreviousPage() {
    if(!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.previous)

    } catch(error) {
        console.log(error)
        alert('Erro ao carregar a página anterior')
    }
}

function hideModal() {
    const modal = document.getElementById('modal')
    modal.style.visibility = 'hidden'
}

function convertEyeColor(eyeColor) {
    const cores = {
        blue: 'azul',
        brown: 'castanho',
        green: 'verde',
        yellow: 'amarelo',
        black: 'preto',
        pink: 'rosa',
        red: 'vermelho',
        orange: 'laranja',
        hazel: 'avela',
        'blue-gray': 'cinza azulado',
        unknown: 'desconhecida',
    };

    return cores[eyeColor.toLowerCase()] || eyeColor;
}

function convertHeight(height) {
    if(height === 'unknown') {
        return 'desconhecida'
    }

    return (height / 100).toFixed(2)
}

function convertMass(mass) {
    if(mass === 'unknown') {
        return 'desconhecido'
    }

    return `${mass} kg`
}

function convertBirthYear(birthYear) {
    if(birthYear === 'unknown') {
        return 'desconhecido'
    }

    return birthYear
}

