import Toast from 'react-native-toast-message';

export const handleError = (message, otherOptions, titleText) => {
  let title = titleText || 'Error';
  let description = message || 'Something went wrong!';
  Toast.show({
    type: 'error',
    text1: title,
    text2: description,
    topOffset: Platform.OS === 'ios' ? 55 : 25,
    ...otherOptions,
  });
};

export const handleSuccess = (message, defaultDescription = '', otherOptions) => {
  let title = 'Successful';
  let description = message || defaultDescription;
  Toast.show({
    type: 'success',
    text1: title,
    text2: description,
    topOffset: Platform.OS === 'ios' ? 55 : 25,
    ...otherOptions,
  });
};

export const handleInfo = (message, defaultDescription = '', otherOptions) => {
  let title = 'Info';
  let description = message || defaultDescription;
  Toast.show({
    type: 'info',
    text1: title,
    text2: description,
    topOffset: Platform.OS === 'ios' ? 55 : 25,
    ...otherOptions,
  });
};
