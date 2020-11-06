import React,{useState,useEffect,useCallback} from 'react';
import {View,Text,StyleSheet,Switch,Platform} from 'react-native';
import{HeaderButtons,Item}from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import {useDispatch} from 'react-redux';

import Colors from '../constants/Colors';
import {setFilters} from '../store/action/meal'

const FilterSwitch =props => {
    return(
        <View style={styles.filterContainer}>
               <Text>{props.label}</Text>
               <Switch
                  trackColor={{true: Colors.primaryColor}}
                  thumbColor={Platform.OS === 'android' ? Colors.primaryColor: ''}
                  value={props.state}
                  onValueChange={props.onChange}
                  />
            </View>
    )
}

const FilterScreen = props => {

    const {navigation} = props;

    const dispatch = useDispatch();

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian,setIsVegetarian] = useState(false);

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree :isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            Vegetarian:isVegetarian
        }
        dispatch(setFilters(appliedFilters));
    },[isGlutenFree,isVegetarian,isVegan,isLactoseFree,dispatch])

    useEffect(() => {
        navigation.setParams({save:saveFilters});
    },[saveFilters]);

    return(
        <View style={styles.screen}>
            <Text style={styles.title}> Available Filters / Restrictions</Text>
            <View style={styles.filterContainer}>
                <FilterSwitch
                 label="Gluten-free" 
                 state={isGlutenFree}
                 onChange={newValue => setIsGlutenFree(newValue)}
                 />
            </View>
            <View style={styles.filterContainer}>
                <FilterSwitch
                 label="Lactose-free" 
                 state={isLactoseFree}
                 onChange={newValue => setIsLactoseFree(newValue)}
                 />
             </View>    
             <View style={styles.filterContainer}>
                <FilterSwitch
                 label="Vegan" 
                 state={isVegan}
                 onChange={newValue => setIsVegan(newValue)}
                 />
              </View>   
              <View style={styles.filterContainer}>
                <FilterSwitch
                 label="Vegetarian" 
                 state={isVegetarian}
                 onChange={newValue => setIsVegetarian(newValue)}
                 />
            </View>
        </View>
    )
}
FilterScreen.navigationOptions = (navData) => {
    return {
    headerTitle:'Filter Meals',
        headerLeft:() => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item 
                    title="Menu" 
                    iconName="ios-menu" 
                    onPress={() =>{ navData.navigation.toggleDrawer()}}
                    />
            </HeaderButtons>
        ),
        headerRight:() => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item 
                    title="Save" 
                    iconName="ios-save" 
                    onPress={navData.navigation.getParam('save')}
                    />
            </HeaderButtons>
        )
    }    
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center'
    },
    title:{
        fontFamily:'open-sans-bold',
        fontSize:22,
        margin:20,
        textAlign:'center'
    },
    filterContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'90%',
        marginVertical:10
    }

});

export default FilterScreen;

