import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Pressable,
  Button,
  StyleSheet,
  TextInput,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, images, SIZES, FONTS } from "../constants";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { latestList, shoesList1, hatList1 } from "../constants/data";
import { firebase } from "../config";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";

const Home = () => {

  const [name, setName] = useState("");
  const [product, setProduct] = useState([]);
  const productRef = firebase.firestore().collection("product");
  const [addData, setAddData] = useState("");
  const navigation = useNavigation();
  const { params } = useRoute();
  const item = params;
  useEffect(() => {
    // if(user){
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data());
          console.log("User exits");
          console.log("Snapshot data:", snapshot.data());
        } else {
          console.log("User does not exits");
          console.log("Snapshot data:", snapshot.data());
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

  }, []);

  useEffect(() => {
    productRef
      .onSnapshot(
        querySnapshot => {
          const product = [];
          querySnapshot.forEach((doc) => {
            const { brand, category, image, name, oldPrice, price, quantity } = doc.data();
            product.push({
              id: doc.id,
              brand,
              category,
              image,
              name,
              oldPrice,
              price,
              quantity,


            });
          });
          setProduct(product);
        });
  }, []);


  

  const deleteProduct = (product) => {
    productRef
      .doc(product.id)
      .delete()
      .then(() => {
        alert("deleted successful");
      })
      .catch((error) => {
        alert(error);
      });
  };

  //add a product
  const addProduct = () => {
    //check if we have a product
    if (addData && addData.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        name: addData,
        brand: addData,
        quantity: addData,
        price: addData,
        oldPrice: addData,
        category: addData,
        image: addData,
        createdAt: timestamp,
      };
      productRef
        .add(data)
        .then(() => {
          setAddData("");
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };
  const cart = useSelector((state) => state.cart.cart);
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
          marginHorizontal: 22,
          marginTop: 12,
        }}
      >
        {/* <View style={{ flex: 1, marginTop: 100 }}>
          <FlatList
            style = {{ height: "100%" }}
            data = {users}
            numColumns = {1}
            renderItem ={({item}) => (
                          <Pressable style={StyleSheet.container}> 
                            <View style={StyleSheet.innerContainer}>
                              <Text style={StyleSheet.itemHeading}>{item.heading}</Text>
                              <Text style={StyleSheet.itemText}>{item.text}</Text>
                            </View>
                          </Pressable>
                        )}
            
          />
        </View> */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 15,
                color: COLORS.black,
                marginVertical: 5,
              }}
            >
              Hello, Welcome
            </Text>
            <Text
              style={{
                ...FONTS.h3,
              }}
            >
              {name.username}
            </Text>
          </View>

          <View>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                          <Image
                                source={images.avatar}
                                      style={{
                                          height: 50,
                                          width: 50,
                                        }}
                                      />
                      </TouchableOpacity>

          </View>
        </View>

        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <View>
              <Image
                source={images.optionNav}
                style={{
                  height: 35,
                  width: 35,
                  marginHorizontal: 15,
                }}
              />
              <Text
                style={{
                  fontSize: 15,
                  color: COLORS.black,
                  marginVertical: 5,
                  marginHorizontal: 5,
                }}
              >
                All items
              </Text>
            </View>
            <View>
              <Image
                source={images.hatNav}
                style={{
                  height: 35,
                  width: 35,
                  marginHorizontal: 9,
                }}
              />
              <Text
                style={{
                  fontSize: 15,
                  color: COLORS.black,
                  marginVertical: 5,
                  marginHorizontal: 0,
                }}
              >
                Clothes
              </Text>
            </View>
            <View>
              <Image
                source={images.watchNav}
                style={{
                  height: 35,
                  width: 35,
                  marginHorizontal: 20,
                }}
              />
              <Text
                style={{
                  fontSize: 15,
                  color: COLORS.black,
                  marginVertical: 5,
                  marginHorizontal: 15,
                }}
              >
                Watch
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: COLORS.gray,
              borderRadius: 20,
              marginTop: SIZES.padding,
              width: SIZES.width - 44,
            }}
          ></View>

          <View
            style={{
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                ...FONTS.h3,
                marginVertical: 10,
              }}
            >
              {" "}
              Today Suggestion:
            </Text>
            <FlatList
              data={product}
              horizontal={true}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      marginRight: SIZES.padding,
                    }}
                  >
                    <TouchableOpacity
                      item={item}
                      onPress={() => {
                        console.log('Navigating to Details');
                        navigation.navigate("Details", { item })
                      }}
                    >
                      <Image
                        source={{ uri: item.image }}
                        style={{
                          height: 140,
                          width: 140,
                        }}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity

                      onPress={() => {
                        console.log('Navigating to Details');
                        navigation.navigate("Details")
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          color: COLORS.black,
                          fontWeight: "bold",
                        }}
                      >
                        {item && item.name}
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 10,
                        color: COLORS.black,
                      }}
                    >
                      {item && item.category}
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      {item.oldPrice !== item.price && (
                        <Text
                          style={{
                            fontSize: 12,
                            marginVertical: 4,
                            marginRight: 6,
                            textDecorationColor: COLORS.black,
                            textDecorationLine: "line-through",
                          }}
                        >
                          ${item && item.oldPrice}
                        </Text>
                      )}

                      <Text
                        style={{
                          fontSize: 12,
                          marginVertical: 4,
                        }}
                      >
                        ${item && item.price}
                      </Text>
                    </View>
                  </View>
                )
              }}
            />
            <Text
              style={{
                ...FONTS.h3,
                marginVertical: 10,
              }}
            >
              {" "}
              Shoes:
            </Text>
            <FlatList
              horizontal={true}
              data={shoesList1}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    marginRight: SIZES.padding,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Details")}
                  >
                    <Image
                      source={item.shoes}
                      style={{
                        height: 140,
                        width: 140,
                      }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate("Details")}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: COLORS.black,
                        fontWeight: "bold",
                      }}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 10,
                      color: COLORS.black,
                    }}
                  >
                    {item.category}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    {item.oldPrice !== item.price && (
                      <Text
                        style={{
                          fontSize: 12,
                          marginVertical: 4,
                          marginRight: 6,
                          textDecorationColor: COLORS.black,
                          textDecorationLine: "line-through",
                        }}
                      >
                        ${item.oldPrice}
                      </Text>
                    )}

                    <Text
                      style={{
                        fontSize: 12,
                        marginVertical: 4,
                      }}
                    >
                      ${item.price}
                    </Text>
                  </View>
                </View>
              )}
            />
            <Text
              style={{
                ...FONTS.h3,
                marginVertical: 10,
              }}
            >
              {" "}
              Hat:
            </Text>
            <FlatList
              horizontal={true}
              data={hatList1}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    marginRight: SIZES.padding,
                    marginBottom: 200,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Details")}
                  >
                    <Image
                      source={item.hats}
                      style={{
                        height: 140,
                        width: 140,
                      }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate("Details")}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: COLORS.black,
                        fontWeight: "bold",
                      }}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 10,
                      color: COLORS.black,
                    }}
                  >
                    {item.category}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    {item.oldPrice !== item.price && (
                      <Text
                        style={{
                          fontSize: 12,
                          marginVertical: 4,
                          marginRight: 6,
                          textDecorationColor: COLORS.black,
                          textDecorationLine: "line-through",
                        }}
                      >
                        ${item.oldPrice}
                      </Text>
                    )}

                    <Text
                      style={{
                        fontSize: 12,
                        marginVertical: 4,
                      }}
                    >
                      ${item.price}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
          {/* <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Button
              title="Users List"
              onPress={() => navigation.navigate("UserDetailScreen")}
              color="#19AC52"
            />
          </View> */}

          <View style={{ flex: 1 }}>
            <View style={styles.formContainer}>
              {/* <TextInput
                style={styles.input}
                placeholder='Add a new product' placeholderTextColor='#aaaaaa'
                onChangeText={(name) => setAddData(name)}
                value={addData}
                underlineColorAndroid='transparent' autoCapitalize='none'
              />

              <TouchableOpacity style={styles.button} onPress={addProduct}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity> */}
              <TouchableOpacity onPress={() => navigation.navigate('cart')}>
                <Text>View Cart</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              horizontal={true}
              data={product}
              numColumns={1}
              renderItem={({ item }) => (
                <View>
                  <Pressable
                    style={styles.container}
                    onPress={() => navigation.navigate('Details', { item })}
                  >
                    <FontAwesome
                      name='trash-o'
                      color='red'
                      onPress={() => deleteProduct(item)}
                      style={styles.productIcon}
                    />

                    <View style={styles.innerContainer}>
                      <Text style={styles.itemHeading}>
                        {/* {item.name[0].toUpperCase() + item.name.slice(1)} */}
                        {item.name}
                      </Text>
                    </View>
                  </Pressable>
                </View>
              )}
            >

            </FlatList>
          </View>
        </ScrollView>

      </View>


    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e5e5e5',
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  innerContainer: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 22
  },
  itemHeading: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 22
  },

  formContainer: {
    flexDirection: 'row',
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 100
  },

  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },

  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: '#78ee',
    width: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonText: {
    color: 'white',
    fontSize: 20
  },

  productIcon: {
    marginTop: 5,
    fontSize: 20,
    marginLeft: 14
  }
})
