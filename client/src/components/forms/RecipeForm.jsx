import React from 'react';
import HOCForm from './HOCForm';
import TextInput from '../forms/inputs/TextInput';
import IngredientInput from '../forms/inputs/IngredientInput';
import Recipe from '../../models/Recipe';

class RecipeForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      steps: [],
      ingredients: [],
    }

    this.handleChange = this.props.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.addIngredient = this.addIngredient.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
  }

  componentDidMount() {
    if (this.props.seedRecipe) {
      let newState = this.state;
      newState['steps'] = this.props.seedRecipe.steps;// Object.assign will not copy a getter method
      this.setState(Object.assign(newState, this.props.seedRecipe));
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.state);
    this.setState({
      title: '',
    });
  }
  
  addIngredient(newIngredient) {
    let newState = this.state;

    let duplicates = this.state.ingredients.filter(ingredient => ingredient.name == newIngredient.name);
    if(duplicates.length == 0){
      newState.ingredients.push(newIngredient);
    this.setState(newState);
    } else {
      console.log('You cannot add the same ingredient more than once');
    }
  }

  removeIngredient(ingredientToRemove) {
    let newState = this.state;
    newState.ingredients = this.state.ingredients.filter(ingredient => ingredient != ingredientToRemove);
    this.setState(newState);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label> Title
        <TextInput value={this.state.name} handleChange={this.handleChange} property='name'/></label>
        <IngredientInput property='ingredients' ingredients={this.state.ingredients} addIngredient={this.addIngredient} removeIngredient={this.removeIngredient}/>
        <input type='submit' value='Submit' disabled={this.state.title===''? true : false}/>
      </form>
    );
  }
}

export default HOCForm(RecipeForm);