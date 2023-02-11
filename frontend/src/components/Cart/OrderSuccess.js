import { Typography } from '@material-ui/core'
import { CheckCircle } from '@material-ui/icons'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import './OrderSuccess.css'

const OrderSuccess = () => {
  return (
    <Fragment>
        <div className="orderSuccess">
            <CheckCircle/>
            <Typography>Your Order Has Been Placed Successfully</Typography>
            <Link to='order/me'>View Order</Link>
        </div>
    </Fragment>
  )
}

export default OrderSuccess