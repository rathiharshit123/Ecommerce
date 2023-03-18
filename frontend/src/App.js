import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import WebFont from 'webfontloader';
import React, { useState,useEffect } from 'react';
import store from './store';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {Header,Footer,UserOptions,NotFound} from "./components/layout"
import { loadUser } from './actions/userAction';
import { useSelector } from 'react-redux';
import {UpdateProfile,LoginSignup,UpdatePassword,ForgotPassword,ResetPassword,Profile} from './components/User'
import {Home} from './components/Home';
import {ProductDetails,Products,Search} from "./components/Product"
import {Dashboard,ProductList,ProcessOrder,NewProduct,UserList,UpdateUser,ProductReviews,UpdateProduct,OrderList} from './components/admin'
import ProtectedRoute from './components/Route/ProtectedRoute';
import {Cart,ConfirmOrder,OrderSuccess,Payment,Shipping} from "./components/Cart"
import axios from 'axios';
import {MyOrders,OrderDetails} from './components/Order'


function App() {

  const {user, isAuthenticated} = useSelector(state => state.user)

  const [stripeApiKey, setStripeKey] = useState("")

  async function getStripeKey() {
    const {data} = await axios.get("/api/v1/purchase/getKey");
    let stripeKey = data.data?.stripeApiKey;
    setStripeKey(stripeKey)
  }


  useEffect(()=>{
    WebFont.load({
      google:{
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
    store.dispatch(loadUser())
    getStripeKey()
  },[]);

  window.addEventListener("contextmenu",(e) => e.preventDefault());


  return (
    <Router>
      <Header/>
      {isAuthenticated && <UserOptions user={user}/>}
      {stripeApiKey && (<Elements stripe={loadStripe(stripeApiKey)}>
        <ProtectedRoute exact path = '/process/purchase' component={Payment}/>
      </Elements>)}
      
      <Switch>
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
        <ProtectedRoute exact path = '/success' component={OrderSuccess}/>
        <ProtectedRoute exact path = '/orders' component={MyOrders}/>
        <ProtectedRoute exact path = '/orders/:id' component={OrderDetails}/>

        {/* ADMIN ROUTES */}
        <ProtectedRoute isAdmin={true} exact path = '/admin/dashboard' component={Dashboard}/>
        <ProtectedRoute isAdmin={true} exact path = '/admin/products' component={ProductList}/>
        <ProtectedRoute isAdmin={true} exact path = '/admin/product' component={NewProduct}/>
        <ProtectedRoute isAdmin={true} exact path = '/admin/product/:id' component={UpdateProduct}/>
        <ProtectedRoute isAdmin={true} exact path = '/admin/orders' component={OrderList}/>
        <ProtectedRoute isAdmin={true} exact path = '/admin/order/:id' component={ProcessOrder}/>
        <ProtectedRoute isAdmin={true} exact path = '/admin/users' component={UserList}/>
        <ProtectedRoute isAdmin={true} exact path = '/admin/user/:id' component={UpdateUser}/>
        <ProtectedRoute isAdmin={true} exact path = '/admin/reviews' component={ProductReviews}/>

        <Route component={window.location.pathname === '/process/purchase'? null : NotFound}/>
      </Switch>

      <Footer/>
    </Router>
  );
}

export default App;
