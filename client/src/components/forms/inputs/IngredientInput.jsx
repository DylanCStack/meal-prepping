import React from 'react';
import axios from 'axios';
import HOCForm from '../HOCForm';
import ControlledSelect from './ControlledSelect';
import ControlledText from './ControlledText';
import ControlledNumber from './ControlledNumber';

class IngredientInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUnit: '',
      unitOptions: [
        {
          value: 'ounce',
          displayName: 'Ounce(s)',
          symbol: 'oz',
        },
        {
          value: 'pound',
          displayName: 'Pound(s)',
          symbol: 'lb',
        },
        {
          value: 'gram',
          displayName: 'Gram(s)',
          symbol: 'g',
        },
        {
          value: 'kilogram',
          displayName: 'Kilogram(s)',
          symbol: 'kg',
        },
        {
          value: 'teaspoon',
          displayName: 'Teaspoon(s)',
          symbol: 'tsp',
        },
        {
          value: 'tablespoons',
          displayName: 'Tablespoon(s)',
          symbol: 'Tsp',
        },
        {
          value: 'fluidOunce',
          displayName: 'Fluid ounce(s)',
          symbol: 'fl.oz',
        },
        {
          value: 'cup',
          displayName: 'Cup(s)',
          symbol: '',
        },
        {
          value: 'pint',
          displayName: 'Pint(s)',
          symbol: 'pt',
        },
        {
          value: 'quart',
          displayName: 'Quart(s)',
          symbol: 'qt',
        },
        {
          value: 'gallon',
          displayName: 'Gallon(s)',
          symbol: 'gal',
        },
      ],
      activeInput: '',
      suggestions: [],
      ingredients: [],
    };
    this.handleChange = this.props.handleChange.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.remvoeIngredient = this.removeIngredient.bind(this);
    this.fetchSuggestions = this.fetchSuggestions.bind(this);
    this.renderIngredients = this.renderIngredients.bind(this);
  }
  fetchSuggestions() {
    axios.get('/api/ingredients/suggestions')
      .then(res => {
        this.setState({suggestions: res.data.suggestions});
      })
      .catch(err => {
        console.log(err);
      });
  }
  addIngredient(event) {
    event.preventDefault();
    let newState = this.state;

    let newIngredient = {
      name: this.state.activeInput,
      quantity: '',
      unit: this.state.selectedUnit,
    };
    if(this.state.ingredients.filter(ingredient => {debugger; return ingredient.name == newIngredient.name})){
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
    const options = this.state.unitOptions;
    const unit = this.state.selectedUnit;

    return (
      <div className='ingredientInput'>
        <div className='ingredients'>
          {this.renderIngredients()}
        </div>
        <ControlledText value={this.state.activeInput} handleChange={this.handleChange} property='activeInput'/>
        <ControlledNumber value={this.state.activeQuantty} handleChange={this.handleChange} property='activeQuantity'/>
        <ControlledSelect value={unit} options={options} handleChange={this.handleChange} property='selectedUnit'/>
        <input type='button' value='+' onClick={this.addIngredient}/>
      </div>
    )
  }
  renderIngredients() {
    const output = [];

    this.state.ingredients.forEach(ingredient => {
      output.push(
        <div className='ingredient' key={ingredient.name}>
          <p>{ingredient.name} {ingredient.quantity} {ingredient.unit}</p>
          <input type='button' value='-' onClick={this.removeIngredient.bind(this, ingredient)}/>
        </div>
      );
    });
    return output;
  }
}

export default HOCForm(IngredientInput);