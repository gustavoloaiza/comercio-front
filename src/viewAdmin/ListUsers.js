import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { MapContainer, TileLayer } from 'react-leaflet'


function ListUsers() {

    const [data, setData] = useState([]);

    async function cargarTodosDatos() {
        let result = await fetch('http://127.0.0.1:8000/api/listUsers')
        if (!result.ok) {
            throw new Error(`Error! status: ${result.status}`);
        }

        result = await result.json();
        setData(result)
    }



    useEffect(() => {
        let tipo = JSON.parse(localStorage.getItem('user-info'))["tipo"]

        if (!localStorage.getItem('user-info') && !(tipo == "admin")) {
            navigate("/Registrar")
        }

        cargarTodosDatos()
    }, [])


    const navigate = useNavigate();
    return (
        <div>
            <h1>Usuarios</h1>
            <div className='col-sm-6 offset-sm-3'>
                <Table>

                    <tr>
                        <td>id</td>
                        <td>Nombre</td>
                        <td>apellido</td>
                        <td>email</td>
                        <td>tipo</td>
                        <td>celular</td>
                        <td>lat</td>
                        <td>lng</td>
                        <td>mapa</td>
                        <th>Acciones</th>
                    </tr>

                    {
                        data.map((item) =>
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.nombre}</td>
                                <td>{item.apellido}</td>
                                <td>{item.email}</td>
                                <td>{item.tipo}</td>
                                <td>{item.celular}</td>
                                <td>{item.lat}</td>
                                <td>{item.lng}</td>
                                <td>
                                    <MapContainer id='usuariosMapa' center={{lat: item.lat,lng: item.lng}} zoom={13} scrollWheelZoom={true}>
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        />

                                    </MapContainer></td>
                                <td>
                                    <div className="btn-group" role="group" aria-label="">

                                        <Link type="button" className="btn btn-warning"
                                            to={"/editarUser/" + item.id}
                                        >Editar</Link>


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

export default ListUsers