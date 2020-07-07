export class Pokemon { // For pokemon charcteristics and appearence
    constructor(pokeName, pokeId, pokeSprite, pokeTypes) {
        this.name = pokeName;
        this.id = pokeId;
        this.sprite = pokeSprite;
        this.types = pokeTypes;
    }
}

export class PokemonFlavorText { // For pokemon info and game origin
    constructor(pokemonText) {
        this.flavorText = pokemonText;
    }
}