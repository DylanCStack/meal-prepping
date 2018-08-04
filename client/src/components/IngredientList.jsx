import React from 'react';
import ButtonInput from './forms/inputs/ButtonInput';

export default class IngredientList extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.ingredients.map((ingredient, i)=>{
          return (
            <div key={i}>
              <p>{ingredient.name}</p> <ButtonInput text="Delete" value={ingredient._id} handleClick={this.props.deleteIngredient}/>
            </div>
          )
        })}
      </React.Fragment>
    );
  }
}