import React from 'react';
import ControlledSelect from './inputs/ControlledSelect';
import ControlledText from './inputs/ControlledText';

export class IngredientForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
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
    this.props.createIngredient(this.state);
    this.setState({
      name: '',
    });
  }
  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <label> Name
          <ControlledText value={this.state.name} handleChange={this.handleChange} property='name'/>
        </label>
        <input type='submit' value="Submit" disabled={this.state.name===''? true : false} />
      </form>
    );
  }
}