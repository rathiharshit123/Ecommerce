import React, {useEffect} from 'react'
import {CgMouse} from 'react-icons/cg'
import "./Home.css"
import Product from "./Product.js"
import MetaData from '../layout/MetaData'
import {  useDispatch } from 'react-redux'
import {getProduct} from "../../actions/productAction"

const product = {
    name: "Blue Tshirt",
    price: "₹3000",
    images: [{url: "https://i.ibb.co/DRST11n/1.webp"}],
    _id: "Harshit"
}

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getProduct())
    }, [dispatch])
    
  return (
    <>

    <MetaData title="Ecommerce"/>

        <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
                <button>
                    Scroll <CgMouse/>
                </button>
            </a>
        </div>

        <h2 className="homeHeading">Featured Products</h2>

        <div className="container" id='container'>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
        </div>
    </>
  )
}

export default Home