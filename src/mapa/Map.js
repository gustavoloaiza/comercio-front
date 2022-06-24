import 'leaflet/dist/leaflet.css'
import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import {
    TileLayer,
    MapContainer,
    LayersControl
} from "react-leaflet";

//https://stackblitz.com/edit/react-leaflet-routing-machine-core-api?file=src%2FMap.jsx,src%2FRoutingControl.jsx
//https://javascript.plainenglish.io/how-to-create-a-react-leaflet-control-component-with-leaflet-routing-machine-8eef98259f20

import RoutingControl from './RoutineMachine'

const maps = {
    base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};

const Map = ({ prod, clien }) => {
    const [map, setMap] = useState(null);
    //console.log(prod)
    return (
        <>
            <MapContainer id='ProdMapa'
                center={[-0.203, -78.334]}
                zoom={4}
                zoomControl={false}
                style={{ height: "50vh", width: "100%", padding: 0 }}
                whenCreated={map => setMap(map)}
            >
                <RoutingControl
                    position={'topleft'}
                    start={[prod.lat, prod.lng]}
                    end={[clien.lat, clien.lng]}
                    color={'#757de8'}
                />

                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url={maps.base}
                />

            </MapContainer>
        </>
    );
};

export default Map;
