import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, images } from '../constants';
import { MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../redux/CartReducer';

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  console.log('cart: ', cart);

  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  console.log(total);

  const dispatch = useDispatch();

  const incrementQuantityAction = (item) => {
    dispatch(incrementQuantity(item));
  };

  const decrementQuantityAction = (item) => {
    dispatch(decrementQuantity(item));
  };

  const deleteItem = (item) => {
    dispatch(removeFromCart(item));
  };

  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Order Page</Text>
      </View>
      <View style={styles.subtotalContainer}>
        <Text style={styles.subtotalText}>Subtotal:</Text>
        <Text style={styles.totalAmount}>${total}</Text>
      </View>
      <Text style={styles.detailText}>Detail Available</Text>
      <Pressable style={styles.buyButton}>
        <Text style={styles.buyButtonText}>Process to Buy ({cart.length}) items</Text>
      </Pressable>
      <View>
        {cart?.map((item, index) => (
          <View key={index} style={styles.cartItemContainer}>
            <Pressable style={styles.itemPressable}>
              <View>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
              </View>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item?.name}</Text>
                <Text style={styles.itemPrice}>${item.price}</Text>
                <Text style={styles.itemStock}>In Stock</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => deleteItem(item)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </Pressable>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => decrementQuantityAction(item)} style={styles.quantityButton}>
                <Feather name="minus" size={24} color={COLORS.black} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item?.quantity}</Text>
              <TouchableOpacity onPress={() => incrementQuantityAction(item)} style={styles.quantityButton}>
                <Feather name="plus" size={24} color={COLORS.black} />
              </TouchableOpacity>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Price</Text>
              <Text style={styles.priceAmount}>${item?.price}</Text>
            </View>
          </View>
        ))}
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('OrderPage')} style={styles.orderButton}>
        <Text style={styles.orderButtonText}>Order Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingTop: 50,
  },
  titleContainer: {
    marginBottom: 16,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  subtotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  subtotalText: {
    fontSize: 18,
    color: COLORS.gray,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  detailText: {
    fontSize: 16,
    color: COLORS.secondary,
  },
  buyButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  buyButtonText: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: 16,
  },
  cartItemContainer: {
    marginBottom: 16,
    backgroundColor: COLORS.lightGray,
    padding: 12,
    borderRadius: 8,
  },
  itemPressable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  itemDetails: {
    marginLeft: 16,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: COLORS.primary,
  },
  itemStock: {
    fontSize: 14,
    color: COLORS.success,
  },
  deleteButton: {
    backgroundColor: COLORS.danger,
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  deleteButtonText: {
    color: COLORS.white,
    textAlign: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    ...FONTS.body3,
    marginHorizontal: 8,
  },
  priceContainer: {
    flexDirection: 'column',
    marginTop: 8,
  },
  priceLabel: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  priceAmount: {
    ...FONTS.h3,
    color: COLORS.black,
  },
  orderButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  orderButtonText: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: 16,
  },
});
