import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import { Favourite, Home, Profile, Search } from "../screens";

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
           name="Favourite"
           component={Favourite}
           options={{
            tabBarIcon: ({ focused })=>{
                return (
                    <Ionicons
                      name={focused ? "heart" : "heart-outline"}
                      size={24}
                      color={COLORS.white}
                    />
                )
            }
           }}
        />

<Tab.Screen
           name="Profile"
           component={Profile}
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