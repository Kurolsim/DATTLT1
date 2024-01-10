// screens/UserDetailScreen.js
import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View,  Image } from 'react-native';
import { firebase } from "../config";
class ProductDetailScreen extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      brand: '',
      quantity: '',
      price: '',
      oldPrice: '',
      category: '',
      size: '',
      image: '',
      isLoading: false
    };
  }
 
  componentDidMount() {
    const dbRef = firebase.firestore().collection('product').doc(this.props.route.params.productkey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const product = res.data();
        this.setState({
          key: res.id,
          name: product.name,
          brand: product.brand,
          quantity: product.quantity,
          price: product.price,
          oldPrice: product.oldPrice,
          category: product.category,
          size: product.size,
          image: product.image,
          isLoading: false
        });
      } else {
        console.log("Document does not exist!");
      }
    });
  }
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  updateProduct() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('product').doc(this.state.key);
    updateDBRef.set({
      name: this.state.name,
      brand: this.state.brand,
      quantity: this.state.quantity,
      price: this.state.price,
      oldPrice: this.state.oldPrice,
      category: this.state.category,
      size: this.state.size,
      image: this.state.image,
    }).then((docRef) => {
      this.setState({
        key: '',
        name: '',
        brand: '',
        quantity: '',
        price: '',
        oldPrice: '',
        category: '',
        size: '',
        image: '',
        isLoading: false
      });
      this.props.navigation.navigate('ProductScreen');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }
  deleteProduct() {
    const dbRef = firebase.firestore().collection('product').doc(this.props.route.params.productkey)
      dbRef.delete().then((res) => {
          console.log('Item removed from database')
          this.props.navigation.navigate('ProductScreen');
      })
  }
  openTwoButtonAlert=()=>{
    Alert.alert(
      'Delete User',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => this.deleteProduct()},
        {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
  }
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
        <TextInput
              placeholder={'Name'}
              value={this.state.name}
              onChangeText={(val) => this.inputValueUpdate(val, 'name')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Brand'}
              value={this.state.brand}
              onChangeText={(val) => this.inputValueUpdate(val, 'brand')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Quantity'}
              value={this.state.quantity}
              onChangeText={(val) => this.inputValueUpdate(val, 'quantity')}
          />
        </View>

        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Price'}
              value={this.state.price.toString()}
              onChangeText={(val) => this.inputValueUpdate(val, 'price')}
          />
        </View>

        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'OldPrice'}
              value={this.state.oldPrice.toString()}
              onChangeText={(val) => this.inputValueUpdate(val, 'oldPrice')}
          />
        </View>

        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Category'}
              value={this.state.category.toString()}
              onChangeText={(val) => this.inputValueUpdate(val, 'category')}
          />
        </View>

        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Size'}
              value={this.state.size}
              onChangeText={(val) => this.inputValueUpdate(val, 'size')}
          />
        </View>


        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Image'}
              value={this.state.image}
              onChangeText={(val) => this.inputValueUpdate(val, 'image')}
          />
        </View>

        <Image style={styles.imageStyle} source={this.state.image ? {uri: this.state.image } : null} />


        <View style={styles.button}>
          <Button
            title='Update'
            onPress={() => this.updateProduct()} 
            color="#19AC52"
          />
          </View>
         <View>
          <Button
            title='Delete'
            onPress={this.openTwoButtonAlert}
            color="#E37399"
          />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginBottom: 7, 
  },
  imageStyle: {
    alignItems: 'center',
    marginTop: 15,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
})
export default ProductDetailScreen;