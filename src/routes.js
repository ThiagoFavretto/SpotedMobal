import React from 'react';
import {createAppContainer} from 'react-navigation';
import {Text, TouchableOpacity} from 'react-native';

import {createStackNavigator} from 'react-navigation-stack';

import IconFea from 'react-native-vector-icons/Feather';

import Feed from './pages/Feed';
import New from './pages/New';
import Comment from './pages/Comment';
import Login from './pages/Login';

export default createAppContainer(
  createStackNavigator(
    {
      Feed: {
        screen: Feed,
        navigationOptions: {
          headerTitle: (
            <Text
              style={{
                fontFamily: 'Pacifico',
                marginHorizontal: 20,
                width: 80,
                fontSize: 20,
              }}>
              Spoted
            </Text>
          ),
          headerTintColor: '#000',
          headerBackTitle: null,
          headerLeft: null,
        },
      },
      New: {
        screen: New,
        navigationOptions: {
          headerTitle: (
            <Text
              style={{
                fontFamily: 'Pacifico',
                marginHorizontal: 20,
                width: 80,
                fontSize: 20,
              }}>
              Spoted
            </Text>
          ),
          headerTintColor: '#000',
          headerBackTitle: null,
        },
      },
      Comment: {
        screen: Comment,
        navigationOptions: {
          headerTitle: (
            <Text
              style={{
                fontFamily: 'Pacifico',
                marginHorizontal: 20,
                width: 80,
                fontSize: 20,
              }}>
              Spoted
            </Text>
          ),
          headerTintColor: '#000',
          headerBackTitle: null,
        },
      },
      Login: {
        screen: Login,
        navigationOptions: {
          header: null,
        },
      },
    },
    {
      initialRouteName: 'Login',
    },
    {
      defaultNavigationOptions: {
        headerTitle: (
          <Text
            style={{
              fontFamily: 'Pacifico',
              marginHorizontal: 20,
              width: 80,
              fontSize: 20,
            }}>
            Spoted
          </Text>
        ),
        headerTintColor: '#000',
        headerBackTitle: null,
      },
    },
    {
      mode: 'modal',
    },
  ),
);
