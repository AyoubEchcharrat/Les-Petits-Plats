// eslint-disable-next-line no-unused-vars
function filterByTag() {
    //fonction centralisé de toutes les fonctions filtres
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

    // au clique sur un filtre, construit l'icone cliquable qui sert de tag (ingredient, appareil et ustensile)
    function addTags(alt, id, type) {
        const clickedTagsContainer = document.querySelector('.clickedTags')
        var actualTags = document.querySelectorAll('.clicked-tag-parent')
        let found = false;

        actualTags.forEach(element => {
            if (element.id === id + 'Tag') {
                found = true
            }
        });

        if (!found) {
            const tagParent = document.createElement('div')
            tagParent.classList.add('clicked-tag-parent')
            tagParent.setAttribute('id', id + 'Tag')

            const tag = document.createElement('p');
            tag.classList.add('clicked-tag', type)
            tag.innerText = alt

            const deleteTag = document.createElement('i')
            deleteTag.classList.add('fa-solid', 'fa-xmark', 'xmark-tag')

            tagParent.append(deleteTag)
            tagParent.append(tag)
            clickedTagsContainer.append(tagParent)


            deleteTag.addEventListener('click', function () {
                removeTags(this, alt.toLowerCase(), id)
            })

            alt = alt.toLowerCase()
            var pushed = { alt, type }
            listTags.push(pushed)
            console.log(listTags)

            console.log(searchbar.value.length)

            newRecipesList = tagFilter(newRecipesList)
            // eslint-disable-next-line no-undef                
            recipesCardHUB(newRecipesList)
            eventTagIngredient(newRecipesList)
            eventTagAppareil(newRecipesList)
            eventTagUstensile(newRecipesList)

        }
        generateSpaceForTags()
    }

    // au clique sur un tag, le supprime
    function removeTags(elem, alt, id) {
        const elementToDelete = document.getElementById(id + 'Tag')
        elementToDelete.remove()

        let index = listTags.map(res => res.alt).indexOf(alt)
        if (index > -1) {
            listTags.splice(index, 1)
        }
        console.log(listTags)
        newRecipesList = tagFilter(recipes)
        eventSearchbarV2()
        // eslint-disable-next-line no-undef
        recipesCardHUB(newRecipesList)
        eventTagIngredient(newRecipesList)
        eventTagAppareil(newRecipesList)
        eventTagUstensile(newRecipesList)
        generateSpaceForTags()
    }

    function generateSpaceForTags() {
        const blocMoved = document.querySelector('.filtres-container')

        if (listTags.length > 0) {
            blocMoved.style.padding = '75px 0 0 0'
        } else {
            blocMoved.style.padding = '25px 0 0 0'
        }
    }

    //ouvrir et fermer (toggle) les filtres par ingredient, appareils et ustensils
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

    //génère les list correspondants aux filtres ouverts (les ingredients pour "ingredients", etc)
    function tagFilter(incomeRecipes) {
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


    //fonction de recherche principale, s'active à 3 carctères entrés
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
            newRecipesList = recipes
            newRecipesList = newRecipesList.filter(function (recipe) {
                let foundI = false
                recipe.ingredients.forEach(ingredient => {
                    if (ingredient.ingredient.toLowerCase().includes(searchbar.value.toLowerCase())) {
                        foundI = true
                    }
                })
                return (foundI || recipe.name.toLowerCase().includes(searchbar.value.toLowerCase())
                    || recipe.description.toLowerCase().includes(searchbar.value.toLowerCase()))
            })
        }
        newRecipesList = tagFilter(newRecipesList)
        // eslint-disable-next-line no-undef
        recipesCardHUB(newRecipesList)
        eventTagIngredient(newRecipesList)
        eventTagAppareil(newRecipesList)
        eventTagUstensile(newRecipesList)
    }


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