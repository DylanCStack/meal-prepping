import React, { Component } from 'react';
import {Route, Switch, Link} from 'react-router-dom';

import './styles/App.css';
import Api from './ApiHelpers';

import Home from './components/Home';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import NewRecipe from './components/NewRecipe';
import NavAuth from './components/NavAuth';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }

    this.API = new Api();
  }

  componentDidMount() {

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
          <Route exact path="/recipes/new" render={ props => <NewRecipe {...props} createRecipe={this.API.createRecipe}/>}/>
          <Route exact path="/recipe/" render={ props => <RecipeDetail {...props} /> }/>
        </Switch>
        <footer>

        </footer>
      </div>
    );
  }
}

export default App;