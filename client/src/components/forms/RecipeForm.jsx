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
      steps: [{
        short: '',
        long: ''
      }],
      ingredients: [],
    }

    this.handleChange = this.props.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSteps = this.handleSteps.bind(this);

    this.addStep = this.addStep.bind(this);
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

  handleSteps(text, property, index) {
    let step = this.state.steps[index];

    step[property] = text;
    this.handleChange(step, 'steps', index);
  }

  addStep() {
    let newState = this.state;
    newState.steps.push({short: '', long:''});
    this.setState(newState);
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
        <div className="recipeFormSteps">
          {
            this.state.steps.map((recipe, i) => {
              // establish input name values
              let shortName = `short-${i}`;
              let longName = `long-${i}`;
              return (
                <fieldset className="recipeFormStep" key={i}>
                  <legend>{`Step ${i+1}.`}</legend>
                  <label htmlFor={shortName}>Short description:</label>
                  <TextInput property="short" placeholder="Ex:" name={shortName} index={i} value={recipe.short} handleChange={this.handleSteps}/>
                  <label htmlFor={longName}>Long description:</label>
                  <textarea onChange={(e) => this.handleSteps(e.target.value, 'long', i)} name={longName}></textarea>
                </fieldset>
              );
            })
          }
          <input type="button" value="Add Step" onClick={this.addStep}/>
        </div>
        <input type='submit' value='Submit' disabled={this.state.title===''? true : false}/>
      </form>
    );
  }
}

export default HOCForm(RecipeForm);