import React, { Component } from 'react';
import './pokemon.css';

class Pokemon extends Component {
  render() {
    if (this.props.data === null) {
      return (
        <div className="pokemon-placeholder">
          <div className="pokemon-placeholder-sprite">?</div>
          <h1 className="pokemon-placeholder-name">...</h1>
        </div>
      );
    }

    const {name, sprite} = this.props.data;

    return (
      <div className="pokemon">
        <img className="pokemon-sprite" src={sprite} alt=""></img>
        <h1 className="pokemon-name">{name}</h1>
      </div>
    );
  }
}

export default Pokemon;
