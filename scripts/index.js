//--------------------------------------------------------------------------------------
// import des recettes du fichier recipe.js
//--------------------------------------------------------------------------------------
import recipes from './data/recipes.js';

let allRecipes = recipes;
let remainingRecipes = [];

//--------------------------------------------------------------------------------------
// fonction qui affiche les recettes
//--------------------------------------------------------------------------------------
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

  displayIngredients(recipes);
  displayAppliances(recipes);
  displayUstensils(recipes);
}

//--------------------------------------------------------------------------------------
// Fonction qui anime la flèche du menu déroulant qu'on ouvre
//--------------------------------------------------------------------------------------
function openDropDownMenu() {
  const filterMenus = document.querySelectorAll('.dropdown-toggle');

  filterMenus.forEach((menu) => { // on anime la flèche au clic
    menu.addEventListener("click", function(e) {
      let thisMenu = e.target;
      thisMenu.nextElementSibling.classList.toggle('is-open-icon');
    })
    menu.addEventListener("blur", function(e) { // on retire la classe lorsque le menu perd le focus
      let thisMenu = e.target;
      thisMenu.nextElementSibling.classList.remove('is-open-icon');
    })
  })
}

//--------------------------------------------------------------------------------------
// Fonction qui affiche la liste des ingredients dans le menu filtre des ingrédients
//--------------------------------------------------------------------------------------
function displayIngredients(recipes) {
  openDropDownMenu(); // animation de la flêche à l'ouverture du menu
  let ingredients = [];
  const ingredientsList = document.querySelector('.ingredients-list');
  ingredientsList.innerHTML = ``;

  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      ingredients.push(ingredient.ingredient.toLowerCase());
    });
  });
  const filteredIngredients = Array.from(new Set(ingredients)); // filtre les doublons du tableau

  filteredIngredients.forEach(ingredient => {
    const ingredientLine = document.createElement('li');
    ingredientsList.appendChild(ingredientLine);

    const ingredientLink = document.createElement('a');
    ingredientLink.innerText = ingredient;
    ingredientLink.setAttribute('class', "dropdown-item");
    ingredientLink.setAttribute('href', "#");
    ingredientLine.appendChild(ingredientLink);
  });
}

//--------------------------------------------------------------------------------------
// Fonction qui affiche la liste des appareils dans le menu filtre des appareils
//--------------------------------------------------------------------------------------
function displayAppliances(recipes) {
  openDropDownMenu(); // animation de la flêche à l'ouverture du menu
  let appliances = [];
  const appliancesList = document.querySelector('.appliances-list');
  appliancesList.innerHTML = ``;

  recipes.forEach(recipe => {
    appliances.push(recipe.appliance.toLowerCase())
  });
  const filteredAppliance = Array.from(new Set(appliances)); // filtre les doublons du tableau

  filteredAppliance.forEach(appliance => {
    const applianceLine = document.createElement('li');
    appliancesList.appendChild(applianceLine);

    const applianceLink = document.createElement('a');
    applianceLink.innerText = appliance;
    applianceLink.setAttribute('class', "dropdown-item");
    applianceLink.setAttribute('href', "#");
    applianceLine.appendChild(applianceLink);
  });
}

//--------------------------------------------------------------------------------------
// Fonction qui affiche la liste des ustensiles dans le menu des ustensiles
//--------------------------------------------------------------------------------------
function displayUstensils(recipes) {
  openDropDownMenu(); // animation de la flêche à l'ouverture du menu
  let ustensils = [];
  const ustensilsList = document.querySelector('.ustensils-list');
  ustensilsList.innerHTML = ``;

  recipes.forEach(recipe => {
    recipe.ustensils.forEach(ustensil => {
      ustensils.push(ustensil.toLowerCase());
    });
  });
  const filteredUstensiles = Array.from(new Set(ustensils)); // filtre les doublons du tableau

  filteredUstensiles.forEach(ustensil => {
    const ustensilLine = document.createElement('li');
    ustensilsList.appendChild(ustensilLine);

    const ustensilLink = document.createElement('a');
    ustensilLink.innerText = ustensil;
    ustensilLink.setAttribute('class', "dropdown-item");
    ustensilLink.setAttribute('href', "#");
    ustensilLine.appendChild(ustensilLink);
  });
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

  ingredientsList.addEventListener('click', function(e) {
    e.preventDefault();
    let tagItem = e.target.textContent;
    tagsTable.push(tagItem);
    displayTags(tagsTable);
    tagList.lastChild.classList.add('ingredient-tag'); // Bleu
  })

  appliancesList.addEventListener('click', function(e) {
    e.preventDefault();
    let tagItem = e.target.textContent;
    tagsTable.push(tagItem);
    displayTags(tagsTable);
    tagList.lastChild.classList.add('appliance-tag'); // Vert
  })

  ustensilsList.addEventListener('click', function(e) {
    e.preventDefault();
    let tagItem = e.target.textContent;
    tagsTable.push(tagItem);
    displayTags(tagsTable);
    tagList.lastChild.classList.add('ustensil-tag'); // Rouge
  })
}

