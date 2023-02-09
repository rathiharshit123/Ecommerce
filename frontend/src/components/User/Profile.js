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
        if(!isAuthenticated){
            console.log("HII BRO JA LOGIN KARKE AA")
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
                <img src={userDetails.avatar.url} alt= {userDetails.name} />
                <Link to="/me/update">Edit Profile</Link>
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
                    <Link to= '/password/update'>Change Password</Link>
                </div>
            </div>
        </div>
    </Fragment>}
    </Fragment>
  )
}

export default Profile