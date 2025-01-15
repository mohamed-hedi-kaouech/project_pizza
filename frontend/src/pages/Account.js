import {useEffect, useState } from "react" ;
import { useNavigate } from 'react-router-dom';
import {Button,Alert,TextField,Box,InputLabel,MenuItem,Select,FormControl,BottomNavigation,BottomNavigationAction,Grid, Typography} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


const Home = () =>{
    const [FirstName, setFirstName]=useState('');
    const [LastName, setLastName]=useState('');
    const [Email, setEmail]=useState('');
    const [Address, setAddress]=useState('');
    const [City, setCity]=useState('');
    const [State, setState]=useState('');
    const [error, setError]=useState(null);
    const [Pizza, setPizza]=useState(null);
    const navigate = useNavigate();


    const token = localStorage.getItem("authToken_id");
    let id=token;
    let Account_id=id;


    useEffect (()=> {
        if (!token) {
            navigate('/log_in');
        }
        else{
            const fetchpizza = async()=>{
                const response = await fetch('/api/pizza/'+id)
                const json = await response.json();
                if (response.ok){
                    setPizza(json);
                }
            }
            fetchpizza();
        }
    },[navigate])



    const handleSubmit = async (e)=> {
        e.preventDefault();
        const account={FirstName, LastName, Email, Address, City, State};

        const response = await fetch('/api/account/'+id, {
            method: 'PATCH',
            body: JSON.stringify(account),
            headers: {
            'Content-Type': 'application/json',
            },
        });
        const json = await response.json();
        if(!response.ok){
            return setError(json.error);
        }
    }


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

            <div className="account-container-update">
                <div className="account-info-update">
                    
                    <Box 
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        maxWidth: 400,
                        mx: 'auto',
                        p: 3,
                        borderRadius: 2,
                        boxShadow: 3,
                        bgcolor: 'background.paper',
                        gap: 2
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        Account Info
                    </Typography>
                    <form >
                        <table>
                            <tr>
                                <td>
                                    <TextField sx={{ width: '150px' }} variant="outlined" onChange={(e) => setFirstName(e.target.value)} label="First Name" type="text" />
                                    <TextField sx={{ width: '150px' }} variant="outlined" onChange={(e) => setLastName(e.target.value)} label="Last Name" type="text" />
                                </td>
                            </tr>
                            <tr >
                                <td>
                                    <TextField fullWidth variant="outlined" onChange={(e) => setEmail(e.target.value)} label="Email" type="email" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <TextField fullWidth variant="outlined" onChange={(e) => setAddress(e.target.value)} label="Address" type="text" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <TextField sx={{ width: '170px' }} variant="outlined" onChange={(e) => setCity(e.target.value)} label="City" type="text" />
                                    <FormControl sx={{ width: '130px' }}>
                                        <InputLabel id="state-select-label">State</InputLabel>
                                        <Select
                                            labelId="state-select-label"
                                            id="state-select"
                                            label="State"
                                            onChange={(e) => setState(e.target.value)}>
                                            <MenuItem value="Ariana">Ariana</MenuItem>
                                            <MenuItem value="Beja">Beja</MenuItem>
                                            <MenuItem value="Ben Arous">Ben Arous</MenuItem>
                                            <MenuItem value="Bizerte">Bizerte</MenuItem>
                                            <MenuItem value="Gabes">Gabes</MenuItem>
                                            <MenuItem value="Gafsa">Gafsa</MenuItem>
                                            <MenuItem value="Jendouba">Jendouba</MenuItem>
                                            <MenuItem value="Kairouan">Kairouan</MenuItem>
                                            <MenuItem value="Kasserine">Kasserine</MenuItem>
                                            <MenuItem value="Kebili">Kebili</MenuItem>
                                            <MenuItem value="Kef">Kef</MenuItem>
                                            <MenuItem value="Mahdia">Mahdia</MenuItem>
                                            <MenuItem value="Manouba">Manouba</MenuItem>
                                            <MenuItem value="Medenine">Medenine</MenuItem>
                                            <MenuItem value="Monastir">Monastir</MenuItem>
                                            <MenuItem value="Nabeul">Nabeul</MenuItem>
                                            <MenuItem value="Sfax">Sfax</MenuItem>
                                            <MenuItem value="Sidi Bouzid">Sidi Bouzid</MenuItem>
                                            <MenuItem value="Siliana">Siliana</MenuItem>
                                            <MenuItem value="Sousse">Sousse</MenuItem>
                                            <MenuItem value="Tataouine">Tataouine</MenuItem>
                                            <MenuItem value="Tozeur">Tozeur</MenuItem>
                                            <MenuItem value="Tunis">Tunis</MenuItem>
                                            <MenuItem value="Zaghouan">Zaghouan</MenuItem>
                                        </Select>
                                    </FormControl>
            
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Button onClick={handleSubmit} variant="contained" className="submit">update</Button>
                                </td>
                            </tr>
                        </table>
                    </form>
                    {error && (
                        <Alert sx={{ width: '300px' }} variant="standard" color="info">
                            {error}
                        </Alert>
                    )}
                </Box>
                    
                </div>
                <div className="Past-orders">
                    <Box 
                        component="form"
                        sx={{
                            p: 3,
                            borderRadius: 2,
                            boxShadow: 3,
                            bgcolor: 'background.paper',
                            gap: 2
                        }}
                    >
                        <Typography variant="h4" gutterBottom>
                            Past Orders
                        </Typography>
                        {Pizza && Pizza.map((Pizza)=>(
                            <div class="order">
                            <p>{new Date(Pizza.createdAt).toISOString().split('T')[0]}</p>
                            <spam class="favorite">Favorite</spam><input type="checkbox" class="favorite" checked={Pizza.favorite}/>
                            <p>{Pizza.Quantity} - {Pizza.Size} - {Pizza.Crust} <br></br>{Pizza.Ingredients}  {Pizza.price}$</p>
                            <hr></hr>
                        </div>
                        ))}
                    </Box>
                </div>
            </div>
        </body>
    </html>
    )
}
export default Home;
