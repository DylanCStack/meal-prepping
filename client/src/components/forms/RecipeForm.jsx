import React from 'react';
import HOCForm from './HOCForm';
import TextInput from '../forms/inputs/TextInput';
import IngredientInput from '../forms/inputs/IngredientInput';

class RecipeForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
    }

    this.handleChange = this.props.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.createRecipe(this.state);
    this.setState({
      title: '',
    });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label> Title
        <TextInput value={this.state.title} handleChange={this.handleChange} property='title'/></label>
        <IngredientInput/>
        <input type='submit' value='Submit' disabled={this.state.title===''? true : false}/>
      </form>
    );
  }
}

export default HOCForm(RecipeForm);