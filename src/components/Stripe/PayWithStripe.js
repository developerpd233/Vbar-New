import React, { useState } from 'react';
import { useStripe } from '@stripe/stripe-react-native'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import BUtton from '../button';
import axios from 'axios';
import { handleError, handleSuccess } from '../toast';

export const PayWithStripe = (props) => {

    const dispatch = useDispatch()
    const navigation = useNavigation();
    const token = useSelector(state => state.signUpToken);
    const stripe = useStripe();

    const { children, amount, callBack, course, counselling, navigate, title } = props;
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);

    const fetchPaymentSheetParams = async (payload) => {
        try {
            stripe
            const response = await axios.post(`http://134.122.30.185:8000/api/stripe/payment-sheet`, { currency: 'usd', paymentMethodType: 'card', paymentMethodOptions: {} },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            const { paymentIntent, ephemeralKey, customer } = await response?.data;
            return {
                paymentIntent,
                ephemeralKey,
                customer,
            };
        } catch (err) {
            handleError(err?.response?.data?.error)
            console.log('Error', err?.response?.data)
            // errorPopup("Error", err?.response?.data?.message);
        }
    };

    const openPaymentSheet = async (clientSecret) => {
        const { error } = await presentPaymentSheet({ clientSecret });
        console.log("🚀 ~ file: PayWithStripe.js:45 ~ openPaymentSheet ~ error", error)
        if (error) {
            if (!error.code === 'Canceled') {
                console.log(`Error code: ${error.code}`, error.message);
                handleError(`${error.message}`);
            } else {
                // callBack && callBack();
            }
        } else {
            handleSuccess('Payment Successfully Done!')
            callBack && callBack();
        }
    };

    const initializePaymentSheet = async (payload) => {
        try {
            setLoading(true);

            const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams(payload);
            const { error } = await initPaymentSheet({
                customerId: customer,
                merchantDisplayName: 'VBar',
                customerEphemeralKeySecret: ephemeralKey,
                paymentIntentClientSecret: paymentIntent,
            });
            if (!error) {
                console.log('paymentIntent', paymentIntent)
                setTimeout(async () => {
                    await openPaymentSheet(paymentIntent)
                }, 500);
            }
        } catch (err) {
            console.log('initializePaymentSheet', err)
            // errorPopup('Error', err.message);
        }
        setLoading(false);
    };

    return children ? children : <>
        <BUtton
            title={title}
            btnView={{margin:10}} 
            style={{ margin: 10 }}
            disabled={loading}
            loading={loading}
            functionName={() => initializePaymentSheet({ amount })}
            
            />


    </>

};

export default PayWithStripe
