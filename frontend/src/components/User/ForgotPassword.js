import React, { Fragment, useEffect, useState } from 'react'
import  MailOutlineIcon  from '@material-ui/icons/MailOutline'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader/Loader'
import MetaData from '../layout/MetaData'
import "./ForgotPassword.css"
import { useAlert } from 'react-alert'
import { clearErrors, forgotPassword } from '../../actions/userAction'


const ForgotPassword = () => {

    const alert = useAlert();
    const dispatch = useDispatch();


    const [email, setEmail] = useState()

    const {loading,error,message} = useSelector(state=>state.forgotPassword)

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("email",email);
        dispatch(forgotPassword(myForm))
    }

    useEffect(() => {
    window.scrollTo(0,0);
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(message){
            alert.success(message);
        }

    }, [dispatch,error,message,alert])
    

  return (
    <Fragment>
        {loading? <Loader/>: <Fragment>
        <MetaData title="Forgot Password" />
        <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
                <h2 className='forgotPasswordHeading'>Forgot Password</h2>
                <form className='forgotPasswordForm' onSubmit={forgotPasswordSubmit} >
                <div className="forgotEmail">
                        <MailOutlineIcon/>
                        <input
                            type="email"
                            placeholder='Email'
                            required
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                        />
                    </div>
                    <input type="submit" value="Send" className='forgotPasswordBtn'/>
                </form>
            </div>
        </div>
    </Fragment>}
    </Fragment>
  )
}

export default ForgotPassword