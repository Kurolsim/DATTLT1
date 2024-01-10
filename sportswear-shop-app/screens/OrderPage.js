import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const OrderPage = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  const renderItemsSection = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Items</Text>
      <Text style={styles.sectionValue}>${total.toFixed(2)}</Text>
    </View>
  );

  const renderOrderTotalSection = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Order Total</Text>
      <Text style={styles.sectionValue}>${total.toFixed(2)}</Text>
    </View>
  );

  const renderTotalItemsSection = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Total Items</Text>
      <Text style={styles.sectionValue}>({cart.length})</Text>
    </View>
  );

  const renderEmptyCartMessage = () => (
    <View style={styles.emptyCartContainer}>
      <Text style={styles.emptyCartMessage}>Your cart is empty.</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {cart.length > 0 ? (
        <>
          {renderItemsSection()}
          {renderOrderTotalSection()}
          {renderTotalItemsSection()}
        </>
      ) : (
        renderEmptyCartMessage()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionValue: {
    fontSize: 16,
  },
  emptyCartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyCartMessage: {
    fontSize: 18,
    color: 'gray',
  },
});

export default OrderPage;