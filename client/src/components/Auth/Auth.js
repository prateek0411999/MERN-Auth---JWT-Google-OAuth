import React,{useState} from 'react'
import Icon from './Icon';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {signin, signup} from '../../actions/auth';
import useStyles from './styles';
import Input from './Input';

const initialState= {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
}
const Auth =()=> {

    const classes = useStyles();
    const history=useHistory();
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialState);

    const handleSubmit =(e) =>{
        e.preventDefault();

        console.log(formData);
        if(isSignup)
        {
            dispatch(signup(formData, history))
        }
        else{
            dispatch(signin(formData,history));
        }
    };

    const handleChange =(e) =>{
        setFormData({
            ...formData, [e.target.name] : e.target.value
        })
        
    }
    const googleSuccess= async (res)=>{
        const result = res?.profileObj;
        const token= res?.tokenId;

        try {
            dispatch({type: 'AUTH', data: {result, token}});
            history.push('/');
        } catch (error) {
            console.log(error)
        }

    }
    const googleFailure= ()=>{
        console.log('Google sign in was unsuccessful, Try again later')
    }
    const switchMode = () => {
        //setForm(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
      };
    return (
       <Container component="main" maxWidth="xs">
           <Paper className={classes.paper} elevation={3}>
               <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
               </Avatar>
                <Typography variant="h5">
                    {isSignup ? 'Sign Up': 'Sign in'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            ) 
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                    </Grid>
                    
                        
                    
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>
                    <GoogleLogin
                     clientId="1034139192699-o7d4d92kr14nqmid2enmgbbc9ksektim.apps.googleusercontent.com"
                     render={(renderProps)=>(
                         <Button 
                            className={classes.googleButton} 
                            color="primary" 
                            fullWidth
                            onClick={renderProps.onClick} 
                            disabled={renderProps.disabled} 
                            startIcon={<Icon/>} 
                            variant="contained">
                                Google Sign In
                            </Button>
                     )}
                     onSuccess={googleSuccess}
                     onFailure={googleFailure}
                     cookiePolicy="single_host_origin"
                    />
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                        <Button onClick={switchMode}>
                            { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                        </Button>
                        </Grid>
                    </Grid>
                </form>
           </Paper>
       </Container>
    )
}

export default Auth;
