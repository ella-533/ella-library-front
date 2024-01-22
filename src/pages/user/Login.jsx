import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import './style/Login/style.scss';

function Login(){
    const [message , setMessage] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('jwt')

    useEffect(()=>{
        if(token){
            navigate('/')
        }
    },[token,navigate])

    const handleLogin = async(event)=>{
        event.preventDefault();
        
        const username = event.target.username.value;
        const password = event.target.password.value;

        const loginData = {
            username , 
            password , 
        };
        const loginDataJson = JSON.stringify(loginData);

        const loginRes = await fetch("http://localhost:3005/api/users/login" , { 
            method: "POST" ,
            headers:{
                "Content-Type":"application/json" ,
            },
            body: loginDataJson ,
        });
        const loginDataRes = await loginRes.json();
        console.log(loginDataRes)
        const token = loginDataRes.data;

        if(token){
            setTimeout(function() {
              localStorage.setItem("jwt" , token);
              navigate("/")
            }, 1500);
            setMessage("Welcome Dear User ;)")
          } else {
            if(!username){
              setMessage("Please enter your username!")
            }else if(!password){
              setMessage("Please enter your password!")
            }else{
              setMessage("username or password is invalid! :(")
            }
          }
    }
    return(
        <>
        <Header />
        <div className="loginForm">
            <form onSubmit={handleLogin}> 
                {message && <p>{message}</p>}
                <label>
                    <div>username</div>
                    <input type="text" placeholder="Username" name="username" className="inputLogin"/>
                </label>
                <label>
                    <div>password</div>
                    <input type="password" placeholder="Password" name="password" className="inputLogin"/>
                </label>
                <input type="submit" value="Login" className="inputSubmit"/>
            </form>
        </div>
        </>
    )
}
export default Login;