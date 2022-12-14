


// eslint-disable-next-line no-unused-vars
function searchbar() {
    const searchbar = document.getElementById('searchbar')
    // eslint-disable-next-line no-undef
    const recipes = getRecipes()

    function eventSearchbar() {
        const newRecipesList = []

        if (searchbar.value.length < 3) {
            return
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