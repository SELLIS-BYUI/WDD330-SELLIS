import { Pokemon } from './pokeClassesW13.js';
/* Storing the pokemon characteristics and flavor text into objects. Then 
storing into an array making it an array of objects. */
let pokemansList = [];

// So that we have a way to paginate
let page = 0;
let startingPosition = 1;
const prevBtn = document.querySelector('#previousBtn');
const nextBtn = document.querySelector('#nextBtn');
const revealPokeDetails = document.querySelector('#pokedexList');
const closeModalBtn = document.querySelector('#closeBtn');
const favBtnLocalStorage = document.querySelector('#favBtn');
// const favPokemonModal = document.querySelector('#allFilterBtn');

const getJsonPokemonData = (startingPosition) => {
    pokemansList = [];
    // Getting all pokemon and pokemonData currently known
    for (let i = startingPosition, j = 0; i < startingPosition + 9; i++, j++) {
        /* URLS, one for getting all pokemon with name, id, sprite
        and the second for getting pokemon flavor/descript info and the
        game their from */
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;

        fetch(url)
            .then(response => response.json())
            .then(pokeData => { 
                // For when we need types and some pokemon have two others one
                const pokeTypes = [];
                let id = j;

                pokeTypes.push(pokeData.types[0].type.name);
                if (typeof pokeData.types[1] !== 'undefined') {
                    pokeTypes.push(pokeData.types[1].type.name);
                }

                // Create a new pokemon with properties for main screen
                const pokemonObject = new Pokemon(pokeData.name, id, pokeData.id,
                    pokeData.sprites.front_default, pokeTypes);

                    const flavorTextUrl = `https://pokeapi.co/api/v2/pokemon-species/${i}`;

        fetch(flavorTextUrl)
            .then(responseNumTwo => responseNumTwo.json())
            .then(pokemonDataTwo => {
                // Create a pokemon info like flavor text and game version for each pokemon
                pokemonObject.captureRate = pokemonDataTwo.capture_rate;
                pokemonObject.eggGroup = pokemonDataTwo.egg_groups[0].name;
                pokemonObject.pokemonText = pokemonDataTwo.flavor_text_entries[0].flavor_text;
                pokemonObject.pokeSpeciesDetail = pokemonDataTwo.genera[7].genus;
                pokemansList.push(pokemonObject);
                // Sorting the pokemon in order by there id
                pokemansList.sort((a, b) => (a.id > b.id) ? 1 : -1);
                
            });
        }); 
    }
    
    return new Promise(fetch => {
        setTimeout(() => {
           fetch('fetched');
        }, 3000);
   }); 
}

// Will allow have 9 per a page
const paginationOfList = async () => {
    await getJsonPokemonData(startingPosition);
    let pokedexList = document.getElementById("pokedexList");

    // Reseting
    pokedexList.innerHTML = '';

    for (var i = 0, j = 0; i < page + 9; i++, j++) {
        let pokes = document.createElement("li");
        pokes.setAttribute('id', `${[j]}`);
        pokes.setAttribute('class', 'stylePokemonListItem');
       
        // Creating HTML and pokemon info
        pokes.innerHTML = `
        <img class="PokeSpritesCss"src="${pokemansList[i].sprite}">
        <h1 class="PokeName">${pokemansList[i].number}.` + " " + `${pokemansList[i].name}</h1>
        <p class="PokeTypes">Type: ${pokemansList[i].types}</p>`;
        pokedexList.appendChild(pokes);
    } 
}

// Makes our modal and the modal background appear by adding active to class
const revealModal = () => {
    let addActiveToModal = document.querySelector('.pokedexEntryContainer');
    let addActiveToBackground = document.querySelector('.backgroundModal');
    
    addActiveToModal.classList.add('class', 'active');
    addActiveToBackground.classList.add('class','active');
}

