import React from 'react';
import { NavLink } from 'react-router-dom'
import clsx from 'clsx';
import { makeStyles, useTheme, fade } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HowToRegRoundedIcon from '@material-ui/icons/HowToRegRounded';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import HouseRoundedIcon from '@material-ui/icons/HouseRounded';
import LiveHelpRoundedIcon from '@material-ui/icons/LiveHelpRounded';
import DoubleArrowRoundedIcon from '@material-ui/icons/DoubleArrowRounded';
const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
            width: '20ch',
            },
        },
    },
}));

const Navbar = (props) => {

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
        <CssBaseline />
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
            >
                <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
                Garage Sale
            </Typography>
            </Toolbar>
        </AppBar>
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
            paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            </div>
            <List >
                <NavLink  exact to="/">
                    <ListItem button onClick={handleDrawerClose}>
                        <ListItemIcon><HouseRoundedIcon /></ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                </NavLink>           
            </List>  
            <Divider />       
            {
                props.isAuth ? 
                <List >
                    <NavLink  to="/profile">
                        <ListItem button onClick={handleDrawerClose}>
                            <ListItemIcon><AccountBoxRoundedIcon /></ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItem>
                    </NavLink>
                    <NavLink  to="/list">
                        <ListItem button onClick={handleDrawerClose}>
                            <ListItemIcon></ListItemIcon>
                            <ListItemText primary="Sell Some Shit" />
                        </ListItem>
                    </NavLink>
                    <ListItem button onClick={() => { props.handleLogout(); handleDrawerClose()}}>
                        <ListItemIcon><DoubleArrowRoundedIcon /></ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
                :
                <List >
                    <NavLink  to="/signup">
                        <ListItem button onClick={handleDrawerClose}>
                            <ListItemIcon><HowToRegRoundedIcon /></ListItemIcon>
                            <ListItemText primary="Signup" />
                        </ListItem>
                    </NavLink>
                    <NavLink  to="/login">
                        <ListItem button onClick={handleDrawerClose}>
                            <ListItemIcon><DoubleArrowRoundedIcon /></ListItemIcon>
                            <ListItemText primary="Login" />
                        </ListItem>
                    </NavLink>
                </List>
            }
            <Divider />
            {props.user ? 
            <List>
                
                <Typography>Browse Items for Sale</Typography>

                <NavLink to="/results/all">
                    <ListItem button onClick={() => {props.setCat("all"); handleDrawerClose()}}>
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary="All Listings" />
                    </ListItem>
                </NavLink>
                <NavLink to="/results/electronics">
                    <ListItem button onClick={() => {props.setCat("electronics"); handleDrawerClose()}}>
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary="Electronics" />
                    </ListItem>
                </NavLink>
                <NavLink to="/results/clothing">
                    <ListItem button onClick={() => {props.setCat("clothing"); handleDrawerClose()}}>
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary="Clothing" />
                    </ListItem>
                </NavLink>
                <NavLink to="/results/furniture">
                    <ListItem button onClick={() => {props.setCat("furniture"); handleDrawerClose()}}>
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary="Furniture" />
                    </ListItem>
                </NavLink>
                <NavLink to="/results/movies-books-music">
                    <ListItem button onClick={() => {props.setCat("movies-books-music"); handleDrawerClose()}}>
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary="Movies, Books, Music" />
                    </ListItem>
                </NavLink>
                <NavLink to="/results/sports">
                    <ListItem button onClick={() => {props.setCat("sports"); handleDrawerClose()}}>
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary="Sports" />
                    </ListItem>
                </NavLink>
                <NavLink to="/results/tools">
                    <ListItem button onClick={() => {props.setCat("tools"); handleDrawerClose()}}>
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary="Tools" />
                    </ListItem>
                </NavLink>
                <NavLink to="/results/others">
                    <ListItem button onClick={() => {props.setCat("others"); handleDrawerClose()}}>
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary="Others" />
                    </ListItem>
                </NavLink>
            </List>
            :
            < ></>

            }
            <Divider />
            <List>
                <NavLink   to="/about">
                    <ListItem button onClick={handleDrawerClose}>
                        <ListItemIcon><LiveHelpRoundedIcon /></ListItemIcon>
                        <ListItemText primary="About" />
                    </ListItem>
                </NavLink>
            </List>
        </Drawer>
    

        </div>
    );
}

export default Navbar;




  
