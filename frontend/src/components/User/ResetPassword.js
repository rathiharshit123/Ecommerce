import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, resetPassword } from '../../actions/userAction';
import Loader from '../layout/Loader/Loader';
import "./ResetPassword.css"

const ResetPassword = ({history,match}) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const {loading,error,success} = useSelector(state=>state.forgotPassword);

    useEffect(() => {
    window.scrollTo(0,0);
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(success){
            alert.success("Password Updated Successfully");
            history.push("/login")
        }
    }, [error,alert,dispatch,success,history])
    
    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("password",password);
        myForm.set("confirmPassword",confirmPassword);
        dispatch(resetPassword(match.params.token,myForm))
    }

  return (
    <Fragment>
        {loading? <Loader/>: <Fragment>
        <MetaData title="Reset Password" />
        <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
                <h2 className='resetPasswordHeading'>Reset Password</h2>
                <form className='resetPasswordForm' onSubmit={resetPasswordSubmit} >
                    <div className="newPassword">
                        <LockOpenIcon/>
                        <input
                            type="password"
                            placeholder='New Password'
                            required
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                        />
                    </div><div className="confirmPassword">
                        <LockIcon/>
                        <input
                            type="password"
                            placeholder='Confirm Password'
                            required
                            value={confirmPassword}
                            onChange={(e)=> setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <input type="submit" value="Send" className='resetPasswordBtn'/>
                </form>
            </div>
        </div>
    </Fragment>}
    </Fragment>
  )
}

export default ResetPassword