import { Home, LocationCity, Phone, PinDrop, Public, TransferWithinAStation } from '@material-ui/icons'
import React, { Fragment, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import './Shipping.css'
import {Country ,State} from "country-state-city"
import CheckoutSteps from "./CheckoutSteps"
import { saveShippingInfo } from '../../actions/cartAction'

const Shipping = ({history}) => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const {shippingInfo} = useSelector(state=>state.cart)

    const [address, setAddress] = useState(shippingInfo.address)
    const [state, setState] = useState(shippingInfo.state)
    const [city, setCity] = useState(shippingInfo.city)
    const [country, setCountry] = useState(shippingInfo.country)
    const [pincode, setPincode] = useState(shippingInfo.pincode)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)

    const shippingSubmit = (e) => {
        e.preventDefault();
        if(phoneNo.length !== 10){
            alert.error("Phone Number Should be of 10 Digits");
            return;
        }
        dispatch(saveShippingInfo({address,state,city,country,pincode,phoneNo}));
        history.push("/orders/confirm")
    }

  return (
    <Fragment>
        <MetaData title="Shipping - Ecommerce"/>

        <CheckoutSteps activeStep ={0}/>

        <div className="shippingContainer">
            <div className="shippingBox">
                <h2 className="shippingHeading">Shipping Details</h2>

                <form encType='multipart/form-data' className="shippingForm" onSubmit={shippingSubmit}>
                    <div>
                        <Home/>
                        <input type="text" placeholder='Address' required value={address} onChange={(e)=>setAddress(e.target.value)} />
                    </div>
                    <div>
                        <LocationCity/>
                        <input type="text" placeholder='City' required value={city} onChange={(e)=>setCity(e.target.value)} />
                    </div>
                    <div>
                        <PinDrop/>
                        <input type="text" placeholder='Pincode' required value={pincode} onChange={(e)=>setPincode(e.target.value)} />
                    </div>
                    <div>
                        <Phone/>
                        <input type="number" placeholder='Phone Number' required value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)} />
                    </div>
                    <div>
                        <Public/>
                        <select required value={country} onChange={(e)=>setCountry(e.target.value)} >
                            <option value="" >Country</option>
                            {Country && Country.getAllCountries().map((item)=>(
                                <option key={item.isoCode} value={item.isoCode} >{item.name}</option>
                            ))}
                        </select>
                    </div>
                    {country && (
                        <div>
                            <TransferWithinAStation/>
                            <select required value={state} onChange={(e)=>setState(e.target.value)} >
                                <option value="" >State</option>
                                {State && State.getStatesOfCountry(country).map((item)=>(
                                    <option key={item.isoCode} value={item.isoCode} > {item.name}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    <input type="submit" value="Continue" className='shippingBtn' disabled={state ? false: true}/>
                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default Shipping