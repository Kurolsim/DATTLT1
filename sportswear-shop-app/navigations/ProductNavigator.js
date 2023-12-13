import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {useRoute} from '@react-navigation/native'
import Details from '../screens/Details';
import OrderPage from '../screens/OrderPage';
const Stack = createNativeStackNavigator();
 const ProductNavigator = () => {
    const route = useRoute();
    const item = route.params;
    return (
        <Stack.Navigator 
        initialRouteName='Detail'
        >
            <Stack.Screen 
            name='Details'
            component={Details}
            options={{headerShown: false}}
            initialParams={{item: item}}
            />
             <Stack.Screen 
            name='OrderPage'
            component={OrderPage}
            options={{headerShown: false, presentation:'modal'}}
            />

        </Stack.Navigator>
    )
 }

 export default ProductNavigator

 const styles = StyleSheet.create({})