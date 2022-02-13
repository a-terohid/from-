export const Validate = ( data , type  ) => {

    const errors = {};

    //EMAIL CHECK   
    if ( !data.email ) {
        errors.email = "Email required"
    } else if ( !/\S+@\S+\.\S+/.test( data.email ) ) {
        errors.email = "Email address is invalid"
    } else {
        delete errors.email
    }

    //PASSWORD CHECK
    if ( !data.password ) {
        errors.password = "Password required"
    } else if ( data.password.length < 6 ) {
        errors.password = "Password need to be 6 character or more "
    } else {
        delete errors.password
    }

    if ( type === "sign-up" ) {

        //NAME CHECK
        if ( !data.name.trim() ) {
            errors.name = "Username required"
        } else {
            delete errors.name
        }

        //CONFRIM PASSWORD CHECK
        if ( !data.confrimPassword ) { 
            errors.confrimPassword = "Confrim the Password "
        } else if ( data.confrimPassword !== data.password ) {
            errors.confrimPassword = "Password do not match"
        } else {
            delete errors.confrimPassword
        }

        //ISACCEPTED CHECK
        if ( data.isAccepted ) {
            delete errors.isAccepted
        } else {
            errors.isAccepted = "Accept our regulatioms"
        }

    }

    return errors ;

}