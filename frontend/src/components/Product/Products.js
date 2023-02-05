import React, {Fragment, useEffect,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './Product.css'
import { clearErrors, getAllProduct } from '../../actions/productAction'
import Loader from '../layout/Loader/Loader'
import ProductCard from '../Home/ProductCard'
import Pagination from 'react-js-pagination'
import { Typography, Slider } from '@material-ui/core'

const Products = ({match}) => {
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0,25000]);

    const {products,productsCount,loading,error,resultPerPage,filteredProductsCount} = useSelector(state => state.products)
    
    const keyword = match.params.keyword
    useEffect(() => {
        dispatch(getAllProduct(keyword,currentPage,price));
    }, [dispatch,keyword,currentPage,price])
    
    const setCurrentPageNo = (e)=>{
        setCurrentPage(e);
    }

    const priceHandler = (e,price) =>{
        setPrice(price);
    }

  return (
    <Fragment>
        {loading? <Loader/> : <Fragment>
            <h2 className="productsHeading">Products</h2>
            <div className="products">
                {products && products.map((product)=>(
                    <ProductCard key={product._id} product = {product} />
                ))}
            </div>

            <div className="filterBox">
                <Typography>Price</Typography>
                <Slider 
                    value={price}
                    onChange = {priceHandler}
                    valueLabelDisplay= "auto"
                    aria-labelledby='range-slider'
                    min={0}
                    max={25000}
                />
            </div>

            {filteredProductsCount > resultPerPage && (
                <div className="paginationBox">
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                />
            </div>
            )}
            
        </Fragment> }
    </Fragment>
  )
}

export default Products