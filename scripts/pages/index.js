import recipes from '../data/recipes.js';

const searchByTags = [];

function displayRecipes(recipes) {
  const recipesListSection = document.getElementById("recipes-list");
  const ustensilsList = [];
  const ingredientsList = [];
  const devicesList = [];

  // displayIngredientsListMenu(ingredientsList);
  // displayDevicesListMenu(devicesList);
  // displayUstensilsListMenu(ustensilsList);


  console.log(ustensilsList);

    recipes.forEach((recipe) => {
      const recipeModel = cookingListFactory(recipe);
      const recipeDOM = recipeModel.generateCookingList();
      recipesListSection.appendChild(recipeDOM);

      ustensilsList.push(recipe.ustensils);
      ingredientsList.push(recipe.ingredients.ingredient);
      devicesList.push(recipe.appliance);

      return recipe;
    });
}

displayRecipes(recipes);


function displayIngredientsListMenu(ingredientsList) {
  const sortByIngredient = document.getElementById("sortByIngredient");
  const ingredientList = document.createElement('ul');
  sortByIngredient.appendChild(ingredientList);
  
  ingredientsList.forEach((IngredientItem) => {
    const ingredientListItem = document.createElement('li');
    ingredientListItem.innerText = IngredientItem;
    ingredientList.appendChild(ingredientListItem);
  });
}

function displayDevicesListMenu(devicesList) {
  const sortByDevice = document.getElementById("sortByDevice");

}

function displayUstensilsListMenu(ustensilsList) {
  const sortByUstentsil = document.getElementById("sortByUstensil");

}


function searchRecipes(searchValue) {
  recipes.filter.apply(searchValue);
  // Todo plus il y a de lettres plus la rechercher s'affine 
}

function sortByIngredients() {
  // TODO rempli le tableau de tag
}

function sortByDevices() {

}

function sortByUstensils() {
  // TODO
}

function sortByTags() {

}