import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Feather } from "react-native-vector-icons";
import SearchFilter from "./SearchFilter";
import { useRoute } from "@react-navigation/native";
import { firebase } from "../config";

const Search = () => {
  const [product, setProduct] = useState([]);
  const productRef = firebase.firestore().collection("product");
  const { params } = useRoute();
  const item = params;

  useEffect(() => {
    productRef.onSnapshot((querySnapshot) => {
      const productData = [];
      querySnapshot.forEach((doc) => {
        const {
          brand,
          category,
          image,
          name,
          oldPrice,
          price,
          quantity,
          size,
        } = doc.data();
        productData.push({
          id: doc.id,
          brand,
          category,
          image,
          name,
          oldPrice,
          price,
          quantity,
          size,
        });
      });
      setProduct(productData);
    });
  }, []);

  const [input, setInput] = useState("");
  const filteredProduct = product.filter((item) =>
    item.name.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Feather
          name="search"
          size={20}
          color="black"
          style={styles.icon}
        />
        <TextInput
          value={input}
          onChangeText={(text) => setInput(text)}
          style={styles.input}
          placeholder="Search"
        />
      </View>
      <SearchFilter data={filteredProduct} input={input} setInput={setInput} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    width: "90%",
    paddingTop: 50,
  },
  searchContainer: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 10,
    alignItems: "center",
  },
  icon: {
    marginLeft: 1,
    marginRight: 4,
  },
  input: {
    fontSize: 15,
  },
});

export default Search;
