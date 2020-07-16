
const displayFavPokemon = () => {
   
    for (var i = 0; i < localStorage.length; i++) {
        var favPokemon = JSON.parse(localStorage.getItem(localStorage.key(i)));


        let createPokeList = document.createElement('li');
        let pokeList = document.getElementById('pokeList');
        createPokeList.setAttribute('class', 'id');
        createPokeList.setAttribute('class', 'stylePokemonListItem');

        createPokeList.innerHTML = 
        `<img class="spriteAlign" src="${favPokemon.sprite}">
        <p class="pokeId" hidden>${favPokemon.id}</p> 
        <p class="pokeNumber" hidden>${favPokemon.number}</p>
        <h1 class="pokeName">Pokemon: ${favPokemon.name}</h1>
        <p class="pokeSpecies">${favPokemon.pokeSpeciesDetail}</p>
        <p class="pokeTypes">${favPokemon.types} type</p>
        <p class="pokeText">${favPokemon.pokemonText}</p>
        <p class="pokeGroup">${favPokemon.eggGroup}</p>
        <p class="captureRate">${favPokemon.captureRate}</p>
        <button class="removeFavPoke" onclick="removePokeFromStorage(\`${favPokemon.name}\`)">REMOVE</button>`;

        pokeList.appendChild(createPokeList);
        console.log(favPokemon.sprite);
    }
}
const removePokeFromStorage = (pokemonName) => {
    localStorage.removeItem(pokemonName);
    location.reload();
}


displayFavPokemon();