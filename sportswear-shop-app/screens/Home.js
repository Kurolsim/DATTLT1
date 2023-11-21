import { View, Text, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, images, SIZES, FONTS } from '../constants'
import { Feather } from "@expo/vector-icons"
import { latestList, shoesList1, hatList1 } from '../constants/data'
import {firebase} from '../config';
import {useNavigation, StackActions} from '@react-navigation/native';

const Home = () => {
    const [name, setName] = useState('');
    const navigation = useNavigation();
        useEffect(() =>{
            firebase.firestore().collection('users')
            .doc(firebase.auth().currentUser.uid).get()
            .then((snapshot)=>{ 
                if(snapshot.exists){ 
                    setName(snapshot.data()) 
                    console.log('User exits')
                    console.log('Snapshot data:', snapshot.data());
                }
                else {
                    console.log('User does not exits')
                    console.log('Snapshot data:', snapshot.data());
                }
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
              });

        }, [])
  return (
   <SafeAreaView style={{
    flex: 1,
    backgroundColor: COLORS.white
   }}>
     <View style={{
        marginHorizontal: 22,
        marginTop: 12
     }}>
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
        <View>
            <Text style={{
                fontSize: 15,
                color: COLORS.black,
                marginVertical:5
                    }}>Hello, Welcome</Text>
                <Text style={{
                    ...FONTS.h3,
                     }}>{name.firstName}</Text>
                             <TouchableOpacity
                onPress={() => {firebase.auth().signOut()}}
                style={{
                    marginTop:10,
                    height:50,
                    width:90,
                    backgroundColor:'#026efd',
                    alignItems:'center',
                    justifyContent:'center',
                    borderRadius:50,
                }}
            >
                <Text style={{fontSize:22, fontWeight:'bold'}}>
                    Sign out
                </Text>
            </TouchableOpacity>
        </View>

            <View>
                <Image
                source={images.avatar}
                style={{
                height: 50,
                 width: 50
               }}
               />
            </View>
        </View>

        <ScrollView>
        <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 20
                }}>
                <View>
                <Image
                  source={images.optionNav}
                  style={{
                   height: 35,
                    width: 35,
                    marginHorizontal: 15
                       }}
                    />
                    <Text style={{
                        fontSize: 15,
                        color: COLORS.black,
                        marginVertical:5,
                        marginHorizontal: 5
                        }}>
                        All items
                    </Text>
                    </View>
                    <View>
                    <Image
                  source={images.hatNav}
                  style={{
                   height: 35,
                    width: 35,
                    marginHorizontal: 9
                       }}
                    />
                    <Text style={{
                        fontSize: 15,
                        color: COLORS.black,
                        marginVertical:5,
                        marginHorizontal: 0
                        }}>
                        Clothes
                    </Text>
                    </View>
                    <View>
                    <Image
                  source={images.watchNav}
                  style={{
                   height: 35,
                    width: 35,
                    marginHorizontal: 20
                       }}
                    />
                    <Text style={{
                        fontSize: 15,
                        color: COLORS.black,
                        marginVertical:5,
                        marginHorizontal: 15
                        }}>
                        Watch
                    </Text>
                    </View>

                </View>
            <View  style={{
            backgroundColor: COLORS.gray,
            borderRadius: 20,
            marginTop: SIZES.padding,
            width: SIZES.width - 44
          }}>
            </View>

            <View style={{
                marginBottom: 10
            }}>
            <Text style={{
                    ...FONTS.h3,
                    marginVertical: 10,}}> Today Suggestion:
            </Text>
                <FlatList
                  horizontal={true}
                  data={latestList}
                  keyExtractor={item=>item.id}
                  renderItem={
                    ({ item, index })=>(
                        <View style={{
                            marginRight: SIZES.padding
                        }}>
                            <TouchableOpacity
                             onPress={()=> navigation.navigate('Details')}
                            >
                                <Image
                                 source={item.image}
                                 style={{
                                    height: 140,
                                    width: 140
                                 }}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                              onPress={()=>navigation.navigate('Details')}
                            >
                                <Text style={{
                                    fontSize: 14,
                                    color: COLORS.black,
                                    fontWeight: "bold"
                                }}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                            <Text style={{
                                fontSize: 10,
                                color: COLORS.black
                            }}>
                                {item.category}
                            </Text>

                            <View style={{
                                flexDirection: "row"
                            }}>
                                {
                                    item.oldPrice !== item.price && (
                                        <Text style={{
                                            fontSize: 12,
                                            marginVertical: 4,
                                            marginRight: 6,
                                            textDecorationColor: COLORS.black,
                                            textDecorationLine: "line-through"
                                        }}>
                                            ${item.oldPrice}
                                        </Text>
                                    )
                                }

                                <Text style={{
                                     fontSize: 12,
                                     marginVertical: 4
                                }}>
                                    ${item.price}
                                </Text>
                            </View>
                        </View>
                    )
                  }
                />
