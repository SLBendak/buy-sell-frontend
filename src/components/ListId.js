import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios'
import ItemCard from './ItemCard';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;


const ListId = (props) => {
    const [result, setResult] = useState({});
    let history = useHistory();

    const handleGoBack = () => {
        history.push(`/results/${result.category}`)

    }

    useEffect(() => {
        axios.get(`${REACT_APP_SERVER_URL}/api/listings/listid/${props.match.params.id}`)
        .then(data => setResult(data.data))
        .catch(console.error)
    }, [props])

    console.log("", result)
    
    return(
        <div className="list-id">
            <ItemCard listing={result} />
            <div className="float-list-id">
                <h3>Prefered Contact Method</h3>
                {result.contact}
                <br></br>
                <br></br>
                <button onClick={handleGoBack}>Back to results</button>
            </div>
        </div>
    )

}



export default ListId;