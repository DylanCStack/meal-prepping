import React from 'react';

export default function HOCForm(WrappedForm) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    handleChange(property, event) {
      let newState = this.state;
      newState[property] = event.target.value;
      this.setState(newState);
    }

    render() {
      return (
        <WrappedForm {...this.state} {...this.props} handleChange={this.handleChange}/>
      )
    }
  }
}