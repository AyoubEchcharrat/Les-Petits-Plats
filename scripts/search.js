// eslint-disable-next-line no-unused-vars
function filterByTag() {
    const ingredientInupt = document.getElementById('ingredient')
    const appareilInupt = document.getElementById('appareil')
    const ustensileInupt = document.getElementById('ustensile')

    const IngredientContainer = document.querySelector('.filtre-ingredient')

    const ingredientsTag = document.getElementById('ingredientsTag')
    // eslint-disable-next-line no-undef
    const recipes = getRecipes()

    function eventTagIngredient() {
        const newIngredientsList = []
        ingredientsTag.innerText = ''
        if (ingredientInupt.value.length == 0) {
            IngredientContainer.classList.remove('filtre-ingredient-open')
        } else {
            IngredientContainer.classList.add('filtre-ingredient-open')
            recipes.forEach(recipe => {
                recipe.ingredients.forEach(ingredient => {
                    let Lowingredient = ingredient.ingredient.toLowerCase()
                    if (Lowingredient.includes(ingredientInupt.value.toLowerCase())) {
                        if (!newIngredientsList.includes(ingredient.ingredient)) {
                            newIngredientsList.push(ingredient.ingredient)
                        }
                    }
                });
            });
            newIngredientsList.forEach(element => {
                let newEntry = document.createElement('p')
                newEntry.classList.add('ingredient-tag')
                newEntry.innerText = element
                ingredientsTag.append(newEntry)
            });
        }
    }

    ingredientInupt.addEventListener('keyup', eventTagIngredient)
}

// eslint-disable-next-line no-unused-vars
function searchbar() {
    const searchbar = document.getElementById('searchbar')
    // eslint-disable-next-line no-undef
    const recipes = getRecipes()

    function eventSearchbar() {
        const newRecipesList = []

        if (searchbar.value.length < 3) {
            // eslint-disable-next-line no-undef
            recipesCardHUB(recipes)
        } else {
            recipes.forEach(recipe => {
                let name = recipe.name.toLowerCase() //recherche par nom
                let description = recipe.description.toLowerCase() //recherche par descr.

                let ingredients = recipe.ingredients
                ingredients.forEach(elem => {
                    let ingredient = elem.ingredient.toLowerCase() //recherche par ingre.
                    if (name.includes(searchbar.value) || description.includes(searchbar.value) || ingredient.includes(searchbar.value)) {
                        if (newRecipesList.length === 0) {
                            newRecipesList.push(recipe)
                        } else {
                            if (newRecipesList[newRecipesList.length - 1].name === recipe.name) {
                                return
                            } else {
                                newRecipesList.push(recipe)
                                // eslint-disable-next-line no-undef
                                recipesCardHUB(newRecipesList)
                            }
                        }
                    } else {
                        // eslint-disable-next-line no-undef
                        recipesCardHUB(newRecipesList)
                    }
                });
            });
        }
    }

    searchbar.addEventListener('keyup', eventSearchbar)

}