import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import { FONTS, COLORS, SIZES, icons, images, dummyData } from '../constants';
import { CategoryCard, TrendingCard, Loader } from '../components';
import { AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';

const Home = ({ navigation }) => {
  const {
    userInfo,
    dataRecipe,
    isLoading,
    currentPage,
    setCurrentPage,
    logout,
    splashLoading,
    isInfinite,
  } = useContext(AuthContext);
  const [keyword, setKeyword] = useState('');

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
      {/* <Loader visible={splashLoading} /> */}
      <FlatList
        data={dataRecipe}
        keyExtractor={(item) => `${item.id}`}
        keyboardDismissMode="on-drag"
        showsVerticalIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Header */}
            {renderHeader()}
            {/* Search Bar */}
            {/* {renderSearchBar()} */}
            {/* Trending Section */}
            {renderTrending()}
            {/* Category Header */}
            {renderCategoryHeader()}
          </View>
        }
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
    </SafeAreaView>
  );

  function renderCategoryHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          marginHorizontal: SIZES.padding,
        }}>
        <Text
          style={{
            flex: 1,
            ...FONTS.h2,
          }}>
          Categories
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              color: COLORS.gray,
              ...FONTS.body4,
            }}>
            View All
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderTrending() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
        }}>
        <Text
          style={{
            marginHorizontal: SIZES.padding,
            ...FONTS.h2,
          }}>
          Trending Recipe
        </Text>

        <FlatList
          data={dataRecipe}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item, index }) => {
            return (
              <TrendingCard
                containerStyle={{
                  marginLeft: index == 0 ? SIZES.padding : 0,
                }}
                onPress={() => navigation.navigate('Recipe', { recipe: item })}
                recipeItem={item}
              />
            );
          }}
        />
      </View>
    );
  }

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
          value={keyword}
          placeHolderTextColor={COLORS.gray}
          placeholder="Search Recipes"
          onChangeText={(inputVal) => {
            setKeyword(inputVal);
          }}
          onSubmitEditing={() => {
            navigation.navigate('TabSearch', { search: keyword });
            setKeyword('');
          }}
        />
        <Icon
          size={18}
          name="close"
          color={COLORS.gray}
          onPress={() => {
            setKeyword('');
          }}
        />
      </View>
    );
  }

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: SIZES.padding,
          alignItems: 'center',
          height: 80,
          marginTop: 20,
        }}>
        {/* Text */}
        <View
          style={{
            flex: 1,
          }}>
          <Text
            style={{
              color: COLORS.darkGreen,
              ...FONTS.h2,
            }}>
            {userInfo.name}
          </Text>
          <Text
            style={{
              color: COLORS.gray,
              marginTop: 3,
              ...FONTS.body3,
            }}>
            What do you want to cook today?
          </Text>
        </View>

        {/* Image */}
        <TouchableOpacity
          onPress={() => {
            logout();
          }}>
          <Image
            source={images.shutDown}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
};

export default Home;
