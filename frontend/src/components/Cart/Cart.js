import { Typography } from '@material-ui/core'
import { RemoveShoppingCart } from '@material-ui/icons'
import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction'
import './Cart.css'
import  CartItemCard from './CartItemCard'

const Cart = () => {

    const dispatch = useDispatch();
    const {cartItems} = useSelector(state=>state.cart)

    const increaseQuantity = (id,quantity,stock) => {
        if(quantity < stock ){
            dispatch(addItemsToCart(id,quantity+1))
        }
    }

    const decreaseQuantity = (id,quantity) => {
        if(quantity > 1  ){
            dispatch(addItemsToCart(id,quantity-1))
        }
    }

    const deleteItemFromCart = (id) => {
        dispatch(removeItemsFromCart(id));
    }

  return (
    <Fragment>
        {!cartItems.length ? (
            <div className="emptyCart">
                <RemoveShoppingCart/>
                <Typography>No Product in Your Cart</Typography>
                <Link to="/products"  >View Products</Link>
            </div>
        ) : <Fragment>
        <div className="cartPage">
            <div className="cartHeader">
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
            </div>
            {cartItems && cartItems.map((item)=>(
                <div className="cartContainer" key={item.product}>
                <CartItemCard  item={item} deleteCartItem = {deleteItemFromCart} />
                <div className="cartInput">
                    <button onClick={() => decreaseQuantity(item.product,item.quantity)}>-</button>
                    <input type="number" value={item.quantity} readOnly/>
                    <button onClick={() => increaseQuantity(item.product,item.quantity,item.stock)}>+</button>
                </div>
                <p className='cartSubtotal'>{ `₹${item.price * item.quantity}`}</p>
            </div>
            ))}
            <div className="cartGrossTotal">
                <div></div>
                <div className="cartGrossTotalBox">
                    <p>Gross Total</p>
                    <p>{`₹600`}</p>
                </div>
                <div></div>
                <div className="checkOutBtn">
                    <button>Check Out</button>
                </div>
            </div>
        </div>
    </Fragment>}
    </Fragment>
  )
}

export default Cart