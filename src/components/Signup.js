import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Signup = () => {
    let [name, setName] = useState('');
    let [location, setLocation] = useState('');
    let [phone, setPhone] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');
    let [redirect, setRedirect] = useState(false);

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleLocation = (e) => {
        setLocation(e.target.value);
    }
    const handlePhone = (e) => {
        setPhone(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            const newUser = { name, location, phone, email, password }

            axios.post(`${REACT_APP_SERVER_URL}/api/users/register`, newUser)
            .then(response => {
                console.log(response);
                setRedirect(true);
            })
            .catch(error => console.log(error));
        }
    }

    if (redirect) return <Redirect to="/login" />

    return (
        <div className="sell-form">
            <div className="col-md-7 offset-md-3">
                <div className="card card-body">
                    <h2 className="py-2">Signup</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <br></br>
                            <input type="text" name="name" value={name} onChange={handleName} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Location</label>
                            <br></br>
                            <input type="text" name="location" value={location} onChange={handleLocation} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone number</label>
                            <br></br>
                            <input type="text" name="phone" value={phone} onChange={handlePhone} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <br></br>
                            <input type="email" name="email" value={email} onChange={handleEmail} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <br></br>
                            <input type="password" name="password" value={password} onChange={handlePassword} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <br></br>
                            <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPassword} className="form-control"/>
                        </div>
                        <button type="submit" className="btn btn-primary float-right">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default Signup;