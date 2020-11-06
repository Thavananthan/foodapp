import React, { useState } from 'react';
import { StyleSheet, View,Text} from 'react-native';
import * as Font from 'expo-font';
import{AppLoading} from 'expo';
import {enableScreens} from 'react-native-screens';
import MealsNavigator from './navigation/MealsNavigator';

import {createStore, combineReducers} from 'redux';
import{Provider}from 'react-redux';
import { composeWithDevTools} from 'redux-devtools-extension';
import mealsReducer from './store/reducers/meals';

enableScreens();

const rootReducer = combineReducers({
  meals: mealsReducer
});

const store =createStore(rootReducer,composeWithDevTools());

const FetchFonts = () => {
  return Font.loadAsync({
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
}


export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded){
      return (
        <AppLoading startAsync={FetchFonts} onFinish={() => setFontLoaded(true)}/>
      )
  }

  return (
    <Provider store={store}>
       <MealsNavigator/>
    </Provider>
   
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
});
