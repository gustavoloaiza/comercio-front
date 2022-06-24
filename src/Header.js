import React, { Component,useEffect } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Header() {

    let user = JSON.parse(localStorage.getItem('user-info'))
    var usuariiio = true;

    function salir() {
        localStorage.clear();
        navigate("/Login")
    }

    const navigate = useNavigate();
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Inicio</Navbar.Brand>
                <Nav className="me-auto navbar_warapper" >

                    {
                        localStorage.getItem('user-info') ?
                            <>
                                {user["tipo"]=="productor" && <Link to="/ListProduct">Ver productos </Link> }
                                {user["tipo"]=="productor" && <Link to="/AddProduct">Aniadir producto </Link> }
                                {user["tipo"]=="productor" && <Link to="/EditarUsuario">Editar </Link> }

                                {user["tipo"]=="cliente" && <Link to="/EditarCliente">Editar </Link> }
                                {user["tipo"]=="cliente" && <Link to="/ListProductClient">Productos </Link> }

                                {user["tipo"]=="admin" && <Link to="/ListUsers">Usuarios </Link> }

                            </>
                            :
                            <>
                                <Link to="/Login">Login </Link>
                                <Link to="/Registrar">Registrar </Link>
                            </>
                    }
                </Nav>
                {localStorage.getItem('user-info') ?
                    <Nav>
                        <NavDropdown title={user && user.nombre}>
                            <NavDropdown.Item onClick={salir} >Salir</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    : null
                }
            </Navbar>
            <br />
            <Navbar bg="primary" variant="dark"></Navbar>
        </div>
    )
}

export default Header