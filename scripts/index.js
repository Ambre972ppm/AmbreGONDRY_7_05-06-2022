//--------------------------------------------------------------------------------------
// Import des recettes du fichier recipe.js
//--------------------------------------------------------------------------------------
import recipes from './data/recipes.js';

//--------------------------------------------------------------------------------------
// Fonction qui affiche les recettes
//--------------------------------------------------------------------------------------
function displayRecipes(recipes) {
console.log("displayRecipes")
  const recipesListSection = document.getElementById("recipes-list"); // conteneur de recette

  recipesListSection.innerHTML = ""; // reinitialisation des recette

   recipes.forEach((recipe) => {
      const recipeModel = recipeFactory(recipe);
      const recipeCard = recipeModel.generateRecipeCard();
      recipesListSection.appendChild(recipeCard);

      return recipe;
   });

   if (recipesListSection.innerHTML == "") {
      recipesListSection.innerHTML = `<span class="no-recipes"> Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc. </span>`
   }
   
   displayIngredients(recipes); // affichage des ingredients dans la liste d'ingredients
   displayAppliances(recipes); // affichage des appareils dans la liste d'appareil
   displayUstensils(recipes); // affichage des ustensiles dans la liste d'ustensiles
}

//--------------------------------------------------------------------------------------
// Fonction qui anime la flèche du menu déroulant qu'on ouvre
//--------------------------------------------------------------------------------------
function openDropDownMenu() {
  // console.log("openDropDownMenu")
   const filterMenus = document.querySelectorAll('.dropdown-toggle');

   filterMenus.forEach((menu) => { // on anime la flèche au clic
      menu.addEventListener("click", function (e) {
         let thisMenu = e.target;
         thisMenu.nextElementSibling.classList.toggle('is-open-icon');
      })
      menu.addEventListener("blur", function (e) { // on retire la classe lorsque le menu perd le focus
         let thisMenu = e.target;
         thisMenu.nextElementSibling.classList.remove('is-open-icon');
      })
   })
}


//--------------------------------------------------------------------------------------
// Fonction qui affiche la liste des ingredients dans le menu filtre des ingrédients
//--------------------------------------------------------------------------------------
function displayIngredients(recipes) {
  // console.log("displayIngredients")

   openDropDownMenu(); // animation de la flêche à l'ouverture du menu
   let ingredients = [];
   const ingredientsList = document.querySelector('.ingredients-list');
   ingredientsList.innerHTML = ``;

   recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
         ingredients.push(ingredient.ingredient.toLowerCase());
      });
   });
   const filteredIngredients = Array.from(new Set(ingredients)); // filtre les doublons du tableau

   filteredIngredients.forEach((ingredient) => {
      const ingredientLine = document.createElement('li');
      ingredientsList.appendChild(ingredientLine);

      const ingredientLink = document.createElement('a');
      ingredientLink.innerText = ingredient;
      ingredientLink.setAttribute('class', "dropdown-item ingredient-item");
      ingredientLink.setAttribute('href', "#");
      ingredientLine.appendChild(ingredientLink);
   });
}


//--------------------------------------------------------------------------------------
// Fonction qui affiche la liste des appareils dans le menu filtre des appareils
//--------------------------------------------------------------------------------------
function displayAppliances(recipes) {
  // console.log("displayAppliances")

   openDropDownMenu(); // animation de la flêche à l'ouverture du menu
   let appliances = [];
   const appliancesList = document.querySelector('.appliances-list');
   appliancesList.innerHTML = ``;

   recipes.forEach((recipe) => {
      appliances.push(recipe.appliance.toLowerCase())
   });
   const filteredAppliance = Array.from(new Set(appliances)); // filtre les doublons du tableau

   filteredAppliance.forEach((appliance) => {
      const applianceLine = document.createElement('li');
      appliancesList.appendChild(applianceLine);

      const applianceLink = document.createElement('a');
      applianceLink.innerText = appliance;
      applianceLink.setAttribute('class', "dropdown-item appliance-item");
      applianceLink.setAttribute('href', "#");
      applianceLine.appendChild(applianceLink);
   });
}


