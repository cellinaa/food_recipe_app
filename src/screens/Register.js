import React, { useState, useContext } from 'react';
import {
  View,
  Image,
  Text,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Keyboard,
  Alert,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { images, COLORS, SIZES, FONTS, icons, styles } from '../constants';
import { CustomButton, CustomInput, Loader } from '../components';
import { AuthContext } from '../context/AuthContext';

const Register = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  });
  const { register, errors, handleError, splashLoading } =
    useContext(AuthContext);

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));

    let regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    let vlength = 6;
    let name = inputs.name;
    let phone = inputs.phone;
    let email = inputs.email;
    let password = inputs.password;

    if (name.length > 0 && name.length < vlength) {
      handleError(`Name is less than ${vlength} characters!`, 'reg_name');
    } else handleError('', 'reg_name');

    if (phone.length > 0 && phone.length < 11) {
      handleError(`Phone is less than 11 characters!`, 'reg_phone');
    } else handleError('', 'reg_phone');

    if (email.length > 0 && !regex.test(email)) {
      handleError('Invalid email!', 'reg_email');
    } else handleError('', 'reg_email');

    if (password.length > 0 && password.length < vlength) {
      handleError(
        `Password is less than ${vlength} characters!`,
        'reg_password',
      );
    } else handleError('', 'reg_password');
  };

  const handleRegister = async () => {
    Keyboard.dismiss();
    let name = inputs.name;
    let phone = inputs.phone;
    let email = inputs.email;
    let password = inputs.password;
    console.log(inputs);

    if (
      name.length == 0 ||
      phone.length == 0 ||
      email.length == 0 ||
      password.length == 0
    ) {
      Alert.alert('Wrong Input!', 'All fields cannot be empty.', [
        { text: 'Okay' },
      ]);
      return;
    }

    register(name, phone, email, password);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
      }}>
      <Loader visible={splashLoading} />
      {/* Header */}
      {renderHeader()}
      {/* Detail */}
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
        }}>
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
            placeholder="Name"
            error={errors.reg_name}
            onChangeText={(text) => handleOnchange(text, 'name')}
          />
          <CustomInput
            autoCapitalize="none"
            placeholder="Email"
            error={errors.reg_email}
            onChangeText={(text) => handleOnchange(text, 'email')}
          />
          <CustomInput
            autoCapitalize="none"
            keyboardType="numeric"
            placeholder="Phone"
            error={errors.reg_phone}
            onChangeText={(text) => handleOnchange(text, 'phone')}
          />
          <CustomInput
            autoCapitalize="none"
            placeholder="Password"
            error={errors.reg_password}
            onChangeText={(text) => handleOnchange(text, 'password')}
            secureTextEntry
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            marginTop: 18,
          }}>
          {/* Register */}
          <CustomButton
            buttonText="Submit"
            buttonContainerStyle={{
              paddingVertical: 18,
              borderRadius: 20,
            }}
            colors={[COLORS.darkGreen, COLORS.lime]}
            onPress={() => {
              handleRegister();
            }}
          />
        </View>
      </View>
    );
  }

  function renderHeader() {
    return (
      <View
        style={{
          height: '30%',
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
              height: 180,
              justifyContent: 'flex-end',
              paddingHorizontal: SIZES.padding,
            }}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                marginLeft: SIZES.padding,
                alignItems: 'center',
                justifyContent: 'center',
                width: 35,
                height: 35,
                borderRadius: 18,
                borderWidth: 1,
                borderColor: COLORS.lightGray,
                backgroundColor: COLORS.transparentBlack5,
              }}
              onPress={() => navigation.goBack()}>
              <Image
                source={icons.back}
                style={{
                  width: 15,
                  height: 15,
                  tintColor: COLORS.lightGray,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                width: '80%',
                color: COLORS.white,
                ...FONTS.largeTitle,
                lineHeight: 45,
              }}>
              Sign Up
            </Text>
          </LinearGradient>
        </ImageBackground>
      </View>
    );
  }
};

export default Register;
