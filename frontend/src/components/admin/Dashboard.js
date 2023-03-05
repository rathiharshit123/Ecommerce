import React, { useEffect } from 'react'
import Sidebar from './Sidebar.js'
import './Dashboard.css'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Doughnut, Line } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsAdmin } from '../../actions/productAction.js'

const Dashboard = () => {

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAllProductsAdmin());
    }, [dispatch])
    
    
    const {products} = useSelector(state=>state.products);
    let outOfStock = 0;
    products && products.forEach((product)=>{
        if(!product.stock) outOfStock++;
    })

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
          {
            label: "TOTAL AMOUNT",
            backgroundColor: ["tomato"],
            hoverBackgroundColor: ["rgb(197, 72, 49)"],
            data: [0, 4000],
          },
        ],
      };

      const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
          {
            backgroundColor: ["#00A6B4", "#6800B4"],
            hoverBackgroundColor: ["#4B5000", "#35014F"],
            data: [outOfStock, products.length - outOfStock],
          },
        ],
      };

  return (
        <div className="dashboard">
            <Sidebar/>
            <div className="dashboardContainer">
                <Typography component='h1'> Dashboard </Typography>
                <div className="dashboardSummary">
                    <div>
                        <p>Total Amount <br />₹2000 </p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to='/admin/products' >
                            <p>Product</p>
                            <p>{products && products.length}</p>
                        </Link>
                        <Link to='/admin/orders' >
                            <p>Orders</p>
                            <p>4</p>
                        </Link>
                        <Link to='/admin/users' >
                            <p>Users</p>
                            <p>3</p>
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
    )
}

export default Dashboard