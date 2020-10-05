import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from './ItemCard';
const SERVER_URL = process.env.SERVER_URL;

const Results = (props) => {
    const [listings, setListings] = useState([]);
    const [listFilter, setListFilter] = useState("");
    let listingInfo

    console.log("Results-category", props.category)
    console.log("The list filter", listFilter)
 
    useEffect(() => {
        
        const getListings = async () => {
            if(props.category === undefined){
                setListFilter("all")
            }
            else {
                setListFilter(props.category)
            }
            await axios.get(`${SERVER_URL}/api/listings/results`)
            .then(response => {
                var filterData = response.data
                if(listFilter !== "all" && listFilter !== ""){
                    filterData = response.data.filter(function (fd) {
                        return fd.category === listFilter
                    })
                } 
                setListings(filterData)
                props.handleResultsData(filterData)
            })
            .catch(err => console.log(err))
        }
        getListings();
    }, [listFilter, props.category])

    if(props.category){
        listingInfo = listings.map((listing, idx) => {
            return (
                <div key={idx} className="itemList">
                    <ItemCard listing={listing} showLink />
                </div>
            );
        });
    } 
    else if (listFilter === "all"){
        listingInfo = listings.map((listing, idx) => {
            return (
                <div key={idx} className="itemList">
                    <ItemCard listing={listing} showLink />
                </div>
            );
        });

    }

    return (
        <div>
            <h1 className="pageTitle">Results for {listFilter}</h1>
            <div className="listing-container">
            {listingInfo}
            </div>
        </div>
    )
}
export default Results;