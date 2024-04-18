import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

const HomeScreen = () => {
    const [data, setData] = useState([]);

useEffect(() => {
    fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json')
.then((response) => response.json())
.then((data) => {
setData(data);
        });
    }, []);

    return (
    <FlatList
        data={data}
        renderItem={({ item }) => (
        <View>
        <Text>{item.name}</Text>
        <Text>{item.description}</Text>
        </View>
    )}
keyExtractor={(item) => item.id}
    />
    );
};

export default HomeScreen;