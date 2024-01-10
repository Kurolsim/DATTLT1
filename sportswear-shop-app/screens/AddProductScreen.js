import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Image } from 'react-native';
import { firebase } from "../config";
class AddProductScreen extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('product');
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
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  storeProduct() {
    if(this.state.name === ''){
     alert('Fill at least product name!')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        name: this.state.name,
        brand: this.state.brand,
        quantity: this.state.quantity,
        price: this.state.price,
        oldPrice: this.state.oldPrice,
        category: this.state.category,
        size: this.state.size,
        image: this.state.image,
      }).then((res) => {
        this.setState({
          name: '',
          brand: '',
         quantity: '',
        price: '',
        oldPrice: '',
        category: '',
        image: '',
        size: '',
        isLoading: false
        });
        this.props.navigation.navigate('ProductScreen')
      })
      .catch((err) => {
        console.error("Error found: ", err);
        this.setState({
          isLoading: false,
        });
      });
    }
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
              value={this.state.price}
              onChangeText={(val) => this.inputValueUpdate(val, 'price')}
          />
        </View>

        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'OldPrice'}
              value={this.state.oldPrice}
              onChangeText={(val) => this.inputValueUpdate(val, 'oldPrice')}
          />
        </View>

        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Category'}
              value={this.state.category}
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
            title='Add product'
            onPress={() => this.storeProduct()} 
            color="#19AC52"
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
export default AddProductScreen;