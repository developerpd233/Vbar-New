import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { requestOneTimePayment, requestBillingAgreement } from 'react-native-paypal'; 

const Paypal = () => {
    
    
    
    const paymet  = async ()=>{


    const resp  = await requestOneTimePayment(
      token,
      {
        amount: '5', // required
        // any PayPal supported currency (see here: https://developer.paypal.com/docs/integration/direct/rest/currency-codes/#paypal-account-payments)
        currency: 'GBP',
        // any PayPal supported locale (see here: https://braintree.github.io/braintree_ios/Classes/BTPayPalRequest.html#/c:objc(cs)BTPayPalRequest(py)localeCode)
        localeCode: 'en_GB', 
        shippingAddressRequired: false,
        userAction: 'commit', // display 'Pay Now' on the PayPal review page
        // one of 'authorize', 'sale', 'order'. defaults to 'authorize'. see details here: https://developer.paypal.com/docs/api/payments/v1/#payment-create-request-body
        intent: 'authorize', 
      }
    );


    const resp2  = await requestBillingAgreement(
      token,
      {
        billingAgreementDescription: 'Your agreement description', // required
        // any PayPal supported currency (see here: https://developer.paypal.com/docs/integration/direct/rest/currency-codes/#paypal-account-payments)
        currency: 'GBP',
        // any PayPal supported locale (see here: https://braintree.github.io/braintree_ios/Classes/BTPayPalRequest.html#/c:objc(cs)BTPayPalRequest(py)localeCode)
        localeCode: 'en_GB',
      }
    );
    const { deviceData } = await requestDeviceData(token);

    }

    
    
  return (
    <View>
      <Text>Paypal</Text>
    </View>
  )
}

export default Paypal

const styles = StyleSheet.create({})