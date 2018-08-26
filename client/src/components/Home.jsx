import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="home">
        <h2>Things that will go here:</h2>
        <ul>
          <li>Recent/Featured Recipes</li>
          <li>Featured Ingredient(?) with some recipes</li>
        </ul>
      </div>
    );
  }
}