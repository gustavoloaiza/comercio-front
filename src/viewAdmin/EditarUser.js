import React, { Component, useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import {IconLocation} from '../mapa/iconLocation'


function EditarUser(props) {

    const { id } = useParams();
    const [data, setData] = useState([]);
    const [nombre, setName] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setMail] = useState("");
    const [celular, setCelular] = useState("");

    const center = {
        lat: -0.2054148,
        lng: -78.4694062,
    }

    async function obtenUser() {
        let result = await fetch("http://127.0.0.1:8000/api/getUser/" + id)
        result = await result.json();
        setData(result)
    }

    useEffect(() => {
        let tipo = JSON.parse(localStorage.getItem('user-info'))["tipo"]

        if (!localStorage.getItem('user-info') && !(tipo == "admin")) {
            navigate("/Registrar")
        }
        obtenUser()
        
        setName(data.nombre);
        setApellido(data.apellido);
        setMail(data.email);
        setCelular(data.celular);
        center.lat = data.lat;
        center.lng = data.lng;

    }, [])

    async function cambioUser() {
        const formData = new FormData();
        console.warn(id)
        formData.append('nombre', nombre);
        formData.append('apellido', apellido);
        formData.append('email', email);
        formData.append('celular', celular);
        formData.append('lat', center.lat);
        formData.append('lng', center.lng);

        let result = await fetch('http://127.0.0.1:8000/api/updateUser/' + id + "?_method=POST", {
            method: 'POST',
            body: formData
        });
        result = await result.json()
        alert("actualizacion Correcta")
        localStorage.setItem("user-info", JSON.stringify(result))
        navigate("/ListUsers")
    }

    function DraggableMarker() {
        const [draggable, setDraggable] = useState(false)
        const [position, setPosition] = useState(center)
        const markerRef = useRef(null)
        const eventHandlers = useMemo(
            () => ({
                dragend() {
                    const marker = markerRef.current
                    if (marker != null) {
                        setPosition(marker.getLatLng())
                        center.lat = marker.getLatLng().lat
                        center.lng = marker.getLatLng().lng
                        console.log(center)
                    }
                },
            }),
            [],
        )
        const toggleDraggable = useCallback(() => {
            setDraggable((d) => !d)
        }, [])

        return (
            <Marker
                draggable={draggable}
                eventHandlers={eventHandlers}
                position={position}
                ref={markerRef}
                icon={IconLocation}>
                <Popup minWidth={90}>
                    <span onClick={toggleDraggable}>
                        {draggable
                            ? 'Arrastrar marcador'
                            : 'Click aqui para arrastrar'}
                    </span>
                </Popup>
            </Marker>
        )
    }
    const navigate = useNavigate();

    return (
        <div>
            <div className='col-sm-6 offset-sm-3'>
                <h1>Editar Usuario</h1>
                <input type="text" onChange={(e) => setName(e.target.value)} className='form-control' placeholder='Nombre' defaultValue={data.nombre} />
                <br />
                <input type="text" onChange={(e) => setApellido(e.target.value)} className='form-control' placeholder='Apellido' defaultValue={data.apellido} />
                <br />
                <input type="text" onChange={(e) => setMail(e.target.value)} className='form-control' placeholder='Mail' defaultValue={data.email} />
                <br />
                <input type="text" onChange={(e) => setCelular(e.target.value)} className='form-control' placeholder='Celular' defaultValue={data.celular} />
                <br />
                <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
                    <h1>Ubicacion</h1>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <DraggableMarker />
                </MapContainer>
                <button onClick={cambioUser} className='btn btn-primary'>Registrar</button>
            </div>
        </div>
    )
}

export default EditarUser