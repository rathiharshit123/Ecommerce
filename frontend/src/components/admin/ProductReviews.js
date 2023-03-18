import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { Delete, Star } from '@material-ui/icons';
import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getAllReviews,deleteReview } from '../../actions/productAction';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import './ProductList.css'
import { DELETE_REVIEW_RESET } from '../../constants/productConstants';
import Loader from '../layout/Loader/Loader';
import './ProductReview.css'

const ProductReviews = ({history}) => {

    const dispatch = useDispatch();
    const alert = useAlert();
    
    const { error, reviews, loading: reviewLoading } = useSelector((state) => state.productReviews);
    const {error: deleteError, isDeleted , loading} = useSelector((state)=>state.review)

    const [productId, setProductId] = useState("")
    
    const productReviewsSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllReviews(productId))
        
    }

    const deleteReviewHandler = (reviewId) => {
        dispatch(deleteReview(reviewId,productId));
    }

    useEffect(() => {
    window.scrollTo(0,0);

        if(productId.length === 24) {
            dispatch(getAllReviews(productId)); 
        }
      if(error){
        alert.error(error);
        dispatch(clearErrors());
      }

      if(deleteError) {
        alert.error(deleteError);
        dispatch(clearErrors());
      }

      if(isDeleted) {
        alert.success('Review Deleted Succesfully');
        history.push("/admin/reviews");
        dispatch({type: DELETE_REVIEW_RESET});
      }
    }, [dispatch,alert,error,history,isDeleted,deleteError,productId])
    

    const columns = [
        {field: "id",headerName:"Review ID",mindWidth:200,flex:0.5},
        {field: "name",headerName:"Name",mindWidth:150,flex:0.5},
        {field: "comment",headerName:"Comment",mindWidth:350,flex:1},
        {field: "rating",headerName:"Rating",type:"number",mindWidth:270,flex:0.5,cellClassName: (params)=>{
            return params.getValue(params.id,"rating") >= 3 ? 'greenColor': 'redColor'
        }},
        {field: "actions",headerName:"Actions",type:"number",mindWidth:150,flex:0.3,sortable:false,renderCell: (params)=>{
            return (
                <Fragment>
                    <Button onClick={()=> deleteReviewHandler(params.getValue(params.id,"id"))}>
                        <Delete/>
                    </Button>
                </Fragment>
            )
        }},
    ]

    const rows = [];

    reviews &&
    reviews.forEach((review) => {
      rows.push({
        id: review._id,
        name: review.name,
        comment: review.comment,
        rating: review.rating,
      });
    });

  return (
    loading || reviewLoading ? <Loader/> :
    <Fragment>
        <MetaData title= 'All Reviews - Admin'  />
        <div className="dashboard">
            <Sidebar/>
            <div className="productReviewsContainer">
            <form className='productReviewsForm' onSubmit={productReviewsSubmitHandler} >
                    <h1 className='productReviewsFormHeading'>All Reviews</h1>
                    <div>
                        <Star/>
                        <input type="text" placeholder='Product Id' required value={productId} onChange={(e)=> setProductId(e.target.value)} />
                    </div>
                    <Button id='createProductBtn' type='submit' disabled= {reviewLoading? true: false} >
                        Search
                    </Button>
                </form>
                {reviews && reviews.length ? <DataGrid rows={rows} columns= {columns} pageSize={10} disableSelectionOnClick className='productListTable' autoHeight  /> : <h1 className='productReviewsFormHeading'>No Reviews Found</h1>}
            </div>

        </div>
    </Fragment>
  )
}

export default ProductReviews