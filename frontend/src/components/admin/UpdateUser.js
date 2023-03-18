import { Button } from '@material-ui/core'
import { MailOutline, Person, VerifiedUser } from '@material-ui/icons'
import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import Loader from '../layout/Loader/Loader'
import { clearErrors, getUserDetails, updateUser } from '../../actions/userAction'
import { UPDATE_USER_RESET } from '../../constants/userConstants'

const UpdateUser = ({history,match}) => {

    const dispatch = useDispatch();
    const alert = useAlert();
     
    const {loading: userLoading, user, error: userError} = useSelector((state)=>state.userDetails)
    const {loading: updateLoading, isUpdated, error:updateError} = useSelector((state)=>state.profile)

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    
    const userId = match.params.id;

    useEffect(() => {
    window.scrollTo(0,0);
        dispatch(getUserDetails(userId));
      }, [dispatch, userId]);

    useEffect(() => {
    window.scrollTo(0,0);

        if(user && user._id === userId) {
            setName(user.name);
            setEmail(user.email);
        }

        if(userError){
            alert.error(userError);
            dispatch(clearErrors());
        }

        if(updateError){
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if(isUpdated){
            alert.success("User Updated Succesfully")
            history.push('/admin/users');
            dispatch({type: UPDATE_USER_RESET})
        }
    }, [dispatch,alert,userError,updateError,history,isUpdated,user,userId])

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();
        
        const myForm = new FormData();
        myForm.set('role',role);
        
        if(email !== user.email){
            myForm.set('email',email);
        }
        if(name !== user.name){
            myForm.set('name',name);
        }
        dispatch(updateUser(userId,myForm));
    }

  return (
    <Fragment>

    {(userLoading || updateLoading) ? <Loader/> : <Fragment>
        <MetaData title= 'Update User' />
        <div className="dashboard">
            <Sidebar/>
            <div className="newProductContainer">
                <form className='createProductForm' onSubmit={updateUserSubmitHandler} >
                    <h1>Update User</h1>
                    <div>
                        <Person/>
                        <input type="text" placeholder='Name' required value={name} onChange={(e)=> setName(e.target.value)} />
                    </div>
                    <div>
                        <MailOutline/>
                        <input type="email" placeholder='Email' value={email} required onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    
                    <div>
                        <VerifiedUser/>
                        <select onChange={(e)=>setRole(e.target.value)} >
                            <option value="" >Choose Role</option>
                            <option value="admin" >Admin</option>
                            <option value="user" >User</option>
                            
                        </select>
                    </div>
                   
                    
                    <Button id='createProductBtn' type='submit' disabled= {updateLoading? true: false} >
                        Update
                    </Button>
                </form>
            </div>
        </div>
    </Fragment> }   
    
    </Fragment>
  )
}

export default UpdateUser