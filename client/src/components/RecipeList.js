import React from 'react';

export class RecipeList extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <React.Fragment>
        {this.props.recipes.map((recipe, i)=>{
          return <p key={i}>{recipe.title}</p>;
        })}
      </React.Fragment>
    );
  }
}