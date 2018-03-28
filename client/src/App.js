import React, { Component } from 'react';
import axios from 'axios';
import './styles/App.css';

import { IngredientList } from './components/IngredientList.js';
import { IngredientForm } from './components/IngredientForm.js';
import { RecipeList } from './components/RecipeList.js';
import { RecipeForm } from './components/RecipeForm.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      recipes: [],
    }

    this.createIngredient = this.createIngredient.bind(this);
    this.createRecipe = this.createRecipe.bind(this);
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
    axios.post('/api/ingredients/add', {
        name: ingredient.name
      })
      .then(res => {

      }).catch(err => {
        console.log(err);
      });
    this.setState({
      ingredients
    });
  }
  createRecipe(recipe) {
    let recipes = this.state.recipes;

    recipes.push(recipe);
    axios.post('/api/recipie', {
        title: recipe.title
      })
      .then(res => {

      }).catch(err => {
        console.log(err);
    });
    this.setState({
      recipes
    });
  }
  render() {
    return (
      <div className="App">
        <h1>Home</h1>
        <div className='ingredient-container'>
          <IngredientForm createIngredient={this.createIngredient}/>
          <IngredientList ingredients={this.state.ingredients}/>
        </div>
        <div className='recipie-container'>
          <RecipeForm createRecipe={this.createRecipe}/>
          <RecipeList recipes={this.state.recipes}/>
        </div>
      </div>
    );
  }
}

export default App;