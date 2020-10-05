import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Grid} from '@material-ui/core';



const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    //   margin: 20,
    //   textAlign: 'center',
    },
    media: {
      height: 140,
    },
});

const ItemCard = ({listing, showLink}) => {
    const classes = useStyles();

    return (
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    // style={{height: 0}}
                    className={classes.media}
                    image={listing.image}
                    title={listing.title}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {listing.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {listing.description}
                        <br></br>
                        {listing.location}
                        <br></br>
                        {listing.category}
                        <br></br>
                        <p>${listing.price}</p>
                        
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    {showLink ?
                        (<Link 
                            className="viewDetailLink" 
                            style={{textAlign: "center"}}
                            onClick={() => {listing=listing}} to={{pathname: `/listid/${listing._id}`}}> 
                            View this result 
                        </Link>)
                    :
                        null
                    }
                </CardActions>
            </Card>
    );
}

export default ItemCard;