//--------------------------------------------------------------------------------------
// Fonction qui affiche les tags sous la barre de recherche
//--------------------------------------------------------------------------------------
function displayTags(tagsTable) {
  const tagList = document.getElementById("tags");

  let selectedTag = document.createElement('span');
  let deleteTag = document.createElement('img');
  selectedTag.classList.add('tag-selected', 'btn', 'm-3');
  deleteTag.classList.add('delete-tag');
  deleteTag.classList.add('delete-tag-icon');
  deleteTag.setAttribute('src', '/assets/icons/close_white.png');

  tagList.appendChild(selectedTag);
  tagsTable.find((tagItem) => {
    selectedTag.textContent = tagItem;
  });
  selectedTag.appendChild(deleteTag);

  deleteSelectedTag(selectedTag, tagsTable);
  displayRecipeByTags(recipes, tagsTable);
}

//--------------------------------------------------------------------------------------
// Fonction de suppression des tags selectionnés
//--------------------------------------------------------------------------------------
function deleteSelectedTag(selectedTag, tagsTable) {
  const recipesListSection = document.getElementById("recipes-list");

  selectedTag.addEventListener('click', function(e) {
    e.target.remove();
    tagsTable.pop(e.target.value);

    if (tagsTable.length > 0) {
      displayRecipeByTags(recipes, tagsTable);
    } else if (tagsTable.length == 0) {
      recipesListSection.innerHTML = "";
      tagsTable = [];
      displayRecipes(recipes);
    }
  })
}

//--------------------------------------------------------------------------------------
// Fonction d'affichage des recettes à l'aide des tags
//--------------------------------------------------------------------------------------
function displayRecipeByTags(recipes, tagsTable) {

  const filteredRecipes = recipes.filter(recipe => tagsTable.every(tag => recipe.name.toLowerCase().includes(tag)));
  const filteredIngredients = recipes.filter(recipe => tagsTable.every(tag => recipe.ingredients.find(el => el.ingredient.toLowerCase().includes(tag))));
  const filteredDescription = recipes.filter(recipe => tagsTable.every(tag => recipe.description.toLowerCase().includes(tag)));
  const results = [...new Set([...filteredRecipes, ...filteredIngredients, ...filteredDescription])];
  remainingRecipes = results;

  displayRecipes(remainingRecipes);
}

//--------------------------------------------------------------------------------------
// Recherche au clavier dans l'input des menus de filtres : Ingredients
//--------------------------------------------------------------------------------------
function findIngredientByFilterSearchBar(newIngredientList) {
  const ingredientsList = document.querySelector('.ingredients-list'); // liste d'ingrédients
  const ingredientsSearchBar = document.querySelector("#ingredients");
  ingredientsSearchBar.oninput = function(e) {
    const ingredientsListToFilter = Array.from(new Set(newIngredientList));
    const searchValue = e.target.value.toLowerCase();

    if (searchValue.length < 3) {
      ingredientsList.innerHTML = "";
      displayIngredients(recipes);
    }

    const results = [];

    ingredientsListToFilter.forEach(item => {
      const filteredIngredientsList = item.toLowerCase().includes(searchValue.toLowerCase());
      if (filteredIngredientsList) {
        results.push(item)
      };
    });

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
      });
    }
  }
}

