import { Typography } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { clearErrors, getOrderDetails } from '../../actions/orderAction';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import './OrderDetails.css'

const OrderDetails = ({match}) => {
    
    const dispatch = useDispatch();
    const alert = useAlert();
    
    const {order,error,loading} = useSelector(state=>state.orderDetails);

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors());
        }
        dispatch(getOrderDetails(match.params.id))
    }, [dispatch,alert,error,match.params.id])
    

  return (
    <Fragment>
        {loading ? <Loader/> : <Fragment> 
        {console.log("BHAI PEHLE IDHAR AAGYA aur order ki value hai ",order)}
        
        <MetaData title="Order Details"/>
        <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
                <Typography component="h1" >Order #{order && order._id}</Typography> 
                <div className="orderDetailsContainerBox">
                    <div>
                        <p>Name:</p>
                        <span>{order?.userId && order.userId.name}</span>
                    </div>
                    <div>
                        <p>PhoneNo:</p>
                        <span>{order?.shippingInfo && order.shippingInfo.phoneNo}</span>
                    </div>
                    <div>
                        <p>Adress:</p>
                        <span>{order?.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pincode}, ${order.shippingInfo.country}`  }</span>
                    </div>
                </div>
                        <Typography>Payment</Typography>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p className={order?.paymentInfo && order.paymentInfo.status==='succeeded' ? 'greenColor': 'redColor'} >
                                {order?.paymentInfo?.status ==='succeeded' ? 'PAID':'NOT PAID'}
                                </p>
                            </div>
                            <div>
                                <p>Amount: </p>
                                <span>{order && order.totalPrice}</span>
                            </div>
                        </div>
                        <Typography>Order Status</Typography>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p className={order?.orderStatus === 'Delivered' ? 'greenColor' : 'redColor'} >{order?.orderStatus}</p>
                            </div>
                        </div>
                    <div className="orderDetailsCartItems">
                        <Typography>Order Items:</Typography>
                        <div className="orderDetailsCartItemsContainer">
                            {order?.orderItems && order.orderItems.map((item)=>(
                                <div key={item.product} >
                                    <img src={item.image} alt="Product" />
                                    <Link to= {`/product/${item.product}`}>{item.name}</Link>
                                    <span>{item.quantity} X {item.price} =</span>
                                    <b> ₹{item.price * item.quantity}</b>
                                </div>
                            ))}
                        </div>
                    </div>
            </div>
        </div>

    </Fragment>}
    </Fragment>
  );
};

export default OrderDetails