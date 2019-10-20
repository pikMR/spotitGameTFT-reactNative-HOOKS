import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './app/store'; //Import the store
import Home from './app/components/home' //Import the component file
import {createStackNavigator} from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Info from "./app/pages/info";

const AppNavigator = createStackNavigator({
A: {
screen: Home,
navigationOptions: () => ({
  title: `LOL TACTICS`,
  header: null
}),
},
B: {
screen: Info,
navigationOptions: () => ({
  title: `HELP`
}),
}
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );
    }
}
