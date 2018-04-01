import {Pokedex} from 'pokeapi-js-wrapper';


class PokedexService {
  constructor() {
    this.pokedex = new Pokedex({
      protocol: 'https'
    });

    this.pokemonSpeciesCount = this.pokedex.getPokemonSpeciesList()
      .then(response => response.count);
  }

  getRoster(options) {
    return this.pokemonSpeciesCount.then(count => {
      const ids = [];

      for(let i = 0; i < 6; i++) {
        ids.push(randomIntegerBetween(1, count));
      }

      return Promise.all(ids.map(id => this.getPokemon(id, options)));
    });
  }

  getPokemon(id, options) {
    return this.pokedex.getPokemonSpeciesByName(id)
    .then(specie => {
      const defaultVariety = specie.varieties.find(variety => variety.is_default);
      const pokemonUrl = defaultVariety.pokemon.url;
      return Promise.all([
        specie,
        this.pokedex.resource(pokemonUrl)
      ]);
    })
    .then(([specie, pokemon]) => {
      const name = specie.names.find(name => name.language.name === "en").name;
      const sprite = pokemon.sprites.front_default;

      return {
        name,
        sprite
      }
    });
  }
}

function randomIntegerBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default PokedexService
