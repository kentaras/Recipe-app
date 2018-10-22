import React, { Component } from 'react'
import '../../stylesheets/categories.css'
import { getMealById } from '../../api/getRecipesApi.js'

class SelectedMeal extends Component {
    constructor() {
        super();
        this.state = {
            mealById: ""
        };
    }

    componentWillMount() {
        let id = this.props && this.props.match && this.props.match.params && this.props.match.params.id || '';
        getMealById(id).then(meal => {
            this.setState({mealById: meal.meals});
            this.getIngredients();
        })
    }

    getIngredients() {
        this.repaint();
    }

    repaint() {
        this.setState({});
    }

/*
    getIngredients() {
        if(this.state.mealById[0]) {
            for (let i=1; i<21; i++) {
                if(this.state.mealById[0]['strIngredient'+i] && this.state.mealById[0]['strMeasure'+i]) {
                    let ingredientToPush = [this.state.mealById[0]['strMeasure'+i], this.state.mealById[0]['strIngredient'+i]].join(" ")
                    this.state.ingredients.push(ingredientToPush);
                }
            }
            if(this.state.ingredients.length > 12) {
                this.setState({ingredientsClass: 'overflowHide'})
            }
        }
        this.repaint();
    }

    repaint() {
        this.setState({});
    }
*/
    render() {
        if(this.state.mealById) {
            return (
                <div>
                    {this.state.mealById.map((mealObj, i) => {
                        return(
                            <div className="recipeBox">
                                <img className="recipePic" alt={mealObj.strMeal} src={mealObj.strMealThumb}/>
                                <div>
                                    <h2 className="recipeTitle">{mealObj.strMeal}</h2>
                                    <h4>Category: {mealObj.strCategory}</h4>                             
                                    <p>{mealObj.strInstructions}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            return <h1>Loading...</h1>
        }

    }
    
}

export default SelectedMeal;