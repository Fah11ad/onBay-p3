import axios  from "axios"
// Build connection function between frontend and backend

// Register
export const register = (newuser)=>{
    console.log("inside funcAuth")
    return axios.post('http://localhost:4000/user/register' ,newuser )
    .then(res => console.log("registerd ! "))
    .catch(err => console.log(err))
}
// login 
export const login = (user)=>{
    return axios.post('http://localhost:4000/user/login' , user)
    .then(token =>{
            // console.log(token)
        localStorage.setItem('usertoken' , token.data) // localStorage in the browser
    })
    .catch(err=>console.log(err))
}
// logout

// logout() {
//     localStorage.clear();
//     window.location.href = '/';
// }