//--------------------------------------------------------------------------------------
// Fonction qui affiche la liste des ustensiles dans le menu des ustensiles
//--------------------------------------------------------------------------------------
function displayUstensils(recipes) {
  // console.log("displayUstensils")

   openDropDownMenu(); // animation de la flêche à l'ouverture du menu
   let ustensils = [];
   const ustensilsList = document.querySelector('.ustensils-list');
   ustensilsList.innerHTML = ``;

   recipes.forEach((recipe) => {
      recipe.ustensils.forEach((ustensil) => {
         ustensils.push(ustensil.toLowerCase());
      });
   });
   const filteredUstensiles = Array.from(new Set(ustensils)); // filtre les doublons du tableau

   filteredUstensiles.forEach((ustensil) => {
      const ustensilLine = document.createElement('li');
      ustensilsList.appendChild(ustensilLine);

      const ustensilLink = document.createElement('a');
      ustensilLink.innerText = ustensil;
      ustensilLink.setAttribute('class', "dropdown-item ustensil-item");
      ustensilLink.setAttribute('href', "#");
      ustensilLine.appendChild(ustensilLink);
   });
}


//--------------------------------------------------------------------------------------
// Fonction qui affiche les tags sous la barre de recherche
//--------------------------------------------------------------------------------------
function displayTags(tagsTable) {
  console.log("displayTags")

   const tagList = document.getElementById("tags");
   let selectedTag = document.createElement('span');
   selectedTag.classList.add('tag-selected', 'btn', 'm-3');

   let deleteTag = document.createElement('img');
   deleteTag.classList.add('delete-tag');
   deleteTag.classList.add('delete-tag-icon');
   deleteTag.setAttribute('src', './assets/icons/close_white.png');

   let recipesTable = [];
   let ingredientsTable = [];
   let appliancesTable = [];
   let ustensilsTable = [];

   recipes.forEach((recipe) => {
      recipesTable.push(recipe);
      ingredientsTable.push(recipe.ingredients);
      appliancesTable.push(recipe.appliance);
      ustensilsTable.push(recipe.ustensils);
   })

   tagList.appendChild(selectedTag);
   tagsTable.find((tagItem) => {
      selectedTag.textContent = tagItem;
   });
   selectedTag.appendChild(deleteTag);

   displayRecipeByTags(recipes, tagsTable);
   deleteSelectedTag(selectedTag, tagsTable);
}


//--------------------------------------------------------------------------------------
// fonction qui supprime le tag selectionné
//--------------------------------------------------------------------------------------
function deleteSelectedTag(selectedTag, tagsTable) {
  // console.log("deleteSelectedTag")

   const recipesListSection = document.getElementById("recipes-list");

   selectedTag.addEventListener('click', function (e) {
      e.target.remove();
      if (tagsTable.indexOf(e.target.textContent) > 0) {
         tagsTable.pop(e.target.textContent);
         displayRecipeByTags(recipes, tagsTable);
      } else {
         recipesListSection.innerHTML = "";
         tagsTable = [];
         displayRecipes(recipes);
      }
   })

}


//--------------------------------------------------------------------------------------
// Fonction manipulation des tags
//--------------------------------------------------------------------------------------
function handleTagItems() {
  const tagList = document.getElementById("tags");
  const ingredientsList = document.querySelector('.ingredients-list');
  const ustensilsList = document.querySelector('.ustensils-list');
  const appliancesList = document.querySelector('.appliances-list');

  let tagsTable = [];

    ingredientsList.addEventListener('click', function (e) {
      e.preventDefault();
      let tagItem = e.target.textContent;
      tagsTable.push(tagItem);
      displayTags(tagsTable);
      tagList.lastChild.classList.add('ingredient-tag'); // Bleu
    })

    appliancesList.addEventListener('click', function (e) {
      e.preventDefault();
      let tagItem = e.target.textContent;
      tagsTable.push(tagItem);
      displayTags(tagsTable);
      tagList.lastChild.classList.add('appliance-tag'); // Vert
    })

    ustensilsList.addEventListener('click', function (e) {
      e.preventDefault();
      let tagItem = e.target.textContent;
      tagsTable.push(tagItem);
      displayTags(tagsTable);
      tagList.lastChild.classList.add('ustensil-tag'); // Rouge
    })
}


