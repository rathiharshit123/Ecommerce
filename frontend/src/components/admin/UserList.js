import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { Delete, Edit } from '@material-ui/icons';
import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import Loader from '../layout/Loader/Loader';
import { getAllUsers,clearErrors,deleteUser, } from '../../actions/userAction';
import { DELETE_USER_RESET,  } from '../../constants/userConstants';

const UserList = ({history}) => {

    const dispatch = useDispatch();
    const alert = useAlert();
    
    const { error, users, loading: allUserLoading } = useSelector((state) => state.allUsers);
    const {error: userError, isDeleted, loading} = useSelector((state)=>state.profile)
    
    const deleteUserHandler = (id) => {
      dispatch(deleteUser(id))
    }

    useEffect(() => {
      if(error){
        alert.error(error);
        dispatch(clearErrors());
      }

      if(userError) {
        alert.error(userError);
        dispatch(clearErrors());
      }

      if(isDeleted) {
        alert.success('User Deleted Succesfully');
        history.push("/admin/users");
        dispatch({type: DELETE_USER_RESET});
      }

      dispatch(getAllUsers());
    }, [dispatch,alert,error,history,userError,isDeleted])
    

    const columns = [
        {field: "id",headerName:"User ID",mindWidth:200,flex:0.8},
        {field: "name",headerName:"Name",mindWidth:350,flex:1},
        {field: "email",headerName:"Email",type:"number",mindWidth:150,flex:0.5},
        {field: "role",headerName:"Role",type:"number",mindWidth:270,flex:0.5,cellClassName: (params)=>{
            return params.getValue(params.id,"role") === 'admin' ? 'greenColor': 'redColor'
        }},
        {field: "actions",headerName:"Actions",type:"number",mindWidth:150,flex:0.3,sortable:false,renderCell: (params)=>{
            return (
                <Fragment>
                    <Link to={`/admin/user/${params.getValue(params.id,"id")}`} >
                        <Edit/>
                    </Link>
                    <Button onClick={()=> deleteUserHandler(params.getValue(params.id,"id"))}>
                        <Delete/>
                    </Button>
                </Fragment>
            )
        }},
    ]

    const rows = [];

    users &&
    users.forEach((user) => {
      rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    });

  return (
    loading || allUserLoading ? <Loader/> :
    <Fragment>
        <MetaData title= 'All Users - Admin'  />
        <div className="dashboard">
            <Sidebar/>
            <div className="productListContainer">
                <h1 id='productListHeading'>All Users</h1>
                <DataGrid rows={rows} columns= {columns} pageSize={10} disableSelectionOnClick className='productListTable' autoHeight  />
            </div>

        </div>
    </Fragment>
  )
}

export default UserList