import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'

const SearchFilter = ({data, input, setInput}) => {
  return (
    <View style={{marginTop:10}}>
      <FlatList data={data} renderItem={({item}) => {
      if(input === ""){
      return (
      <View style={{marginVertical:10}}>
        <Text style={{fontSize:14, fontWeight:"bold"}}>{item.name}</Text>
        <Text style={{borderColor:"gray", borderWidth: 1, height: 1, marginTop: 5}}/>
        </View>
        )
      }

      if(item.name.toLowerCase().includes(input.toLowerCaSe())){
      return(
        <View style={{marginVertical:10}}>
                <Text style={{fontSize:14, fontWeight:"bold"}}>{item.name}</Text>
                <Text style={{borderColor:"gray", borderWidth: 1, height: 1, marginTop: 5}}/>
                </View>
                )
               }

      }}/>
    </View>
  );
}

export default SearchFilter;

const styles = StyleSheet.create({})