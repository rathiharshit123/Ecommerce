import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux';
import './UpdatePassword.css'
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import { clearErrors, updatePassword } from '../../actions/userAction';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';

const UpdatePassword = ({history}) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const {error, isUpdated, loading} = useSelector(state=>state.profile)

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const updatePasswordSubmit = (e) =>{
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("oldPassword",oldPassword)
        myForm.set("newPassword",newPassword)
        myForm.set("confirmPassword",confirmPassword)
        dispatch(updatePassword(myForm));
    }

    useEffect(() => {
    window.scrollTo(0,0);
      if(error){
        alert.error(error);
        dispatch(clearErrors());
      }
      
      if(isUpdated){
        alert.success("Password Updated Succesfully");
        history.push("/account")
        dispatch({type: UPDATE_PASSWORD_RESET});
      }

    }, [dispatch,error,alert,isUpdated,history])
    

  return (
    <Fragment>
        {loading? <Loader/>: <Fragment>
        <MetaData title="Change Password" />
        <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
                <h2 className='updatePasswordHeading'>Update Password</h2>
                <form className='updateProfileForm' onSubmit={updatePasswordSubmit} >
                    <div className="oldPassword">
                        <VpnKeyIcon/>
                        <input
                            type="password"
                            placeholder='Old Password'
                            required
                            value={oldPassword}
                            onChange={(e)=> setOldPassword(e.target.value)}
                        />
                    </div>
                    <div className="newPassword">
                        <LockOpenIcon/>
                        <input
                            type="password"
                            placeholder='New Password'
                            required
                            value={newPassword}
                            onChange={(e)=> setNewPassword(e.target.value)}
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
                    
                    <input type="submit" value="Update Password" className='updateProfileBtn'/>
                </form>
            </div>
        </div>
    </Fragment>}
    </Fragment>
    )
}

export default UpdatePassword