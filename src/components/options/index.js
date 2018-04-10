import React, { Component } from 'react';

class Options extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.props.onChange(name, value);
  }

  render() {
    return (
      <div className="options">
        <input
          name="maxEvolutionsOnly"
          type="checkbox"
          checked={this.props.initialState.maxEvolutionsOnly}
          onChange={this.onChange}
        />
        <label htmlFor="maxEvolutionsOnly">Max Evolutions Only</label>
      </div>
    );
  }
}

export default Options;
