import React, { Component } from 'react';
import './styles/App.css';

import { IngredientList } from './components/IngredientList.js';
import { IngredientForm } from './components/IngredientForm.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
    }

    this.addIngredient = this.addIngredient.bind(this);
  }
  addIngredient(ingredient) {
    let ingredients = this.state.ingredients;

    ingredients.push(ingredient);
    this.setState({
      ingredients
    });
  }
  render() {
    return (
      <div className="App">
        <h1>Home</h1>
        <IngredientForm createIngredient={this.addIngredient}/>
        <IngredientList ingredients={this.state.ingredients}/>
      </div>
    );
  }
}

export default App;