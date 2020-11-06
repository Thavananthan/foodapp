import React from 'react';
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import {Ionicons} from '@expo/vector-icons';
import { Platform ,Text} from 'react-native';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMeal';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors  from '../constants/Colors';



const defaultStackNavOptions = {
    headerStyle:{
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor:''
    },
    headerTitle:{
        fontFamily:'open-sans-bold'
    },
    headerBackTitleStyle:{
        fontFamily:'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white': Colors.primaryColor,
    headerTitle: 'A Screen'  
}


 const MealsNavigator = createStackNavigator({
    Categories : CategoriesScreen,
    CategoryMeals:CategoryMealsScreen,
    MealDetail : MealDetailScreen,
    },
    {
        defaultNavigationOptions:defaultStackNavOptions
    });


   const FavNavigator =  createStackNavigator({
        Favorites:FavoritesScreen,
        MealDetail: MealDetailScreen
    },
    {
        defaultNavigationOptions:defaultStackNavOptions
    })


const tabsScreenConfig = {
    Meals: {screen: MealsNavigator, navigationOptions:{
        tabBarIcon:(tabInfo) => {
            return (<Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor}/>)
        },
        tabBarColor: Colors.primaryColor,
        tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily:'open-sans-bold'}}>Meals</Text> :'Meals'
    }
    },
    Favorites:{screen:FavNavigator, navigationOptions:{
        tabBarIcon:(tabInfo) => {
            return (<Ionicons name="ios-star" size={25} color={tabInfo.tintColor}/>)
         },
         tabBarColor: Colors.accentColor,
         tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily:'open-sans-bold'}}>Favorites</Text> :'Favorites'


        }
    }
}

const MealFavNavigator = Platform.OS === 'android'
 ? createMaterialBottomTabNavigator(tabsScreenConfig,{
     activeTintColor: 'white',
     shifting: true
 }) 
 :createBottomTabNavigator(
    tabsScreenConfig,{
    tabBarOptions:{
        labelStyle:{
                fontFamily:'open-sans'
        },
        activeTintColor:Colors.accentColor
    }
});

const FilterNavigator = createStackNavigator({
    Filters : FiltersScreen
},{
    defaultNavigationOptions:defaultStackNavOptions
});

const MainNavigator = createDrawerNavigator({
    MealsFavs : {screen: MealFavNavigator,
                 navigationOptions:{ drawerLabel:'Meals'}},
    Filters : FilterNavigator
},{
    contentOptions:{
        activeTintColor: Colors.accentColor,
        labelStyle : {
            fontFamily:'open-sans-bold'
        }
    }
})

export default createAppContainer(MainNavigator);