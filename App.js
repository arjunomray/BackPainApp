import React, { useState, useEffect } from 'react';
import { TouchableOpacity, BackHandler, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ExerciseProvider } from './ExerciseContext';
import { auth } from './firebase';

import AuthLoadingScreen from './components/AuthLoading';
import Onboarding from './screens/Onboarding';
import Auth from './screens/Auth';
import Home from './screens/Home';
import History from './screens/History';
import Profile from './screens/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainApp() {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'list' : 'list-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={Home}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              style={{ marginRight: 15 }}
            >
              <Ionicons name="person-circle-outline" size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen 
        name="History" 
        component={History}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              style={{ marginRight: 15 }}
            >
              <Ionicons name="person-circle-outline" size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <AuthLoadingScreen />;
  }

  return (
    <NavigationContainer>
      <ExerciseProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            <>
              <Stack.Screen name="MainApp" component={MainApp} />
              <Stack.Screen name="Profile" component={Profile} />
            </>
          ) : (
            <>
              <Stack.Screen name="Onboarding" component={Onboarding} />
              <Stack.Screen name="Auth" component={Auth} />
            </>
          )}
        </Stack.Navigator>
      </ExerciseProvider>
    </NavigationContainer>
  );
}
