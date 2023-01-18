function recipesCardFactory(recipe) {

    const { description, id, ingredients, name, time } = recipe

    /*     const nameWithoutSpaces = name.replace(/\s/g, '') */

    //button pour que le bloc soit navigable à l'aide de ALT
    const cardAccessibilty = document.createElement('button')
    cardAccessibilty.setAttribute('aria-label', name)
    cardAccessibilty.classList.add('card-accessibilty')
    const card = document.createElement('div')
    card.classList.add('card-style')
    card.setAttribute('id', id)
    cardAccessibilty.append(card)

    const cardTEXTContainer = document.createElement('div')
    cardTEXTContainer.classList.add('card-text-container')
    card.append(cardTEXTContainer)

    const cardMainInfos = document.createElement('div')
    cardMainInfos.classList.add('card-main-text')
    cardTEXTContainer.append(cardMainInfos)

    const cardSubInfos = document.createElement('div')
    cardSubInfos.classList.add('card-sub-text')
    cardTEXTContainer.append(cardSubInfos)

    const cardTitle = document.createElement('H1')
    cardTitle.classList.add('card-title')
    cardTitle.innerText = name
    cardMainInfos.append(cardTitle)

    const cardTime = document.createElement('p')
    cardTime.classList.add('card-time')
    cardTime.innerText = time + ' min'
    cardMainInfos.append(cardTime)

    const cardIngredients = document.createElement('div')
    cardIngredients.classList.add('card-ingredients-container')
    ingredients.forEach((ingredient) => {

        const cardIngredientGroup = document.createElement('div')
        cardIngredientGroup.classList.add('card-Ingredient-Grouped')

        if (ingredient.ingredient && !ingredient.quantity) {
            const cardIngredientName = document.createElement('p')
            cardIngredientName.classList.add('card-ingredient', 'card-ingredient-name')
            cardIngredientName.innerText = ingredient.ingredient
            cardIngredientGroup.append(cardIngredientName)
        } else {
            const cardIngredientName = document.createElement('p')
            cardIngredientName.classList.add('card-ingredient', 'card-ingredient-name')
            cardIngredientName.innerText = `${ingredient.ingredient}:\xa0\xa0`
            cardIngredientGroup.append(cardIngredientName)
        }
        if (ingredient.quantity) {
            const cardIngredientQuantity = document.createElement('p')
            cardIngredientQuantity.classList.add('card-ingredient', 'card-ingredient-quantity')
            cardIngredientQuantity.innerText = ingredient.quantity
            cardIngredientGroup.append(cardIngredientQuantity)
        }
        if (ingredient.unit) {
            const cardIngredientUnit = document.createElement('p')
            cardIngredientUnit.classList.add('card-ingredient', 'card-ingredient-unit')
            if (ingredient.unit === 'cuillères à soupe' || ingredient.unit === 'cuillère à soupe') {
                cardIngredientUnit.innerText = 'càs'
            } else if (ingredient.unit === 'cuillères à café' || ingredient.unit === 'cuillère à café') {
                cardIngredientUnit.innerText = 'càc'
            } else if (ingredient.unit === 'grammes') {
                cardIngredientUnit.innerText = 'g'
            } else {
                cardIngredientUnit.innerText = ingredient.unit
            }
            cardIngredientGroup.append(cardIngredientUnit)
        }
        cardIngredients.append(cardIngredientGroup)
    })
    cardSubInfos.append(cardIngredients)

    const cardDescr = document.createElement('p')
    cardDescr.classList.add('card-descr')
    cardDescr.innerText = description
    cardSubInfos.append(cardDescr)



    return cardAccessibilty
}

async function recipesCardHUB(recipes) {

    if (recipes.length === 0) {
        const noRecipeText = document.querySelector('.no-recipe-text')
        noRecipeText.innerText = ''
        console.log('VOUS POUVEZ RECHERCHER ....')
        noRecipeText.innerText = 'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc. '

    }

    const recipesSection = document.getElementById('displayRecipes')
    recipesSection.innerText = ''

    recipes.forEach((recipe) => {
        const recipeCard = recipesCardFactory(recipe)
        recipesSection.append(recipeCard)
    })
}

function getRecipes() {
    try {
        // 'recipes' est présent dans recipes.js
        // eslint-disable-next-line no-undef
        console.log(recipes)
        // eslint-disable-next-line no-undef
        return recipes
    } catch (err) {
        console.log(err)
    }
}

function init() {
    const recipes = getRecipes()
    recipesCardHUB(recipes)
    // eslint-disable-next-line no-undef
    filterByTag()
}

init()