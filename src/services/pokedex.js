import {Pokedex} from 'pokeapi-js-wrapper';


class PokedexService {
  constructor() {
    this.pokedex = new Pokedex({
      hostName: 'localhost:8000',
      cache: false
    });

  }

  getPokemonSpeciesCount() {
    if (!this.pokemonSpeciesCount) {
      this.pokemonSpeciesCount = this.pokedex.getPokemonSpeciesList()
        .then(response => response.count);
    }

    return this.pokemonSpeciesCount;
  }

  getEvolutionChainCount() {
    if (!this.evolutionChainCount) {
      this.evolutionChainCount = this.pokedex.getEvolutionChainsList()
        .then(response => response.count);
    }

    return this.evolutionChainCount;
  }

  getRoster(options) {
    if (!options.maxEvolutionsOnly) {
      return this.getNormalRoster();
    } else {
      return this.getMaxEvolutionsRoster();
    }
  }

  getNormalRoster() {
    return this.getPokemonSpeciesCount().then(count => {
      const ids = getRandomIds(count);
      return Promise.all(ids.map(id => this.getPokemon(id)));
    });
  }

  getMaxEvolutionsRoster() {
    return this.getEvolutionChainCount().then(count => {
      const ids = getRandomIds(count);
      return Promise.all(ids.map(id => this.pokedex.getEvolutionChainById(id)))
    })
    .then(evolutionChains => {
      const speciesNames = evolutionChains
        .map(evolutionChain => getMaxEvolutions(evolutionChain))
        .map(maxEvolutions => selectRandomIndex(maxEvolutions));

      return Promise.all(speciesNames.map(name => this.getPokemon(name)));
    })
  }

  getPokemon(id) {
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

function getMaxEvolutions(evolutionChain) {
  return traverseEvolutions(evolutionChain.chain);
}

function traverseEvolutions(chainLink, maxEvolutions = []) {
  if (chainLink.evolves_to.length === 0) {
    maxEvolutions.push(chainLink.species.name);
  }

  chainLink.evolves_to.forEach(evolution => {
    traverseEvolutions(evolution, maxEvolutions);
  });

  return maxEvolutions;
}

function selectRandomIndex(array) {
  if (array.length === 1) {
    return array[0];
  }

  return array[randomIntegerBetween(0, array.length - 1)];
}

function getRandomIds(max) {
  const ids = [];

  for(let i = 0; i < 6; i++) {
    ids.push(randomIntegerBetween(1, max));
  }

  return ids;
}

function randomIntegerBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default PokedexService
