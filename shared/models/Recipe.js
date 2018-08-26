export default class Recipe {
  constructor(name = '', hero = '', ingredients = []) {
    this.name = name;
    this.hero = hero;
    this.ingredients = ingredients;
    
    // scope 'steps' to be only available in class
    let _steps = [];

    // get scoped steps variable
    this.getSteps = () => {
      return _steps;
    }
    
    // Add new step to recipe object while retaining proper format. 
    this.addStep = (title, text, image, link) => {
      _steps.push({
        title, text, image, link
      });
    }

    this.removeStep = (index) => {
      _steps.splice(index, 1);
    }
  }

  // getter for scoped steps variable
  get steps() {
    return this.getSteps();
  }
}