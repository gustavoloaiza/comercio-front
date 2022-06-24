import React, { Component, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Header from './Header';


function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate("/AddProduct")
        }
    })

    async function logea() {

        let item = { email, password }
        console.warn(email, password);
        let result = await fetch('http://127.0.0.1:8000/api/login', {
            //let result = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify(item)
        })
        result = await result.json()
        console.warn("resultado", result)
        console.warn("resultado", result.hasOwnProperty('error'))
        if (result.hasOwnProperty('error')) {
            localStorage.clear();
        } else {
            localStorage.setItem("user-info", JSON.stringify(result))
            navigate("/Inicio")

        }
    }

    const navigate = useNavigate();
    return (
        <div>
            <div className='col-sm-6 offset-sm-3'>
                <h1>pagina de login</h1>
                <input type="text" onChange={(e) => setEmail(e.target.value)} className='form-control' placeholder='email'></input>
                <br />
                <input type="password" onChange={(e) => setPassword(e.target.value)} className='form-control' placeholder='contrasena'></input>
                <br />
                <button onClick={logea} className='btn btn-primary'>Ingresar</button>

            </div>
        </div>
    )
}

export default Login