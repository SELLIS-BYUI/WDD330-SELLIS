export class Pokemon { // For pokemon charcteristics and appearence
    constructor(pokeName, pokeId, pokeSprite, pokeTypes, captureRate, 
        eggGroup,pokemonText, pokeSpeciesDetail) {
        this.name = pokeName;
        this.id = pokeId;
        this.sprite = pokeSprite;
        this.types = pokeTypes;
        this.captureRate = captureRate;
        this.eggGroup = eggGroup;
        this.pokemonText = pokemonText;
        this.pokeSpeciesDetail = pokeSpeciesDetail;
    }
}
