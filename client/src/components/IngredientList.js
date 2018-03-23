import React from 'react';

export class IngredientList extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.ingredients.map((ingredient, i)=>{
          return <p key={i}>{ingredient.name}</p>;
        })}
      </React.Fragment>
    );
  }
}