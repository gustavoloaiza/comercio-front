import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'


function ListProduct() {

    const [data, setData] = useState([]);


    async function cargarTodosDatos(id) {
        let result = await fetch("http://127.0.0.1:8000/api/getProductProd/" + id, {
            method: 'GET'
        });
        result = await result.json();
        setData(result)
        console.log(result)
    }

    async function deleteProduct(id) {

        let result = await fetch('http://127.0.0.1:8000/api/deleteProduct/' + id, {
            method: 'DELETE'
        });

        result = await result.json();
        cargarTodosDatos()
    }


    useEffect(() => {
        let tipo = JSON.parse(localStorage.getItem('user-info'))["tipo"]

        if (!localStorage.getItem('user-info') && !(tipo == "productor")) {
            navigate("/Registrar")
        }
        cargarTodosDatos(JSON.parse(localStorage.getItem('user-info'))["id"])
    }, [])

    const navigate = useNavigate();
    return (
        <div>
            <h1>listar product</h1>
            <div className='col-sm-6 offset-sm-3'>
                <Table>

                    <tr>
                        <td>id</td>
                        <td>Nombre</td>
                        <td>Descripcion</td>
                        <td>Precio</td>
                        <td>Precio envio</td>
                        <td>Imagen</td>
                        <th>Acciones</th>
                    </tr>

                    {
                        data.map((item) =>
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.price}</td>
                                <td>{item.priceShip}</td>
                                <td><img src={"http://localhost:8000/" + item.file_path} height="100" width="100" /></td>
                                <td>
                                    <div className="btn-group" role="group" aria-label="">

                                        <Link type="button" className="btn btn-warning"
                                            to={"/UpdateProduct/" + item.id}
                                        >Editar</Link>

                                        <span onClick={()=>deleteProduct(item.id) } className="btn btn-danger">Borrar</span>

                                    </div>
                                </td>
                            </tr>
                        )
                    }

                </Table>
            </div>
        </div>
    )
}

export default ListProduct