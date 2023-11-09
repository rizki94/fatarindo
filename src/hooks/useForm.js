import { useState } from 'react'
import {omit} from 'lodash'

const useForm = (callback) => {
    
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});


    const validate = (event, name, value) => {

        switch (name) {
            case 'username':
                if(value.length <= 4){
                    setErrors({
                        ...errors,
                        username:'Username atleast have 5 letters'
                    })
                }else{
                    let newObj = omit(errors, "username");
                    setErrors(newObj);                    
                }
                break;
            case 'email':
                if(
                    !new RegExp( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value)
                ){
                    setErrors({
                        ...errors,
                        email:'Enter a valid email address'
                    })
                }else{

                    let newObj = omit(errors, "email");
                    setErrors(newObj);
                }
            break;
            
            case 'password':
                if(
                    !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)
                ){
                    setErrors({
                        ...errors,
                        password:'Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers'
                    })
                }else{

                    let newObj = omit(errors, "password");
                    setErrors(newObj);
                }
            break;
            
            default:
                break;
        }
    }

    const handleChange = (event) => {   
        event.persist();

        let name = event.target.name;
        let val = event.target.value;

        validate(event,name,val);
        setValues({
            ...values,
            [name]:val,
        })

    }


    const handleSubmit = (event) => {
        if(event) event.preventDefault();
        if(Object.keys(errors).length === 0 && Object.keys(values).length !==0 ){
            callback();
        }else{
            alert("There is an Error!");
        }
    }

    return {
        values,
        errors,
        handleChange,
        handleSubmit
    }
}

export default useForm