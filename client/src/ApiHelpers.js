import axios from 'axios';

export default class Api {
  constructor() {
    this.createIngredient = this.createIngredient.bind(this);
    this.deleteIngredient = this.deleteIngredient.bind(this);
    this.createRecipe = this.createRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }
  createIngredient (ingredient) {
    return this.createEntity('/api/ingredients/add', 'ingredients', ingredient);
  }

  deleteIngredient (e, id) {
    return this.deleteEntity('/api/ingredients/delete', 'ingredients', id);
  }
  
  createRecipe (recipe) {
    return this.createEntity('/api/recipes/add', 'recipes', recipe);
  }
  
  deleteRecipe (e, id) {
    return this.deleteEntity('/api/recipes/delete', 'recipes', id);
  }
  
  createEntity (endpoint, property, entity, success = ()=>{}, error = ()=>{}) {
    return axios.post(endpoint, entity)
      .then(res => {
        return success(property);
      }).catch(err => {
        console.log(err);
        return error(property, err);
    });
  }
  deleteEntity (endpoint, property, id, success = ()=>{}, error = ()=>{}) {
    return axios.post(endpoint, {
        id
      }).then(res => {
        return success(property, res);
      }).catch(err => {
        return error(property, err);
      });
  }
}