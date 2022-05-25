import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import axios from 'axios';

import { API_URL, KEY } from '../../config.js';
import { FONTS, COLORS, SIZES, icons, styles } from '../constants';
import { CategoryCard, AlertDanger } from '../components';
import { AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';

const Search = ({ navigation }) => {
  const { dataRecipe, isInfinite, setIsInfinite, currentPage, setCurrentPage } =
    useContext(AuthContext);
  const [dataSearchRecipe, setDataSearchRecipe] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [errSearch, setErrSearch] = useState('');

  const searchRecipe = async (searchValue) => {
    if (searchValue.length > 0) {
      try {
        setIsLoading(true);

        let apiUrl = `${API_URL}articles`;
        const response = await axios.get(apiUrl, {
          params: {
            page: 1,
            category: 'recipe',
            search: searchValue,
            secure_key: KEY,
          },
          headers: {
            'Content-Type': 'Application/json',
          },
        });
        console.log(response.data);
        if (response.data.status == 'ok') {
          setDataSearchRecipe(response.data.result);
          setErrSearch('');
          console.log('load search');
        } else {
          setDataSearchRecipe([]);
          setErrSearch(response.data.message);
        }
        setIsLoading(false);
        setIsInfinite(false);
      } catch (e) {
        console.error(e);
        // Alert.alert('Login Error!', `${e}`, [{ text: 'Okay' }]);
        setIsLoading(false);
        setIsInfinite(false);
      }
    } else {
      setIsInfinite(true);
      setDataSearchRecipe(dataRecipe);
    }
  };

  useEffect(() => {
    searchRecipe(keyword);
  }, [currentPage]);

  const renderLoader = () => {
    return (
      <View
        style={{
          marginVertical: 18,
        }}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.darkGreen} />
        ) : null}
      </View>
    );
  };

  const loadMoreItem = () => {
    if (isInfinite == true) {
      console.log('load next page');
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <View>
        {/* Search Bar */}
        {renderSearchBar()}
      </View>
      {errSearch ? (
        <AlertDanger errorMsg={errSearch} />
      ) : (
        <FlatList
          data={dataSearchRecipe}
          keyExtractor={(item) => `${item.id}`}
          keyboardDismissMode="on-drag"
          showsVerticalIndicator={false}
          renderItem={({ item }) => {
            return (
              <CategoryCard
                containerStyle={{
                  marginHorizontal: SIZES.padding,
                }}
                categoryItem={item}
                onPress={() => navigation.navigate('Recipe', { recipe: item })}
              />
            );
          }}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0}
        />
      )}
    </SafeAreaView>
  );

  function renderSearchBar() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          alignItems: 'center',
          marginHorizontal: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          borderRadius: 10,
          backgroundColor: COLORS.lightGray,
          marginTop: 40,
          marginBottom: 10,
        }}>
        <Image
          source={icons.search}
          style={{
            width: 20,
            height: 20,
            tintColor: COLORS.gray,
          }}
        />
        <TextInput
          style={{
            marginLeft: SIZES.radius,
            width: '100%',
            ...FONTS.body4,
          }}
          placeHolderTextColor={COLORS.gray}
          placeholder="Search Recipes"
          value={keyword}
          onChangeText={(inputVal) => {
            setKeyword(inputVal);
          }}
          onSubmitEditing={() => {
            searchRecipe(keyword);
          }}
        />
        <Icon
          size={20}
          name="ios-close"
          color={COLORS.gray}
          onPress={() => {
            setKeyword('');
            searchRecipe('');
            setErrSearch('');
          }}
          style={{
            position: 'absolute',
            right: 10,
          }}
        />
      </View>
    );
  }
};

export default Search;
