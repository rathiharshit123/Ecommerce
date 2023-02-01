import React from 'react'
import playstore from '../../../images/playstore.png'
import appstore from '../../../images/Appstore.png'
import "./Footer.css"

const Footer = () => {
  return (
    <footer id='footer'>
    <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download app for Andoroid and IOS mobile phone</p>
        <img src={playstore} alt="playstore" />
        <img src={appstore} alt="appstore" />
    </div>
    <div className="midFooter">
        <h1>Ecommerce</h1>
        <p>High quality is our first priority</p>
        <p>Copyrights 2022 &copy; rathiharshit</p>
    </div>
    <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com/rathii._/">Instagram</a>    
    </div>

    </footer>
  )
}

export default Footer