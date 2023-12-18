import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login.js";
import Details from "./screens/Details.js";
import Signup from "./screens/Signup.js";
import Home from "./screens/Home.js";
import OrderPage from "./screens/OrderPage";
import BottomTabNavigation from "./navigations/BottomTabNavigation";
import ProductNavigator from "./navigations/ProductNavigator";
import React, { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { firebase } from "./config";
import { Provider } from "react-redux";
import store from "./store";


const Stack = createNativeStackNavigator();
function App() {
  const [fontsLoaded] = useFonts({
    black: require("./assets/fonts/Inter-Black.ttf"),
    bold: require("./assets/fonts/Inter-Bold.ttf"),
    regular: require("./assets/fonts/Inter-Regular.ttf"),
    medium: require("./assets/fonts/Inter-Medium.ttf"),
  });
  // new code
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // const route = useRoute();
  // const item = route.params;

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  if (initializing) return null;

  // new code

  if (!user) {
    return (
      <Stack.Navigator initialRouteName="Welcome" onReady={onLayoutRootView}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator>
     <Stack.Screen
              name="BottomTabNavigation"
              component={BottomTabNavigation}
              options={{
                headerShown: false,
              }}
            />
        <Stack.Screen
      name="Details"
      component={Details}
      options={{
        headerShown: false
      }}
    />
      <Stack.Screen
      name="ProductNavigator"
      component={ProductNavigator}
      options={{
        headerShown: false
      }}
    />
        <Stack.Screen
      name="OrderPage"
      component={OrderPage}
      options={{
        headerShown: false
      }}
    />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <App/>
      </NavigationContainer>
    </Provider>
  );
};
