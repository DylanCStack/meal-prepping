import React from 'react';
import axios from 'axios';
import _ from 'lodash';

import HOCForm from '../HOCForm';
import SelectInput from './SelectInput';
import TextInput from './TextInput';
import NumberInput from './NumberInput';

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
      activeQuantity: 0,
      suggestions: [],
      suggestionFocus: 0,
      showSuggestions: true,
      ingredients: [],
    };
    this.handleChange = this.props.handleChange.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleFocus = this.handleFocus.bind(this);

    this.addIngredient = this.addIngredient.bind(this);
    this.remvoeIngredient = this.removeIngredient.bind(this);
    this.fetchSuggestions = _.debounce(this.fetchSuggestions.bind(this), 200);
    this.handleSuggestions = this.handleSuggestions.bind(this);

    this.renderIngredients = this.renderIngredients.bind(this);
    this.renderSuggestions = this.renderSuggestions.bind(this);
  }
  handleName(property, e) {
    this.handleChange(property, e);

    this.fetchSuggestions();
  }
  handleFocus(bool, e) {
    this.setState({showSuggestions: bool});
  }
  fetchSuggestions() {
    axios.get(`/api/ingredients/suggestions?i=${this.state.activeInput}`)
      .then(res => {
        this.setState({suggestions: res.data.suggestions});
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleSuggestions(e) {
    let newState = this.state;
    let focus = this.state.suggestionFocus;
    const suggestions = this.state.suggestions;

    switch(e.key) {
      case 'ArrowUp':// move focus up by one
        newState.suggestionFocus = (focus-1+suggestions.length)%suggestions.length;
        break;

      case 'ArrowDown':// move focus down by one
        newState.suggestionFocus = (focus+1)%suggestions.length;
        break;

      case 'Enter':// add selected suggestion to recipe
        e.preventDefault();// prevent form from submitting
        this.setState({activeInput: suggestions[focus]});
        this.addIngredient();
        break;

      default:
        break;
    }
    this.setState(newState);
  }
  addIngredient() {
    let newState = this.state;

    let newIngredient = {
      name: this.state.activeInput,
      quantity: this.state.activeQuantity,
      unit: this.state.selectedUnit,
    };
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
    const options = this.state.unitOptions;
    const unit = this.state.selectedUnit;

    return (
      <div className='ingredientInput'>
        <div className='ingredients'>
          {this.renderIngredients()}
        </div>
        <div className='nameInput'>
          <label>Add ingredient:
          <TextInput value={this.state.activeInput} handleChange={this.handleName} events={{onKeyDown: this.handleSuggestions, blur: this.handleFocus}} property='activeInput'/></label>
          {this.renderSuggestions()}
        </div>
        <NumberInput value={this.state.activeQuantity} handleChange={this.handleChange} property='activeQuantity' step={'0.1'}/>
        <SelectInput value={unit} options={options} handleChange={this.handleChange} property='selectedUnit'/>
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
  renderSuggestions() {
    const suggestions = this.state.suggestions;
    const focus = this.state.suggestionFocus;
    let output;

    if (suggestions.length !== 0 && this.state.showSuggestions) {
      output = (// TODO add click handler to add suggestion to recipe
        <div className='suggestions'>{suggestions.map((suggestion, i) => {
            return (
              <div className={'suggestion' + ((i === focus) ? ' active' : '')} key={i} onMouseEnter={() => this.setState({suggestionFocus: i})}>
                <p>{suggestion.name}</p>
                <input type='hidden' value={suggestion.id}/>
              </div>
            )
          })}
        </div>
      )
    }
    return output
  }
}

export default HOCForm(IngredientInput);// inherits handleChange from HOCForm, will likely inherit handleSubmit once available. 