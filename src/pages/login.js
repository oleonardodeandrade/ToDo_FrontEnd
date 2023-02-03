import '../styles/login.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [login, setLogin] = useState([]);
    const [passwd, setPasswd] = useState([]);
    const navigate = useNavigate();
    const signIn = () => {

        const body = {
            login: login,
            senha: passwd,
        }

        axios.post('http://localhost:5000/login', body).then((response) => {
            console.log(response.data.token)
            sessionStorage.setItem('jwtToken', response.data.token);
            navigate("/")
        });
    };
    const handleChangeLogin = (event) => {
        setLogin(event.target.value);
    };
    const handleChangePasswd = (event) => {
        setPasswd(event.target.value);
    };
    return (
        <div className="loginPage">
            <div className='containerPage'>
                <form>
                    <label for="login">Login:</label>
                    <input type="text" id="login" name="login" value={login} onChange={handleChangeLogin} />
                    <label for="pwd">Senha: </label>
                    <input type="password" id="pwd" name="pwd" value={passwd} onChange={handleChangePasswd} />
                    <button className='buttonSignIn' onClick={signIn}>Entrar</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