// Makes our modal and the modal background disappear by removing active from class
const hideModal = () => {
    let removeActiveModal = document.querySelector('.pokedexEntryContainer');
    let removeActiveBackground = document.querySelector('.backgroundModal');
    
    removeActiveModal.classList.remove('class', 'active');
    removeActiveBackground.classList.remove('class', 'active');
}

const pokemonModalDetails = (e) => {
    console.log(e.target);
    let modalInfo = document.getElementById('modalBody');
    let bodyInfo = document.createElement('div');
    // Creating HTML and pokemon info
    // want to pull out the id for selected
    let pokemonId = parseInt(e.target.id); 
    // console.log(e);
    let pokemonInfoNeeded = pokemansList.find(li => li.id === pokemonId);
    
    modalInfo.innerHTML = '';

    revealModal(); // calls out modal to activate

    // generates our modal information based on pokemon selected 
    bodyInfo.innerHTML = 
    `<img class="spriteAlign" src="${pokemonInfoNeeded.sprite}">
     </div>
     <p class="pokeId" hidden>${pokemonInfoNeeded.number}</p> 
     <p class="pokeNumber" hidden>${pokemonInfoNeeded.id}</p>
     <h1 class="pokeName">Pokemon: ${pokemonInfoNeeded.name}</h1>
     <p class="pokeSpecies">Species: The ${pokemonInfoNeeded.pokeSpeciesDetail}</p>
     <p class="pokeTypes"> Detail: A ${pokemonInfoNeeded.types} type</p>
     <p class="pokeText">Description: ${pokemonInfoNeeded.pokemonText}</p>
     <p class="pokeGroup">Egg group: ${pokemonInfoNeeded.eggGroup}</p>
     <p class="captureRate">Capture rate: ${pokemonInfoNeeded.captureRate}</p>
     </div>`

    console.log(pokemonInfoNeeded);
    // console.log(pokemansList);
    modalInfo.appendChild(bodyInfo);
}

// loads the next page or pokemon
 const nextPageOfPokes = async () => {
    startingPosition += 9;
    paginationOfList(startingPosition);
}

// loads the previous page of pokemon
 const prevPageOfPokes = async () => {
    startingPosition -= 9;
    paginationOfList(startingPosition);
}

const favoriteBtn = () => {
    // getting the data from the modal of the pokemon you liked is added to localStorage
    let spriteData = document.getElementsByClassName("spriteAlign")[0].src;
    let pokemanId = document.getElementsByClassName("pokeId")[0].innerHTML;
    let pokemanNumber = document.getElementsByClassName("pokeNumber")[0].innerHTML;
    let pokemanName = document.getElementsByClassName("pokeName")[0].innerHTML;
    let pokemanSpecies = document.getElementsByClassName("pokeSpecies")[0].innerHTML;
    let pokemanTypes = document.getElementsByClassName("pokeTypes")[0].innerHTML;
    let pokemanText = document.getElementsByClassName("pokeText")[0].innerHTML;
    let pokemanGroup = document.getElementsByClassName("pokeGroup")[0].innerHTML;
    let pokemanCapRate = document.getElementsByClassName("captureRate")[0].innerHTML;

    // using my class from my pokeClasses
    let pokemon = new Pokemon(pokemanName, pokemanId, pokemanNumber, spriteData, pokemanTypes,
            pokemanCapRate, pokemanGroup, pokemanText, pokemanSpecies);
    
    pokemon.setIsLiked = true;

    localStorage.setItem(pokemanName, JSON.stringify(pokemon));
    console.log(JSON.parse(localStorage.getItem(pokemanName)));
    alert("Pokemon Added!"); // send alert to user that its been "liked"
}


revealPokeDetails.addEventListener('click', pokemonModalDetails);
nextBtn.addEventListener('click', nextPageOfPokes);
prevBtn.addEventListener('click', prevPageOfPokes);
closeModalBtn.addEventListener('click', hideModal);
favBtnLocalStorage.addEventListener('click', favoriteBtn);
// favPokemonModal.addEventListener('click', favListModal);
paginationOfList(startingPosition);
// console.log(pokemansList);


