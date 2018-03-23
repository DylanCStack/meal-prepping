import React from 'react';

export class IngredientForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({name: event.target.value});
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
          <input type='text' value={this.state.name} onChange={this.handleChange}/>
        </label>
        <input type='submit' value="Submit"/>
      </form>
    );
  }
}