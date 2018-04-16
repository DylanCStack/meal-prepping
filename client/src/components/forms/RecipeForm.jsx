import React from 'react';
import HOCForm from './HOCForm';
import TextInput from '../forms/inputs/TextInput';
import IngredientInput from '../forms/inputs/IngredientInput';

class RecipeForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      ingredients: [],
    }

    this.handleChange = this.props.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.addIngredient = this.addIngredient.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.createRecipe(this.state);
    this.setState({
      title: '',
    });
  }
  addIngredient(newIngredient) {
    let newState = this.state;

    if(this.state.ingredients.filter(ingredient => {return ingredient.name == newIngredient.name})){
      newState.ingredients.push(newIngredient);
      this.setState(newState);
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
        <TextInput value={this.state.title} handleChange={this.handleChange} property='title'/></label>
        <IngredientInput property='ingredients' ingredients={this.state.ingredients} addIngredient={this.addIngredient} removeIngredient={this.removeIngredient}/>
        <input type='submit' value='Submit' disabled={this.state.title===''? true : false}/>
      </form>
    );
  }
}

export default HOCForm(RecipeForm);