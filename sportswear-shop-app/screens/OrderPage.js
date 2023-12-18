import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { useSelector } from 'react-redux'
const OrderPage = () => {
    const cart = useSelector((state) => state.cart.cart);
    const total = cart
        ?.map((item) => item.price * item.quantity)
        .reduce((curr, prev) => curr + prev, 0);
    return (
        <View>
            <View>
                <Text>Items</Text>
                <Text>${total}</Text>
            </View>
            <View>
                <Text>Order Total</Text>
                <Text>${total}</Text>
            </View>
            <View>
                <Text>Total Items</Text>
                <Text>({cart.length})</Text>
            </View>
        </View>

    )
}

export default OrderPage;

const styles = StyleSheet.create({})