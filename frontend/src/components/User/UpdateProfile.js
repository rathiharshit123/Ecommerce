import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, loadUser, updateProfile } from '../../actions/userAction';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import  MailOutlineIcon  from '@material-ui/icons/MailOutline'
import FaceIcon from '@material-ui/icons/Face'
import Loader from '../layout/Loader/Loader';
import "./UpdateProfile.css"
import MetaData from '../layout/MetaData';


const UpdateProfile = ({history}) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const {user } = useSelector(state=>state.user);
    const {error, isUpdated, loading} = useSelector(state=>state.profile)

    const {userDetails} = user;

    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const updateProfileSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData();
        myForm.set("name",name)
        if(email !== userDetails.email){
            myForm.set("email",email)
        }
        if(avatar){
            myForm.set("avatar",avatar)
        }

        dispatch(updateProfile(myForm))
    }

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2){
                setAvatarPreview(reader.result);
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0]);    
    }

    useEffect(() => {
    window.scrollTo(0,0);
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }

        if(userDetails){
            setName(userDetails.name);
            setEmail(userDetails.email);
            setAvatarPreview(userDetails.avatar.url)
        }

        if(isUpdated) {
            alert.success("Profile Updated Succesfully");
            dispatch(loadUser());
            history.push('/account');
            dispatch({type: UPDATE_PROFILE_RESET})
        }
    },[dispatch,error,alert,history,user,isUpdated,userDetails])
    


  return (
    <Fragment>
        {loading? <Loader/>: <Fragment>
        <MetaData title="Update Profile" />
        <div className="updateProfileContainer">
            <div className="updateProfileBox">
            <h2 className='updateProfileHeading'>Update Profile</h2>
            <form className='updateProfileForm' encType="multipart/form-data" onSubmit={updateProfileSubmit} >
                    <div className="updateProfileName">
                        <FaceIcon/>
                        <input
                            type="text"
                            placeholder='Name'
                            required
                            name='name'
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                    <div className="updateProfileEmail">
                        <MailOutlineIcon/>
                        <input
                            type="email"
                            placeholder='Email'
                            required
                            name='email'
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div id="updateProfileImage">
                        <img src={avatarPreview} alt="Avatar Preview" />
                        <input
                         type="file" 
                         name='avatar'
                         accept='image/*'
                         onChange={updateProfileDataChange}
                          />
                    </div>
                    <input type="submit" value="Update Profile" className='updateProfileBtn'/>
                </form>
            </div>
        </div>
    </Fragment>}
    </Fragment>
  )
}

export default UpdateProfile