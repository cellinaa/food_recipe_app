import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Keyboard,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { images, COLORS, SIZES, FONTS } from '../constants';
import { CustomButton, CustomInput, Loader } from '../components';
import { AuthContext } from '../context/AuthContext';

const Login = ({ navigation }) => {
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const { login, userInfo, errors, handleError, splashLoading } =
    useContext(AuthContext);

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));

    let regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    let vlength = 6;
    let email = inputs.email;
    let password = inputs.password;

    if (email.length > 0 && !regex.test(email)) {
      handleError('Invalid email!', 'email');
    } else handleError('', 'email');

    if (password.length > 0 && password.length < vlength) {
      handleError(`Password is less than ${vlength} characters!`, 'password');
    } else handleError('', 'password');
  };

  const handleLogin = async () => {
    Keyboard.dismiss();
    let email = inputs.email;
    let password = inputs.password;
    console.log(inputs);

    if (email.length == 0 || email.length == 0) {
      Alert.alert('Wrong Input!', 'Email or password field cannot be empty.', [
        { text: 'Okay' },
      ]);
      return;
    }

    if (userInfo.token == 0) {
      Alert.alert('Invalid User!', 'Email or password is incorrect.', [
        { text: 'Okay' },
      ]);
      return;
    }

    login(email, password);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
      }}>
      <Loader visible={splashLoading} />
      {/* <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.transparent}
      /> */}
      {/* Header */}
      {renderHeader()}
      {/* Detail */}
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
        }}>
        {/* Description */}
        <Text
          style={{
            marginTop: SIZES.radius,
            width: '70%',
            color: COLORS.gray,
            ...FONTS.body3,
          }}>
          Discover more than 1200 food recipes in your hands and cooking it
          easily!
        </Text>
        {/* Buttons */}
        {renderButtons()}
      </View>
    </SafeAreaView>
  );

  function renderButtons() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            alignItems: 'center',
            marginTop: 10,
          }}>
          <CustomInput
            autoCapitalize="none"
            placeholder="Email"
            error={errors.email}
            onChangeText={(text) => handleOnchange(text, 'email')}
          />
          <CustomInput
            autoCapitalize="none"
            placeholder="Password"
            error={errors.password}
            onChangeText={(text) => handleOnchange(text, 'password')}
            secureTextEntry
          />
        </View>
        <View
          style={{
            marginTop: 20,
            justifyContent: 'center',
          }}>
          {/* Login */}
          <CustomButton
            buttonText="Login"
            buttonContainerStyle={{
              paddingVertical: 18,
              borderRadius: 20,
            }}
            colors={[COLORS.darkGreen, COLORS.lime]}
            onPress={() => {
              handleLogin();
            }}
          />
          {/* Sign Up */}
          <CustomButton
            buttonText="Sign Up"
            buttonContainerStyle={{
              marginTop: SIZES.radius,
              paddingVertical: 18,
              borderRadius: 20,
              borderColor: COLORS.darkLime,
              borderWidth: 1,
            }}
            colors={[]}
            onPress={() => navigation.navigate('Register')}
          />
        </View>
      </View>
    );
  }

  function renderHeader() {
    return (
      <View
        style={{
          height: '35%',
        }}>
        <ImageBackground
          source={images.loginBackground}
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}
          resizeMode="cover">
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={[COLORS.transparent, COLORS.black]}
            style={{
              height: 200,
              justifyContent: 'flex-end',
              paddingHorizontal: SIZES.padding,
            }}>
            <Text
              style={{
                width: '80%',
                color: COLORS.white,
                ...FONTS.largeTitle,
                lineHeight: 45,
              }}>
              Cooking a Delicious Food Easily
            </Text>
          </LinearGradient>
        </ImageBackground>
      </View>
    );
  }
};

export default Login;
