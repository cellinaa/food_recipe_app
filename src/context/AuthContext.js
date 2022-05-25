import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { API_URL, KEY } from '../../config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [dataRecipe, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [errors, setErrors] = useState({});
  const [isInfinite, setIsInfinite] = useState(true);

  const getRecipe = async () => {
    try {
      setIsLoading(true);
      setIsInfinite(true);

      let apiUrl = `${API_URL}articles`;
      const response = await axios.get(apiUrl, {
        params: {
          page: currentPage,
          category: 'recipe',
          secure_key: KEY,
        },
        headers: {
          'Content-Type': 'Application/json',
        },
      });
      if (response.data.status == 'ok') {
        setData([...dataRecipe, ...response.data.result]);
        console.log('load recipe');
      }
      setIsLoading(false);
    } catch (e) {
      // console.error(e);
      // Alert.alert('Login Error!', `${e}`, [{ text: 'Okay' }]);
      setIsLoading(false);
      setIsInfinite(false);
    }
  };

  const login = (email, password) => {
    const qlogin = require('query-string');
    setSplashLoading(true);

    axios
      .post(
        `${API_URL}login`,
        qlogin.stringify({
          email: email,
          password: password,
          secure_key: KEY,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .then((res) => {
        let resData = res.data;
        console.log('login');
        console.log(resData);
        if (resData.status == 'ok') {
          let userData = resData.result;
          // console.log(userData);
          setUserInfo(userData);
          AsyncStorage.setItem('userInfo', JSON.stringify(userData));
        } else {
          Alert.alert('Login Error!', `${resData.message}`, [{ text: 'Okay' }]);
        }
        setTimeout(() => {
          setSplashLoading(false);
        }, 1000);
      })
      .catch((e) => {
        console.log(`login error ${e}`);
        Alert.alert('Login Error!', `${e}`, [{ text: 'Okay' }]);
        setSplashLoading(false);
      });
  };

  const logout = () => {
    setSplashLoading(true);
    console.log('logout');
    setTimeout(() => {
      AsyncStorage.removeItem('userInfo');
      setUserInfo({});
      setSplashLoading(false);
    }, 1000);
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);
      console.log(`is logged in`);

      let userData = await AsyncStorage.getItem('userInfo');
      userData = JSON.parse(userData);

      if (userData) {
        setUserInfo(userData);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
      Alert.alert('Is Logged in Error!', `${e}`, [{ text: 'Okay' }]);
    }
  };

  const register = (name, phone, email, password) => {
    const qreg = require('query-string');

    axios
      .post(
        `${API_URL}member`,
        qreg.stringify({
          name: name,
          phone: phone,
          email: email,
          password: password,
          secure_key: `${KEY}`,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .then((res) => {
        let resData = res.data;
        console.log('register');
        console.log(resData);
        if (resData.status == 'ok') {
          let userData = resData.result;
          // console.log(userData);
          setUserInfo(userData);
          AsyncStorage.setItem('userInfo', JSON.stringify(userData));
        }
      })
      .catch((e) => {
        console.log(`register error ${e}`);
        Alert.alert('Register Error!', `${e}`, [{ text: 'Okay' }]);
        setSplashLoading(false);
      });
  };

  const editProfile = (name, phone, email) => {
    const qreg = require('query-string');
    setSplashLoading(true);

    axios
      .put(
        `${API_URL}member`,
        qreg.stringify({
          name: name,
          phone: phone,
          email: email,
          secure_key: `${KEY}`,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .then((res) => {
        let resData = res.data;
        console.log('edit profile');
        console.log(resData);
        if (resData.status == 'ok') {
          let userData = resData.result;
          // console.log(userData);
          setUserInfo(userData);
          AsyncStorage.setItem('userInfo', JSON.stringify(userData));
        }
        setTimeout(() => {
          setSplashLoading(false);
        }, 1000);
      })
      .catch((e) => {
        console.log(`register error ${e}`);
        Alert.alert('Register Error!', `${e}`, [{ text: 'Okay' }]);
        setSplashLoading(false);
      });
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  useEffect(() => {
    console.log('load context');
    isLoggedIn();
    getRecipe();

    return () => {
      setIsLoading(false);
      setSplashLoading(false);
    };
  }, [currentPage]);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        splashLoading,
        userInfo,
        dataRecipe,
        currentPage,
        errors,
        isInfinite,
        setCurrentPage,
        login,
        register,
        logout,
        isLoggedIn,
        getRecipe,
        handleError,
        editProfile,
        setIsInfinite,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
