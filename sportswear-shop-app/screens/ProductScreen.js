// screens/UserScreen.js
import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Image, Text } from 'react-native';
import { ListItem } from 'react-native-elements'
import { firebase } from "../config";
class ProductScreen extends Component {
  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('product');
    this.state = {
      isLoading: true,
      userArr: []
    };
  }
  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }
  componentWillUnmount(){
    this.unsubscribe();
  }
  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const { name, brand, quantity, price, oldPrice, category, size, image } = res.data();
      userArr.push({
        key: res.id,
        res,
        name,
        brand,
        quantity,
        price,
        oldPrice,
        category,
        size,
        image,
      });
    });
    console.log('userArr:', userArr);
    this.setState({
      userArr,
      isLoading: false,
   });
  }
  render() {
    console.log('State userArr:', this.state.userArr);
        if(this.state.isLoading){
          return(
            <View style={styles.preloader}>
              <ActivityIndicator size="large" color="#9E9E9E"/>
            </View>
      )
    }    
    return (
       <ScrollView style={styles.container}>
                {
                  this.state.userArr.map((item, i) => {
                    return (
                      <ListItem
                        key={i}
                        chevron
                        bottomDivider
                        title={item.name}
                        leftElement={<Image source={{uri: item.image}} style={styles.productImage} />}
                        onPress={() => {
                          this.props.navigation.navigate('ProductDetailScreen', {
                            productkey: item.key
                          });
                        }}
                      >
                        <View style={styles.productInfo}>
                          <Text style={styles.boldText}>{item.name}</Text>
                          <Text>{item.brand}</Text>
                        </View>
                      </ListItem>
                    );
                  })
                }
            </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 22,
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
  productImage: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    marginRight: 10,
    borderRadius: 5,
  },
  productInfo: {
    marginLeft: 10, // Adjust the margin as needed
  },
  boldText: {
      fontWeight: 'bold',
    },
});

export default ProductScreen;