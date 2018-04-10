import React, { Component } from 'react';
import './App.css';

import Roster from './components/roster';
import Options from './components/options';
import PokedexService from './services/pokedex';

class App extends Component {
  constructor() {
    super();

    this.state = {
      options: {
        maxEvolutionsOnly: true
      },
      roster: []
    };

    this.pokedex = new PokedexService();
    this.getNewRoster = this.getNewRoster.bind(this);
    this.changeOptions = this.changeOptions.bind(this);
    this.getNewRoster();
  }

  getNewRoster() {
    this.setState({
      roster: []
    });

    this.pokedex.getRoster(this.state.options)
      .then(roster => {
        this.setState({roster});
      });
  }

  changeOptions(name, value) {
    this.setState(prevState => ({
      options: Object.assign(prevState.options, {[name]: value})
    }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Pokémon Random Team Generator</h1>
        </header>
        <Roster pokemon={this.state.roster}></Roster>
        <button onClick={this.getNewRoster}>Reroll</button>
        <Options initialState={this.state.options} onChange={this.changeOptions}></Options>
      </div>
    );
  }
}

export default App;
