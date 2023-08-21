import axios from "axios";
axios.defaults.baseURL ="https://identitytoolkit.googleapis.com/v1/";
const API_KEY="AIzaSyBDieH6DHCS3gyN7vTrP4-wWkY0bz6z1MA";
const A_API_KEY=`AIzaSyAskEVf7cvCRK4f5nomVGqk28GCHaWPK7A`;
const Register_URL = `accounts:signUp?key=${API_KEY}`;
const Login_URL=`accounts:signInWithPassword?key=${API_KEY}`;
const ALogin_URL=`accounts:signInWithPassword?key=${A_API_KEY}`


export const RegisterApi=(inputs)=>{
    let data = {displayName:inputs.name,email:inputs.email,uname:inputs.uname,phno:inputs.phno,password:inputs.password}
    return axios.post(Register_URL,data)
}
export const LoginApi=(inputs)=>{
    let data = {email:inputs.email,password:inputs.password}
    return axios.post(Login_URL,data)
}
export const ALoginApi=(inputs)=>{
    let data = {email:inputs.email,password:inputs.password}
    return axios.post(ALogin_URL,data)
}