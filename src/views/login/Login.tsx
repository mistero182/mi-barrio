import React, { useContext, useState  } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../context/userContext'
import axios from 'axios';
import Cookies from 'universal-cookie';


import rigthArrow from '../../assets/icons/rigth-arrow.png'

import './Login.css'

const cookies = new Cookies();

export const Login = (() => {
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(UserContext);
    const [ errorMsg, setErrorMsg ] = useState('');

    function iniciarSesionSubmmit(event: React.SyntheticEvent) {
        event.preventDefault();
        console.log('loggin')

        const target = event.target as typeof event.target & {
            email: { value: string };
            password: { value: string };
        };

        const payload = {
            username: target.email.value,
            password: target.password.value
        };

        console.log(payload);

        const options = {
            method: 'POST',
            withCredentials: true,
            data: JSON.stringify(payload),
            url: 'https://vinereserveclub.smartssi.net/auth/login'
          };
      
        axios(options)
        .then(function (resp) {
            console.log(resp);
            const { email, username, "custom:role": role } = resp.data;
            cookies.set('mibarrio_user', username );
            
    
            setUserData({
                ...userData,
                email,
                username,
            });
    
            navigate("/");
        })
        .catch(function (error) {
            console.log(error);
    
            if (error.response.data.error) {
                if (error.response.data.error.message) {
                    let errorMessage = error.response.data.error.message;
        
                    if (typeof error.response.data.error.message === 'object') {
                        errorMessage = error.response.data.error.message.message;
                    }
        
                    setErrorMsg(errorMessage);
                }
                
            } else {
                setErrorMsg('Error');
            }
    
        });
    }

    return (
        <div className='login-main'>
            <Link to='/'>

                <img
                    className='login-backIcon'
                    height={40}
                    src={ rigthArrow }
                />
            </Link>

            <div className='login-formContainer'>

                <form onSubmit={iniciarSesionSubmmit} >
                    <h2 className='login-title'>Iniciar Session</h2>
                    <div className='login-ruler'></div>
                    <h3 className='login-subtitle'> Mi Santa Cruz </h3>

                    <div className="login-input">
                        <label className='login-label'>Usuario:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="email/username"
                            name="email"
                        />
                    </div>

                    <div className="login-input">
                        <label className='login-label'>Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="password"
                            name="password"
                        />
                    </div>

                    <div className="login-submit">
                        <button type="submit" className="login-button">
                            Iniciar Sesion
                        </button>
                    </div>

                </form>

                <Link to='/registrarse'>
                    <p className='login-signUp'> ¿No tienes cuenta? Registrate aqui </p>
                </Link>

            </div>
        </div>
    );
});
