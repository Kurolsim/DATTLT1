import { Button, View, Text, TouchableOpacity, Image, StyleSheet, Pressable, FlatList } from "react-native";
import React, { useState }    from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES, images } from "../constants";
import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";
import { firebase } from "../config";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer.js";

const Details = ({ navigation, route }) => {
  // console.log("Route params:", route.params); 
  const item = route.params.item;

  const [isFavourite, setIsFavourite] = useState(false);
  const [selectedSize, setSelectedSize] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const productRef = firebase.firestore().collection('product');
  const [textName, onChangeNameText] = useState(route.params?.item?.name || '');

  
  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  const updateProduct = () => {
    if(textName && textName.length > 0 && route.params?.item) {
      productRef
      .doc(route.params.item.id)
      .update({
        name: textName,
      }).then (()=> {
        navigation.navigate('Home')
      }).catch((error)=>{
        alert(error.message)
      })
    }
  }


  const [isAddingToCart, setAddingToCart] = useState(false);
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    setAddingToCart(true);
    dispatch(addToCart(item))
    setTimeout(() =>{
      setAddingToCart(false);
    }, 60000)
  }
  const cart = useSelector((state)=> state.cart.cart);
  console.log("cart: ", cart)
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.gray,
        }}
      >
        <View
          style={{
            marginHorizontal: 22,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            position: "absolute",
            width: SIZES.width - 44,
            top: 22,
            zIndex: 999,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="keyboard-arrow-left"
              size={24}
              color={COLORS.black}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
            {isFavourite ? (
              <Ionicons name="md-heart-sharp" size={24} color={COLORS.black} />
            ) : (
              <Ionicons
                name="md-heart-outline"
                size={24}
                color={COLORS.black}
              />
            )}
          </TouchableOpacity>
        </View>

        <Image source={{uri: item.image}} 
        resizeMode="cover" 
        style={{ width: 400, height: 400}}
        />
        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 36,
            paddingHorizontal: 22,

            paddingVertical: 22,
            position: "absolute",
            width: "100%",
            bottom: 0,
          }}
        >
          <Text style={{ ...FONTS.h3 }}>{item.name}</Text>
          <Text style={{ ...FONTS.body3 }}>${item.price}</Text>

            <View style={{ marginVertical: 22 }}>
            <Text style={{ ...FONTS.h4 }}>Select Size</Text>

            <View
              style={{
                flexDirection: "row",
                marginVertical: 18,
              }}
            >
              <TouchableOpacity
                style={[
                  styles.checkboxContainer,
                  selectedSize === "S" && styles.selectedCheckbox,
                ]}
                onPress={() => handleSizeSelection("S")}
              >
                <Text style={[selectedSize === "S" && styles.checkboxText]}>
                  S
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.checkboxContainer,
                  selectedSize === "M" && styles.selectedCheckbox,
                ]}
                onPress={() => handleSizeSelection("M")}
              >
                <Text style={[selectedSize === "M" && styles.checkboxText]}>
                  M
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.checkboxContainer,
                  selectedSize === "L" && styles.selectedCheckbox,
                ]}
                onPress={() => handleSizeSelection("L")}
              >
                <Text style={[selectedSize === "L" && styles.checkboxText]}>
                  L
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.checkboxContainer,
                  selectedSize === "XL" && styles.selectedCheckbox,
                ]}
                onPress={() => handleSizeSelection("XL")}
              >
                <Text style={[selectedSize === "XL" && styles.checkboxText]}>
                  XL
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={{ ...FONTS.h4 }}>Quantity</Text>
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
                onPress={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                  }
                }}
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
              <Text style={{ ...FONTS.body3 }}>{quantity}</Text>

              <TouchableOpacity
                onPress={() => {
                  setQuantity(quantity + 1);
                }}
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
              <Text style={{ ...FONTS.body4 }}>Total Price</Text>
              <Text style={{ ...FONTS.h3 }}>${(item.price + totalPrice) * quantity}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={() => addItemToCart(route?.params?.item)}>
            <Feather name="shopping-bag" size={24} color={COLORS.white} />

           
              {addToCart ? (
                <View>
                  <Text>Added To Bag</Text>
                </View>
              ): (
                  <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.white,
                    marginLeft: 12,
                  }}
                >
                 Add to Bag
                </Text>
              )}
             
          </TouchableOpacity>
        </View>

        {/* <View style={styles.container}>
          <TextInput
              style = {styles.textField}
              onChangeText = {onChangeNameText}
              value = {textName}
              placeholder = "update product"/>

          <Pressable
              style={styles.buttonUpdate}
              onPress={() => {updateProduct()}}>
              <Text>Update product</Text>
          </Pressable>
        </View> */}
      </View>

      
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    width: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.gray,
    marginRight: 12,
  },
  selectedCheckbox: {
    backgroundColor: COLORS.black,
  },
  checkboxText: {
    color: COLORS.white,
    fontSize: 12,
  },
  button: {
    marginTop: 12,
    height: 60,
    width: SIZES.width - 44,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.black,
  },
  container:{
    marginTop: 80,
    marginLeft: 15,
    marginRight: 15,
  },
  textField:{
    marginBottom: 10,
    padding: 10,
    fontSize: 15,
    color: '#000000',
    backgroundColor: '#e0e0e0',
    borderRadius: 5
  },
  buttonUpdate:{
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 10,
    backgroundColor: '#0de065'
  }
});
export default Details;
