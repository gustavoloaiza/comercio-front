import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { getDistance } from 'geolib';
import Map from "../mapa/Map"
import Slider from '@mui/material/Slider';
import Popup from 'reactjs-popup';
import { useJsApiLoader, DistanceMatrixService } from '@react-google-maps/api'
//import 'reactjs-popup/dist/index.css';
require("leaflet-routing-machine");



function ListProductClient() {

    const [data, setData] = useState([]);
    const [dataDos, setDataDos] = useState([]);
    const [dataUser, setDataUser] = useState([]);

    const [geo, setGeo] = useState({ lat: -0.20326810158918998, lng: -78.33460206493302 });
    const [geoClien, setgeoClien] = useState({ lat: -0.20326810158918998, lng: -78.33460206493302 });

    const [distMax, setdistMax] = useState(200);
    const [distMin, setdistMin] = useState(0);

    const [infoProd, setinfoProd] = useState([]);


    const [mincant,setmincant] = useState(1);
    const [maxcant,setmaxcant] = useState(80);


    async function cargarTodosDatos() {
        let result = await fetch('http://127.0.0.1:8000/api/getAllProduct')
        if (!result.ok) {
            throw new Error(`Error! status: ${result.status}`);
        }

        result = await result.json();
        result.forEach(function (producto) {
            producto.dist = Distancia(producto.id_productor);
            if (parseFloat(producto.dist) > distMax) {
                setdistMax(parseFloat(producto.dist)+1)
            }
        })
        setData(result)
        setDataDos(result)


    }

    async function cargarTodosDatosUser() {

        let resultUser = await fetch('http://127.0.0.1:8000/api/listUsers')
        if (!resultUser.ok) {
            throw new Error(`Error! status: ${resultUser.status}`);
        }

        resultUser = await resultUser.json();
        setDataUser(resultUser)
        setgeoClien({ lat: JSON.parse(localStorage.getItem('user-info'))["lat"], lng: JSON.parse(localStorage.getItem('user-info'))["lng"] })
        setGeo({ lat: JSON.parse(localStorage.getItem('user-info'))["lat"], lng: JSON.parse(localStorage.getItem('user-info'))["lng"] });

    }



    async function buscar(key) {
        if (key !== "") {
            let result = await fetch('http://127.0.0.1:8000/api/search/' + key)
            result = await result.json();
            setData(result)
            setDataDos(result)
        } else {
            cargarTodosDatos()
        }

    }



    useEffect(() => {
        let tipo = JSON.parse(localStorage.getItem('user-info'))["tipo"]

        if (!localStorage.getItem('user-info') && !(tipo === "cliente")) {
            navigate("/Registrar")
        }

        cargarTodosDatosUser()
        cargarTodosDatos()
        rangoDistancia()


    }, [])

    function Distancia(userId) {
        const found = dataUser.find(obj => {
            return obj.id === userId;
        });
        if (found !== undefined) {
            const dist = getDistance(
                { latitude: found.lat, longitude: found.lng },
                { latitude: geoClien['lat'], longitude: geoClien['lng'] }
            ) / 1000
            return dist.toFixed(2)

        }
    }


    function PrecioDist(userId, precioEnv) {
        const dist = Distancia(userId)
        return (dist * precioEnv).toFixed(2)
    }

    function verMapa(id) {
        const found = dataUser.find(obj => {
            return obj.id === id;
        });



        setGeo({ lat: found.lat, lng: found.lng });

        setinfoProd(found)
        //console.log(infoProd)
        //console.log(geo)
    }

    function rangoDistancia() {
        const distancias = []
        data.forEach(prod => distancias.push(prod.id_productor))

        //console.log(distancias)
        //console.log(Math.max(...distancias))
    }

    function filtraDist(rango) {
        var filtro = data.filter(function (dat) {
            return parseFloat(dat.dist) <= rango;
        });

        setDataDos(filtro)
    }

    function primera(a){
        setmincant(a);

        rangocant()
    }

    function segunda(a){
        setmaxcant(a);

        rangocant()
    }


    function rangocant(){
        var filtro = data.filter(function (dat) {
            return  (parseFloat(dat.cantidad) >= mincant && parseFloat(dat.cantidad) <= maxcant);
        });

        setDataDos(filtro)
        console.log(filtro)
        console.log(mincant)
        console.log(maxcant)

    }


    //console.log(data)
    const navigate = useNavigate();
    //<Map prod={geo} clien={geoClien} />
    return (
        <div>
            <div className='col-sm-6 offset-sm-3'>
                <h1>Productos disponibles</h1>

                <div id='filtros'>
                    <input type="text" id='boxFilt' onChange={(e) => buscar(e.target.value)} className="form-control" placeholder="Buscar Producto" />

                    <input type="number" onChange={(e) => primera(e.target.value) } placeholder="min"></input>
                    <input type="number" onChange={(e) => segunda(e.target.value)} placeholder="max"></input>

                    <Slider
                        id='boxFilt'
                        aria-label="Small steps"
                        defaultValue={distMax}
                        step={10}
                        marks
                        min={distMin}
                        max={distMax}
                        valueLabelDisplay="auto"
                        onChange={(e) => filtraDist(e.target.value)}
                    />
                </div>

                <div id='filtros'>
                    <div>
                        Buscar por producto
                    </div>

                    <div>
                        filtrar por distancia
                    </div>

                </div>

                <br />
                <Table>

                    <tr>
                        <td>id</td>
                        <td>Nombre</td>
                        <td>Descripcion</td>
                        <td>Precio</td>
                        <td>Cantidad</td>
                        <td>Precio envio</td>
                        <td>Distancia</td>
                        <td>Precio Envio</td>
                        <td>Imagen</td>
                        <th>Acciones</th>
                    </tr>

                    {
                        dataDos.map((item) =>

                            <tr onMouseOver={() => verMapa(item.id_productor)}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.price}</td>
                                <td>{item.cantidad}</td>
                                <td>{item.priceShip}</td>
                                <td>{Distancia(item.id_productor)} Km</td>
                                <td>{PrecioDist(item.id_productor, item.priceShip)} $</td>
                                <td><img src={"http://localhost:8000/" + item.file_path} height="100" width="100" /></td>

                                <td >

                                    <Popup id='pop'
                                        trigger={<div onClick={() => verMapa(item.id_productor)} className="btn-groupbtn btn-warning" role="group" aria-label="" > info </div>}
                                        position="right center"
                                    >
                                        <div>{infoProd.nombre}</div>
                                        <div>{infoProd.email}</div>
                                        <div>{infoProd.celular}</div>
                                        <Map prod={geo} clien={geoClien} />
                                    </Popup>
                                </td>
                            </tr>
                        )
                    }

                </Table>

            </div>

        </div>

    )
}

export default ListProductClient