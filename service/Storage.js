export const StoreUserData=(data)=>{
    localStorage.setItem('idToken',data)
}

export const getUserData=()=>{
    localStorage.getItem('idToken')
}

export const removeUserData=()=>{
    localStorage.removeItem('idToken');
}