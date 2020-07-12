import { Pokemon } from './pokeClassesW13.js';
import { onclickPokeman } from './favoritePokeW13.js';
/* Storing the pokemon characteristics and flavor text into objects. Then 
storing into an array making it an array of objects. */
let pokemansList = [];

// So that we have a way to paginate
let page = 0;
let lastPosition = 151;
let startingPosition = 1;
const prevBtn = document.querySelector('#previousBtn');
const nextBtn = document.querySelector('#nextBtn');
// const hidePokeDetails = document.querySelector('#');
// const revealPokeDetails = document.querySelector('#');

const getJsonPokemonData = (startingPosition) => {
    pokemansList = [];
    // Getting all pokemon and pokemonData currently known
    for (let i = startingPosition; i < startingPosition + 9; i++) {
        /* URLS, one for getting all pokemon with name, id, sprite
        and the second for getting pokemon flavor/descript info and the
        game their from */
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;

        fetch(url)
            .then(response => response.json())
            .then(pokeData => { 
                // For when we need types and some pokemon have two others one
                const pokeTypes = [];

                pokeTypes.push(pokeData.types[0].type.name);
                if (typeof pokeData.types[1] !== 'undefined') {
                    pokeTypes.push(pokeData.types[1].type.name);
                }

                // Create a new pokemon with properties for main screen
                const pokemonObject = new Pokemon(pokeData.name, pokeData.id, 
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
        }, 1350);
   }); 
}

// Will allow have 15 per a page
const paginationOfList = async () => {
    await getJsonPokemonData(startingPosition);
    let pokedexList = document.getElementById("pokedexList");

    // Reseting
    pokedexList.innerHTML = '';

    for (var i = 0; i < page + 9; i++) {
        let pokes = document.createElement("LI");
        pokes.setAttribute('class', 'stylePokemonListItem');
        // Creating HTML and pokemon info
        pokes.innerHTML = `<img src="${pokemansList[i].sprite}">
        <h1 class="PokeName">${pokemansList[i].id}.${pokemansList[i].name}</h1>
        <p class="PokeTypes">Type: ${pokemansList[i].types}</p>`;

        pokedexList.appendChild(pokes);
    } 
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


// hidePokeDetails.addEventListener('click', onclickPokeman);
nextBtn.addEventListener('click', nextPageOfPokes);
prevBtn.addEventListener('click', prevPageOfPokes);
paginationOfList(startingPosition);
// console.log(pokemansList);
