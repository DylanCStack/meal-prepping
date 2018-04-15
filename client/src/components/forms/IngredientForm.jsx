import React from 'react';
import HOCForm from './HOCForm';
import TextInput from './inputs/TextInput';

class IngredientForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    }

    this.handleChange = this.props.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.createIngredient(this.state);
    this.setState({
      name: '',
    });
  }
  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <label> Name
          <TextInput value={this.state.name} handleChange={this.handleChange} property='name'/>
        </label>
        <input type='submit' value="Submit" disabled={this.state.name===''? true : false} />
      </form>
    );
  }
}

export default HOCForm(IngredientForm);