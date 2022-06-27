import recipes from '../data/recipes.js';

//console.log(recipes)

function displayRecipes(recipes) {
  const recipesListSection = document.getElementById("recipes-list");

    recipes.forEach((recipe) => {
      console.log(recipe);
      const recipeModel = cookingListFactory(recipe);
      const recipeDOM = recipeModel.generateCookingList();
      recipesListSection.appendChild(recipeDOM);

      return recipe;
      
    });
}

displayRecipes(recipes);