import {useState } from "react" ;
import { useNavigate } from 'react-router-dom';
import {Button,Alert,TextField,Box,Link,Typography} from '@mui/material';


const Log_in = () =>{
    const [Email, setEmail]=useState('');
    const [Password, setPassword]=useState('');
    const [error, setError]=useState(null);

    const navigate = useNavigate();

    
    const login = async (e)=> {
        e.preventDefault();

        if((Email==="")||(Password==="")){
            return setError('Please fill in all the fields');
        }else{
            const response = await fetch('/api/account/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        
             const accounts = await response.json();
            try{
                const Exist=accounts.find(account => account.Email === Email);
                if(Exist){
                    if (Exist.Password !== Password) {
                        return setError("Invalid Password");
                    }else{
                        let id= Exist._id;
                        navigate('/Home', { state:  id });
                    }
                }else{
                    return setError("Account not Found");
                }
                
            }catch(error){
                return setError(error);
            }
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
            <meta name="viewport" content="initial-scale=1, width=device-width" />
        </head>
        <body>
            <div className="nav">
                <h2>PIZZA PETE'S</h2>
                <Link href="Sign_up">Don't Have an Account? Register</Link>
            </div>
            <div className="Log_n_container">
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
                    <Typography variant="h4" gutterBottom>
                        Welcome Back!
                    </Typography>
                        <table>
                            <tr>
                                <td>
                                    <TextField variant="outlined" onChange={(e) => setEmail(e.target.value)} label="Email" type="email" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <TextField variant="outlined" onChange={(e) => setPassword(e.target.value)} label="Password" type="password" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Button onClick={login} className="submit" variant="contained">Log in </Button>
                                </td>
                            </tr>
                        </table>
                    </form>
                    {error && (
                        <Alert variant="standard" color="info">
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
export default Log_in;
