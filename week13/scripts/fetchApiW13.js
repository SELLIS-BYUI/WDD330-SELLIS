import { Pokemon, PokemonFlavorText} from './pokeClassesW13.js';
/* Storing the pokemon characteristics and flavor text into objects. Then 
storing into an array making it an array of objects. */
const pokemansList = [];
const pokemansFlavorText = [];

const getJsonPokemonData = () => {
    //getting all 251 pokemon and pokemonData
    for (let i = 1; i < 11; i++) {
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

                pokemansList.push(pokemonObject);
                // console.log(pokemonObject);
            });

        const flavorTextUrl = `https://pokeapi.co/api/v2/pokemon-species/${i}`;

        fetch(flavorTextUrl)
            .then(responseNumTwo => responseNumTwo.json())
            .then(pokemonDataTwo => {
                // create a pokemon info like flavor text and game version for each pokemon
                const pokemonObjectListText =
                new PokemonFlavorText(pokemonDataTwo.flavor_text_entries[0].flavor_text);

                pokemansFlavorText.push(pokemonObjectListText);
                // console.log(pokemonObjectListText);
            });
    }
    pokemansList.sort((a, b) => (a.id < b.id) ? 1 : -1);
    // console.log(pokemansFlavorText);
    console.log(pokemansList);
}



getJsonPokemonData();
// for (let i = 0; i < 0; i++) {
// let createListItems =  document.querySelector("#pokedex");
// // createListItems.innerHTML = '';
// pokemansList.forEach(Pokemon => { createListItems.innerHTML += 
//     `<li class="pokeAbilities">${Pokemon.name}</li>`;  
// })
// i++;
// }