//--------------------------------------------------------------------------------------
// Fonction qui affiche les recettes en fonction des tags
//--------------------------------------------------------------------------------------
function displayRecipeByTags(recipes, tagsTable) {
  // console.log("displayRecipeByTags")

   let allRecipes = [];
   let newRecipesList = [];
   const filteredRecipes = recipes.filter(item => item.name.toLowerCase().includes(tagsTable.find(tag => tag.toLowerCase())));
   const filteredIngredients = recipes.filter(item => item.ingredients.find(el => el.ingredient.toLowerCase().includes(tagsTable.find(tag => tag.toLowerCase()))));
   const filteredDescription = recipes.filter(item => item.description.toLowerCase().includes(tagsTable.find(tag => tag.toLowerCase())));
   const results = [...new Set([...filteredRecipes, ...filteredIngredients, ...filteredDescription])];
   newRecipesList = results;

   if (tagsTable.length > 0) {
      recipes = newRecipesList;
   } else {
      recipes = allRecipes;
   }

   displayRecipes(newRecipesList);
}


//--------------------------------------------------------------------------------------
// Recherche des tags à l'aide des barres de recherches des menu déroulants
//--------------------------------------------------------------------------------------
function searchTagsByFiltersListSearchBar() {
  // console.log("sortRecipesByFilters")

   const filterMenus = document.querySelectorAll('.dropdown-toggle');
   let newIngredientList = [];
   let newApplianceList = [];
   let newUstensilList = [];

   filterMenus.forEach(dropdown => {
      dropdown.onkeyup = function () {
         recipes.forEach(dropdownData => {
            dropdownData.ingredients.forEach(ingredient => {
               newIngredientList.push(ingredient.ingredient.toLowerCase());
            })
            dropdownData.ustensils.forEach(ustensil => {
               newUstensilList.push(ustensil.toLowerCase());
            });
            newApplianceList.push(dropdownData.appliance.toLowerCase());
         });

         findIngredientByFilterSearchBar(newIngredientList);
         findApplianceByFilterSearchBar(newApplianceList);
         findUstensilByFilterSearchBar(newUstensilList);
      }
   });
}


//--------------------------------------------------------------------------------------
// Recherche au clavier dans l'input des menus de filtres : Ingredients
//--------------------------------------------------------------------------------------
function findIngredientByFilterSearchBar(newIngredientList) {
  // console.log("findIngredientByFilterSearchBar")

   const ingredientsSearchBar = document.querySelector("#ingredients");
   const ingredientsList = document.querySelector('.ingredients-list');

   ingredientsSearchBar.addEventListener("input", e => {
      const ingredientsListToFilter = Array.from(new Set(newIngredientList));
      const searchValue = e.target.value.toLowerCase();

      if (searchValue.length < 3) {
         ingredientsList.innerHTML = "";
         displayIngredients(recipes);
      }
      const filteredIngredientsList = ingredientsListToFilter.filter(item => item.includes(searchValue.toLowerCase()));
      const results = [...new Set([...filteredIngredientsList])];

      if (searchValue.length > 2) {
         ingredientsList.innerHTML = "";
         results.forEach(ingredient => {
            const ingredientLine = document.createElement('li');
            ingredientsList.appendChild(ingredientLine);

            const ingredientLink = document.createElement('a');
            ingredientLink.innerText = ingredient;
            ingredientLink.setAttribute('class', "dropdown-item");
            ingredientLink.setAttribute('href', "#");
            ingredientLine.appendChild(ingredientLink);
         })
      }
   })
}


