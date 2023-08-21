import { useState } from 'react'
import { RegisterApi } from '../service/Api';
import { isAuthenticated } from '../service/Auth';
import { StoreUserData } from '../service/Storage';
import './UserRegister.css'
import { Link, Navigate } from 'react-router-dom';
import NavBar from '../Component/NavBar';


export default function RegisterPage(){
    const initialStateErrors = {
        email:{required:false},
        password:{required:false},
        name:{required:false},
        username:{required:false},
        phone_number:{required:false},
        custom_error:null
    };
    const [errors,setErrors] = useState(initialStateErrors);

    const [loading,setLoading]  =  useState(false);

    const handleSubmit = (event)=>{
        event.preventDefault();
        let errors =initialStateErrors; 
        let hasError = false; 
        if (inputs.name == "") {
            errors.name.required =true;
            hasError=true;
        }
        if (inputs.email == "") {
            errors.email.required =true;
            hasError=true;
        }
        if (inputs.password == "") {
            errors.password.required =true;
            hasError=true;
        }
        if (inputs.username == "") {
         errors.username.required =true;
         hasError=true;
     }
     if (inputs.phone_number == "") {
      errors.phone_number.required =true;
      hasError=true;
  }

        if (!hasError) {
            setLoading(true)
            //sending register api request
            RegisterApi(inputs).then((response)=>{
               StoreUserData(response.data.idToken);
               window.location.href = "/userlogin";

            }).catch((err)=>{
               if(err.response.data.errors.message=="EMAIL_EXISTS"){
                    setErrors({...errors,custom_error:"Already this email has been registered!"})
               }else if(String(err.response.data.error.message).includes('WEAK_PASSWORD')){
                    setErrors({...errors,custom_error:"Password should be at least 6 characters!"})
               }

            }).finally(()=>{
                setLoading(false)
            })
        }
        setErrors({...errors});
    }

    const [inputs,setInputs] = useState({
        email:"",
        password:"",
        name:"",
        username:"",
        phone_number:"",
    })

    const handleInput = (event)=>{
        setInputs({...inputs,[event.target.name]:event.target.value})
    }

    if (isAuthenticated()) {
        return <Navigate to="/dashboard" />
    }
    
    return (
        <div>
            <section className="register-block">
            <div className="reg-container">
               <div className="row ">
                  <div className="col register-sec">
                     <h2 className="text-center">User Register</h2>
                     <form onSubmit={handleSubmit} className="register-form" action="" >
                      <div className="form-group">
                        <label htmlFor="name" className="text-uppercase">Name</label>
                        <input type="text" className="form-control" value={inputs.name} onChange={handleInput} name="name" id="name" / >
                        {errors.name.required?
                            (<span className="text-danger" >
                            Name is required.
                        </span>):null
                        }
                     </div>
                     <div className="form-group">
                     <label htmlFor="exampleInputEmail1" className="text-uppercase">username</label>
                     <input type="text" className="form-control" value={inputs.username} onChange={handleInput}name="username" id="" / >
                        {errors.username.required?
                            (<span className="text-danger" >
                            User Name is required.
                        </span>):null
                        }
                     </div>

                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                        <input type="text"  className="form-control" value={inputs.email}  onChange={handleInput} name="email" id="" / >
                        { errors.email.required?
                            (<span className="text-danger" >
                            Email is required.
                        </span>):null
                        }
                     </div>

                     <div className="form-group">
                        <label htmlFor="exampleInputEmail1" className="text-uppercase">Phone Number</label>
                        <input type="text" className="form-control" value={inputs.phone_number} onChange={handleInput} name="phone_number" id="" / >
                        {errors.phone_number.required?
                            (<span className="text-danger" >
                            Phone number is required.
                        </span>):null
                        }
                     </div>

                     <div className="form-group">
                        <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                        <input  className="form-control" type="password"  value={inputs.password} onChange={handleInput} name="password" id="" />
                        {errors.password.required?
                            (<span className="text-danger" >
                            Password is required.
                        </span>):null
                        }{errors.password.length?
                           (<span className="text-danger">
                              Password Must be above 6 characters
                           </span>):null
                        }
                     </div>

                     <div className="form-group">
                        <span className="text-danger" >
                        {errors.custom_error?
                           (<p>{errors.custom_error}</p>):null
                        }
                        </span>
                        {loading?
                        (<div  className="text-center">
                          <div className="spinner-border text-primary " role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                        ):null
                        }
          
                        <input type="submit" className="btn-register" disabled={loading} value="Register"/>
                     </div>
                     <div className="clearfix"></div>
                     <div className="form-group">
                       Already have account ? Please <Link to="/userlogin">Login</Link>
                     </div>
          
          
                     </form>
          
          
                  </div>
          
               </div>
          
          
            </div>
          </section>    
        </div>
        )
}