<Text style={{
                    ...FONTS.h3,
                    marginVertical: 10,}}> Shoes:
            </Text>
                <FlatList
                  horizontal={true}
                  data={shoesList1}
                  keyExtractor={item=>item.id}
                  renderItem={
                    ({ item, index })=>(
                        <View style={{
                            marginRight: SIZES.padding
                        }}>
                            <TouchableOpacity
                             onPress={()=>navigation.navigate("Details")}
                            >
                                <Image
                                 source={item.shoes}
                                 style={{
                                    height: 140,
                                    width: 140
                                 }}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                              onPress={()=>navigation.navigate("Details")}
                            >
                                <Text style={{
                                    fontSize: 14,
                                    color: COLORS.black,
                                    fontWeight: "bold"
                                }}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                            <Text style={{
                                fontSize: 10,
                                color: COLORS.black
                            }}>
                                {item.category}
                            </Text>

                            <View style={{
                                flexDirection: "row"
                            }}>
                                {
                                    item.oldPrice !== item.price && (
                                        <Text style={{
                                            fontSize: 12,
                                            marginVertical: 4,
                                            marginRight: 6,
                                            textDecorationColor: COLORS.black,
                                            textDecorationLine: "line-through"
                                        }}>
                                            ${item.oldPrice}
                                        </Text>
                                    )
                                }

                                <Text style={{
                                     fontSize: 12,
                                     marginVertical: 4
                                }}>
                                    ${item.price}
                                </Text>
                            </View>
                        </View>
                    )
                  }
                />
<Text style={{
                    ...FONTS.h3,
                    marginVertical: 10,}}> Hat:
            </Text>
                <FlatList
                  horizontal={true}
                  data={hatList1}
                  keyExtractor={item=>item.id}
                  renderItem={
                    ({ item, index })=>(
                        <View style={{
                            marginRight: SIZES.padding,
                            marginBottom: 200,
                        }}>
                            <TouchableOpacity
                             onPress={()=>navigation.navigate("Details")}
                            >
                                <Image
                                 source={item.hats}
                                 style={{
                                    height: 140,
                                    width: 140
                                 }}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                              onPress={()=>navigation.navigate("Details")}
                            >
                                <Text style={{
                                    fontSize: 14,
                                    color: COLORS.black,
                                    fontWeight: "bold"
                                }}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                            <Text style={{
                                fontSize: 10,
                                color: COLORS.black
                            }}>
                                {item.category}
                            </Text>

                            <View style={{
                                flexDirection: "row"
                            }}>
                                {
                                    item.oldPrice !== item.price && (
                                        <Text style={{
                                            fontSize: 12,
                                            marginVertical: 4,
                                            marginRight: 6,
                                            textDecorationColor: COLORS.black,
                                            textDecorationLine: "line-through"
                                        }}>
                                            ${item.oldPrice}
                                        </Text>
                                    )
                                }

                                <Text style={{
                                     fontSize: 12,
                                     marginVertical: 4
                                }}>
                                    ${item.price}
                                </Text>
                            </View>
                        </View>
                    )
                  }
                />
            </View>
        </ScrollView>
     </View>
     
   </SafeAreaView>
  )
}

export default Home