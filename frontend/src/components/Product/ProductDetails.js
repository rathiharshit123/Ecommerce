import React, {Fragment,useEffect, useState} from 'react'
import Carousel from 'react-material-ui-carousel'
import { useSelector,useDispatch } from 'react-redux'
import { clearErrors, getProduct } from '../../actions/productAction'
import './ProductDetails.css'
import { useAlert } from "react-alert";
import Loader from '../layout/Loader/Loader'
import ReactStars from 'react-rating-stars-component'
import ReviewCard from './ReviewCard.js'
import MetaData from '../layout/MetaData'
import { addItemsToCart } from '../../actions/cartAction'

const ProductDetails = ({match}) => {
  
  const dispatch = useDispatch();
  const alert = useAlert();
  
  const {product, loading, error} = useSelector(state=>state.productDetail)

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if(quantity < product.stock ){
      setQuantity(quantity+1);
    }
  }

  const decreaseQuantity = () => {
    if(quantity > 1  ){
      setQuantity(quantity-1);
    }
  }

  const addToCartHandler = () => {
    dispatch(addItemsToCart(match.params.id,quantity));
    alert.success("Item Added to Cart Succesfully")
  }
  
  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(match.params.id))
  }, [dispatch,match.params.id,error,alert])

  const options = {
    edit: false,
    color : "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth< 600? 20:25,
    isHalf: true,
    value: product.ratings
  }
  
  return (
    <Fragment>
      {loading? <Loader/> : (<Fragment>
        <MetaData title={`${product.name} --Ecommerce`}/>

      <div className='productDetails'>
        <div>
          <Carousel>
            {product.images && 
              product.images.map((imageObj,index)=>(
                <img
                  className='carouselImage'
                  key = {imageObj.url}
                  src = {imageObj.url}
                  alt = {`${index} Slide`}
                />
              ))
            }
          </Carousel>
        </div>
        <div>
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Product #{product._id}</p>
          </div>
          <div className="detailsBlock-2">
            <ReactStars {...options}/>
            <span>({product.numberOfReviews} Reviews) </span>
          </div>
          <div className="detailsBlock-3">
            <h1>{`₹${product.price}`}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button onClick={decreaseQuantity}>-</button>
                <input readOnly type="number" value={quantity} onChange={()=>{}} />
                <button onClick={increaseQuantity}>+</button>
              </div>
              <button onClick={addToCartHandler}>Add to Cart</button>
            </div>
            <p>
              Status:
              <b className= {product.stock<1? "redColor":"greenColor"}>
                {product.stock<1? "OutOfStock": "InStock"}
              </b>
            </p>
          </div>
          <div className="detailsBlock-4">
            Description: <p>{product.description}</p>
          </div>
          <button className='submitReview'>Submit Review</button>
        </div>
      </div>

      <h3 className="reviewsHeading">REVIEWS</h3>
      {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
    </Fragment>)}
    </Fragment>
  )
}

export default ProductDetails