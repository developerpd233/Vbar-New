import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, Platform } from 'react-native';
import { totalSize } from 'react-native-dimension';
const TextField = React.forwardRef((props, ref) => {
  return (
    <View>
      <Text style={styles.label}>{props.label}</Text>
      {Platform.OS === 'ios' ? (
        <View style={styles.inputFildview}>
          <TextInput
            ref={ref}
            style={styles.inputFild}
            value={props.value}
            onChangeText={text => props.setValue(text)}
            placeholderTextColor="rgba(255,255,255,0.50)"
            placeholder={props.placeholder}
            {...props}
          />
        </View>
      ) : (
        <View style={styles.inputFildviewandroid}>
          <TextInput
            value={props.value}
            ref={ref}
            onChangeText={text => props.setValue(text)}
            style={styles.inputFild1}
            placeholderTextColor="#FFF9"
            placeholder={props.placeholder}
            {...props}
          />
        </View>
      )}
    </View>
  );
});
const styles = StyleSheet.create({
  inputFild: {
    borderColor: '#D1179B',
    borderWidth: 2,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    fontSize: 18,
    borderRadius: 5,
    color: '#ffff',
    backgroundColor: 'rgba(0, 0, 0,0.25)',
    textTransform: 'capitalize',
  },
  inputFild1: {
    borderColor: '#D1179B',
    borderWidth: 2,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20,
    fontSize: totalSize(2),
    borderRadius: 5,
    color: '#ffff',
    backgroundColor: 'rgba(0, 0, 0,0.25)',
  },
  label: {
    color: '#fff',
    fontSize: 18,
    textTransform: 'capitalize',
  },
  inputFildview: {
    paddingTop: 8,
  },
  inputFildviewandroid: {
    paddingTop: 8,
  },
});

export default TextField;
