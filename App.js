import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

// initialize Firebase if it's not initialized already
const firebaseConfig = {apiKey: "AIzaSyAEwXZAH8hHdrFqRvV_wBx9EUIaTphKhiA",
    authDomain: "taskmanager-avenujamesdemo.firebaseapp.com",
    databaseURL: "https://taskmanager-avenujamesdemo.firebaseio.com",
    projectId: "taskmanager-avenujamesdemo",
    storageBucket: "taskmanager-avenujamesdemo.appspot.com",
    messagingSenderId: "298289146513",
    appId: "1:298289146513:web:3db701b313ffac0cd16d30",
    measurementId: "G-8WQLWSE7SE"}

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({
  host: 'localhost:8080',
  ssl: false,
});

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


