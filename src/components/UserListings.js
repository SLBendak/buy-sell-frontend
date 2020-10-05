import React, { useEffect, useState } from 'react';
import ItemCard from './ItemCard';
import axios from 'axios';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const UserListings = (props) => {
    let listingInfo
    let [userItems, setUserItems] = useState([]);
    let [reload, setReload] = useState(false);

    useEffect(() => {
        axios.get(`${REACT_APP_SERVER_URL}/api/listings/userlistings`)
        .then(response => {
            var userListings = response.data.filter(function (ul) {
                return ul.seller === props.user.id
            })
            setUserItems(userListings)
            setReload(false)
        })
        .catch(console.error)
    }, [props.user.id, reload === true])

    listingInfo = userItems.map((listing, idx) => {

        const handleDelete = () => {
            axios.post(`${REACT_APP_SERVER_URL}/api/listings/delete/${listing._id}`)
            setReload(true)
        }

        return(
            <div key={idx}>
            <ItemCard listing={listing} />
            <button onClick={handleDelete}>Delete Listing</button>
            </div>
        )
    })

    return(
        <div className="listing-container">
            {listingInfo}
        </div>
    )
}
export default UserListings;