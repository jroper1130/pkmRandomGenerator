import React, { Component } from 'react';
import Pokemon from '../pokemon';
import './roster.css'

class Roster extends Component {
  render() {
    let pokemon = Array(6).fill(null);

    if (this.props.pokemon.length > 0) {
      pokemon = this.props.pokemon;
    }

    const roster = pokemon.map((pokemon, index) => {
      return (<Pokemon key={index} data={pokemon}></Pokemon>);
    });

    return (
      <div className="roster">{roster}</div>
    );
  }
}

export default Roster;
