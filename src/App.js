import React, { Component } from 'react';
import './App.css';

import Roster from './components/roster';
import PokedexService from './services/pokedex';

class App extends Component {
  constructor() {
    super();

    this.state = {
      roster: []
    };

    this.pokedex = new PokedexService();
    this.getNewRoster = this.getNewRoster.bind(this);
    this.getNewRoster();
  }

  getNewRoster() {
    this.setState({
      roster: []
    });

    this.pokedex.getRoster()
      .then(roster => {
        this.setState({roster});
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Pokémon Random Team Generator</h1>
        </header>
        <Roster pokemon={this.state.roster}></Roster>
        <button onClick={this.getNewRoster}>Reroll</button>
      </div>
    );
  }
}

export default App;
