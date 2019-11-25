import axios  from "axios"
// Build connection function between frontend and backend

// Register
export const register = (newuser)=>{
    return axios.post('/users/register' ,newuser )
    .then(res => console.log("registerd ! "))
    .catch(err => console.log(err))
}
// login 
export const login = (user)=>{
    return axios.post('/users/login' , user)
    .then(token =>{
            console.log(token)
        localStorage.setItem('usertoken' , token.data) // localStorage in the browser
    })
    .catch(err=>console.log(err))
}
// logout

// logout() {
//     localStorage.clear();
//     window.location.href = '/';
// }