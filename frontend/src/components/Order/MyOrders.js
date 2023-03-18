import { Typography } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import { Launch } from '@material-ui/icons'
import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearErrors, myOrders } from '../../actions/orderAction'
import Loader from '../layout/Loader/Loader'
import MetaData from '../layout/MetaData'
import './MyOrders.css'

const MyOrders = () => {

    const dispatch = useDispatch();
    const alert = useAlert()
    
    const {loading, error, orders} = useSelector(state=>state.myOrders)
    const {user} = useSelector(state=>state.user);
    const {userDetails} = user;

    useEffect(() => {
    window.scrollTo(0,0);
      if(error){
        alert.error(error);
        dispatch(clearErrors());
      }
      dispatch(myOrders())
    }, [dispatch,alert,error])
    
    const columns = [
        {field: "id", headerName: "Order ID",minWidth:300,flex:0.5},
        {field: "status", headerName: "Status",minWidth:150,flex:0.5,cellClassName: (params)=>{
            return params.getValue(params.id,"status") === 'Delivered' ? 'greenColor': 'redColor'
        }},
        {field:"itemsQty",headerName: "Items Qty", type:"number",minWidth:150,flex:0.3},
        {field:"amount",headerName: "Amount",type: "number",minWidth:270,flex:0.5},
        {field:"actions",headerName: "Actions",type:"number",minWidth:150,flex:0.3, sortable:false,renderCell: (params)=>(
            <Link to={`/orders/${params.getValue(params.id,"id")}`} >
                <Launch/>
            </Link>
        )}

    ];
    const rows = []
    orders && orders.forEach((item) => {
        rows.push({
            itemQty: item.orderItems.length,
            id: item._id,
            status: item.orderStatus,
            amount: item.totalPrice,
        })
    });

  return (
    <Fragment>
        <MetaData title={`${userDetails.name}'s Orders`}/>
        {loading ? <Loader/> : (<div className="myOrdersPage">
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className='myOrdersTable'
                autoHeight
            />
            <Typography id='myOrdersHeading' >{userDetails.name}'s Orders</Typography>
        </div>) }
        
    </Fragment>
  )
}

export default MyOrders