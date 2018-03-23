import React, { Component } from 'react';
import axios from 'axios';
import './styles/App.css';

import { IngredientList } from './components/IngredientList.js';
import { IngredientForm } from './components/IngredientForm.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
    }

    this.createIngredient = this.createIngredient.bind(this);
  }
  componentDidMount() {
    axios.get('/api/ingredients')
      .then(res => {
        
        this.setState({ingredients: res.data.ingredients})
      }).catch(err => {
        console.log(err);
      });
  }
  createIngredient(ingredient) {
    let ingredients = this.state.ingredients;

    ingredients.push(ingredient);
    axios.post('/api/ingredient', {
        name: ingredient.name
      })
      .then(res => {

      }).catch(err => {
        console.log(err);
      })
    this.setState({
      ingredients
    });
  }
  render() {
    return (
      <div className="App">
        <h1>Home</h1>
        <IngredientForm createIngredient={this.createIngredient}/>
        <IngredientList ingredients={this.state.ingredients}/>
      </div>
    );
  }
}

export default App;