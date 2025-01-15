import {useEffect, useState } from "react" ;
import { useNavigate } from 'react-router-dom';
import {Button,Box,BottomNavigation,BottomNavigationAction,Grid, Typography} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


const Home = () =>{
    const navigate = useNavigate();


    const token = localStorage.getItem("authToken_id");
    let  id = token;
    let Account_id=id;

    useEffect (()=> {
        if (!token) {
            navigate('/log_in');
        }
    },[id,navigate])


    // Navigation functions
    const Log_out= async ()=> {
        localStorage.removeItem("authToken_id");
        navigate('/Log_in');

    }
    const NavOrder= async ()=> {
        navigate('/Order');
    }
    const NavAccount= async ()=> {
        navigate('/Account');
    }
    const NavHome= async ()=> {
        navigate('/Home');
    }
    const NavOrderFave= async ()=> {
        navigate('/OrderFave');
    }
    const NavOrderSurprise= async ()=> {
        navigate('/OrderSurprise');
    }
    
    return (
        <html lang="en">
        <head>
            <title>Pizza Time</title>
            <link rel="stylesheet" href="index.css"></link>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
            />
            <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
        </head>
        <body>
            <div className="nav">
                <h2>PIZZA PETE'S</h2>
                <nav>
                    <ul>
                        <BottomNavigation showLabels sx={{ width: '400px' , borderRadius: 2 }} >
                            <BottomNavigationAction onClick={NavHome} label="Home" icon={<HomeIcon />}  />
                            <BottomNavigationAction onClick={NavOrder} label="Order" icon={<ShoppingCartIcon />}  />
                            <BottomNavigationAction onClick={NavAccount} label="Account" icon={<AccountCircleIcon />}  />
                            <BottomNavigationAction onClick={Log_out} label="Logout" icon={<ExitToAppIcon />} />
                        </BottomNavigation>
                    </ul>
                </nav>
            </div>
            <Box sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Quick Options
                </Typography>

                <Grid container spacing={3} direction="row" justifyContent="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <Box className="pizza-option" sx={{ p: 2, boxShadow: 2, borderRadius: 2, textAlign: 'center' }}>
                            <Typography variant="h5">New Order</Typography>
                            <Typography variant="body1" gutterBottom>Description for New Order</Typography>
                            <Button variant="contained" className="submit" onClick={NavOrder}>
                            NEW ORDER
                            </Button>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Box className="pizza-option" sx={{ p: 2, boxShadow: 2, borderRadius: 2, textAlign: 'center' }}>
                            <Typography variant="h5">Re-order My Fave</Typography>
                            <Typography variant="body1" gutterBottom>Description for Re-order My Fave</Typography>
                            <Button variant="contained" className="submit"  onClick={NavOrderFave}>
                            RE-ORDER MY FAVE
                            </Button>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Box className="pizza-option" sx={{ p: 2, boxShadow: 2, borderRadius: 2, textAlign: 'center' }}>
                            <Typography variant="h5">Surprise Me</Typography>
                            <Typography variant="body1" gutterBottom>Description for Surprise Me</Typography>
                            <Button variant="contained" className="submit" onClick={NavOrderSurprise}>
                            SURPRISE ME
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                </Box>
        </body>
    </html>
    )
}
export default Home;
