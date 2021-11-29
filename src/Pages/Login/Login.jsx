import React from 'react';
import { useState,useEffect } from 'react';
import { useUserContext } from "../../Contexts/UserContext";
import { useNavigate } from 'react-router-dom';

const routes = {
     "admin": "/admin",
     "user": "/user"
};

export default function Login(){

     const context = useUserContext();
     //const { login, token } = useUserContext();
     const navigate = useNavigate();
     const [username, setUsername] = useState("");
     const [password, setPassword] = useState("");
     const [error, setError] = useState(false);

     const onChange = (e, save) => {
          save(e.target.value);
     }

     const onSubmitHandler = async (e) => {
          e.preventDefault();
          
          const logged = await context.login(username, password);
          setError(!logged);
          
          setUsername("");
          setPassword("");
     }


     useEffect(()=> {
          if(context.user) {
               navigate(routes[context.user.role] ?? "/");
          }
          }, [context.user]);

     return(
          <form onSubmit={onSubmitHandler}>
          <div className="container">
               <div className="header">
               <h1 className="header__tittle">MyPost</h1>
               </div>
               <div className="login_box">
                    <div>
                         <label className="label" htmlFor="">Usuario:</label>
                         <input className="login_user"type="text" value={username} onChange={(e) => onChange(e, setUsername)} />
                    </div>
                    <div className="pass">
                         <label className="label" htmlFor="">Contraseña: </label>
                         <input className="login_password" type="password" value={password} onChange={(e) => onChange(e, setPassword)} />
                    </div>
                    <button className="login_button">Ingresar</button>
               </div>
          </div>
          </form>

     );
}

