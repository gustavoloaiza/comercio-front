import React, { Component, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Header from './Header';


function Inicio() {


    const navigate = useNavigate();
    return (
        <div>
            <div>
                <h1>Hola</h1>
            </div>
        </div>
    )
}

export default Inicio