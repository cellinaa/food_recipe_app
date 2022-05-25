import { Dimensions, StyleSheet, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
  darkGreen: '#229879',
  darkLime: '#1A8871',
  lightLime: '#BBD6C5',
  lime: '#2AD699',
  lightGreen: '#E7F9EF',
  lightGreen1: '#8EbCA0',
  lightRed: '#ff726f',

  white: '#fff',
  white2: '#F9F9F9',
  black: '#020202',
  blue: '#4096FE',
  gray: '#777777',
  gray2: '#F8F8F8',
  lightGray: '#F5F6FB',
  lightGray2: '#757575',

  transparentBlack1: 'rgba(2, 2, 2, 0.1)',
  transparentBlack3: 'rgba(2, 2, 2, 0.3)',
  transparentBlack5: 'rgba(2, 2, 2, 0.5)',
  transparentBlack7: 'rgba(2, 2, 2, 0.7)',
  transparentBlack9: 'rgba(2, 2, 2, 0.9)',

  transparentGray: 'rgba(77,77,77, 0.8)',
  transparentDarkGray: 'rgba(20,20,20, 0.9)',

  transparent: 'transparent',
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};
export const FONTS = {
  largeTitle: { fontFamily: 'Roboto-Black', fontSize: SIZES.largeTitle },
  h1: { fontFamily: 'Roboto-Black', fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: 'Roboto-Bold', fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: 'Roboto-Bold', fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: 'Roboto-Bold', fontSize: SIZES.h4, lineHeight: 22 },
  body1: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
};

export const styles = StyleSheet.create({
  containerLight: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  input: {
    marginTop: SIZES.radius,
    marginBottom: 5,
    paddingVertical: 18,
    paddingHorizontal: 14,
    width: '100%',
    height: 60,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    ...FONTS.body4,
  },
  errorMsg: {
    color: COLORS.lightRed,
    fontSize: 14,
  },
  errorNotif: {
    color: COLORS.lightRed,
    fontSize: 14,
    borderRadius: 10,
    borderWidth: 1,
    color: '#721c24',
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginHorizontal: SIZES.padding,
    marginVertical: 10,
  },
  loader: {
    height: 70,
    backgroundColor: COLORS.white,
    marginHorizontal: 50,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: COLORS.transparentBlack9,
    justifyContent: 'center',
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  droidSafeArea: {
    flex: 1,
    paddingTop: 0,
  },
});

export const safeAreaStyle = StyleSheet.create({});

const appTheme = { COLORS, SIZES, FONTS, styles };

export default appTheme;
