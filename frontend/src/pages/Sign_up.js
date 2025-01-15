import {useState } from "react" ;
import { useNavigate } from 'react-router-dom';
import {Button,Alert,TextField,Box,Link,InputLabel,MenuItem,Select,FormControl} from '@mui/material';

const Sign_up = () =>{
    const [FirstName, setFirstName]=useState('');
    const [LastName, setLastName]=useState('');
    const [Email, setEmail]=useState('');
    const [Address, setAddress]=useState('');
    const [City, setCity]=useState('');
    const [State, setState]=useState('');
    const [Password, setPassword]=useState('');
    const [CPassword, setCPassword]=useState('');
    const [error, setError]=useState(null);
    
    const navigate = useNavigate();

    const handleSubmit = async (e)=> {
        e.preventDefault();
        
        if(CPassword===Password){
            const account={FirstName, LastName, Email, Address, City, State, Password};
            const response = await fetch('/api/account/',{
                method:'POST',
                body:JSON.stringify(account),
                headers:{
                    'Content-Type':'application/json'
                }
            });
            const json = await response.json();
            if(!response.ok){
                setError(json.error);
            }
            if (response.ok){
                navigate('/Log_in');
            }
        }else{
            setError("Password confirmation id incorrect");
        }
        
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
                <Link href="Log_in">Already Have an Account? Login</Link>
            </div>
            <div className="container">
                <section>
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
                                    <TextField fullWidth variant="outlined" onChange={(e) => setPassword(e.target.value)} label="Password" type="password" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <TextField fullWidth variant="outlined" onChange={(e) => setCPassword(e.target.value)} label="Confirm" type="password" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Button onClick={handleSubmit} variant="contained" className="submit">Sign Up</Button>
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
                </section>
            </div>
        </body>
    </html>
    )
}
export default Sign_up;
