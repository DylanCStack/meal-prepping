import React, { Component } from 'react';
import axios from 'axios';
import './styles/App.css';

import IngredientList from './components/IngredientList';
import IngredientForm from './components/forms/IngredientForm';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/forms/RecipeForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      recipes: [],
    }

    this.createIngredient = this.createIngredient.bind(this);
    this.deleteIngredient = this.deleteIngredient.bind(this);

    this.createRecipe = this.createRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }
  componentDidMount() {
    axios.get('/api/ingredients')
      .then(res => {
        
        this.setState({ingredients: res.data.ingredients})
      }).catch(err => {
        console.log(err);
      });
    axios.get('/api/recipes')
      .then(res => {
        
        this.setState({recipes: res.data.recipes})
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
  deleteIngredient(e, id) {
    axios.post('/api/ingredients/delete', {
        id
      }).then(res => {
        let newIngredients = this.state.ingredients.filter( ingredient => {
          return ingredient._id !== res.data.id;
        })
        
        let newState = this.state;
        newState['ingredients'] = newIngredients;
        this.setState(newState);
      }).catch(err => {
        console.log(err);
      });
  }
  createRecipe(recipe) {
    let recipes = this.state.recipes;

    recipes.push(recipe);
    axios.post('/api/recipes/add', {
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
  deleteRecipe(e, id) {
    axios.post('/api/recipes/delete', {
        id
      }).then(res => {
        console.log(res);
        let newRecipes = this.state.recipes.filter( ingredient => {
          return ingredient._id !== res.data.id;
        })
        
        let newState = this.state;
        newState['recipes'] = newRecipes;
        this.setState(newState);
      }).catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="App">
        <h1>Home</h1>
        <div className='ingredient-container'>
          <IngredientForm createIngredient={this.createIngredient}/>
          <IngredientList ingredients={this.state.ingredients} deleteIngredient={this.deleteIngredient}/>
        </div>
        <div className='recipe-container'>
          <RecipeForm createRecipe={this.createRecipe}/>
          <RecipeList recipes={this.state.recipes} deleteRecipe={this.deleteRecipe}/>
        </div>
      </div>
    );
  }
}

export default App;