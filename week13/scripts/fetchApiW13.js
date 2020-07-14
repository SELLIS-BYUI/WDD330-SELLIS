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

const getJsonPokemonData = (startingPosition) => {
    pokemansList = [];
    // Getting all pokemon and pokemonData currently known
    for (let i = startingPosition, j = 0; i < startingPosition + 12; i++, j++) {
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
        }, 2000);
   }); 
}

// Will allow have 15 per a page
const paginationOfList = async () => {
    await getJsonPokemonData(startingPosition);
    let pokedexList = document.getElementById("pokedexList");

    // Reseting
    pokedexList.innerHTML = '';

    for (var i = 0, j = 0; i < page + 12; i++, j++) {
        let pokes = document.createElement("LI");
        pokes.setAttribute('id', `${[j]}`);
        pokes.setAttribute('class', 'stylePokemonListItem');
        // pokes.setAttribute('type', 'button');
        // Creating HTML and pokemon info
        pokes.innerHTML = `
        <img src="${pokemansList[i].sprite}">
        <h1 class="PokeName">${pokemansList[i].number}.` + " " + `${pokemansList[i].name}</h1>
        <p class="PokeTypes">Type: ${pokemansList[i].types}</p>`;
        pokedexList.appendChild(pokes);
    } 
}

const pokemonModalDetails = (e) => {
    let modalInfo = document.getElementById('modalBody');
    let bodyInfo = document.createElement('div');
    // Creating HTML and pokemon info
    // want to pull out the id for selected
    let selectedPokemon = e.target.id; 
    
    let pokemonInfoNeeded = pokemansList.find(li => li.id !== selectedPokemon);
    
    modalInfo.innerHTML = '';

    bodyInfo.innerHTML = 
    `<img class="spriteAlign" src="${pokemonInfoNeeded.sprite}">
     </div>
     <h1 class="pokeName">Pokemon Info: ${pokemonInfoNeeded.number}.${pokemonInfoNeeded.name}</h1>
     <p class="pokeTypes">Types: ${pokemonInfoNeeded.types}</p>
     <p class="pokeText">Description: ${pokemonInfoNeeded.pokemonText}</p>
     <p class="pokeSpecies">Species: ${pokemonInfoNeeded.pokeSpeciesDetail}</p>
     <p class="pokeGroup">Egg group: ${pokemonInfoNeeded.eggGroup}</p>
     <p class="captureRate">Capture rate: ${pokemonInfoNeeded.captureRate}</p>
     </div>`



    console.log(pokemonInfoNeeded);
    console.log(pokemansList);
    modalInfo.appendChild(bodyInfo);
}


// loads the next page or pokemon
 const nextPageOfPokes = async () => {
    startingPosition += 12;
    paginationOfList(startingPosition);
}

// loads the previous page of pokemon
 const prevPageOfPokes = async () => {
    startingPosition -= 12;
    paginationOfList(startingPosition);
}


revealPokeDetails.addEventListener('click', pokemonModalDetails);
nextBtn.addEventListener('click', nextPageOfPokes);
prevBtn.addEventListener('click', prevPageOfPokes);
paginationOfList(startingPosition);


