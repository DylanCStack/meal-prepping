import React from 'react';
import HOCForm from './HOCForm';
import ControlledText from '../inputs/ControlledText';

class RecipeForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(property, event) {
    let newState = this.state;
    newState[property] = event.target.value;
    this.setState(newState);
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
        <ControlledText value={this.state.title} handleChange={this.handleChange} property='title'/></label>
        <input type='submit' value='Submit' disabled={this.state.title===''? true : false}/>
      </form>
    );
  }
}

export default HOCForm(RecipeForm);