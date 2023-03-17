import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image, TouchableOpacity, ActivityIndicator, Platform, RefreshControl
} from 'react-native';
import { Header } from '../../components';
import LinearGradient from 'react-native-linear-gradient';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import { totalSize } from 'react-native-dimension';

const ComponentsScreen = () => {
    const { name, locationId } = route.params;
    // console.log('route.params;-------------name', name, locationId)
    const token = useSelector(state => state.signUpToken);
    const id = useSelector(state => state.qrId);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const currentuserid = useSelector(state => state?.user?.id);
    const reduxData = useSelector(state => state.LocationId);
    return (
        <View>

        </View>
    );
};

export default ComponentsScreen

const styles = StyleSheet.create({

})

