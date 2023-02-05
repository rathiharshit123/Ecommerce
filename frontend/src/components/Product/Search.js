import React, { Fragment, useState } from 'react'
import MetaData from '../layout/MetaData';
import './Search.css'

const Search = ({history}) => {

    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler = (e)=>{
        e.preventDefault();
        if(keyword.trim){
            history.push(`/products/${keyword}`)
        }
    }

  return (
    <Fragment>
        <MetaData title='Search a Product -- Ecommerce'/>

        <form action="" className="searchBox" onSubmit={searchSubmitHandler}>
            <input type="text" placeholder='Search a Product ...' onChange={(e)=> setKeyword(e.target.value)}/>
            <input type="submit" value="Search"/>
        </form>
    </Fragment>
  )
}

export default Search