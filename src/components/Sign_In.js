import React , { useEffect , useState } from 'react';

//VALIDATE  
import { Validate } from "../validate/validate"

//TUAST
import { notify } from "./tuast";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//STYLES    
import styles from "./sign_up.module.scss"

const Sign_In = () => {


    //states
    const [ data , setData] = useState({   
        password: "" ,
        email: "" ,
    })

    const [ errors , setErrors ] = useState({})
    const [ tuch , setTuch ] = useState({})
    

    //functions
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
            console.log(data)
            notify("succses")
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
                    <a href='#'>Sign In</a>
                    <button type="submit">Login</button>
                </div>
           </form>
           <ToastContainer />
        </div>
    );
};

export default Sign_In;