import Nav from "../Nav";
import {useState} from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
export default function LoginPage(){
    async function LoginUser(event){
        event.preventDefault();
        const response = await fetch("http://localhost:4000/login",{
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type':'application/json'},
            mode:'cors',
        })
        console.log(response)
        if(response.status==200){
            alert("Logged In");
        }
        else{
            alert("Check Username and password");
        }
    }
    const [username, setUsername]=useState('');
    const [password, setPassword]=useState('');
    const [passwordType, setPasswordType]=useState("password");
    const TogglePassword=()=>{
       if(passwordType==="password"){
        setPasswordType("text");
       }
       else{
        setPasswordType("password");
       }
    }
    return(
        <>
            <Nav/>
            <div className="loginform">
                <p className="text-center">Sign In</p>
                <form method="post" onSubmit={LoginUser}>
                    <input type="text" className="inputs" placeholder="Username" value={username} onChange={(ev)=>{
                        setUsername(ev.target.value);
                    }}/>
                    <input type={passwordType} className="inputs" placeholder="Password" value={password} onChange={(ev)=>{
                        setPassword(ev.target.value);
                    }} />
                    {passwordType==="password"? <AiOutlineEye className="eyeopen" onClick={()=>{TogglePassword()}}/> : <AiOutlineEyeInvisible className="eyeclosed" onClick={()=>{TogglePassword()}}/>} 
                    <br></br>
                    <input type="submit" value={"Login"} className="auth-btn"/>
                </form>
            </div>
        </>
    )
}