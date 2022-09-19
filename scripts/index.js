import recipes from './data/recipes.js'; // import des recettes du fichier recipe.js

function displayRecipes(recipes) { // fonction qui affiche le resultat de recherche
  const recipesListSection = document.getElementById("recipes-list");
  recipesListSection.innerHTML = "";

  recipes.forEach( (recipe) => {
    const recipeModel = recipeFactory(recipe);
    const recipeCard = recipeModel.generateRecipeCard();
    recipesListSection.appendChild(recipeCard);
   
    return recipe;
  });

    if (recipesListSection.innerHTML == "") {
      recipesListSection.innerHTML = `<span class="no-recipes"> Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc. </span>`
    }
}

function openDropDownMenu() { // fonction qui anime la flèche du menu déroulant qu'on ouvre
  const filterMenus = document.querySelectorAll('.dropdown-toggle');

  filterMenus.forEach((menu) => { // on anime la flèche au clic
    menu.addEventListener("click", function(e){
        let thisMenu = e.target;
        thisMenu.nextElementSibling.classList.toggle('is-open-icon');
    })
    menu.addEventListener("blur", function(e){ // on retire la classe lorsque le menu perd le focus
      let thisMenu = e.target;
      thisMenu.nextElementSibling.classList.remove('is-open-icon');
    })
  })
}

function displayIngredients(recipes) { //fonction qui affiche la liste des ingredients
  openDropDownMenu(); // animation de la flêche à l'ouverture du menu
  let ingredients = []; 
  const ingredientsList = document.querySelector('.ingredients-list');
  ingredientsList.innerHTML = ``;

  for(let recipe of recipes) {
    for(let ingredient of recipe.ingredients) {
        ingredients.push(ingredient.ingredient.toLowerCase());
    };
  }
  const filteredIngredients = Array.from(new Set(ingredients)); // filtre les doublons du tableau
  
  for(let ingredient of filteredIngredients) {
    const ingredientLine = document.createElement('li');
    ingredientsList.appendChild(ingredientLine);

    const ingredientLink = document.createElement('a');
    ingredientLink.innerText = ingredient;
    ingredientLink.setAttribute('class', "dropdown-item");
    ingredientLink.setAttribute('href', "#");
    ingredientLine.appendChild(ingredientLink);
  }
}

function displayAppliances(recipes) { //fonction qui affiche la liste des appareils
  openDropDownMenu(); // animation de la flêche à l'ouverture du menu
  let appliances = [];
  const appliancesList = document.querySelector('.appliances-list');
  appliancesList.innerHTML = ``;

  for(let recipe of recipes) {
    appliances.push(recipe.appliance.toLowerCase())
  };
  const filteredAppliance = Array.from(new Set(appliances)); // filtre les doublons du tableau

  for(let appliance of filteredAppliance) {
    const applianceLine = document.createElement('li');
    appliancesList.appendChild(applianceLine);

    const applianceLink = document.createElement('a');
    applianceLink.innerText = appliance;
    applianceLink.setAttribute('class', "dropdown-item");
    applianceLink.setAttribute('href', "#");
    applianceLine.appendChild(applianceLink);
  }
}

function displayUstensils(recipes) { //fonction qui affiche la liste des ustensiles
  openDropDownMenu(); // animation de la flêche à l'ouverture du menu
  let ustensils = [];
  const ustensilsList = document.querySelector('.ustensils-list');
  ustensilsList.innerHTML = ``;

  for(let recipe of recipes) {
    for(let ustensil of recipe.ustensils) {
      ustensils.push(ustensil.toLowerCase());
    };
  }
  const filteredUstensiles = Array.from(new Set(ustensils)); // filtre les doublons du tableau

  for(let ustensil of filteredUstensiles) {
    const ustensilLine = document.createElement('li');
    ustensilsList.appendChild(ustensilLine);

    const ustensilLink = document.createElement('a');
    ustensilLink.innerText = ustensil;
    ustensilLink.setAttribute('class', "dropdown-item");
    ustensilLink.setAttribute('href', "#");
    ustensilLine.appendChild(ustensilLink);
  }
}

