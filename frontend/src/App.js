import './App.css';
import Header from "./components/layout/Header/Header.js"
import {BrowserRouter as Router, Route} from 'react-router-dom'
import WebFont from 'webfontloader';
import React from 'react';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home';
import ProductDetails from "./components/Product/ProductDetails.js"
import Products from "./components/Product/Products.js"
import Search from "./components/Product/Search.js"
import LoginSignup from './components/User/LoginSignup';
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from "./components/layout/Header/UserOptions.js"
import { useSelector } from 'react-redux';
import Profile from './components/User/Profile.js'
import ProtectedRoute from './components/Route/ProtectedRoute';
import UpdateProfile from './components/User/UpdateProfile.js'
import UpdatePassword from './components/User/UpdatePassword.js'

function App() {

  const {user, isAuthenticated} = useSelector(state => state.user)
  React.useEffect(()=>{
    WebFont.load({
      google:{
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })

    store.dispatch(loadUser())
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

      <Footer/>
    </Router>
  );
}

export default App;
