import { Pokemon } from './pokeClassesW13.js';
/* Storing the pokemon characteristics and flavor text into objects. Then 
storing into an array making it an array of objects. */
var pokemansList = new Array();

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

// Will allow have 15 per a page
const paginationOfList = async () => {
    const result = await getJsonPokemonData();
    let pokedexList = document.getElementById("pokedexList");

    for (var i = 0; i < 151; i++ ) {
        let pokes = document.createElement("LI");
        pokes.setAttribute('class', 'stylePokemonListItem');
        
        pokes.innerHTML = `<img src="${pokemansList[i].sprite}">
        <h1 class="PokeName">${pokemansList[i].id}. ${pokemansList[i].name}</h1>
        <p class="PokeTypes">Type: ${pokemansList[i].types}</p>`;

        pokedexList.appendChild(pokes);

    }
}

paginationOfList();
