import React, { useContext } from 'react';
import { View, SafeAreaView } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS, icons, styles } from '../constants';
import { AuthContext } from '../context/AuthContext';

const ProfileScreen = () => {
  const { userInfo } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.containerLight}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <Avatar.Image
            style={{ backgroundColor: COLORS.lightGray2 }}
            source={icons.chicken}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}>
              {userInfo.name}
            </Title>
            <Caption style={styles.caption}>
              @{userInfo.name.toLowerCase().replace(/ /g, '_')}
            </Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20} />
          <Text style={{ color: '#777777', marginLeft: 20 }}>Indonesia</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20} />
          <Text style={{ color: '#777777', marginLeft: 20 }}>
            {userInfo.phone}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20} />
          <Text style={{ color: '#777777', marginLeft: 20 }}>
            {userInfo.email}
          </Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: '#dddddd',
              borderRightWidth: 1,
            },
          ]}>
          <Title>5</Title>
          <Caption>Your Recipes</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>12</Title>
          <Caption>Followers</Caption>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Your Favorites</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple>
          <View style={styles.menuItem}>
            <Icon name="share-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Tell Your Friends</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
