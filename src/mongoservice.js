export default class {
    static getAllRecipes (itemsPerPage, page) {
         return fetch(`https://recipe-app-mindgsv244709.codeanyapp.com/getallrecipes/${itemsPerPage}/${page}`, {
        }).then(response => {
            return response.json().then((data=>{
            return data;
         }))})
    }

    static getRecipesCount () {
        return fetch(`https://recipe-app-mindgsv244709.codeanyapp.com/getrecipescount/`, {
        }).then(response => {
            return response.json().then((data=>{
                return data;
            }))})
    }

   static getSearchValue (searchValue, itemsPerPage, page) {
        return fetch(`https://recipe-app-mindgsv244709.codeanyapp.com/searchrecipe/${searchValue}/${itemsPerPage}/${page}`, {
        }).then(response => {
            return response.json().then((data=>{
                return data;
            }))})
    }

    static getRecipeById (id) {
        return fetch(`https://recipe-app-mindgsv244709.codeanyapp.com/getById/${id}`, {
        }).then(response => {
            return response.json().then((data=>{
                return data;
            }))})
    }

    static createRecipe (recipe) {
        console.log(recipe);
        return fetch(`https://recipe-app-mindgsv244709.codeanyapp.com/insertfrommealdb`, {
            method: 'POST',
            body: JSON.stringify(recipe),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json().then((data=>{
                return data;
            }))})
    }

    static updateRecipe (recipe) {
        console.log(recipe);
        return fetch(`https://recipe-app-mindgsv244709.codeanyapp.com/updateRecipe`, {
            method: 'PUT',
            body: JSON.stringify(recipe),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            })
    }

    static getCategories () {
        return fetch(`https://recipe-app-mindgsv244709.codeanyapp.com/getCategories/`, {
        }).then(response => {
            return response.json().then((data=>{
                return data;
            }))})
    }

    static getRecipesByCategory (category) {
        return fetch(`https://recipe-app-mindgsv244709.codeanyapp.com/getRecipesByCategory/${category}`, {
        }).then(response => {
            return response.json().then((data=>{
                return data;
            }))})
    }
}