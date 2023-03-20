import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData'
import "./Profile.css"

const Profile = ({history}) => {

    const {user, isAuthenticated, loading} = useSelector(state=>state.user)
    const {userDetails} = user;

    useEffect(() => {
    window.scrollTo(0,0);
        if(!isAuthenticated){
            history.push("/login")
        }
    }, [history,isAuthenticated])
    

  return (
    <Fragment>
        {loading ? <Loader/> : <Fragment>
        <MetaData title={`${userDetails.name}'s Profile`} />
        <div className="profileContainer">
            <div>
                <h1>My Profile</h1>
                <img src={user?.userDetails?.avatar?.url? user.userDetails.avatar.url : "/Profile.png"} alt= {userDetails.name} />
                <Link to="/update/profile">Edit Profile</Link>
            </div>
            <div>
                <div>
                    <h4>Full Name</h4>
                    <p>{userDetails.name}</p>
                </div>
                <div>
                    <h4>Email</h4>
                    <p>{userDetails.email}</p>
                </div>
                <div>
                    <h4>Joined On</h4>
                    <p>{String(userDetails.createdAt).substring(0,10)}</p>
                </div>
                <div>
                    <Link to= '/orders'>My Orders</Link>
                    <Link to= '/update/password'>Change Password</Link>
                </div>
            </div>
        </div>
    </Fragment>}
    </Fragment>
  )
}

export default Profile