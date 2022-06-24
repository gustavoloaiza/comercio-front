import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'


function AddProduct() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setprice] = useState("");
    const [priceShip, setpriceShip] = useState("");
    const [file, setfile] = useState("");
    const id_productor = JSON.parse(localStorage.getItem('user-info'))["id"];

    useEffect(() => {
        let tipo = JSON.parse(localStorage.getItem('user-info'))["tipo"]
        if (!localStorage.getItem('user-info')&& !(tipo === "productor")) {
            navigate("/Registrar")
        }
    })
    const navigate = useNavigate();

    async function creaProducto() {

        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('priceShip', priceShip);
        formData.append('id_productor', id_productor);

        let result = await fetch('http://127.0.0.1:8000/api/addProduct', {
            //        let result = await fetch('http://localhost/api/addProduct', {
            method: 'POST',
            body: formData
        });
        alert("Creacion Correcta")
        navigate("/AddProduct")
    }


    return (
        <div>
            <div className='col-sm-6 offset-sm-3'>
                <br />
                <input type="text" onChange={(e) => setName(e.target.value)} className='form-control' placeholder='Nombre del producto' /><br />
                <input type="text" onChange={(e) => setDescription(e.target.value)} className='form-control' placeholder='Descripcion del producto' /><br />
                <input type="text" onChange={(e) => setprice(e.target.value)} className='form-control' placeholder='Precio del producto por Lb' /><br />
                <input type="text" onChange={(e) => setpriceShip(e.target.value)} className='form-control' placeholder='Precio por Kl de envio' /><br />
                <input type="file" onChange={(e) => setfile(e.target.files[0])} className='form-control' placeholder='Fotografia' /><br />
                <button onClick={creaProducto} className='btn btn-primary'>Crear Producto </button>


            </div>
        </div>
    )
}

export default AddProduct