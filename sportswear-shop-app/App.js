import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, Home } from "./screens"
import BottomTabNavigation from "./navigations/BottomTabNavigation";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";


const Stack = createNativeStackNavigator();
export default function App() {
const [fontsLoaded] = useFonts({
    black: require("./assets/fonts/Inter-Black.ttf"),
    bold: require("./assets/fonts/Inter-Bold.ttf"),
    regular: require("./assets/fonts/Inter-Regular.ttf"),
    medium: require("./assets/fonts/Inter-Medium.ttf")
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null
  }
  return(
    <NavigationContainer>
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
          </Stack.Navigator>
        </NavigationContainer>

  );
}

