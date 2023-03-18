import { Button, Typography } from '@material-ui/core'
import { AccountTree } from '@material-ui/icons'
import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearErrors, getOrderDetails, updateOrder } from '../../actions/orderAction'
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants'
import Loader from '../layout/Loader/Loader'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import './ProcessOrder.css'

const ProcessOrder = ({match}) => {

  const alert = useAlert();
  const dispatch = useDispatch();

  const [status, setStatus] = useState("")

    const {order, error,loading} = useSelector((state)=>state.orderDetails)
    const {error: updateError, isUpdated, loading: updateLoading} = useSelector((state)=>state.order)

    useEffect(() => {
      if(error){
        alert.error(error);
        dispatch(clearErrors())
      }

      if(updateError){
        alert.error(updateError);
        dispatch(clearErrors())
      }

      if(isUpdated) {
        alert.success("Order Updated Successfully");
        dispatch({type: UPDATE_ORDER_RESET})
      }
      
      dispatch(getOrderDetails(match.params.id))
    }, [dispatch,alert,error,match.params.id,updateError,isUpdated])
    

    const processOrderHandler = (e) =>{
      e.preventDefault();
      
      const myForm = new FormData();
      myForm.set("status",status);
      
      dispatch(updateOrder(myForm,match.params.id))
    }

  return (

    <Fragment>
      { (loading || updateLoading) ? <Loader/> : <Fragment>
        <MetaData title= 'Process Order' />
        <div className="dashboard">
            <Sidebar/>
            <div className="newProductContainer">
            <div className="confirmOrderPage" style={{display: order?.orderStatus === 'DELIVERED'? "block": "grid"}}>
            <div>
                <div className="confirmShippingArea">
                    <Typography>Shipping Info</Typography>
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
                                <p className={order?.orderStatus === 'DELIVERED' ? 'greenColor' : 'redColor'} >{order?.orderStatus}</p>
                            </div>
                        </div>
                </div>
                <div className="confirmCartItems">
                    <Typography>Your Cart Items:</Typography>
                    <div className="confirmCartItemsContainer">
                        {order && order.orderItems && order.orderItems.map((item)=>(
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
            <div style={{display: order?.orderStatus === 'DELIVERED' ? "none": "block"}}>
            <form className='updateOrderForm' onSubmit={processOrderHandler} >
                    <h1>Process Order</h1>
                    
                   
                    <div>
                        <AccountTree/>
                        <select onChange ={(e)=> setStatus(e.target.value)}>
                            <option value="" >Choose Status</option>
                            {order?.orderStatus === 'PROCESSING' && <option value="SHIPPED" >SHIPPED</option>}                            
                            {order?.orderStatus === 'SHIPPED' && <option value="DELIVERED" >DELIVERED</option>}                            
                        </select>
                    </div>
                    
                    
                     
                    <Button id='createProductBtn' type='submit' disabled= {loading? true: false || status === ""? true:false} >
                        Process Order
                    </Button>
                </form>
            </div>
        </div>
            </div>
        </div>
    </Fragment> }
    
    </Fragment>
    

  )
}

export default ProcessOrder