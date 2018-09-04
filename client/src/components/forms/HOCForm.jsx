import React from 'react';

export default function HOCForm(WrappedForm) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    handleChange(value, property, index) {
      let newState = this.state;
      if(index) {
        newState[property][index] = value;
      } else {
        newState[property] = value;
      }
      newState[property] = value;
      this.setState(newState);
    }

    render() {
      return (
        <WrappedForm {...this.state} {...this.props} handleChange={this.handleChange}/>
      )
    }
  }
}