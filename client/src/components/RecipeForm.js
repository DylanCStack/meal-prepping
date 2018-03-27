import React from 'react';

export class RecipeForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      title: event.target.value
    });
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
        <input type='text' value={this.state.title} onChange={this.handleChange}/></label>
        <input type='submit' value='Submit' disabled={this.state.title===''? true : false}/>
      </form>
    );
  }
}