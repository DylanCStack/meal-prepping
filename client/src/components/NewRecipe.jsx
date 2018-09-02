import React from 'react';

import RecipeForm from './forms/RecipeForm';

export default function NewRecipe(props) {
  return (
    <div className="newRecipe">
      <RecipeForm handleSubmit={props.createRecipe}/>
    </div>
  );
}