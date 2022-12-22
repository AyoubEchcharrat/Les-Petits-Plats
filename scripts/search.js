// eslint-disable-next-line no-unused-vars
function filterByTag() {
    const ingredientInupt = document.getElementById('ingredient-input')
    const appareilInupt = document.getElementById('appareil-input')
    const ustensileInupt = document.getElementById('ustensile-input')

    const tagInput = document.querySelector('.tag-Input')

    const ingredientChevron = document.getElementById('ingredient')
    const appareilChevron = document.getElementById('appareil')
    const ustensileChevron = document.getElementById('ustensile')


    const tagChevron = document.querySelector('.chevron-icon-filter')


    const ingredientCover = document.getElementById('cover-ingredient')
    const appareilCover = document.getElementById('cover-appareil')
    const ustensileCover = document.getElementById('cover-ustensile')

    const tagCover = document.querySelectorAll('.tag-cover')

    const container = document.querySelectorAll('.filtre')

    const ingredientsTag = document.getElementById('ingredientsTag')
    const appareilsTag = document.getElementById('appareilsTag')
    const ustensilesTag = document.getElementById('ustensilesTag')

    // eslint-disable-next-line no-undef 
    const recipes = getRecipes()

    var newRecipesList = recipes

    function eventTagIngredient(list) {

        const newIngredientsList = []
        ingredientsTag.innerText = ''
        if (ingredientChevron.classList.contains('tag-open')) {
            list.forEach(recipe => {
                recipe.ingredients.forEach(ingredient => {
                    let Lowingredient = ingredient.ingredient.toLowerCase()
                    if (Lowingredient.includes(ingredientInupt.value.toLowerCase())) {
                        let newIngre = ingredient.ingredient[0].toUpperCase() + ingredient.ingredient.toLowerCase().slice(1)
                        if (!newIngredientsList.includes(newIngre)) {
                            newIngredientsList.push(newIngre)
                        }
                    }
                });
            });
            newIngredientsList.forEach(element => {
                let newEntry = document.createElement('p')
                newEntry.classList.add('tag-styles')
                newEntry.innerText = element
                ingredientsTag.append(newEntry)
            });
        }
    }

    function eventTagAppareil(list) {
        const newAppareilsList = []
        appareilsTag.innerText = ''
        if (appareilChevron.classList.contains('tag-open')) {
            list.forEach(recipe => {
                let Lowappareil = recipe.appliance.toLowerCase()
                if (Lowappareil.includes(appareilInupt.value.toLowerCase())) {
                    let newTag = recipe.appliance[0].toUpperCase() + recipe.appliance.toLowerCase().slice(1)
                    if (!newAppareilsList.includes(newTag)) {
                        newAppareilsList.push(newTag)
                    }
                }
            });
            newAppareilsList.forEach(element => {
                let newEntry = document.createElement('p')
                newEntry.classList.add('tag-styles')
                newEntry.innerText = element
                appareilsTag.append(newEntry)
            });
        }
    }

    function eventTagUstensile(list) {
        const newUstensilesList = []
        ustensilesTag.innerText = ''
        if (ustensileChevron.classList.contains('tag-open')) {
            list.forEach(recipe => {
                recipe.ustensils.forEach(ustensile => {
                    let Lowustensile = ustensile.toLowerCase()
                    if (Lowustensile.includes(ustensileInupt.value.toLowerCase())) {
                        let newTag = ustensile[0].toUpperCase() + ustensile.toLowerCase().slice(1)
                        if (!newUstensilesList.includes(newTag)) {
                            newUstensilesList.push(newTag)
                        }
                    }
                });
            });
            newUstensilesList.forEach(element => {
                let newEntry = document.createElement('p')
                newEntry.classList.add('tag-styles')
                newEntry.innerText = element
                ustensilesTag.append(newEntry)
            });
        }
    }

    function toggleTagContainer() {
        let id = this.id
        if (document.getElementById(id).classList.contains('tag-open')) {
            document.getElementById(id).classList.remove('tag-open')
            document.querySelector('.filtre-' + id).classList.remove('filtre-open')
            let tag = id + 'Tag'
            tag.innerText = ''
            document.getElementById('cover-' + id).classList.remove('displaynone')
        } else {
            document.getElementById('cover-' + id).classList.add('displaynone')
            document.getElementById(id).classList.add('tag-open')
            document.querySelector('.filtre-' + id).classList.add('filtre-open')
            eventTagIngredient(newRecipesList)
            eventTagAppareil(newRecipesList)
            eventTagUstensile(newRecipesList)
        }
    }

    function searchbar() {
        const searchbar = document.getElementById('searchbar')
        // eslint-disable-next-line no-undef
        const recipes = getRecipes()

        function eventSearchbar() {
            newRecipesList = []
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
            if (newRecipesList.length === 0) {
                newRecipesList = recipes
                eventTagIngredient(recipes)
                eventTagAppareil(recipes)
                eventTagUstensile(recipes)
            } else {
                eventTagIngredient(newRecipesList)
                eventTagAppareil(newRecipesList)
                eventTagUstensile(newRecipesList)
            }
        }
        searchbar.addEventListener('keyup', eventSearchbar)
    }
    searchbar()


    ingredientChevron.addEventListener('click', toggleTagContainer)
    appareilChevron.addEventListener('click', toggleTagContainer)
    ustensileChevron.addEventListener('click', toggleTagContainer)

    ingredientInupt.addEventListener('keyup', function () {
        eventTagIngredient(newRecipesList)
    })
    appareilInupt.addEventListener('keyup', function () {
        eventTagAppareil(newRecipesList)
    })
    ustensileInupt.addEventListener('keyup', function () {
        eventTagUstensile(newRecipesList)
    })

}