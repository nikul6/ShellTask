import { View, Text, Image, ImageBackground, StyleSheet, TextInput, Dimensions, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import ListStation from '../components/ListStation';

export default function SelectStation() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        try {
            fetch('https://reqres.in/api/unknown')
                .then(response => response.json())
                .then(json => { setData(json.data), setFilteredDataSource(json.data) })
                .catch(error => {
                    throw error;
                });
        } catch (error) {
            setError(error);
        }
    }, []);

    const renderData = ({ item }) => <ListStation details={item} />

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = data.filter(function (item) {
                const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            setFilteredDataSource(data);
            setSearch(text);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={require('../aasets/BG.png')} style={styles.bgConatiner} >
                <Text style={styles.headerText}>Select Station</Text>
            </ImageBackground>
            <View style={styles.mainConatiner}>
                <View style={styles.searchBox}>
                    <Image source={require('../aasets/serach.png')} style={{ resizeMode: 'contain', }} />
                    <TextInput
                        value={search}
                        onChangeText={(text) => searchFilterFunction(text)}
                        placeholder="Search by ID, Name, City"
                        style={styles.textInput}
                    />
                </View>
                <FlatList
                    data={filteredDataSource}
                    renderItem={renderData}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    disclaimerMainText: {
        fontSize: 16, marginTop: 0, fontWeight: 'bold'
    },
    disclaimerText: {
        fontSize: 14, marginTop: 5, fontWeight: '500',
        color: '#ADB7C6'
    },
    headerText: {
        fontSize: 20, fontWeight: 'bold', marginBottom:30
    },
    bgConatiner: {
        flex: 0.5, justifyContent: 'center', alignItems: 'center'
    },
    mainConatiner: {
        backgroundColor: '#fff', flex: 1, marginTop: -90,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,

    },
    textInput: {
        flex: 1,
        alignSelf: "center",
        backgroundColor: "#F0F4F5",
        color: "#000",
        fontWeight: '500',
        fontSize: 20,
        marginLeft: 10
    },
    searchBox: {
        flexDirection: 'row', backgroundColor: '#F0F4F5', marginTop: 30, margin: 20, justifyContent: 'center', alignItems: 'center', padding: 20, borderRadius: 10,
    }
});