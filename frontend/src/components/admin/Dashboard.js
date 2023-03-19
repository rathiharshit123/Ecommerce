import React, { Fragment, useEffect } from 'react'
import Sidebar from './Sidebar.js'
import './Dashboard.css'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Doughnut, Line } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsAdmin } from '../../actions/productAction.js'
import { getAllOrders } from '../../actions/orderAction.js'
import Loader from '../layout/Loader/Loader.js'
import { getAllUsers } from '../../actions/userAction.js'

const Dashboard = () => {

    const dispatch = useDispatch();
    
    useEffect(() => {
    window.scrollTo(0,0);
        dispatch(getAllProductsAdmin());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
    }, [dispatch])
    
    
    const {products,loading: productsLoading} = useSelector(state=>state.products);
    const {orders, loading: ordersLoading} = useSelector((state)=>state.allOrders);
    const {users, loading: usersLoading} = useSelector((state)=>state.allUsers);

    let outOfStock = 0;
    products && products.forEach((product)=>{
        if(!product.stock) outOfStock++;
    })
    
    let totalAmount = 0;
    orders?.forEach(order => {
      totalAmount+=order.totalPrice
    });

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
          {
            label: "TOTAL AMOUNT",
            backgroundColor: ["tomato"],
            hoverBackgroundColor: ["rgb(197, 72, 49)"],
            data: [0, totalAmount],
          },
        ],
      };

      const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
          {
            backgroundColor: ["#00A6B4", "#6800B4"],
            hoverBackgroundColor: ["#4B5000", "#35014F"],
            data: [outOfStock, products?.length - outOfStock],
          },
        ],
      };


  return (

    <Fragment>
        {(productsLoading || ordersLoading || usersLoading)? <Loader/> : <Fragment>
        <div className="dashboard">
            <Sidebar/>
            <div className="dashboardContainer">
                <Typography component='h1'> Dashboard </Typography>
                <div className="dashboardSummary">
                    <div>
                        <p>Total Amount <br />₹{totalAmount}</p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to='/admin/products' >
                            <p>Product</p>
                            <p>{products && products.length}</p>
                        </Link>
                        <Link to='/admin/orders' >
                            <p>Orders</p>
                            <p>{orders.length}</p>
                        </Link>
                        <Link to='/admin/users' >
                            <p>Users</p>
                            <p>{users.length}</p>
                        </Link>
                    </div>
                </div>
                <div className="lineChart">
                    <Line data={lineState} />
                </div>

                <div className="doughnutChart">
                    <Doughnut data={doughnutState} />
                </div>
            </div>
        </div>
        </Fragment>
        }
    </Fragment>

        
    )
}

export default Dashboard