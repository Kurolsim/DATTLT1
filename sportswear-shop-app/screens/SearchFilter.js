import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SearchFilter = ({ data, input, setInput }) => {
  const navigation = useNavigation();

  const handleItemPress = (item) => {
    // Navigate to the Detail Page with the selected item
    navigation.navigate('Details', { item });
  };

  return (
    <View style={{ marginTop: 10 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          if (input === "") {
            return (
              <TouchableOpacity onPress={() => handleItemPress(item)}>
                <View style={{ marginVertical: 10 }}>
                  <Text style={{ fontSize: 14, fontWeight: "bold" }}>{item.name}</Text>
                  <Text style={{ borderColor: "gray", borderWidth: 1, height: 1, marginTop: 5 }} />
                </View>
              </TouchableOpacity>
            );
          }

          if (item.name.toLowerCase().includes(input.toLowerCase())) {
            return (
              <TouchableOpacity onPress={() => handleItemPress(item)}>
                <View style={{ marginVertical: 10 }}>
                  <Text style={{ fontSize: 14, fontWeight: "bold" }}>{item.name}</Text>
                  <Text style={{ borderColor: "gray", borderWidth: 1, height: 1, marginTop: 5 }} />
                </View>
              </TouchableOpacity>
            );
          }
        }}
      />
    </View>
  );
};

export default SearchFilter;

const styles = StyleSheet.create({});
