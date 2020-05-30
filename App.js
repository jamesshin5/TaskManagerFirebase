import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { createStore } from 'redux'
import MenuScreen from './src/MenuScreen'
import TaskScreen from "./src/TaskScreen";
import { Provider } from 'react-redux'

import lists from './src/reducers/lists'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



/**
 * Store - holds our state - THERE IS ONLY ONE STATE 
 * Action - State can be modified using actions - SIMPLE OBJECTS 
 * Dispatcher - Action needs to be sent by someone - known as dispatching an action
 * Reducer - receives the action and modifies the state to give us a new state 
 *  - pure functions 
 *  - only mandatory argument is the 'type' 
 * Subscriber - listens for state change to update the ui  
 */

const Stack = createStackNavigator();

const store = createStore(lists)


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={MenuScreen}
          />
          <Stack.Screen
            name="Tasks"
            component={TaskScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


