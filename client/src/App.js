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
    this.createEntity('/api/ingredients/add', 'ingredients', ingredient);
  }
  deleteIngredient(e, id) {
    this.deleteEntity('/api/ingredients/delete', 'ingredients', id);
  }
  createRecipe(recipe) {
    this.createEntity('/api/recipes/add', 'recipes', recipe);
  }
  deleteRecipe(e, id) {
    this.deleteEntity('/api/recipes/delete', 'recipes', id);
  }
  createEntity(endpoint, property, entity) {
    axios.post(endpoint, entity)
      .then(res => {
        let list = this.state[property];
        list.push(entity);
        let newState = this.state;

        newState[property] = list
        this.setState(newState);
      }).catch(err => {
        console.log(err);
    });
  }
  deleteEntity(endpoint, property, id) {
    axios.post(endpoint, {
        id
      }).then(res => {
        let newList = this.state[property].filter( entity => {
          return entity._id !== res.data.id;
        })

        let newState = this.state;
        newState[property] = newList;
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