import React, { useState } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
const SERVER_URL = process.env.SERVER_URL;

const EditForm = (props) => {
    console.log(props.user)
    // let [user, setUser] = useState('');

    let user = (props.user.id)
    let [loc, setLoc] = useState('');
    let [phone, setPhone] = useState('');
    let [redirect, setRedirect] = useState(false);

    const handleLocation = (e) =>{
        setLoc(e.target.value);
    }
    const handlePhone = (e) =>{
        setPhone(e.target.value);
    }

    let handleSubmit = (e) => {
        e.preventDefault();

        const updateInfo = { loc, phone, user}
        console.log(updateInfo)

        axios.post(`${SERVER_URL}/api/users/profile`, updateInfo)
        .then(response =>{
            setRedirect(true);
        })
        .catch(error => console.log(error))
    } 
    if(redirect) return <Redirect to="/profile" />
        return(
            <div className='sell-form'>
                <h3>Edit your account</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="Location">Location:</label>
                        <br></br>
                        <input name="Location" value={loc} onChange={handleLocation} placeholder="City, State" required/>
                    </div>
                    <div>
                        <label htmlFor="Phone">Phone:</label>
                        <br></br>
                        <input name="Phone" value={phone} onChange={handlePhone} placeholder="Phone Number" required/>
                    </div>
                        <input type="hidden" name="id" value={props.user.id} />
                    <button type="submit">Update</button>

                </form>
            </div>
        )
}

export default EditForm;