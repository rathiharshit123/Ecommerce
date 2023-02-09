import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItemsToCart } from '../../actions/cartAction'
import './Cart.css'
import  CartItemCard from './CartItemCard'

const Cart = () => {

    const dispatch = useDispatch();
    const {cartItems} = useSelector(state=>state.cart)

    const increaseQuantity = (id,quantity,stock) => {
        console.log("OK")
        if(quantity < stock ){
            console.log("KARRA HU")
            dispatch(addItemsToCart(id,quantity+1))
        }
    }

    const decreaseQuantity = (id,quantity) => {
        console.log("OK2")

        if(quantity > 1  ){
            console.log('KARRA HU 2')
            dispatch(addItemsToCart(id,quantity-1))
        }
    }

  return (
    <Fragment>
        <div className="cartPage">
            <div className="cartHeader">
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
            </div>
            {cartItems && cartItems.map((item)=>(
                <div className="cartContainer">
                <CartItemCard key={item.product} item={item} />
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
    </Fragment>
  )
}

export default Cart