import React , { useEffect , useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"

//VALIDATE  
import { Validate } from "../validate/validate"

//TUAST
import { notify } from "./tuast";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//STYLES    
import styles from "./sign_up.module.scss"

const Sign_In = () => {


    //STATES
    const [ data , setData] = useState({   
        password: "" ,
        email: "" ,
    })

    const [ errors , setErrors ] = useState({})
    const [ tuch , setTuch ] = useState({})
    

    //FUNCTOINS
    useEffect ( () => {
        setErrors( Validate( data , "login" ) )
    } , [ data , tuch ] )

    const focusHandler = ( event ) => {
        setTuch( { ...tuch , [event.target.name] : true } )
    }

    const changeHandler = (event) =>{
        if (event.target.name === "isAccepted") {
            setData({ ...data, [event.target.name]: event.target.checked })
        } else {
            setData({ ...data, [event.target.name]: event.target.value })
            
        }
    }

    const submitHandler = ( event ) => {
        event.preventDefault();
        if ( !Object.keys(errors).length ) {

            const loginAPI = 'http://localhost:3300/auth/login'
            const headers = { 'Content-Type': 'application/json' }
            const userData={
                email: data.email ,
                password: data.password ,
            }
            
        //     fetch('http://localhost:3300/auth/login', {
        //     method: 'POST',
        //     headers: headers,
        //     body: JSON.stringify( userData )
        // })
        // .then((response) => response.json())
        // .then((json) => console.log(json))

        axios.post( loginAPI , userData , headers )
        .then( response => tuastHandeler( response ))


        const tuastHandeler = ( response ) => {
            console.log(response.data)
            notify( response.data.success , response.data.message );
        } 
            
        } else {
            setTuch ({
                email: true,
                password: true,
            })
            notify()
        }
    }

    return (
        <div className={styles.container}>
           <form onSubmit={submitHandler} className={styles.formContainer}>
                <h2 className={styles.header}>Login</h2>
                <div className={styles.formField}>
                    <label>Email</label>
                    <input 
                        className={(errors.email && tuch.email) ? styles.uncompleted : styles.formInput} 
                        type="text" 
                        name="email" 
                        value={data.email} 
                        onChange={changeHandler} 
                        onFocus={focusHandler} 
                    />
                    { errors.email && tuch.email && <span>{ errors.email }</span> }
                </div>
                <div className={styles.formField}>
                    <label>Password</label>
                    <input 
                        className={(errors.password && tuch.password) ? styles.uncompleted : styles.formInput} 
                        type="password" 
                        name="password" 
                        value={data.password} 
                        onChange={changeHandler} 
                        onFocus={focusHandler} 
                    />
                    { errors.password && tuch.password && <span>{ errors.password }</span> }
                </div>
                <div className={styles.formButtons}>
                    <Link to="/Sign-Up" >Sign Up</Link>
                    <button type="submit">Sign In</button>
                </div>
           </form>
           <ToastContainer />
        </div>
    );
};

export default Sign_In;