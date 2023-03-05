import { Button } from '@material-ui/core'
import { AccountTree, AttachMoney, Description, Spellcheck, Storage } from '@material-ui/icons'
import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, createNewProduct } from '../../actions/productAction'
import { NEW_PRODUCT_RESET } from '../../constants/productConstants'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import './NewProduct.css'
import Loader from '../layout/Loader/Loader'

const NewProduct = ({history}) => {

    const dispatch = useDispatch();
    const alert = useAlert();
     
    const {loading, error, success} = useSelector((state)=>state.newProduct)

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images,setImages] = useState([]);
    const [previewImages,setPreviewImages] = useState([]);

    useEffect(() => {
      if(error){
        alert.error(error);
        dispatch(clearErrors());
      }
      if(success){
        alert.success("Product Added Succesfully")
        history.push('/admin/dashboard');
        dispatch({type: NEW_PRODUCT_RESET})
      }
    }, [dispatch,alert,error,history,success])
    

    const categories = [
        "Laptop",
        "Clothing",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
      ];

    const createProductSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set('name',name);
        myForm.set('price',price);
        myForm.set('stock',stock);
        myForm.set('category',category);
        myForm.set('description',description);

        images.forEach((image) => {
            myForm.append('images',image);
        })
        dispatch(createNewProduct(myForm))
    }

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setPreviewImages([]);

        files.forEach((file)=>{
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2) {
                    setPreviewImages((old)=>[...old,reader.result])
                    setImages((old)=>[...old,reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }

  return (
    <Fragment>

    {loading ? <Loader/> : <Fragment>
        <MetaData title= 'New Product' />
        <div className="dashboard">
            <Sidebar/>
            <div className="newProductContainer">
                <form className='createProductForm' encType='multipart/form-data' onSubmit={createProductSubmitHandler} >
                    <h1>Create Product</h1>
                    <div>
                        <Spellcheck/>
                        <input type="text" placeholder='Product Name' required value={name} onChange={(e)=> setName(e.target.value)} />
                    </div>
                    <div>
                        <AttachMoney/>
                        <input type="number" placeholder='Price' required onChange={(e)=>setPrice(e.target.value)} />
                    </div>
                    <div>
                        <Description/>
                        <textarea  placeholder='Product Description' value={description} onChange={(e)=>setDescription(e.target.value)} />
                    </div>
                    <div>
                        <AccountTree/>
                        <select onChange={(e)=>setCategory(e.target.value)} >
                            <option value="" >Choose Category</option>
                            {categories.map((cat)=>(
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <Storage/>
                        <input  type="number" placeholder='Stock' onChange={(e)=>setStock(e.target.value)} />
                    </div>
                    <div id='createProductFormFile' >
                        <input type="file" name='avatar' accept='image/*' multiple onChange={createProductImagesChange} ></input>
                    </div>
                    <div id='createProductFormImage' >
                        {previewImages.map((image,index)=>(
                            <img key={index} src={image} alt='Avatar Preview'/>
                        ))}
                    </div>
                    <Button id='createProductBtn' type='submit' disabled= {loading? true: false} >
                        Create
                    </Button>
                </form>
            </div>
        </div>
    </Fragment> }   
    
    </Fragment>
  )
}

export default NewProduct