function searchRecipes(recipes) {
  const filterMenus = document.querySelectorAll('.dropdown-toggle'); // menu déroulants des filtres
  const ingredientsList = document.querySelector('.ingredients-list'); // liste d'ingrédients
  const ustensilsList = document.querySelector('.ustensils-list'); // liste d'ustensiles
  const appliancesList = document.querySelector('.appliances-list');// liste d'appareils
  const recipesListSection = document.getElementById("recipes-list");
  const searchBar = document.querySelector("#search-bar");

  let recipesTable = [];
  let ingredientsTable = [];
  let appliancesTable = [];
  let ustensilsTable = [];
  let tagsTable = []; // tableau de tags
  
  let searchingByTag = false;
  let newRecipesList = [];

  for (const recipe of recipes) {
    recipesTable.push(recipe);
    ingredientsTable.push(recipe.ingredients);
    appliancesTable.push(recipe.appliance);
    ustensilsTable.push(recipe.ustensils);
  }

  displayIngredients(recipes);
  displayAppliances(recipes);
  displayUstensils(recipes);

  function handleTagItems(tags) {
    const tagList = document.getElementById("tags"); // conteneur de tags
    tags.addEventListener('click', function(e) {
      e.preventDefault();
      let tagItem = e.target.textContent;
      tagsTable.push(tagItem);

      for(let tag of tagsTable) {
          displayRecipeByTags(tag);
          searchingByTag = true;
      }

      if (tags == ingredientsList) {
          displayTags(tagItem);
          tagList.lastChild.classList.add('ingredient-tag');

      } else if (tags == appliancesList) {
          displayTags(tagItem);
          tagList.lastChild.classList.add('appliance-tag');
      } else if (tags == ustensilsList) {
          displayTags(tagItem);
          tagList.lastChild.classList.add('ustensil-tag');
      }
    }
  )}

  handleTagItems(ingredientsList);
  handleTagItems(appliancesList);
  handleTagItems(ustensilsList);


  function displayTags(value){
    const tagList = document.getElementById("tags");
    let selectedTag = document.createElement('span');
    let deleteTag = document.createElement('img');
    selectedTag.classList.add('tag-selected','btn','m-3');
    deleteTag.classList.add('delete-tag');
    deleteTag.classList.add('delete-tag-icon');
    deleteTag.setAttribute('src', '/assets/icons/close_white.png');

    tagList.appendChild(selectedTag);
    selectedTag.textContent = value;
    selectedTag.appendChild(deleteTag);

    selectedTag.addEventListener('click', function(e) {
      console.log('delete');
      e.target.remove();

      if (tagsTable.indexOf(e.target.textContent) > 0){
        tagsTable.pop(e.target.textContent);
        console.log(tagsTable);
        console.log(tagsTable.length);
        console.log(searchingByTag);
        for(let tag of tagsTable) {
          displayRecipeByTags(tag);
          searchingByTag = true;
        };
      } else {
        recipesListSection.innerHTML = "";
        tagsTable = [];
        searchingByTag = false;
        console.log(searchingByTag);
        displayRecipes(recipes);
        displayIngredients(recipes);
        displayAppliances(recipes);
        displayUstensils(recipes); 
      }
          
    })
  }

  function displayRecipeByTags(tag){

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
  
  for(let dropdown of filterMenus) {
    dropdown.addEventListener('keyup', function (e){
      let newIngredientList = [];
      let newApplianceList = [];
      let newUstensilList = [];  
          
      for(let dropdownData of recipes) {
        for(let ingredient of dropdownData.ingredients) {
          newIngredientList.push(ingredient.ingredient.toLowerCase());
        };
        for(let ustensil of dropdownData.ustensils) {
          newUstensilList.push(ustensil.toLowerCase());
        } 
        
        newApplianceList.push(dropdownData.appliance.toLowerCase());        
      }

      //recherche au clavier dans l'input des menus de filtres
        const ingredientsSearchBar = document.querySelector("#ingredients");
        ingredientsSearchBar.addEventListener("input", e => {
          const ingredientsListToFilter = Array.from(new Set (newIngredientList));
          const searchValue =  e.target.value.toLowerCase();

          if (searchValue.length < 3) {
            ingredientsList.innerHTML = "";
            displayIngredients(recipes);
          }
        const filteredIngredientsList =  ingredientsListToFilter.filter(item => item.includes(searchValue.toLowerCase()));
        const results = [...new Set([...filteredIngredientsList])];

          if (searchValue.length > 2) {
            ingredientsList.innerHTML = "";
            for(let ingredient of results) {
              const ingredientLine = document.createElement('li');
              ingredientsList.appendChild(ingredientLine);
          
              const ingredientLink = document.createElement('a');
              ingredientLink.innerText = ingredient;
              ingredientLink.setAttribute('class', "dropdown-item");
              ingredientLink.setAttribute('href', "#");
              ingredientLine.appendChild(ingredientLink);
            }
          }
        })

        const aplliancesSearchBar = document.querySelector("#appliances");
        aplliancesSearchBar.addEventListener("input", e => {
          const appliancesListToFilter = Array.from(new Set (newApplianceList));
          const searchValue =  e.target.value.toLowerCase();

          if (searchValue.length < 3) {
            appliancesList.innerHTML = "";
            displayAppliances(recipes);
          }
        const filteredAppliancesList =  appliancesListToFilter.filter(item => item.includes(searchValue.toLowerCase()));
        const results = [...new Set([...filteredAppliancesList])];

          if (searchValue.length > 2) {
            appliancesList.innerHTML = "";
            for(let appliance of results) {
              const applianceLine = document.createElement('li');
              appliancesList.appendChild(applianceLine);
          
              const applianceLink = document.createElement('a');
              applianceLink.innerText = appliance;
              applianceLink.setAttribute('class', "dropdown-item");
              applianceLink.setAttribute('href', "#");
              applianceLine.appendChild(applianceLink);
            }
          }
        })
        
        const ustensilsSearchBar = document.querySelector("#ustensils");
        ustensilsSearchBar.addEventListener("input", e => {
          const ustensilsListToFilter = Array.from(new Set (newUstensilList));
          const searchValue =  e.target.value.toLowerCase();

          if (searchValue.length < 3) {
            ustensilsList.innerHTML = "";
            displayUstensils(recipes);
          }
        const filteredUstensilsList =  ustensilsListToFilter.filter(item => item.includes(searchValue.toLowerCase()));
        const results = [...new Set([...filteredUstensilsList])];

          if (searchValue.length > 2) {
            ustensilsList.innerHTML = "";
            for(let ustensil of results) {
              const ustensilLine = document.createElement('li');
              ustensilsList.appendChild(ustensilLine);
          
              const ustensilLink = document.createElement('a');
              ustensilLink.innerText = ustensil;
              ustensilLink.setAttribute('class', "dropdown-item");
              ustensilLink.setAttribute('href', "#");
              ustensilLine.appendChild(ustensilLink);
            }
          }
        })
    })
  }

  // Recherhe principale dans la barr de recherche
  searchBar.addEventListener("input", e => {
    const searchValue =  e.target.value.toLowerCase();

    if (searchValue.length < 3) {
      recipesListSection.innerHTML = "";
        displayRecipes(recipes);
    }
    const filteredRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(searchValue.toLowerCase()));
    const filteredIngredients = recipes.filter(recipe => recipe.ingredients.find(el => el.ingredient.toLowerCase().includes(searchValue.toLowerCase())));
    const filteredDescription = recipes.filter(recipe => recipe.description.toLowerCase().includes(searchValue.toLowerCase()));
    const results = [...new Set([...filteredRecipes, ...filteredIngredients, ...filteredDescription])];

    if (searchValue.length > 2) {
      recipesListSection.innerHTML = "";
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