//--------------------------------------------------------------------------------------
// Recherche au clavier dans l'input des menus de filtres : Appareils
//--------------------------------------------------------------------------------------
function findApplianceByFilterSearchBar(newApplianceList) {
  const appliancesList = document.querySelector('.appliances-list'); // liste d'appareils
  const aplliancesSearchBar = document.querySelector("#appliances");
  aplliancesSearchBar.oninput = function(e) {
    const appliancesListToFilter = Array.from(new Set(newApplianceList));
    const searchValue = e.target.value.toLowerCase();

    if (searchValue.length < 3) {
      appliancesList.innerHTML = "";
      displayAppliances(recipes);
    }
    const results = [];

    appliancesListToFilter.forEach(item => {
      const filteredAppliancesList = item.toLowerCase().includes(searchValue.toLowerCase());
      if (filteredAppliancesList) {
        results.push(item)
      };
    });

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
      });
    }
  }
}

//--------------------------------------------------------------------------------------
// Recherche au clavier dans l'input des menus de filtres : Ustensiles
//--------------------------------------------------------------------------------------
function findUstensilByFilterSearchBar(newUstensilList) {
  const ustensilsList = document.querySelector('.ustensils-list'); // liste d'ustensiles
  const ustensilsSearchBar = document.querySelector("#ustensils");
  ustensilsSearchBar.oninput = function(e) {
    const ustensilsListToFilter = Array.from(new Set(newUstensilList));
    const searchValue = e.target.value.toLowerCase();

    if (searchValue.length < 3) {
      ustensilsList.innerHTML = "";
      displayUstensils(recipes);
    }

    const results = [];

    ustensilsListToFilter.forEach(item => {
      const filteredUstensilsList = item.toLowerCase().includes(searchValue.toLowerCase());
      if (filteredUstensilsList) {
        results.push(item)
      };
    });

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
      });
    }
  }
}

//--------------------------------------------------------------------------------------
// Recherche principale dans la barre de recherche
//--------------------------------------------------------------------------------------
function findRecipesBySearchBar(recipes) {
  const recipesListSection = document.getElementById("recipes-list");
  const searchBar = document.querySelector("#search-bar");
  searchBar.oninput = function(e) {
    const searchValue = e.target.value.toLowerCase();

    if (searchValue.length < 3) {
      recipesListSection.innerHTML = "";
      displayRecipes(recipes);
    }

    const results = [];

    recipes.forEach((recipe) => {
      const filteredByName = recipe.name.toLowerCase().includes(searchValue.toLowerCase());
      const filteredByIngredients = recipe.ingredients.find((ingredient) => {
        ingredient.ingredient.toLowerCase().includes(searchValue.toLowerCase());
      });
      const filteredByDescription = recipe.description.toLowerCase().includes(searchValue.toLowerCase());

      if (filteredByName) {
        results.push(recipe)
      } else if (filteredByIngredients) {
        results.push(recipe)
      } else if (filteredByDescription) {
        results.push(recipe)
      };
    });

    if (searchValue.length > 2) {

      recipesListSection.innerHTML = "";
      displayRecipes(results);
    }
  }
}

//--------------------------------------------------------------------------------------
// Recherche à l'aides des tags
//--------------------------------------------------------------------------------------
function sortRecipesByFilters(recipes) {
  const filterMenus = document.querySelectorAll('.dropdown-toggle'); // menu déroulants des filtres
  let newIngredientList = [];
  let newApplianceList = [];
  let newUstensilList = [];

  filterMenus.forEach(dropdown => {
    dropdown.onkeyup = function() {
      recipes.forEach(dropdownData => {
        dropdownData.ingredients.forEach(ingredient => {
          newIngredientList.push(ingredient.ingredient.toLowerCase());
        });
        dropdownData.ustensils.forEach(ustensil => {
          newUstensilList.push(ustensil.toLowerCase());
        });
        newApplianceList.push(dropdownData.appliance.toLowerCase());
      });

      //recherche au clavier dans l'input des menus de filtres
      findIngredientByFilterSearchBar(newIngredientList);
      findApplianceByFilterSearchBar(newApplianceList);
      findUstensilByFilterSearchBar(newUstensilList);
    }
  });
}

function init() {
  displayRecipes(recipes);
  sortRecipesByFilters(recipes);
  findRecipesBySearchBar(recipes);
  handleTagItems();
}

init();