 // Import des recettes du fichier recipe.js
import recipes from './data/recipes.js';

// Fonction qui affiche le resultat de recherche
function displayRecipes(recipes) {
   const recipesListSection = document.getElementById("recipes-list");
   recipesListSection.innerHTML = "";

   recipes.forEach((recipe) => {
      const recipeModel = recipeFactory(recipe);
      const recipeCard = recipeModel.generateRecipeCard();
      recipesListSection.appendChild(recipeCard);

      return recipe;
   });

   if (recipesListSection.innerHTML == "") {
      recipesListSection.innerHTML = `<span class="no-recipes"> Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc. </span>`
   }
}

 // Fonction qui anime la flèche du menu déroulant qu'on ouvre
function openDropDownMenu() {
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

 // Fonction qui affiche la liste des ingredients dans le menu filtre des ingrédients
function displayIngredients(recipes) {
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
      ingredientLink.setAttribute('class', "dropdown-item");
      ingredientLink.setAttribute('href', "#");
      ingredientLine.appendChild(ingredientLink);
   });
}

// Fonction qui affiche la liste des appareils dans le menu filtre des appareils
function displayAppliances(recipes) { 
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
      applianceLink.setAttribute('class', "dropdown-item");
      applianceLink.setAttribute('href', "#");
      applianceLine.appendChild(applianceLink);
   });
}

// Fonction qui affiche la liste des ustensiles dans le menu des ustensiles
function displayUstensils(recipes) {
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
      ustensilLink.setAttribute('class', "dropdown-item");
      ustensilLink.setAttribute('href', "#");
      ustensilLine.appendChild(ustensilLink);
   });
}

