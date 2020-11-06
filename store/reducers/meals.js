import {MEALS} from '../../data/dummy-data';
import {TOGGLE_FAVORITE,SET_FILTERS} from '../action/meal';

const initialState = {
    meals:MEALS,
    filterMeals: MEALS,
    favoriteMeals:[]
}

const mealsReducer = (state=initialState,action) => {
    switch(action.type){
        case TOGGLE_FAVORITE : 
               const existingIndex = state.favoriteMeals.findIndex(meal => meal.id === action.mealId);
               
               if(existingIndex >=0 ){
                      const updateFavMeals = [...state.favoriteMeals];
                      updateFavMeals.splice(existingIndex,1);
                      return {...state, favoriteMeals:updateFavMeals}
               }else{
                   const meal = state.meals.find(meal => meal.id === action.mealId);
                   return{...state,favoriteMeals: state.favoriteMeals.concat(meal)};
               }
        case SET_FILTERS :
               const appliedFilters = action.filters;
               const updateFilteredMeal = state.meals.filter(meal => {
                   if(appliedFilters.glutenFree && !meal.isGlutenFree){
                       return false;
                   }
                   if(appliedFilters.lactoseFree && !meal.isLactoseFree){
                       return false;
                   }

                   if(appliedFilters.vegetarian && !meal.isVegetarian){
                       return false;
                   }
                   if(appliedFilters.vegan && !meal.isVegan){
                       return false;
                   }
                   return true;
               });
                return {...state,filterMeals:updateFilteredMeal};
               default:
                return state;
    }
}

export default mealsReducer;