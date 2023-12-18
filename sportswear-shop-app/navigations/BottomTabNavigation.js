import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Ionicons, AntDesign } from "@expo/vector-icons";
import { COLORS } from "../constants";
import CartScreen from "../screens/CartScreen.js";
import Home from "../screens/Home.js";
import Search from "../screens/Search.js";
import Settings from "../screens/Settings";

const Tab = createBottomTabNavigator();

const screenOptions={
    tabBarShowLabel: false,
    headerShown: false,
    tabBarHideOnKeyboard: true,
    tabBarStyle:{
        position: "absolute",
        bottom:20,
        right: 30,
        left: 30,
        elevation: 0,
        height: 60,
        background: COLORS.white,
        backgroundColor: 'black',
        borderRadius: 90,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: {
            width:10,
            height: 10
        }
    }
}
const BottomTabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
           name="Home"
           component={Home}
           options={{
            tabBarIcon: ({ focused })=>{
                return (
                    <MaterialCommunityIcons
                      name={focused ? "home" : "home-outline"}
                      size={24}
                      color={COLORS.white}
                    />
                )
            }
           }}
        />
         <Tab.Screen
           name="Search"
           component={Search}
           options={{
            tabBarIcon: ({ focused })=>{
                return (
                    <Ionicons
                      name="search-sharp"
                      size={24}
                      color={COLORS.white}
                    />
                )
            }
           }}
        />

<Tab.Screen
           name="cart"
           component={CartScreen}
           options={{
            tabBarIcon: ({ focused })=>{
                return (
                    <AntDesign name="shoppingcart"
                    size={24}
                    color="black" />
                )
            }
           }}
        />

<Tab.Screen
           name="Settings"
           component={Settings}
           options={{
            tabBarIcon: ({ focused })=>{
                return (
                    <Ionicons
                      name={focused ? "person" : "person-outline"}
                      size={24}
                      color={COLORS.white}
                    />
                )
            }
           }}
        />
    </Tab.Navigator>
  )
}

export default BottomTabNavigation