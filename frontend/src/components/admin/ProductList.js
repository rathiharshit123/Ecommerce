import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { Delete, Edit } from '@material-ui/icons';
import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { clearErrors, getAllProductsAdmin } from '../../actions/productAction';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import './ProductList.css'

const ProductList = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, products } = useSelector((state) => state.products);

    useEffect(() => {
      if(error){
        alert.error(error);
        dispatch(clearErrors());
      }
      dispatch(getAllProductsAdmin());
    }, [dispatch,alert,error])
    

    const columns = [
        {field: "id",headerName:"Product ID",mindWidth:200,flex:0.5},
        {field: "name",headerName:"Name",mindWidth:350,flex:1},
        {field: "stock",headerName:"Stock",type:"number",mindWidth:150,flex:0.3},
        {field: "price",headerName:"Price",type:"number",mindWidth:270,flex:0.5},
        {field: "actions",headerName:"Actions",type:"number",mindWidth:150,flex:0.3,sortable:false,renderCell: (params)=>{
            return (
                <Fragment>
                    <Link to={`/admin/product/${params.getValue(params.id,"id")}`} >
                        <Edit/>
                    </Link>
                    <Button>
                        <Delete/>
                    </Button>
                </Fragment>
            )
        }},
    ]

    const rows = [];

    products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: `₹${item.price}`,
        name: item.name,
      });
    });

  return (
    <Fragment>
        <MetaData title= 'All Products - Admin'  />
        <div className="dashboard">
            <Sidebar/>
            <div className="productListContainer">
                <h1 id='productListHeading'>All Products</h1>
                <DataGrid rows={rows} columns= {columns} pageSize={10} disableSelectionOnClick className='productListTable' autoHeight  />
            </div>

        </div>
    </Fragment>
  )
}

export default ProductList