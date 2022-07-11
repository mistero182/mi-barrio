import React, { useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './SignUp.css';
import rigthArrow from '../../assets/icons/rigth-arrow.png';

export const SignUp = (() => {
    const [ status, setStatus ] = useState({step: 'signup', showMessage: false, type: '', message: 'Error Message', email: '', username: '' });

    useLayoutEffect(() => {
        console.log(status)
    }, [status.showMessage])

    function verification(event: React.SyntheticEvent) {
        const target = event.target as typeof event.target & {
            code: { value: string },
        };
    
        const payload = {
            type: "verification",
            username: status.username,
            verificationCode: target.code.value
        };
    
        const options = {
            method: 'POST',
            data: JSON.stringify(payload),
            url: 'https://apo.ocuba.net/auth/signup'
        };
    
        axios(options)
          .then(function (resp) {
              window.location.replace(`https://apo.ocuba.net/login`);
          })
          .catch(function (error) {
              console.log('catch')
              console.log(error);
    
              if (error.response.data.error) {
                let newStatus = {
                  ...status,
                  step: 'verification',
                  showMessage: true,
                  type: 'error',
                  message: error.response.data.error.message,
                };
    
                setStatus(newStatus);
    
              } else {
                setStatus({
                  ...status,
                  step: 'verification',
                  showMessage: true,
                  type: 'error',
                  message: 'Unknow Error',
                });
              }
    
        });
      }

    function registrarse(event: React.SyntheticEvent) {
        setStatus({step: 'signup', showMessage: false, type: '', message: '', email: '', username: '' });
        event.preventDefault();
        
        const target = event.target as typeof event.target & {
            username: { value: string };
            email: { value: string };
            password: { value: string };
        };
      
        const payload = {
            type: "signup",
            username: target.username.value,
            email: target.email.value,
            password: target.password.value
        }
    
        const options = {
            method: 'POST',
            data: JSON.stringify(payload),
            url: 'https://apo.ocuba.net/auth/signup'
        };
    
        axios(options)
        .then(function (resp) {
            console.log(resp)

            if (resp.data.CodeDeliveryDetails) {
                setStatus({step: 'verification', showMessage: false, type: '', message: '', email: resp.data.Destination, username: target.username.value })
            } else {
                console.log('asdasd')
                setStatus({step: 'signup', showMessage: true, type: 'error', message: 'Unknow Error', email: '', username: ''})
            }

        })
        .catch(function (error) {
            console.log('catch')
            console.log(error);

            if (error.response.data.message) {
                let newStatus = {
                    ...status,
                    showMessage: true,
                    type: 'error',
                    message: error.response.data.message,
                };
    
                setStatus(newStatus);

            } else {
                setStatus({
                    ...status,
                    showMessage: true,
                    type: 'error',
                    message: 'Unknow Error',
                });
            }

        });
    };

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

                <form
                    onSubmit={registrarse} 
                    className={ status.step === 'signup' ? '' : 'hidden' }
                >
                    <h2 className='login-title'>Registrate</h2>
                    <div className='login-ruler'></div>
                    <h3 className='login-subtitle'> Mi Santa Cruz </h3>

                    <div className="login-input">
                        <label className='login-label'>Usuario:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="username"
                            name="username"
                        />
                    </div>

                    <div className="login-input">
                        <label className='login-label'>Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="email"
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
                            Registrarse
                        </button>
                    </div>

                    <Link to='/login'>
                        <p className='login-signUp'> ¿Ya tienes cuenta? Inicia sesion </p>
                    </Link>

                </form>

                <form
                    onSubmit={verification}
                    className={ status.step === 'verification' ? '' : 'hidden' }
                    style={{ padding: 0 }}
                >

                    <h2 className='login-title'>Verificacion</h2>
                    <div className='login-ruler'></div>
                    <h3 className='login-subtitle'> Mi Santa Cruz </h3>

                    <p className='signup-messageHeader' > Ingresa el codigo enviado a tu correo </p>

                    <div className="login-input">
                        <label className='login-label'>Codigo:</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Ingresa tu codigo"
                            name="code"
                        />
                    </div>

                    {/* <Row
                        className={ status.step === 'verification' ? 'signUp-message' : 'hidden' }
                    >
                        <a href="login">Resend code</a>
                    </Row> */}

                    <div className="login-submit">
                        <button type="submit" className="login-button">
                            Verificar Codigo
                        </button>
                    </div>

                </form>

                <p className={ status.type === 'error' ? 'signup-messageError' : 'hidden' } >
                    { status.message }
                </p>

            </div>
        </div>
    );

});