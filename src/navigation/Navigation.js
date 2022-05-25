import React, { useContext } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Tabs from '../navigation/Tabs';
import {
  Login,
  Register,
  Recipe,
  EditProfile,
  DrawerContent,
  SearchMultiSelect,
} from '../screens';
import { AuthContext } from '../context/AuthContext';
import { COLORS } from '../constants';
import { Loader } from '../components';

const Stack = createStackNavigator();
const EditProfileStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Navigation = () => {
  const { userInfo } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {userInfo.token ? (
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}
          screenOptions={{
            headerShown: false,
          }}>
          <Drawer.Screen name="Home" component={Tabs} />
          <Drawer.Screen name="PrintPdf" component={Tabs} />
          <Drawer.Screen name="Recipe" component={Recipe} />
          <Drawer.Screen name="Profile" component={Tabs} />
          <Drawer.Screen
            name="SearchMultiSelect"
            component={SearchMultiSelect}
          />
          <Drawer.Screen
            name="EditProfile"
            component={EditProfileStackScreen}
          />
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={'Login'}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigation;

const EditProfileStackScreen = ({ navigation }) => {
  const { splashLoading } = useContext(AuthContext);

  return (
    <EditProfileStack.Navigator>
      <EditProfileStack.Screen
        name="EditProfileScreen"
        component={EditProfile}
        options={{
          headerShown: true,
          title: 'Edit Profile',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <View>
              <Loader addStyle={{ top: -10 }} visible={splashLoading} />
              <View style={{ marginLeft: 10 }}>
                <Icon.Button
                  name="chevron-back-outline"
                  size={25}
                  backgroundColor={COLORS.white}
                  color={COLORS.darkGreen}
                  onPress={() => navigation.goBack()}
                />
              </View>
            </View>
          ),
        }}
      />
    </EditProfileStack.Navigator>
  );
};
