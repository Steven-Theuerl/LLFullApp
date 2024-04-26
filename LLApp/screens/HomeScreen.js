import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, SectionList, StyleSheet, Pressable, Image } from 'react-native';
import { Searchbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Filters from '../components/Filters'
import { createTable, getMenuItems, saveMenuItems, filterByQueryAndCategories } from '../database';
import { getSectionListData, useUpdateEffect } from '../utilities/utilities';
import debounce from 'lodash.debounce';


const dataURL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';

const sections = ['starters', 'mains', 'desserts']

const Item = ({ name, price, description, image }) => (
    <View style={styles.item}>
        <View style={styles.itemBody}>
            <Text style={styles.itemName}>{name}</Text>
            <Text style={styles.itemDescription}>{description}</Text>
            <Text style={styles.itemPrice}>{price}</Text>
        </View>
        <Image
            style={styles.itemImage}
            source={{
                uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`,
            }}
        />
    </View>
);

export const HomeScreen = ( {navigation} ) => {

    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        photo: '',
        orderStatus: false,
        passwordChanges: false,
        specialOffers: false,
        newsletter: false,
    });

    const [data, setData] = useState([]);
    const [searchbarInput, setSearchbarInput] = useState('');
    const [request, setRequest] = useState('');
    const [filterSelections, setFilterSelections] = useState(
        sections.map(() => false)
    );

    const fetchData = async () => {
        try {
            const reply = await fetch(dataURL);
            const json = await reply.json();
            const menu = json.menu.map((item, index) => ({
                id: index + 1,
                name: item.name,
                price: item.price.toString(),
                description: item.description,
                image: item.image,
                category: item.category,
            }));
            return menu;
        } catch (err) {
            console.error(err);
        } finally {
        }
    };

    useEffect(() => {
        (async () => {
            let menuItems = [];
            try {
                await createTable();
                menuItems = await getMenuItems();
                if (!menuItems.length) {
                    menuItems = await fetchData();
                    saveMenuItems(menuItems);
                }
                const sectionListData = getSectionListData(menuItems);
                setData(sectionListData);
                const getProfile = await AsyncStorage.getItem('profile')
                setProfile(JSON.parse(getProfile))
            } catch (err){
            }
        })();
    }, []);

    useUpdateEffect(() => {
        (async () => {
            const selectedCategories = sections.filter((s, i) => {
                if (filterSelections.every((item) => item === false)) {
                    return true;
                }
                return filterSelections[i];
            });
            try {
                const menuItems = await filterByQueryAndCategories(
                    request,
                    selectedCategories
                );
                const sectionListData = getSectionListData(menuItems);
                setData(sectionListData);
            } catch(err) {
                alert(err.message)
            }
        })();
    }, [filterSelections, request])

    const lookup = useCallback((r) => {
        setRequest(r);
    }, []);

    const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

    // debounced lookup, handleSearchChange, and handleFiltersChange

    const searchFunction = (text) => {
        setSearchbarInput(text);
        debouncedLookup(text);
    }

    const filtersChange = async (index) => {
        const newArray = [...filterSelections];
        newArray[index] = !filterSelections[index];
        setFilterSelections(newArray);
    }

    return (

        <>
        <View style={styles.profileHeader}>
            <Image
                style={styles.imageLogo}
                source={require('../images/Logo.png')}
                resizeMode='contain'
            />
            <Pressable
                style={styles.avatarContainer}
                onPress={() => navigation.navigate('ProfileScreen')}>
                    {profile.photo ? (
                        <Image source={{ uri: profile.photo }} style={styles.imageProfile} />
                     ) : (
                        <View style={styles.avatarEmptySmall}>
                            <Text style={styles.avatarEmptySmallText}>
                                {Array.from(profile.firstName)[0]}
                                {Array.from(profile.lastName)[0]}
                        </Text>
                </View>
            )}
            </Pressable>
        </View>
            <View style={styles.heroContainer}>
                <View style={styles.heroSection}>
                    <Text style={styles.heroHeader}>Little Lemon</Text>
                    <View style={styles.heroBody}>
                        <View style={styles.heroText}>
                            <Text style={styles.heroSubheader}>Chicago</Text>
                            <Text style={styles.heroParagraph}>
                                We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
                            </Text>
                        </View>
                        <Image
                        style={styles.heroImage}
                        source={require('../images/heroImage.png')}
                        />
                    </View>
                    <Searchbar
                        style={styles.searchBar}
                        value={searchbarInput}
                        onChangeText={searchFunction}
                        placeholder='Search'
                        placeholderTextColor={'#EDEFEE'}
                        elevation={4}/>
                </View>
            </View>

                <Text style={styles.deliveryText}>
                    ORDER FOR DELIVERY!!!
                </Text>

            <Filters
                selections={filterSelections}
                onChange={filtersChange}
                sections={sections}/>

            <View style={styles.menuContainer}>
                <SectionList
                    style={styles.menuList}
                    sections={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                    <Item
                        name={item.name}
                        price={item.price}
                        description={item.description}
                        image={item.image}
                    />
                    )}
                    renderSectionHeader={({ section: {name} }) => (
                        <Text style={styles.menuItemHeader}>{name}</Text>
                    )}
                />
            </View>
    </>
    );
};




const styles = StyleSheet.create({
    profileHeader: {
        flex: .215,
        width: 428,
        marginTop: 50,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
  },
  button: {
    marginTop: 15,
    marginLeft: 20,
    width: 50,
    height: 50,
    backgroundColor: '#495E57',
    borderRadius: 50,
},
buttonText: {
    fontSize: 30,
    paddingTop: 7,
    paddingLeft: 12,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
 },
 imageLogo: {
    height: 80,
    width: 200,
    marginLeft: 100
  },
  imageProfile: {
    height: 60,
    width: 60,
    marginRight: 30,
    marginTop: 12,
    borderRadius: 60,
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  avatarEmptySmall: {
    height: 60,
    width: 60,
    marginRight: 30,
    borderRadius: 60,
    backgroundColor: "#EE9972",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarEmptySmallText: {
    fontSize: 20,
    color: "#EDEFEE",
    fontWeight: "bold",
  },
  heroContainer: {
    flex: .85,
    backgroundColor: '#495E57',
  },
  heroBody: {
    height: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15,
    marginRight: 15,
  },

  heroHeader: {
    fontSize: 52,
    color: '#F4CE14',
    marginLeft: 15,
    marginTop: 6
  },
  heroText: {
    width: 250
  },
  heroSubheader: {
    fontSize: 36,
    color: '#EDEFEE'
  },
 heroParagraph: {
    marginTop: 12,
    fontSize: 16,
    color: '#EDEFEE'
 },
  heroImage: {
    height: 140,
    width: 120,
    borderRadius: 16
  },
  searchBar: {
    height: 55,
    width: 375,
    borderWidth: 1,
    backgroundColor: '#EDEFEE',
    borderRadius: 8,
    marginLeft: 18,
  },
  menuContainer: {
     flex: 1,
     backgroundColor: '#EDEFEE'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ffffff',
    paddingVertical: 10
  },
  itemBody: {
    flex: 1,
  },
  menuItemHeader: {
    fontSize: 20,
    paddingVertical: 4,
    color: '#495E57',
    backgroundColor: '#EDEFEE',
    marginLeft: 5,
    fontWeight: '500'
  },
  itemName: {
    fontSize: 18,
    color: 'black',
    paddingVertical: 4,
    marginLeft: 10,
    fontWeight: '500'
  },
  itemDescription: {
    fontSize: 14,
    color: '#333333',
     paddingVertical: 4,
     marginLeft: 20
  },
  itemPrice: {
    fontSize: 16,
    color: '#333333',
    paddingVertical: 6,
    marginLeft: 10
  },
  itemImage: {
    height: 100,
    width: 100,
    marginRight: 10,
    marginLeft: 30,
    marginTop: 15
  },

  deliveryText: {
    fontSize: 24,
    paddingVertical: 20,
    marginLeft: 5,
    fontWeight: '600'
  },

})
