import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'


function UpdateProduct(props) {

    const { id } = useParams();
    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setprice] = useState("");
    const [priceShip, setpriceShip] = useState("");
    const [file, setfile] = useState("");
   

    useEffect(() => {
        let tipo = JSON.parse(localStorage.getItem('user-info'))["tipo"]

        if (!localStorage.getItem('user-info') && !(tipo === "productor") ) {
            navigate("/Registrar")
        }
        
        obtenProd()

        setName(data.name);
        setDescription(data.description);
        setprice(data.price);
        setpriceShip(data.priceShip);
        setfile(data.file_path);

    },[])



    async function obtenProd() {
        let result = await fetch("http://127.0.0.1:8000/api/getProduct/" + id)
        result = await result.json();
        setData(result)
    }

    const cambioValor = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }

    async function cambio(){
        const formData = new FormData();
        
        formData.append('file', file);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('priceShip', priceShip);

        let result = await fetch('http://127.0.0.1:8000/api/updateProduct/' + id +"?_method=PUT", {
            //        let result = await fetch('http://localhost/api/addProduct', {
            method: 'POST',
            body: formData
        });
        alert("actualizacion Correcta")
        navigate("/ListProduct")
    }
    const navigate = useNavigate();
    return (
        <div>
            <div className='col-sm-6 offset-sm-3'>
                <br />
                <input type="text" name="name" onChange={(e) => setName(e.target.value)} className='form-control' placeholder='Nombre del producto' defaultValue={data.name} /><br />
                <input type="text" name="description" onChange={(e) => setDescription(e.target.value)} className='form-control' placeholder='Descripcion del producto'defaultValue={data.description} /><br />
                <input type="text" name="price" onChange={(e) => setprice(e.target.value)} className='form-control' placeholder='Precio del producto por Lb' defaultValue={data.price}/><br />
                <input type="text" name="priceShip" onChange={(e) => setpriceShip(e.target.value)} className='form-control' placeholder='Precio por Kl de envio'defaultValue={data.priceShip} /><br />
                <input type="file" name="file_path" onChange={(e) => setfile(e.target.files[0])} className='form-control' placeholder='Fotografia'defaultValue={data.file_path} /><br />
                <img src={"http://localhost:8000/" + data.file_path} height="100" width="100" />
                <br/>
                <button onClick={cambio} className='btn btn-primary'>Actualizar Producto </button>


            </div>
        </div>
    )
}

export default UpdateProduct