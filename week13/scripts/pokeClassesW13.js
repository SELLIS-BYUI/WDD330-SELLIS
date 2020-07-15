export class Pokemon { // For pokemon charcteristics and appearence
    constructor(pokeName, id, pokeId, pokeSprite, pokeTypes, captureRate, 
        eggGroup,pokemonText, pokeSpeciesDetail) {
        this.name = pokeName;
        this.id = id;
        this.number = pokeId;
        this.sprite = pokeSprite;
        this.types = pokeTypes;
        this.captureRate = captureRate;
        this.eggGroup = eggGroup;
        this.pokemonText = pokemonText;
        this.pokeSpeciesDetail = pokeSpeciesDetail;
        this.isLiked = false;
    }

    get getIsLiked() {
        return this.isLiked;
    }
    
    set setIsLiked(isLiked) {
        this.isLiked = isLiked;
    }
}

