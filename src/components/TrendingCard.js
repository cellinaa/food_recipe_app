import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';

const RecipeCardInfo = ({ recipeItem }) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        paddingHorizontal: SIZES.radius,
        paddingVertical: 5,
        backgroundColor: COLORS.transparentDarkGray,
        borderRadius: SIZES.radius,
      }}>
      {/* Name */}
      <Text
        style={{
          color: COLORS.white,
          ...FONTS.h3,
          width: '70%',
        }}>
        {recipeItem.name}
      </Text>

      {/* Servings */}
      <Text
        style={{
          color: COLORS.lightGray,
          ...FONTS.body4,
        }}>
        {recipeItem.duration} | {recipeItem.serving} serving
      </Text>
    </View>
  );
};

const TrendingCard = ({ containerStyle, recipeItem, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        width: 250,
        height: 350,
        marginRight: 20,
        marginTop: SIZES.radius,
        borderRadius: SIZES.radius,
        ...containerStyle,
      }}
      onPress={onPress}>
      {/* Background Image */}
      <Image
        source={{
          uri: recipeItem.image,
        }}
        resizeMode="cover"
        style={{
          width: 250,
          height: 350,
          borderRadius: SIZES.radius,
        }}
      />

      {/* Category */}
      <View
        style={{
          position: 'absolute',
          top: 20,
          left: 15,
          paddingHorizontal: SIZES.radius,
          paddingVertical: 5,
          backgroundColor: COLORS.transparentGray,
          borderRadius: SIZES.radius,
        }}>
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h4,
          }}>
          {recipeItem.category}
        </Text>
      </View>

      {/* Card Info */}
      <RecipeCardInfo recipeItem={recipeItem} />
    </TouchableOpacity>
  );
};

export default TrendingCard;
