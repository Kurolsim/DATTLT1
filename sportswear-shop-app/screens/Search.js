import { View, Text, Feather , StyleSheet, TextInput} from 'react-native'
import React from 'react'
import {useState, useEffect} from "react";
import SearchFilter from "./SearchFilter";
import { useNavigation, useRoute } from "@react-navigation/native";
import { firebase } from "../config";

const Search = () => {

const [product, setProduct] = useState([]);
const productRef = firebase.firestore().collection("product");
const { params } = useRoute();
const item = params;
useEffect(() => {
    productRef
      .onSnapshot(
        querySnapshot => {
          const product = [];
          querySnapshot.forEach((doc) => {
            const { brand, category, image, name, oldPrice, price, quantity, size } = doc.data();
            product.push({
              id: doc.id,
              brand,
              category,
              image,
              name,
              oldPrice,
              price,
              quantity,
              size

            });
          });
          setProduct(product);
        });
  }, []);
const [input, setInput] = useState("");
console.log(input);
  return (
  <View
    style={{
    margin: 15,
    width: "90%",
    }}
  >
   <View
    style={{
        padding: 10,
        flexDirection: "row",
        width: "95%",
        backgroundColor: "#d9dbda",
        borderRadius: 10,
        alignItems:"center",
        }}
    >
    <Feather
    name="search"
    size={20}
    color="black"
    style={{ marginLeft: 1, marginRight: 4}}
    />
    <TextInput value={input} onChangeText={(text) => setInput(text)} style={{ fontSize:15 }} placeholder="Search"/>
    </View>
    <SearchFilter data={item} input={input} setInput={setInput}/>
    </View>
  );
}
export default Search;

const styles = StyleSheet.create({});