import React, { Component, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Header from './Header';

function Protected() {

    useEffect(()=>{
        if(!localStorage.getItem('user-info'))
        {
            navigate("/Registrar")
        }
    })

    const navigate = useNavigate();
    return (
        <div>
            esto es
        </div>
    )
}

export default Protected