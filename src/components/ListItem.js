import React, { useState } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import '../App.css';



const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const ListItem = (props) => {
    console.log("this", props.user.id)
    let [category, setCategory] = useState('');
    let [description, setDescription] = useState('');
    let [title, setTitle] = useState('');
    let [location, setLocation] = useState('');
    let [redirect, setRedirect] = useState(false);
    let [contact, setContact] = useState("");
    let [price, setPrice] = useState("");
    // cloudinary
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState("");
    //
    let seller = props.user.id

    const handleDescription = (e) =>{
        setDescription(e.target.value);
    }
    const handleLocation = (e) =>{
        setLocation(e.target.value);
    }
    const handleTitle = (e) =>{
        setTitle(e.target.value);
    }
    const handlePrice = (e) =>{
        setPrice(e.target.value);
    }
    const handleContact = (e) =>{
        setContact(e.target.value);
    }
    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'marketplace')
        setLoading(true)
        
        const res = await fetch("https://api.cloudinary.com/v1_1/slbendak/image/upload", 
        {
            method:'POST',
            body:data
        })
        const file = await res.json()

        console.log(file)

        setImage(file.secure_url)
        setLoading(false)

    }
    const handleCategory = (e) =>{
        setCategory(e.target.value);
    }
    let handleSubmit = (e) => {
        e.preventDefault();

        const updateInfo = { title, description, location, category, contact, image, price, seller}
        console.log("listitem", updateInfo)
        
        axios.post(`${REACT_APP_SERVER_URL}/api/listings/list`, updateInfo)
        console.log("inside axios listing post")
        setRedirect(true);
    } 
    if(redirect === true) {
        return <Redirect to="/profile" user={props.user}/>
    }

        return(
            <div className='sell-form'>
                <h3>List item to sell</h3>
                <form onSubmit={handleSubmit}>
                    <div className="cloudinary-form">
                        <h1>Upload Image</h1>
                        <input 
                            className="image-input"
                            type="file" 
                            name="file" 
                            placeholder="upload an image"
                            onChange={uploadImage}
                        />
                        {
                            loading ? (
                                <h3>Loading...</h3>
                            ):(
                                <img src={image} alt={title} style={{width: '300px'}}/>
                            )
                        }
                    </div>
                    <div>
                        <label htmlFor="Title">Title:</label>
                        <br></br>
                        <input name="Title" value={title} onChange={handleTitle} required/>
                    </div>
                    <div>
                        <label htmlFor="Description">Description:</label>
                        <br></br>
                        <input name="Description" value={description} onChange={handleDescription} required/>
                    </div>
                    <div>
                        <label htmlFor="Price">Price:</label>
                        <br></br>
                        <input name="Price" value={price} onChange={handlePrice} required/>
                    </div>
                    <div>
                        <label htmlFor="Location">Location:</label>
                        <br></br>
                        <input name="Location" value={location} onChange={handleLocation} placeholder="City, State" required/>
                    </div>
                    <div>
                        <label htmlFor="Contact">Contact Info:</label>
                        <br></br>
                        <input name="Contact" value={contact} onChange={handleContact} required/>
                    </div>
                    <div className="radio-form">
                        <label htmlFor="category" name="category">Clothing</label>
                        <input type="radio" name="category" value="clothing" onClick={handleCategory} />
                        <label htmlFor="category" name="category">Electronics</label>
                        <input type="radio" name="category" value="electronics" onClick={handleCategory} />
                        <br></br>
                        <label htmlFor="category" name="category">Furniture</label>
                        <input type="radio" name="category" value="furniture" onClick={handleCategory} />
                        <label htmlFor="category" name="category">Sports</label>
                        <input type="radio" name="category" value="sports" onClick={handleCategory} />
                        <br></br>
                        <label htmlFor="category" name="category">Movies, Books, Music</label>
                        <input type="radio" name="category" value="movies-books-music" onClick={handleCategory} />
                        <br></br>
                        <label htmlFor="category" name="category">Tools</label>
                        <input type="radio" name="category" value="tools" onClick={handleCategory} />
                        <label htmlFor="category" name="category">Other</label>
                        <input type="radio" name="category" value="others" onClick={handleCategory} />
                    </div>
                        <input type="hidden" name="seller" value={props.user.id} />
                    <button type="submit">List</button>
                </form>
            </div>
        )


}

export default ListItem;