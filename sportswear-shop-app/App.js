import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, Details, Signup, Home } from "./screens"
import BottomTabNavigation from "./navigations/BottomTabNavigation";
import React, {useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import {firebase} from './config';

const Stack = createNativeStackNavigator();
function App() {
  const [fontsLoaded] = useFonts({
    black: require("./assets/fonts/Inter-Black.ttf"),
    bold: require("./assets/fonts/Inter-Bold.ttf"),
    regular: require("./assets/fonts/Inter-Regular.ttf"),
    medium: require("./assets/fonts/Inter-Medium.ttf")
  });
// new codde
const [initializing, setInitializing] = useState(true);
const [user, setUser] = useState();

// Handle user state changes
function onAuthStateChanged(user) {
  setUser(user);
  if(initializing) setInitializing(false);
}

useEffect(() => {
  const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
  return subscriber;
}, []);

const onLayoutRootView = useCallback(async () => {
  if (fontsLoaded) {
    await SplashScreen.hideAsync()
  }
}, [fontsLoaded]);

if (!fontsLoaded) {
  return null
}
if(initializing) return null;

// new code 

  if(!user)
  {
    return(
      // <NavigationContainer>
            <Stack.Navigator initialRouteName='Welcome' onReady={onLayoutRootView}>
            <Stack.Screen
                      name="Login"
                      component={Login}
                      options={{
                        headerShown: false
                      }}
                    />
                        <Stack.Screen
                        name="BottomTabNavigation"
                  component={BottomTabNavigation}
                                          options={{
                                            headerShown: false
                                          }}
                                        />
                                
                                                          <Stack.Screen
                                                            name="Signup"
                                                            component={Signup}
                                                            options={{
                                                              headerShown: false
                                                            }}
                                                          />
                                                         
            </Stack.Navigator>
          // </NavigationContainer>

    );
                                                        }
                                                        return (
                                                          <Stack.Navigator>
                                                            <Stack.Screen 
                                                                name='Home'
                                                                component={Home}
                                                              />
                                                              <Stack.Screen
                                                            name="Details"
                                                            component={Details}
                                                            options={{
                                                              headerShown: false
                                                            }}
                                                          />
                                                          </Stack.Navigator>
                                                        );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}

