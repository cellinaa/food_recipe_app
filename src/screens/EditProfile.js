import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Keyboard,
  SafeAreaView,
} from 'react-native';

import { COLORS, icons, styles } from '../constants';
import { AuthContext } from '../context/AuthContext';
import { CustomInput, CustomButton } from '../components';

const EditProfileScreen = ({ navigation }) => {
  const { userInfo, editProfile, errors, handleError } =
    useContext(AuthContext);
  const [inputs, setInputs] = useState({
    name: userInfo.name,
    phone: userInfo.phone,
  });

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));

    let vlength = 6;
    let name = inputs.name;
    let phone = inputs.phone;

    if (name.length > 0 && name.length < vlength) {
      handleError(`Name is less than ${vlength} characters!`, 'edit_name');
    } else handleError('', 'edit_name');

    if (phone.length > 0 && phone.length < 11) {
      handleError(`Phone is less than 11 characters!`, 'edit_phone');
    } else handleError('', 'edit_phone');
  };

  const handleEdit = async () => {
    Keyboard.dismiss();
    let name = inputs.name;
    let phone = inputs.phone;
    let email = userInfo.email;
    console.log(inputs);

    if (name.length == 0 || phone.length == 0) {
      Alert.alert('Wrong Input!', 'All fields cannot be empty.', [
        { text: 'Okay' },
      ]);
      return;
    }

    editProfile(name, phone, email);
    setTimeout(() => {
      navigation.navigate('TabProfile');
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.containerLight}>
      <View
        style={{
          margin: 20,
        }}>
        <View style={{ alignItems: 'center' }}>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ImageBackground
              source={icons.chicken}
              style={{ height: 100, width: 100 }}
              imageStyle={{ borderRadius: 15 }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
            </ImageBackground>
          </View>
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>
            {userInfo.name}
          </Text>
        </View>

        <View
          style={{
            alignItems: 'center',
            marginTop: 10,
          }}>
          <CustomInput
            placeholder="Name"
            value={inputs.name}
            error={errors.edit_name}
            onChangeText={(text) => handleOnchange(text, 'name')}
          />
          <CustomInput
            placeholder="Phone"
            value={inputs.phone}
            error={errors.edit_phone}
            onChangeText={(text) => handleOnchange(text, 'phone')}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            marginTop: 18,
          }}>
          {/* Edit */}
          <CustomButton
            buttonText="Submit"
            buttonContainerStyle={{
              paddingVertical: 18,
              borderRadius: 20,
            }}
            colors={[COLORS.darkGreen, COLORS.lime]}
            onPress={() => {
              handleEdit();
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
