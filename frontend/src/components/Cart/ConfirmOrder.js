import { Typography } from '@material-ui/core'
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import './ConfirmOrder.css'

const ConfirmOrder = ({history}) => {

    const {user} = useSelector(state=>state.user)
    const {shippingInfo, cartItems} = useSelector(state=>state.cart)
    const {userDetails} = user;

    const subtotal = cartItems.reduce((acc,item) => acc + item.quantity * item.price ,0)
    const shippingCharges = subtotal > 999 ? 0: 200;
    const tax = subtotal * 0.18;
    const total = subtotal + shippingCharges + tax;
    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.pincode}`

    const proceedToPaymentHandler = (e) =>{
        e.preventDefault();
        const orderInfo = {
            subtotal,
            tax,
            total,
            address,
            shippingCharges
        }

        sessionStorage.setItem("orderInfo",JSON.stringify(orderInfo))
        history.push("/process/purchase")
    }

  return (
    <Fragment>
        <MetaData title="Confirm Order"/>
        <CheckoutSteps activeStep={1}/>
        <div className="confirmOrderPage">
            <div>
                <div className="confirmShippingArea">
                    <Typography>Shipping Info</Typography>
                    <div className="confirmShippingAreaBox">
                        <div>
                            <p>Name:</p>
                            <span>{userDetails.name}</span>
                        </div>
                        <div>
                            <p>Phone No:</p>
                            <span>{shippingInfo.phoneNo}</span>
                        </div>
                        <div>
                            <p>Address:</p>
                            <span>{address}</span>
                        </div>
                    </div>
                </div>
                <div className="confirmCartItems">
                    <Typography>Your Cart Items:</Typography>
                    <div className="confirmCartItemsContainer">
                        {cartItems && cartItems.map((item)=>(
                            <div key={item.product} >
                                <img src={item.image} alt={item.name} />
                                <Link to={`/product/${item.product}`} >{item.name}</Link>{" "}
                                <span>
                                    {item.quantity} X {item.price} = {" "}
                                    <b>₹{item.price * item.quantity}</b>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/*  */}
            <div>
                <div className="orderSummary">
                    <Typography>Order Summary</Typography>
                    <div>
                        <div>
                            <p>Subtotal:</p>
                            <span>₹{subtotal}</span>
                        </div>
                        <div>
                            <p>Shipping Charges</p>
                            <span>{shippingCharges}</span>
                        </div>
                        <div>
                            <p>GST: </p>
                            <span>₹{tax}</span>
                        </div>
                    </div>
                    <div className="orderSummaryTotal">
                        <p><b>Total:</b></p>
                        <span>₹{total}</span>
                    </div>
                    <button onClick={proceedToPaymentHandler} >Proceed To Payment</button>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default ConfirmOrder