// Fonction de recherche
function searchRecipes(recipes) {
  // Element du Dom
   const filterMenus = document.querySelectorAll('.dropdown-toggle');
   const ingredientsList = document.querySelector('.ingredients-list');
   const ustensilsList = document.querySelector('.ustensils-list');
   const appliancesList = document.querySelector('.appliances-list');
   const recipesListSection = document.getElementById("recipes-list");
   const searchBar = document.querySelector("#search-bar");

   let recipesTable = [];
   let ingredientsTable = [];
   let appliancesTable = [];
   let ustensilsTable = [];
   let tagsTable = [];

   let searchingByTag = false;
   let newRecipesList = [];

   recipes.forEach((recipe) => {
      recipesTable.push(recipe);
      ingredientsTable.push(recipe.ingredients);
      appliancesTable.push(recipe.appliance);
      ustensilsTable.push(recipe.ustensils);
   })

   displayIngredients(recipes);
   displayAppliances(recipes);
   displayUstensils(recipes);

   // Fonction manipulation des tags
   function handleTagItems(tags) {
      const tagList = document.getElementById("tags");
      tags.addEventListener('click', function (e) {
         e.preventDefault();
         let tagItem = e.target.textContent;
         tagsTable.push(tagItem);

         tagsTable.forEach((tag) => {
            displayRecipeByTags(tag);
            searchingByTag = true;
         })

         if (tags == ingredientsList) {
            displayTags(tagItem);
            tagList.lastChild.classList.add('ingredient-tag'); // Bleu

         } else if (tags == appliancesList) {
            displayTags(tagItem);
            tagList.lastChild.classList.add('appliance-tag'); // Vert
         } else if (tags == ustensilsList) {
            displayTags(tagItem);
            tagList.lastChild.classList.add('ustensil-tag'); // Rouge
         }
      })
   }

   handleTagItems(ingredientsList);
   handleTagItems(appliancesList);
   handleTagItems(ustensilsList);

   // Fonction qui affiche les tags sous la barre de recherche
   function displayTags(value) {
      // Elements du dom
      const tagList = document.getElementById("tags");
      let selectedTag = document.createElement('span');
      let deleteTag = document.createElement('img');
      selectedTag.classList.add('tag-selected', 'btn', 'm-3');
      deleteTag.classList.add('delete-tag');
      deleteTag.classList.add('delete-tag-icon');
      deleteTag.setAttribute('src', '/assets/icons/close_white.png');

      tagList.appendChild(selectedTag);
      selectedTag.textContent = value;
      selectedTag.appendChild(deleteTag);

      selectedTag.addEventListener('click', function (e) {
         e.target.remove();

         if (tagsTable.indexOf(e.target.textContent) > 0) {
            tagsTable.pop(e.target.textContent);
            tagsTable.forEach((tag) => {
               searchingByTag = true;
               displayRecipeByTags(tag);
            });
         } else {
            recipesListSection.innerHTML = "";
            tagsTable = [];
            searchingByTag = false;
            displayRecipes(recipes);
            displayIngredients(recipes);
            displayAppliances(recipes);
            displayUstensils(recipes);
         }
      })
   }

   // Fonction qui affiche les recettes en fonction des tags
   function displayRecipeByTags(tag) {
      let recipes = [];
      if (searchingByTag) {
         recipes = newRecipesList;
      } else {
         recipes = recipesTable;
      }

      const filteredRecipes = recipes.filter(item => item.name.toLowerCase().includes(tag.toLowerCase()));
      const filteredIngredients = recipes.filter(item => item.ingredients.find(el => el.ingredient.toLowerCase().includes(tag.toLowerCase())));
      const filteredDescription = recipes.filter(item => item.description.toLowerCase().includes(tag.toLowerCase()));
      const results = [...new Set([...filteredRecipes, ...filteredIngredients, ...filteredDescription])];
      newRecipesList = results;

      displayIngredients(newRecipesList);
      displayAppliances(newRecipesList);
      displayUstensils(newRecipesList);

      displayRecipes(newRecipesList);

   }

  filterMenus.forEach ( dropdown => {
    dropdown.addEventListener('keyup', function (e) {
      let newIngredientList = [];
      let newApplianceList = [];
      let newUstensilList = [];

      recipes.forEach(dropdownData => {
        dropdownData.ingredients.forEach(ingredient => {
          newIngredientList.push(ingredient.ingredient.toLowerCase());
        })
        dropdownData.ustensils.forEach(ustensil => {
          newUstensilList.push(ustensil.toLowerCase());
        });
         newApplianceList.push(dropdownData.appliance.toLowerCase());
      });
   });

    // Recherche au clavier dans l'input des menus de filtres : Ingredients
    const ingredientsSearchBar = document.querySelector("#ingredients");
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
    // Recherche au clavier dans l'input des menus de filtres : Appareils
    const aplliancesSearchBar = document.querySelector("#appliances");
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
          results.forEach(appliance =>{
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
    // Recherche au clavier dans l'input des menus de filtres : Ustensiles
    const ustensilsSearchBar = document.querySelector("#ustensils");
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
  }) 

  // Recherche principale dans la barre de recherche
  searchBar.addEventListener("input", e => {
    const searchValue = e.target.value.toLowerCase();

    if (searchValue.length < 3) {
        recipesListSection.innerHTML = "";
        displayRecipes(recipes);
    }
    const foundRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(searchValue.toLowerCase()));
    const foundIngredients = recipes.filter(recipe => recipe.ingredients.find(el => el.ingredient.toLowerCase().includes(searchValue.toLowerCase())));
    const foundDescription = recipes.filter(recipe => recipe.description.toLowerCase().includes(searchValue.toLowerCase()));
    const results = [...new Set([...foundRecipes, ...foundIngredients, ...foundDescription])];

    if (searchValue.length > 2) {
        recipesListSection.innerHTML = "";
        displayRecipes(results);
        displayRecipes(results);
        displayIngredients(results);
        displayAppliances(results);
        displayUstensils(results);
    }
  })
}

function init() {
   displayRecipes(recipes);
   searchRecipes(recipes);
}

init();