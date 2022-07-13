function cookingListFactory(recipe) {
    const {name, ingredients, time, description} = recipe;

    function generateCookingList() {

        const recipeCard = document.createElement('aside');
        recipeCard.setAttribute('class', "recipe-card");

        const recipePicture = document.createElement('div'); // on crée une div remplacant l'image pour le moment inexistante
        recipePicture.setAttribute('class', "recipe-picture-container");
        recipeCard.appendChild(recipePicture);

        const recipeHeader = document.createElement('div');
        recipeHeader.setAttribute('class', "recipe-header d-flex justify-content-between align-items-center p-3")
        recipeCard.appendChild(recipeHeader); 

        const recipeContent = document.createElement('div');
        recipeContent.setAttribute('class', "recipe-content d-flex justify-content-between align-items-center px-1")
        recipeCard.appendChild(recipeContent); 

        const recipeName = document.createElement('h2');
        recipeName.innerText = name;
        recipeHeader.appendChild(recipeName);

        const recipeTime = document.createElement('span');
        recipeTime.innerHTML = `<i class="far fa-clock"></i> ${time} min`;
        recipeHeader.appendChild(recipeTime);

        const recipeIngredients = document.createElement('ul');
        recipeIngredients.setAttribute('class', "recipe-ingredients");
        recipeContent.appendChild(recipeIngredients);

        recipe.ingredients.forEach((ingredientline) => {
            const recipeIngredient = document.createElement('li');
            recipeIngredients.appendChild(recipeIngredient);
            const ingredient = ingredientline.ingredient;
            const quantity = ingredientline.quantity || '' ;
            const unit = ingredientline.unit || '';

            recipeIngredient.innerHTML = `<span class="ingredient-name">${ingredient}</span><span class="ingredient-quantity"> : ${quantity} ${unit}</span>` ;
            
            return ingredientline;
        });

        const recipeDescription = document.createElement('p');
        recipeDescription.innerText = description;
        recipeDescription.setAttribute('class', "recipe-description");
        recipeContent.appendChild(recipeDescription);

        return (recipeCard);
    }
    return {
        name, ingredients, time, description, generateCookingList
    }
}