import { Pokemon } from './pokeClassesW13.js';
/* Storing the pokemon characteristics and flavor text into objects. Then 
storing into an array making it an array of objects. */
let pokemansList = new Array();
// So that we have a way to paginate
let page = 0;
const prevBtn = document.querySelector('#previousBtn');
const nextBtn = document.querySelector('#nextBtn');

const getJsonPokemonData = () => {
    //getting all 251 pokemon and pokemonData
    for (let i = 1; i < 152; i++) {
        /* URLS one for getting all 251 pokemon with name, id, sprite
        and the second for getting pokemon flavor/descript info and the
        game their from */
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;

        fetch(url)
            .then(response => response.json())
            .then(pokeData => { 
                
                const pokeTypes = [];

                pokeTypes.push(pokeData.types[0].type.name);
                if (typeof pokeData.types[1] !== 'undefined') {
                    pokeTypes.push(pokeData.types[1].type.name);
                }
                // create a new pokemon with properties for main screen
                const pokemonObject = new Pokemon(pokeData.name, pokeData.id, 
                    pokeData.sprites.front_default, pokeTypes);

                    const flavorTextUrl = `https://pokeapi.co/api/v2/pokemon-species/${i}`;

        fetch(flavorTextUrl)
            .then(responseNumTwo => responseNumTwo.json())
            .then(pokemonDataTwo => {
                // create a pokemon info like flavor text and game version for each pokemon
                pokemonObject.pokemonText = pokemonDataTwo.flavor_text_entries[0].flavor_text;
                pokemansList.push(pokemonObject);
                console.log(pokemonObject);
            });
               
        }); 
    }
   pokemansList.sort((a, b) => (a.id < b.id) ? 1 : -1);
   return new Promise(fetch => {
       setTimeout(() => {
           fetch('fetched');
       }, 4000);
   }); 
}

// Will allow have 9 per a page
const paginationOfList = async () => {
    const result = await getJsonPokemonData();
    let pokedexList = document.getElementById("pokedexList");

    for (var i = 0; i < page + 9; i++) {
        let pokes = document.createElement("LI");
        pokes.setAttribute('class', 'stylePokemonListItem');
        
        pokes.innerHTML = `<img src="${pokemansList[i].sprite}">
        <h1 class="PokeName">${pokemansList[i].id}. ${pokemansList[i].name}</h1>
        <p class="PokeTypes">Type: ${pokemansList[i].types}</p>`;

        pokedexList.appendChild(pokes);
    }
}

nextBtn.addEventListener('click', nextPageOfPokes)
async function nextPageOfPokes() {
    // const result = await getJsonPokemonData();
    // if (page == pokemansList.length - 10) {
    //     page = 0;
    // } 
    // else page+=10;
    // pokedexList.innerHTML = '';
    // for (let i = page; i < page + 10; i++) {
    //     pokedexList.appendChild(pokemansList[i]);
    // }
}
paginationOfList();
