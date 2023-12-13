import { StyleSheet, Text, View, ScrollView, Pressable, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES, images } from "../constants";
import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux"
import {incrementQuantity, decrementQuantity, removeFromCart} from '../redux/CartReducer.js'

const CartScreen = () => {
    const cart = useSelector((state) => state.cart.cart);
    console.log("cart: ", cart)
    const total = cart
        ?.map((item) => item.price * item.quantity)
        .reduce((curr, prev) => curr + prev, 0);
    console.log(total);
    const dispatch = useDispatch();
    const incrementQuantityAction = (item) => {
        dispatch(incrementQuantity(item))
    }
    const decrementQuantityAction = (item) => {
    dispatch(decrementQuantity(item))
    }
    const deleteItem = (item) => {
        dispatch(removeFromCart(item))
    }
    const navigation = useNavigation();
    return (
        <ScrollView>
            <View>
                <Text>OrderPage</Text>
            </View>
            <View>
                <Text>Subtotal: </Text>
                <Text>{total}</Text>
            </View>
            <Text>Detail Available</Text>
            <Pressable>
                <Text>Process to Buy ({cart.length}) items</Text>
            </Pressable>
            <View>
                {cart?.map((item,index) => (
                    <View key={index}>
                        <Pressable>
                            <View>
                                <Image source={{uri:item.image}} 
                                 style={{ width: 200, height: 200}}
                                />
                            </View>
                            <View>
                                <Text>{item?.name}</Text>
                                <Text>{item.price}</Text>
                                <Text>In Stock</Text>
                            </View>
                        </Pressable>
                        <Pressable onPress={() => deleteItem(item)}>
                            <Text>Delete</Text>
                        </Pressable>
                        <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 6,
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.gray,
                height: 48,
                width: 134,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 12,
                borderRadius: 24,
              }}
            >
              <TouchableOpacity
                onPress={() => decrementQuantityAction(item)}
                style={{
                  height: 32,
                  width: 32,
                  borderRadius: 16,
                  backgroundColor: COLORS.white,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Feather name="minus" size={24} color={COLORS.black} />
              </TouchableOpacity>
              <Text style={{ ...FONTS.body3 }}>{item?.quantity}</Text>

              <TouchableOpacity
                onPress={() => incrementQuantityAction(item)}
                style={{
                  height: 32,
                  width: 32,
                  borderRadius: 16,
                  backgroundColor: COLORS.white,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Feather name="plus" size={24} color={COLORS.black} />
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "column" }}>
              <Text style={{ ...FONTS.body4 }}>Price</Text>
              <Text style={{ ...FONTS.h3 }}>${item?.price}</Text>
            </View>
          </View>
                    </View>
                ))}
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('OrderPage') }>
                <Text>Order Product</Text>
            </TouchableOpacity>
        </ScrollView>

    )
}

export default CartScreen

const styles = StyleSheet.create({})