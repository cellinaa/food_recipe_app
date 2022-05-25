import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';

const CategoryCard = ({ containerStyle, categoryItem, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.gray2,
        ...containerStyle,
      }}
      onPress={onPress}>
      {/* Image */}
      <Image
        source={{
          uri: categoryItem.image,
        }}
        resizeMode="cover"
        style={{
          width: 100,
          height: 100,
          borderRadius: SIZES.radius,
        }}
      />

      {/* Detail */}
      <View
        style={{
          width: '65%',
          paddingHorizontal: 20,
        }}>
        {/* Name */}
        <Text
          style={{
            flex: 1,
            ...FONTS.h2,
          }}>
          {categoryItem.name}
        </Text>

        {/* Servings */}
        <Text
          style={{
            color: COLORS.gray,
            ...FONTS.body4,
          }}>
          {categoryItem.duration} | {categoryItem.serving} serving
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
