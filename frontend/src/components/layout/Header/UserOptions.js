import React, { Fragment, useState } from 'react'
import './Header.css'
import { SpeedDial,SpeedDialAction } from '@material-ui/lab'
import { Dashboard,Person,ExitToApp,ListAlt } from '@material-ui/icons'
import { Backdrop } from '@material-ui/core'
import { useAlert } from 'react-alert'
import { useHistory } from 'react-router-dom'
import { logout } from '../../../actions/userAction'
import { useDispatch } from 'react-redux'



const UserOptions = ({user}) => {
    const [open, setOpen] = useState(false)

    const alert = useAlert();
    const history = useHistory();
    const dispatch = useDispatch();

    const options = [
        { icon: <ListAlt />, name: "Orders", func: orders },
        { icon: <Person />, name: "Profile", func: account },
        { icon: <ExitToApp />, name: "Logout", func: logoutUser },
      ]
    if (user.userDetails.role === "admin") {
        options.unshift({icon: <Dashboard />,name: "Dashboard",func: dashboard});
    }

    function dashboard (){
        history.push('/dashboard')
    }
    
    function account (){
        history.push('/account')
    }

    function orders (){
        history.push('/orders')
    }

    function logoutUser (){
        dispatch(logout());
        alert.success("Logout Succesfull")
    }
  return (
    <Fragment>
        <Backdrop open={open} style={{zIndex:"10"}} />
        <SpeedDial
            ariaLabel='SpeedDial tooltip example'
            onClose={()=>setOpen(false)}
            onOpen = {()=>setOpen(true)}
            open = {open}
            style= {{zIndex:"11"}}
            className='speedDial'
            icon = {<img
                className='speedDialIcon'
                src={user?.userDetails?.avatar?.url? user.userDetails.avatar.url : "/Profile.png"}
                alt="Profile"
            />}
            direction="down"
        >
            {options.map((item=>(<SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func} tooltipOpen={window.innerWidth <= 600 ? true : false}/>)
            ))}
        </SpeedDial>
    </Fragment>
  )
}

export default UserOptions