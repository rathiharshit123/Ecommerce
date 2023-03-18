import { Typography } from '@material-ui/core'
import { CreditCard, Event, VpnKey } from '@material-ui/icons'
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'
import React, { Fragment, useEffect, useRef } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, createOrder } from '../../actions/orderAction'
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import './Payment.css'

const Payment = ({history}) => {

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))

    const alert = useAlert();
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef()

    const {user} = useSelector(state=>state.user);
    const {shippingInfo, cartItems} = useSelector(state=>state.cart)
    const {error} = useSelector(state=>state.newOrder);
    const {userDetails} = user;

    const paymentData = {
        amount: Math.round(orderInfo.total * 100)
    }

    const orderData = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.total
    }

    const paymentSubmitHandler = async (e) => {
        e.preventDefault();
        payBtn.current.disabled = true;

        try {
            const config = {headers: {"Content-Type": "application/json"}}
            const response = await axios.post(
                '/api/v1/purchase/initiatePurchase',
                paymentData,
                config
            )
            
            if(response.data.code!== 200) {
                alert.error(response.data.message);
            }
            const {clientSecret} = response.data.data;
            if(!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(clientSecret,{
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: userDetails.name,
                        email: userDetails.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pincode,
                            country: shippingInfo.country
                        }
                    }
                }
            })

            if(result.error) {
                payBtn.current.disabled = false;
                alert.error(result.error.message)
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    orderData.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }
                    dispatch(createOrder(orderData))
                    history.push('/success')
                } else {
                    alert.error("There's some error while processing your payment")
                }
            }


        } catch (error) {
            payBtn.current.disabled = false;
            alert.error(error.response.data.message);
        }
    }

    useEffect(() => {
    window.scrollTo(0,0);
      if(error){
        alert.error(error);
        dispatch(clearErrors());
      }
    }, [dispatch,error,alert])
    

  return (
    <Fragment>
        <MetaData title="Payment - Ecommerce"/>
        <CheckoutSteps activeStep={2}/>
        <div className="paymentContainer">
            <form onSubmit={(e)=> paymentSubmitHandler(e)} className="paymentForm">
                <Typography>Card Info</Typography>
                <div>
                    <CreditCard/>
                    <CardNumberElement className='paymentInput'/>
                </div>
                <div>
                    <Event/>
                    <CardExpiryElement className='paymentInput' />
                </div>
                <div>
                    <VpnKey/>
                    <CardCvcElement className='paymentInput' />
                </div>
                <input type="submit" value={`Pay - ₹${orderInfo && orderInfo.total}`} ref={payBtn} className='paymentFormBtn' />
            </form>
        </div>
    </Fragment>
  )
}

export default Payment