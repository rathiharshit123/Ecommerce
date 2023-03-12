import './App.css';
import Header from "./components/layout/Header/Header"
import {BrowserRouter as Router, Route} from 'react-router-dom'
import WebFont from 'webfontloader';
import React, { useState } from 'react';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home';
import ProductDetails from "./components/Product/ProductDetails"
import Products from "./components/Product/Products"
import Search from "./components/Product/Search"
import LoginSignup from './components/User/LoginSignup';
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from "./components/layout/Header/UserOptions"
import { useSelector } from 'react-redux';
import Profile from './components/User/Profile.js'
import ProtectedRoute from './components/Route/ProtectedRoute';
import UpdateProfile from './components/User/UpdateProfile'
import UpdatePassword from './components/User/UpdatePassword'
import ForgotPassword from './components/User/ForgotPassword'
import ResetPassword from "./components/User/ResetPassword"
import Cart from "./components/Cart/Cart"
import Shipping from './components/Cart/Shipping'
import ConfirmOrder from './components/Cart/ConfirmOrder'
import axios from 'axios';
import Payment from './components/Cart/Payment'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './components/Cart/OrderSuccess'
import MyOrders from './components/Order/MyOrders'
import OrderDetails from './components/Order/OrderDetails'
import Dashboard from './components/Admin/Dashboard'
import ProductList from './components/Admin/ProductList'
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct'

function App() {

  const {user, isAuthenticated} = useSelector(state => state.user)

  const [stripeApiKey, setStripeKey] = useState("")

  async function getStripeKey() {
    const {data} = await axios.get("/api/v1/purchase/getKey");
    let stripeKey = data.data?.stripeApiKey;
    setStripeKey(stripeKey)
  }


  React.useEffect(()=>{
    WebFont.load({
      google:{
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
    store.dispatch(loadUser())
    getStripeKey()
  },[]);


  return (
    <Router>
      <Header/>
      {isAuthenticated && <UserOptions user={user}/>}
      <Route exact path="/" component={Home}/>      
      <Route exact path="/product/get/:id" component={ProductDetails}/>  
      <Route exact path="/products" component={Products} />    
      <Route exact path="/products/:keyword" component={Products} />    
      <Route exact path="/search" component={Search}/>
      <Route exact path="/login" component={LoginSignup} />
      <ProtectedRoute exact path='/account' component={Profile} />
      <ProtectedRoute exact path='/update/profile' component={UpdateProfile} />
      <ProtectedRoute exact path='/update/password' component={UpdatePassword} />
      <Route exact path = '/forgot/password' component={ForgotPassword}/>
      <Route exact path="/reset/password/:token" component={ResetPassword}/>
      <Route exact path = '/cart' component={Cart}/>
      <ProtectedRoute exact path='/shipping' component={Shipping} />
      <ProtectedRoute exact path= '/order/confirm' component={ConfirmOrder}/>

      {stripeApiKey && (<Elements stripe={loadStripe(stripeApiKey)}>
        <ProtectedRoute exact path = '/process/purchase' component={Payment}/>
      </Elements>)}
      <ProtectedRoute exact path = '/success' component={OrderSuccess}/>
      <ProtectedRoute exact path = '/orders' component={MyOrders}/>
      <ProtectedRoute exact path = '/orders/:id' component={OrderDetails}/>
      <ProtectedRoute isAdmin={true} exact path = '/admin/dashboard' component={Dashboard}/>
      <ProtectedRoute isAdmin={true} exact path = '/admin/products' component={ProductList}/>
      <ProtectedRoute isAdmin={true} exact path = '/admin/product' component={NewProduct}/>
      <ProtectedRoute isAdmin={true} exact path = '/admin/product/:id' component={UpdateProduct}/>
      <Footer/>
    </Router>
  );
}

export default App;
