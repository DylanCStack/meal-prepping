import React, { Component } from 'react';
import axios from 'axios';
import './styles/App.css';

import Home from './components/Home';
import IngredientList from './components/IngredientList';
import IngredientForm from './components/forms/IngredientForm';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/forms/RecipeForm';

import {Route, Switch, Link} from 'react-router-dom';
import NavAuth from './components/NavAuth';

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
      <div className="">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/recipes/new">Add a recipe</Link>
          <Link to="/recipes">View recipes</Link>
          <input type="text" placeholder="Search"/>
          <NavAuth/>
        </nav>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/recipes" render={props => <RecipeList {...props} recipes={this.state.recipes}/>}/>
          <Route exact path="/recipes/new" render={ props => <RecipeForm {...props} createRecipe={this.createRecipe}/>}/>
          {/* <Route exact path="/recipe/" component={Recipe}/> */}
        </Switch>
        <footer>

        </footer>
      </div>
    );
  }
}

export default App;