import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { Delete, Edit } from '@material-ui/icons';
import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import Loader from '../layout/Loader/Loader';
import { deleteOrder, getAllOrders,clearErrors } from '../../actions/orderAction';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants';

const OrderList = ({history}) => {

    const dispatch = useDispatch();
    const alert = useAlert();
    
    const { error, orders, loading: orderLoading } = useSelector((state) => state.allOrders);
    const {error: orderError, isDeleted , loading} = useSelector((state)=>state.order)
    
    const deleteOrderHandler = (id) => {
      dispatch(deleteOrder(id))
    }

    useEffect(() => {
    window.scrollTo(0,0);
      if(error){
        alert.error(error);
        dispatch(clearErrors());
      }

      if(orderError) {
        alert.error(orderError);
        dispatch(clearErrors());
      }

      if(isDeleted) {
        alert.success('Order Deleted Succesfully');
        history.push("/admin/orders");
        dispatch({type: DELETE_ORDER_RESET});
      }

      dispatch(getAllOrders());
    }, [dispatch,alert,error,history,orderError,isDeleted])
    

    const columns = [
        {field: "id", headerName: "Order ID",minWidth:300,flex:0.5},
        {field: "status", headerName: "Status",minWidth:150,flex:0.5,cellClassName: (params)=>{
            return params.getValue(params.id,"status") === 'Delivered' ? 'greenColor': 'redColor'
        }},
        {field:"itemsQty",headerName: "Items Qty", type:"number",minWidth:150,flex:0.4},
        {field:"amount",headerName: "Amount",type: "number",minWidth:270,flex:0.5},
        {field: "actions",headerName:"Actions",type:"number",mindWidth:150,flex:0.3,sortable:false,renderCell: (params)=>{
            return (
                <Fragment>
                    <Link to={`/admin/order/${params.getValue(params.id,"id")}`} >
                        <Edit/>
                    </Link>
                    <Button onClick={()=> deleteOrderHandler(params.getValue(params.id,"id"))}>
                        <Delete/>
                    </Button>
                </Fragment>
            )
        }},
    ]

    const rows = [];

    orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: `₹${item.totalPrice}`,
        status: item.orderStatus,
      });
    });

  return (
    loading || orderLoading ? <Loader/> :
    <Fragment>
        <MetaData title= 'All Orders - Admin'  />
        <div className="dashboard">
            <Sidebar/>
            <div className="productListContainer">
                <h1 id='productListHeading'>All Orders</h1>
                <DataGrid rows={rows} columns= {columns} pageSize={10} disableSelectionOnClick className='productListTable' autoHeight  />
            </div>

        </div>
    </Fragment>
  )
}
export default OrderList