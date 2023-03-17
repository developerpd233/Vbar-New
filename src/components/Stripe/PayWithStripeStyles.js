import { StyleSheet } from 'react-native';
import Theme from '../../utils/theme';

export default StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginVertical: 10
    },
    inputInnerContainerStyle: {
        backgroundColor: Theme['light'].colors.tertiary,
        shadowColor: Theme['light'].colors.blackShadow,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.06,
        shadowRadius: 9,
        elevation: 5,
    },
    filterButton: {},
    filterButtonIcon: {
        fontSize: 20
    },
    iconStyle: {
        color: Theme['light'].colors.primary,
        fontSize: 18
    },


    modalOverlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        padding: 25,
    },
    modalContainer: {
        backgroundColor: Theme['light'].colors.tertiary,
        width: '100%',
        minHeight: 'auto',
        borderRadius: 23,
        padding: 20,
        position: 'relative'
    },
    modalHeader: {
        marginTop: 15,
        marginBottom: 30,
    },
    modalHeaderCloseButton: {
        position: 'absolute',
        right: 20,
        top: 20,
        zIndex: 1
    },
    modalHeaderCloseButtonIconStyle: {
        color: Theme['light'].colors.lightText,
        fontSize: 20,
    },
    modalHeaderText: {
        fontFamily: Theme.font.semiBold,
        color: Theme['light'].colors.primary,
        fontSize: 18,
        textAlign: 'center'
    },
    modalBodyContainer: {
        marginTop: 25
    }
});
