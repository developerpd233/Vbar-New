import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Text,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

import vtr from '../../assests/vtr(1).png';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import { totalSize } from 'react-native-dimension';
const Selecter = React.forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  useEffect(() => {
    console.log(value);
  }, [value]);

  const valueHandler = value => {
    if (props?.getIdentify) {
      props.getIdentify(value);
      setOpen(false);
    } else if (props?.getInterested) {
      props.getInterested(value)
      setOpen(false);
    }
    else if (props?.getAge) {
      props.getAge(value)
      setOpen(false);
    }
    else if (props?.getRelationship) {
      props.getRelationship(value)
      setOpen(false);
    }
    // 
    else {
      setValue(item.value);
      setOpen(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => valueHandler(item.value)}>
      <Text
        style={{
          color: '#fff',
          paddingLeft: deviceWidth * 0.009,
          paddingBottom: deviceHeight * 0.05,
        }}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.dropView}>
      <View style={styles.dropViewlable}>
        <Text style={styles.droplabel}>{props.labels}</Text>
      </View>
      {Platform.OS === 'ios' ? (
        <View>
          <View style={styles.inputFildviewandroid}>
            <TouchableOpacity ref={ref} onPress={() => setOpen(!open)}>
              <View style={[styles.inputFild1 ,{paddingTop:value ? deviceHeight * 0.025 : deviceHeight * 0.03}]}>
                <Text style={styles.inputFildText}>
                  {value ? value : props.value}
                </Text>
                <Image
                  style={open ? styles.inputFildimage : styles.AroowupiconStyle}
                  source={vtr}
                />
              </View>
            </TouchableOpacity>
          </View>
          {open && (
            <View
              style={{
                backgroundColor: 'black',
                position: 'absolute',
                zIndex: 9999,
                width: deviceWidth * 0.88,
                borderRadius: 4,
                borderWidth: 2,
                borderColor: '#D1179B',
                marginTop: deviceHeight * 0.075,
                paddingLeft: deviceWidth * 0.02,
                paddingTop: deviceHeight * 0.03,
              }}>
              <FlatList
                data={props.items}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            </View>
          )}
        </View>
      ) : (
        <View>
          <View style={styles.inputFildviewandroid}>
            <TouchableOpacity ref={ref} onPress={() => setOpen(!open)}>
              <View style={styles.inputFild1}>
                <Text style={styles.inputFildText}>
                  {value ? value : props.value}
                </Text>
                <Image
                  style={open ? styles.inputFildimage : styles.AroowupiconStyle}
                  source={vtr}
                />
              </View>
            </TouchableOpacity>
          </View>
          {open && (
            <View
              style={{
                backgroundColor: 'black',
                position: 'absolute',
                zIndex: 9999,
                width: deviceWidth * 0.885,
                borderRadius: 4,
                borderWidth: 2,
                borderColor: '#D1179B',
                marginTop: deviceHeight * 0.06,
                paddingLeft: deviceWidth * 0.02,
                paddingTop: deviceHeight * 0.03,
              }}>
              <FlatList
                data={props.items}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
});

export default Selecter;
const styles = StyleSheet.create({
  inputFildimage: {
    transform: [{ rotate: '180deg' }],
    marginRight: deviceWidth * 0.02,
  },
  droplabel: {
    color: '#fff',
    // fontSize: totalSize(1.9),
    fontSize: 18,
    textTransform: 'capitalize',
  },
  dropView: {
    marginTop: deviceHeight * 0.01,
  },
  dropViewlable: {
    marginBottom: deviceHeight * 0.01,
  },

  AroowupiconStyle: {
    transform: [{ rotate: '0deg' }],
    marginRight: deviceWidth * 0.02,
  },
  inputFildText: {
    fontSize: totalSize(2),
    color: '#ffff',

  },
  inputFild: {
    borderColor: '#D1179B',
    borderWidth: 2,
    
    paddingTop: deviceHeight * 0.01,
    paddingBottom: deviceHeight * 0.01,
    paddingLeft: deviceWidth * 0.1,
    fontSize: totalSize(1.2),
    borderRadius: 5,
    color: '#ffff',
  },
  inputFild1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop:deviceHeight * 0.02,
    justifyContent: 'space-between',
    borderColor: '#D1179B',
    borderWidth: 2,
    // paddingTop: deviceHeight * 0.025,
    paddingLeft: deviceWidth * 0.03,
    paddingBottom: deviceHeight * 0.02,
    fontSize: totalSize(1.2),
    borderRadius: 5,
    color: '#ffff',
    backgroundColor: 'rgba(0, 0, 0,0.25)',
  },
  label: {
    color: '#fff',
    fontSize: totalSize(1.2),
    textTransform: 'capitalize',
  },
  inputFildview: {
    paddingTop: deviceHeight * 0.03,
  },
  inputFildviewandroid: {
    // height:deviceWidth*0.2

    // paddingTop: deviceHeight * 0.03,
  },
});
