// eslint-disable-next-line no-unused-vars
function filterByTag() {
    const ingredientInupt = document.getElementById('ingredient-input')
    const appareilInupt = document.getElementById('appareil-input')
    const ustensileInupt = document.getElementById('ustensile-input')

    const ingredientChevron = document.getElementById('ingredient')
    const appareilChevron = document.getElementById('appareil')
    const ustensileChevron = document.getElementById('ustensile')

    const ingredientsTag = document.getElementById('ingredientsTag')
    const appareilsTag = document.getElementById('appareilsTag')
    const ustensilesTag = document.getElementById('ustensilesTag')

    // eslint-disable-next-line no-undef 
    const recipes = getRecipes()

    var newRecipesList = recipes

    var listTags = []

    const searchbar = document.getElementById('searchbar')
    let searchbarList = newRecipesList


    //event keyUp sur les ingrédients = n'afficher que les ingredients correspondant à la recherche d'ingredient
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
                let newElem = element.replaceAll(' ', '').toLowerCase()
                newEntry.setAttribute('id', newElem)
                newEntry.setAttribute('alt', element)
                newEntry.classList.add('tag-styles')
                newEntry.innerText = element
                ingredientsTag.append(newEntry)
                newEntry.addEventListener('click', function () {
                    addTags(this.getAttribute('alt'), this.id, 'type-ingredient')
                })
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
                let newElem = element.replaceAll(' ', '').toLowerCase()
                newEntry.setAttribute('id', newElem)
                newEntry.setAttribute('alt', element)
                newEntry.classList.add('tag-styles')
                newEntry.innerText = element
                appareilsTag.append(newEntry)
                newEntry.addEventListener('click', function () {
                    addTags(this.getAttribute('alt'), this.id, 'type-appareil')
                })
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
                let newElem = element.replaceAll(' ', '').toLowerCase()
                newEntry.setAttribute('id', newElem)
                newEntry.setAttribute('alt', element)
                newEntry.classList.add('tag-styles')
                newEntry.innerText = element
                ustensilesTag.append(newEntry)
                newEntry.addEventListener('click', function () {
                    addTags(this.getAttribute('alt'), this.id, 'type-ustensile')
                })
            });
        }
    }

    function addTags(alt, id, type) {
        const clickedTagsContainer = document.querySelector('.clickedTags')
        var actualTags = document.querySelectorAll('.clicked-tag')
        let found = false;

        actualTags.forEach(element => {
            if (element.id === id) {
                found = true
            }
        });

        if (!found) {
            const tagParent = document.createElement('div')
            tagParent.classList.add('clicked-tag-parent')

            const tag = document.createElement('p');
            tag.classList.add('clicked-tag', type)
            tag.setAttribute('id', id)
            tag.innerText = alt

            tagParent.append(tag)
            clickedTagsContainer.append(tagParent)

            tag.addEventListener('click', function () {
                removeTags(this, alt.toLowerCase())
            })

            alt = alt.toLowerCase()
            var pushed = { alt, type }
            listTags.push(pushed)
            console.log(listTags)

            console.log(searchbar.value.length)
            if (searchbar.value.length === 0) {
                newRecipesList = tagFilter(newRecipesList)
                // eslint-disable-next-line no-undef                
                recipesCardHUB(newRecipesList)
                eventTagIngredient(newRecipesList)
                eventTagAppareil(newRecipesList)
                eventTagUstensile(newRecipesList)
            }
        }
        //activeFilterRecipes()
    }

    function removeTags(elem, alt) {
        elem.remove()
        let index = listTags.map(res => res.alt).indexOf(alt)
        if (index > -1) {
            listTags.splice(index, 1)
        }
        console.log(listTags)
        newRecipesList = tagFilter(recipes)
        // eslint-disable-next-line no-undef
        recipesCardHUB(newRecipesList)
        eventTagIngredient(newRecipesList)
        eventTagAppareil(newRecipesList)
        eventTagUstensile(newRecipesList)
    }

    /*     function activeFilterRecipes() {
            const tags = Array.from(document.querySelectorAll('.clicked-tag'))
    
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
            eventTagIngredient(newRecipesList)
            eventTagAppareil(newRecipesList)
            eventTagUstensile(newRecipesList)
        } */


    //filtre par ingredient, appareils et ustensils, cliquables.
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


    function tagFilter(incomeRecipes) {
        // todo : si la liste des tag et vide, retourner la liste de recettes, sinon filtrer
        if (listTags.length === 0) {
            return incomeRecipes
        } else {

            listTags.forEach(tags => {

                if (tags.type === 'type-ingredient') {
                    console.log(tags)
                    console.log('type-ingredient')
                    newRecipesList = incomeRecipes.filter(recette => recette.ingredients.reduce((agg, ingredient) => agg || (ingredient.ingredient.toLowerCase() === tags.alt), false))

                } else if (tags.type === 'type-appareil') {
                    console.log(tags)
                    console.log('type-appareil')
                    newRecipesList = incomeRecipes.filter(recette => recette.appliance.toLowerCase() === tags.alt)

                } else if (tags.type === 'type-ustensile') {
                    console.log(tags)
                    console.log('type-ustensile')
                    newRecipesList = incomeRecipes.filter(recette => recette.ustensils.reduce((agg, ustensile) => agg || (ustensile.toLowerCase() === tags.alt), false))

                }

            });

            return newRecipesList
        }
    }


    function eventSearchbarV2() {
        if (searchbar.value.length <= 3) {
            newRecipesList = tagFilter(searchbarList)
            // eslint-disable-next-line no-undef
            recipesCardHUB(newRecipesList)
            eventTagIngredient(newRecipesList)
            eventTagAppareil(newRecipesList)
            eventTagUstensile(newRecipesList)
            return
        }
        else {
            newRecipesList = newRecipesList.filter(function (recipe) {
                return (recipe.name.toLowerCase().includes(searchbar.value) || recipe.description.toLowerCase().includes(searchbar.value))
            })
        }
        newRecipesList = tagFilter(newRecipesList)
        // todo : 
        // eslint-disable-next-line no-undef
        recipesCardHUB(newRecipesList)
        eventTagIngredient(newRecipesList)
        eventTagAppareil(newRecipesList)
        eventTagUstensile(newRecipesList)
    }




    /* function searchbar() {
        const searchbar = document.getElementById('searchbar')

        function eventSearchbar() {
            //let newRecipesList = []
            let searchbarList = []
            console.log(newRecipesList)
            if (searchbar.value.length < 3) {
                searchbarList = newRecipesList
                eventTagIngredient(newRecipesList)
                eventTagAppareil(newRecipesList)
                eventTagUstensile(newRecipesList)
                // eslint-disable-next-line no-undef
                recipesCardHUB(newRecipesList)
            } else {
                newRecipesList.forEach(recipe => {
                    let name = recipe.name.toLowerCase() //recherche par nom
                    let description = recipe.description.toLowerCase() //recherche par descr.

                    let ingredients = recipe.ingredients
                    ingredients.forEach(elem => {
                        let ingredient = elem.ingredient.toLowerCase() //recherche par ingre.
                        if (name.includes(searchbar.value) || description.includes(searchbar.value) || ingredient.includes(searchbar.value)) {
                            if (searchbarList.length === 0) {
                                searchbarList.push(recipe)
                            } else {
                                if (searchbarList[searchbarList.length - 1].name === recipe.name) {
                                    return
                                } else {
                                    searchbarList.push(recipe)
                                    newRecipesList = searchbarList
                                    // eslint-disable-next-line no-undef
                                    recipesCardHUB(newRecipesList)
                                }
                            }
                        } else {
                            // eslint-disable-next-line no-undef
                            recipesCardHUB(searchbarList)
                        }
                    });
                });
                eventTagIngredient(newRecipesList)
                eventTagAppareil(newRecipesList)
                eventTagUstensile(newRecipesList)
            }
        }
        searchbar.addEventListener('keyup', eventSearchbar)
    }
    searchbar() */

    /*     function searchbar() {
            const searchbar = document.getElementById('searchbar')
            // eslint-disable-next-line no-undef
            const recipes = getRecipes()
    
            function eventSearchbar() {
                let newRecipesList = []
                if (searchbar.value.length < 3) {
                    newRecipesList = recipes
                    eventTagIngredient(recipes)
                    eventTagAppareil(recipes)
                    eventTagUstensile(recipes)
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
                    eventTagIngredient(newRecipesList)
                    eventTagAppareil(newRecipesList)
                    eventTagUstensile(newRecipesList)
                }
            }
            searchbar.addEventListener('keyup', eventSearchbar)
        }
        searchbar()  */


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
    searchbar.addEventListener('keyup', eventSearchbarV2)
}






/*
R = [
    { id: 1, name: "R_1", ingredients: [{ id: 1, name: "Tomate" }, { id: 2, name: "Concombre" }, { id: 3, name: "Carrotte" }, { id: 4, name: "Patate" }] },
    { id: 2, name: "R_2", ingredients: [{ id: 3, name: "Carrotte" }, { id: 4, name: "Patate" }] },
    { id: 3, name: "R_3", ingredients: [{ id: 4, name: "Patate" }] },
]

searchIngredient = "Tomate"

 R[0].ingredients.reduce((agg, ingredient) => agg || (ingredient.name === searchIngredient), false)

R[1].ingredients.reduce((agg, ingredient) => agg || (ingredient.name === searchIngredient), false)

R.filter(recette => recette.ingredients.reduce((agg, ingredient) => agg || (ingredient.name === searchIngredient), false)) */