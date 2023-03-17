import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native'
const BUtton = (props) => {

    return (

        <TouchableOpacity onPress={props.functionName} style={{ ...styles.bView, ...(props.style || {}) }} disabled={props?.disabled || props?.loading || false} >
            <View style={[styles.ButtonsView , props.btnView]} >
                {props?.loading ? <ActivityIndicator size={'small'} color='white' /> :
                    <Text style={props?.type == "scan" ? styles.ScButtons : ''}>{props.title}</Text>}
            </View>
        </TouchableOpacity>

    )
}

export default BUtton
const styles = StyleSheet.create({
    ButtonsView: {
        backgroundColor: "#D1179B",
        width: 240,
        height: 55,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        elevation: 50,
        shadowColor: "#f705a7",
        borderRadius: 5,

        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 20,


    },
    bView: {
        top: 20,
        fontFamily: "Futura",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textTransform: "capitalize"
    },

    ScButtons: {
        fontFamily: "Futura",
        fontSize: 18,
        color: "#FFFFFF",
        textTransform: "capitalize",




    }
});