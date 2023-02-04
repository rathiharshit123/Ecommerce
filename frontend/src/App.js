import './App.css';
import Header from "./components/layout/Header/Header.js"
import {BrowserRouter as Router, Route} from 'react-router-dom'
import WebFont from 'webfontloader';
import React from 'react';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home';
import ProductDetails from "./components/Product/ProductDetails.js"

function App() {

  React.useEffect(()=>{
    WebFont.load({
      google:{
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
  },[]);

  return (
    <Router>
      <Header/>
      <Route exact path="/" component={Home}/>      
      <Route exact path="/product/get/:id" component={ProductDetails}/>      
      <Footer/>
    </Router>
  );
}

export default App;
