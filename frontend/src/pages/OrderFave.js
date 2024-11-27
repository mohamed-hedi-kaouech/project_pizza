import {useEffect, useState } from "react" ;
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


import {Button,Alert,TextField,Box,InputLabel,MenuItem,Select,FormControl,
    BottomNavigation,BottomNavigationAction,Grid, Typography,FormControlLabel,Checkbox,
    FormLabel,FormGroup} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const mongoose= require('mongoose');

const Order = () =>{
    const location = useLocation();


    const [Method, setMethod]=useState('');
    const [Size, setSize]=useState('');
    const [Crust, setCrust]=useState('');
    const [Quantity, setQTY]=useState('');
    const [favorite, setFave]=useState(false);
    const [selectedToppings, setSelectedToppings] = useState([]);
    let [error, setError]=useState(null);
    let [price, setPrice]=useState(0);
    let [Tprice, setTPrice]=useState(0);
    let [id, setID]=useState(location.state ||{});
    let [NumberOrders, setNumberOrders]=useState(0);
    const [Orders] = useState([]);
    const [Pizzas] = useState([]);
    const navigate = useNavigate();

    


    const toppings = [
        'Pepperoni', 'Cheese', 'Mushrooms', 'Onions', 
        'Sausage', 'Meat', 'Black Olives', 'Green Peppers', 
        'Pineapple', 'Spinach', 'Jalapenos','Jombon'
    ];

    const handleToppingChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedToppings([...selectedToppings, value]);
        } else {
            setSelectedToppings(selectedToppings.filter((topping) => topping !== value));
        }
    };

    const selectedToppingsString = selectedToppings.join(', ');

    useEffect (()=> {
        console.log(id);
        if (!mongoose.Types.ObjectId.isValid(id)) {
            navigate('/log_in');
        }
        else{
            NavOrderFave();
            const fetchpizza = async()=>{
                const response = await fetch('/api/pizza/'+id)
                const json = await response.json();
                if (response.ok){
                    for (let p = 0; p < json.length; p++) {
                        if(json[p].favorite){
                            Pizzas.push(json[p]);
                            p=1000;
                        }
                    }
                }
            }
            fetchpizza();
            
        }
        
    },[id,navigate])


    const addorder= async (e)=> {
        e.preventDefault();
        const Ingredients = selectedToppingsString;
        const Account_id=id;
        price=0;

        let emptyFileds="";
        if(Ingredients.length<0){
            emptyFileds+='Toppings ';
        }
        if(!Method){
            emptyFileds+='Method ';
        }
        if(!Crust){
            emptyFileds+='Crust ';
        }
        if(!Size){
            emptyFileds+='Size ';
        }
        if(!Quantity){
            emptyFileds+='Quantity ';
        }
        if(emptyFileds.length >0 ){
            return setError('Please fill in all the fields '+emptyFileds);
        }
        
        if(Method==="Delivery"){
            price+=2.5;
        }if(Size==="Large"){
            price+=5;
        }else if(Size==="Medium"){
            price+=2.5;
        }else if(Size==="Small"){
            price+=1;
        }if(Crust==="Thin Crust"){
            price+=2;
        }else if(Crust==="Thick Crust"){
            price+=3;
        }

        price*=Quantity;
        price+=(Ingredients.split(',').length - 1)

        setPrice(price);
        setTPrice(Tprice+price)
        NumberOrders+=1;
        const pizza={Account_id, Ingredients, Size, Quantity, favorite, Method, Crust, price};
        Orders.push(pizza);
        setNumberOrders(NumberOrders);
        navigate('/Order', { state:  id });
    }
    const Submit= async()=>{
        Orders.forEach(async pizza => {
            const response = await fetch('/api/pizza/', {
                method:'POST',
                body:JSON.stringify(pizza),
                headers:{
                    'Content-Type':'application/json'
                }
            });
            const json = await response.json();
            if(!response.ok){
                return setError(json.error);
            }
        });
        window.location.reload();
    }


    // Navigation functions
    const Log_out= async ()=> {
        setID(null);
        localStorage.removeItem('token');
        navigate('/log_in',{ replace: true });
    }
    const NavHome= async ()=> {
        navigate('/Home', { state:  id });
    }
    const NavOrderFave= async ()=> {
        navigate('/OrderFave', { state:  id });
    }
    const reset= async ()=> {
        window.location.reload();
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
                    <BottomNavigation showLabels sx={{ width: '400px' , borderRadius: 2}} >
                        <BottomNavigationAction onClick={NavHome} label="Home" icon={<HomeIcon />}  />
                        <BottomNavigationAction onClick={NavOrderFave} label={`Order (${NumberOrders})`}  icon={<ShoppingCartIcon />}  />
                        <BottomNavigationAction onClick={Log_out} label="Logout" icon={<ExitToAppIcon />} />
                    </BottomNavigation>
                    </ul>
                </nav>
            </div>
            <section className="Form-container">
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
                <form>
                    <Typography variant="h5" gutterBottom>
                        CRAFT-A-PIZZA
                    </Typography>
                    <table>
                        <tr>
                            <td colSpan={2}>
                                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                                    <InputLabel id="method-label">Method</InputLabel>
                                    <Select
                                        labelId="method-label"
                                        id="method"
                                        onChange={(e) => setMethod(e.target.value)}
                                        label="Method"
                                    >
                                        <MenuItem value="CarryOut">CarryOut</MenuItem>
                                        <MenuItem value="Delivery">Delivery</MenuItem>
                                    </Select>
                                </FormControl>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Grid container spacing={2}> {/* Adjust spacing as needed */}
                                    {/* Size Selector */}
                                    <Grid item>
                                        <FormControl sx={{ width: '200px' }} variant="outlined">
                                        <InputLabel id="size-label">Size</InputLabel>
                                        <Select
                                            labelId="size-label"
                                            id="size"
                                            onChange={(e) => setSize(e.target.value)}
                                            label="Size"
                                        >
                                            <MenuItem value="Large">Large</MenuItem>
                                            <MenuItem value="Medium">Medium</MenuItem>
                                            <MenuItem value="Small">Small</MenuItem>
                                        </Select>
                                        </FormControl>
                                    </Grid>

                                    {/* Crust Selector */}
                                    <Grid item>
                                        <FormControl sx={{ width: '200px' }} variant="outlined">
                                        <InputLabel id="crust-label">Crust</InputLabel>
                                        <Select
                                            labelId="crust-label"
                                            id="crust"
                                            onChange={(e) => setCrust(e.target.value)}
                                            label="Crust"
                                        >
                                            <MenuItem value="Thin Crust">Thin Crust</MenuItem>
                                            <MenuItem value="Thick Crust">Thick Crust</MenuItem>
                                        </Select>
                                        </FormControl>
                                    </Grid>

                                    {/* Quantity TextField */}
                                    <Grid item>
                                        <TextField
                                        id="outlined"
                                        label="Quantity"
                                        type="number"
                                        onChange={(e) => setQTY(e.target.value)}
                                        sx={{
                                            width: '200px',
                                            '& .MuiInputBase-root': {
                                            height: '55px',
                                            fontSize: 19,
                                            
                                            },
                                        }}
                                        inputProps={{
                                            min: 1,
                                            max:10
                                          }}
                                        />
                                    </Grid>

                                    {/* Favorite Checkbox */}
                                    <Grid item>
                                        <FormControlLabel
                                        control={
                                            <Checkbox
                                            id="Favorite"
                                            color="primary"
                                            onChange={(e) => setFave(e.target.checked)}
                                            />
                                        }
                                        label="Favorite"
                                        />
                                    </Grid>
                                </Grid>
                            </td>
                        </tr>
                        <tr >
                            <FormControl component="fieldset" sx={{ width: '100%' }}>
                                <FormLabel component="legend" id="Toppings">Toppings:</FormLabel>
                                <FormGroup fullWidth>
                                    <Grid border={1} container spacing={1} className="toppings-grid">
                                    {toppings.map((topping, index) => (
                                        <Grid item xs={6} sm={4} md={3} key={index}>
                                        <FormControlLabel
                                            control={
                                            <Checkbox
                                                id={topping}
                                                value={topping}
                                                onChange={handleToppingChange}
                                            />
                                            }
                                            label={topping}
                                        />
                                        </Grid>
                                    ))}
                                    </Grid>
                                </FormGroup>
                            </FormControl>
                        </tr>
                        <tr>
                            <td>
                                <Button onClick={addorder} className="submit" variant="contained">Add to Order</Button>
                            </td>
                        </tr>
                    </table>
                    {error && (
                        <Alert variant="standard" color="info">
                            {error}
                        </Alert>
                    )}
                </form>
            </Box>
            </section>
            <div className="check">
                <div className="Orders">
                <Box 
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        mx: 'auto',
                        p: 3,
                        borderRadius: 2,
                        boxShadow: 3,
                        bgcolor: 'background.paper',
                        gap: 2
                    }}
                >
                    <h2>YOUR ORDER</h2>
                    {Pizzas && Pizzas.map((order) => (
                        <Box sx={{ borderRadius: 2 }}>
                            <Typography variant="body1"><strong>Method:</strong> {order.Method}</Typography>
                            <Typography variant="body1"><strong>Qty:</strong> {order.Quantity}</Typography>
                            <Typography variant="body1"><strong>Size:</strong> {order.Size}</Typography>
                            <Typography variant="body1"><strong>Crust:</strong> {order.Crust}</Typography>
                            <Typography variant="body1"><strong>Toppings:</strong> {order.Ingredients}</Typography>
                            <Typography sx={{ textAlign: 'right' }} variant="body1"><strong>PRICE:</strong> <span>{order.price}$</span></Typography>
                            
                            <hr></hr>
                        </Box>
                    ))}
                    <Typography sx={{ textAlign: 'right' }} variant="body1"><strong>TOTAL PRICE :</strong> <span>{Tprice}$</span></Typography>
                    <div className="Btns">
                        <Button className="reset" variant="contained" onClick={reset}>Start Over</Button><Button className="submit" onClick={Submit} variant="contained">Purchase</Button>
                    </div>
                </Box>
                </div>
            </div>
        </body>
    </html>
    )
}
export default Order;
