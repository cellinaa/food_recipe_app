import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Home, Profile, PrintPdf, Search } from '../screens';
import { TabIcon } from '../components';
import { COLORS, icons } from '../constants';

const Tab = createBottomTabNavigator();

const Tabs = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        style: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: COLORS.white,
          borderTopColor: 'transparent',
          height: 100,
        },
      }}>
      <Tab.Screen
        name="TabHome"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} />
          ),
        }}
      />
      <Tab.Screen
        name="TabSearch"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} />
          ),
        }}
      />
      <Tab.Screen
        name="TabProfile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.user} />
          ),
          headerShown: true,
          title: 'Profile',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor={COLORS.white}
                color={COLORS.darkGreen}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{ marginRight: 10, alignItems: 'center' }}>
              <MaterialCommunityIcons.Button
                name="account-edit"
                size={25}
                backgroundColor={COLORS.white}
                color={COLORS.darkGreen}
                onPress={() => navigation.navigate('EditProfile')}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="TabPrintPdf"
        component={PrintPdf}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.print} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
