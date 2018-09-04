import React from 'react';
import ButtonInput from './forms/inputs/ButtonInput';

export default function RecipeList() {
  return (
    <React.Fragment>
      {this.props.recipes.map((recipe, i)=>{
        return (
          <div key={i}>
            <p key={i}>{recipe.title}</p> <ButtonInput text='Delete' value={recipe._id} handleClick={this.props.deleteRecipe}/>
          </div>
        );
      })}
    </React.Fragment>
  );
}