//--------------------------------------------------------------------------------------
// Recherche au clavier dans l'input des menus de filtres : Appareils
//--------------------------------------------------------------------------------------
function findApplianceByFilterSearchBar(newApplianceList) {
  // console.log("findApplianceByFilterSearchBar")

   const aplliancesSearchBar = document.querySelector("#appliances");
   const appliancesList = document.querySelector('.appliances-list');

   aplliancesSearchBar.addEventListener("input", e => {
      const appliancesListToFilter = Array.from(new Set(newApplianceList));
      const searchValue = e.target.value.toLowerCase();

      if (searchValue.length < 3) {
         appliancesList.innerHTML = "";
         displayAppliances(recipes);
      }
      const filteredAppliancesList = appliancesListToFilter.filter(item => item.includes(searchValue.toLowerCase()));
      const results = [...new Set([...filteredAppliancesList])];

      if (searchValue.length > 2) {
         appliancesList.innerHTML = "";
         results.forEach(appliance => {
            const applianceLine = document.createElement('li');
            appliancesList.appendChild(applianceLine);

            const applianceLink = document.createElement('a');
            applianceLink.innerText = appliance;
            applianceLink.setAttribute('class', "dropdown-item");
            applianceLink.setAttribute('href', "#");
            applianceLine.appendChild(applianceLink);
         })
      }
   })
}


//--------------------------------------------------------------------------------------
// Recherche au clavier dans l'input des menus de filtres : Ustensiles
//--------------------------------------------------------------------------------------
function findUstensilByFilterSearchBar(newUstensilList) {
  // console.log("findUstensilByFilterSearchBar")

   const ustensilsSearchBar = document.querySelector("#ustensils");
   const ustensilsList = document.querySelector('.ustensils-list');

   ustensilsSearchBar.addEventListener("input", e => {
      const ustensilsListToFilter = Array.from(new Set(newUstensilList));
      const searchValue = e.target.value.toLowerCase();

      if (searchValue.length < 3) {
         ustensilsList.innerHTML = "";
         displayUstensils(recipes);
      }
      const filteredUstensilsList = ustensilsListToFilter.filter(item => item.includes(searchValue.toLowerCase()));
      const results = [...new Set([...filteredUstensilsList])];

      if (searchValue.length > 2) {
         ustensilsList.innerHTML = "";
         results.forEach(ustensil => {
            const ustensilLine = document.createElement('li');
            ustensilsList.appendChild(ustensilLine);

            const ustensilLink = document.createElement('a');
            ustensilLink.innerText = ustensil;
            ustensilLink.setAttribute('class', "dropdown-item");
            ustensilLink.setAttribute('href', "#");
            ustensilLine.appendChild(ustensilLink);
         })
      }
   })
}


//--------------------------------------------------------------------------------------
// Recherche principale dans la barre de recherche
//--------------------------------------------------------------------------------------
function findRecipesBySearchBar(recipes) {
  // console.log("findRecipesBySearchBar")

   const recipesListSection = document.getElementById("recipes-list");
   const searchBar = document.querySelector("#search-bar");

   searchBar.addEventListener("input", e => {
      const searchValue = e.target.value.toLowerCase();

      if (searchValue.length < 3) {
         recipesListSection.innerHTML = "";
         displayRecipes(recipes);
      }
      const filteredByName = recipes.filter(recipe => recipe.name.toLowerCase().includes(searchValue.toLowerCase()));
      const filteredByIngredients = recipes.filter(recipe => recipe.ingredients.find(item => item.ingredient.toLowerCase().includes(searchValue.toLowerCase())));
      const filteredByDescription = recipes.filter(recipe => recipe.description.toLowerCase().includes(searchValue.toLowerCase()));
      const results = [...new Set([...filteredByName, ...filteredByIngredients, ...filteredByDescription])];

      if (searchValue.length > 2) {
         recipesListSection.innerHTML = "";
         displayRecipes(results);
      }
   })
}

function init() {
  displayRecipes(recipes);
  handleTagItems(); // manipulation des tags
  findRecipesBySearchBar(recipes);
  searchTagsByFiltersListSearchBar();
}

init();