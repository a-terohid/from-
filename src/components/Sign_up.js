import React , { useEffect , useState } from 'react';

//VALIDATE  
import { Validate } from "../validate/validate"

//TUAST
import { notify } from "./tuast";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//STYLES    
import styles from "./sign_up.module.scss"

const Sign_up = () => {

    //STATES
    const [ data , setData] = useState({
        name: "" ,
        password: "" ,
        email: "" ,
        confrimPassword: "" ,
        isAccepted : false ,
    })

    const [ errors , setErrors ] = useState({})
    const [ tuch , setTuch ] = useState({})

    //FUNCTIONS

    const changeHandler = ( event ) =>{
        if ( event.target.name === "isAccepted" ) {
            setData({ ...data, [ event.target.name ]: event.target.checked })
        } else {
            setData({ ...data, [ event.target.name ]: event.target.value })
            
        }
    }

    const focusHandler = ( event ) => {
        setTuch( { ...tuch , [ event.target.name ] : true } )
    }

    useEffect ( () => {
        setErrors( Validate( data , "sign-up" ) )
    } , [ data , tuch ] )

    const submitHandler = ( event ) => {
        event.preventDefault();
        if ( !Object.keys(errors).length ) {
            console.log(data)
            notify("succses")
        } else {
            setTuch ({
                name: true,
                email: true,
                password: true,
                confrimPassword: true,
                isAccepted: true
            })
            notify()
        }
    }

    return (
        <div className={styles.container}>
           <form onSubmit={submitHandler} className={styles.formContainer}>
                <h2 className={styles.header}>Sign Up</h2>
                <div className={styles.formField}>
                    <label>Name</label>
                    <input 
                        className={(errors.name && tuch.name) ? styles.uncompleted : styles.formInput} 
                        type="text" 
                        name="name" 
                        value={data.name} 
                        onChange={changeHandler} 
                        onFocus={focusHandler} />
                    { errors.name && tuch.name && <span>{ errors.name }</span> }
                </div>
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
                <div className={styles.formField}>
                    <label>Confrim Password</label>
                    <input 
                        className={(errors.confrimPassword && tuch.confrimPassword) ? styles.uncompleted : styles.formInput} 
                        type="password" 
                        name="confrimPassword" 
                        value={data.confrimPassword} 
                        onChange={changeHandler} 
                        onFocus={focusHandler} 
                    />
                    { errors.confrimPassword && tuch.confrimPassword && <span>{ errors.confrimPassword }</span> }
                </div>
                <div className={styles.formField}>
                    <div className={styles.checkBoxContainer}>
                    <label>I accept terms of privcy and policy</label>
                    <input 
                        type="checkbox" 
                        name="isAccepted" 
                        value={data.isAccepted} 
                        onChange={changeHandler} 
                        onFocus={focusHandler} 
                    />
                    </div>
                    { errors.isAccepted && tuch.isAccepted && <span>{ errors.isAccepted }</span> }
                </div>
                <div className={styles.formButtons}>
                    <a href="#">Login</a>
                   <button type="submit">Sign Up</button>
                </div>
           </form>
           <ToastContainer />
        </div>
    );
};

export default Sign_up;