import React, { Component, useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import Header from './Header';

function Registrar() {

    useEffect(()=>{
        if(localStorage.getItem('user-info'))
        {
            navigate("/AddProduct")
        }
    })

    const [nombre, setName] = useState("")
    const [apellido, setApellido] = useState("")
    const [email, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [tipo, setTipo] = useState("cliente")
    const [celular, setCelular] = useState("")
    const navigate = useNavigate();

    async function registro() {
        let item = { nombre, apellido, email, password, tipo, celular }
        console.warn("envio", item)
        let result = await fetch('http://127.0.0.1:8000/api/register', {
//        let result = await fetch('http://localhost/api/register', {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        result = await result.json()
        console.warn("resultado", result)
        localStorage.setItem("user-info",JSON.stringify(result))
        navigate("/AddProduct")
    }


    return (
        <div>
            <div className='col-sm-6 offset-sm-3'>
                <h1>Registrar Usuario</h1>
                <input type="text" onChange={(e) => setName(e.target.value)} className='form-control' placeholder='Nombre' />
                <br />
                <input type="text" onChange={(e) => setApellido(e.target.value)} className='form-control' placeholder='Apellido' />
                <br />
                <input type="text" onChange={(e) => setMail(e.target.value)} className='form-control' placeholder='Mail' />
                <br />
                <input type="text" onChange={(e) => setPassword(e.target.value)} className='form-control' placeholder='Contrasena' />
                <br />
                <div>
                    <input type="radio" onChange={(e) => setTipo(e.target.value)} value="productor" name="tipoUser" /> Productor
                    <input type="radio" onChange={(e) => setTipo(e.target.value)} value="cliente" name="tipoUser" defaultChecked /> Cliente
                </div>
                <input type="text" onChange={(e) => setCelular(e.target.value)} className='form-control' placeholder='Celular' />
                <br />

                <button onClick={registro} className='btn btn-primary'>Registrar</button>
            </div>
        </div>
    )
}

export default Registrar