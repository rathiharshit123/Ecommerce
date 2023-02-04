import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product.js";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, products, /*productCount*/ } = useSelector(
    (state) => state.products
  );
  
  useEffect(() => {
    console.log(error,"ERORRR IN HOME COMPONENT")
    if(error){
        return alert.error(error)
    }

    dispatch(getProduct());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch,error]);

  return (
    <>
      {loading ? (
        <Loader/>
      ) : (
        <>
          <MetaData title="Ecommerce" />

          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => <Product product={product} />)}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
