import React, { useState, useRef, useMemo, useCallback } from 'react'
import { Map } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents } from 'react-leaflet'
import icono from './icono.svg'
import L from "leaflet";
function MapView() {
    const center = {
        lat: -0.2054148,
        lng: -78.4694062,
    }

    function LocationMarker() {
        const [position, setPosition] = useState(null)

        const map = useMapEvents({
            click() {
                map.locate()
            },
            locationfound(e) {
                setPosition(e.latlng)
                map.flyTo(e.latlng, map.getZoom())
                console.log("mapCenter", e.target.getCenter());
            },
        })

        return position === null ? null : (
            <Marker position={position}>
                <Popup>Estas Aqui</Popup>
            </Marker>
        )
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
                        center.lat = position.lat
                        center.lng = position.lng
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
                ref={markerRef}>
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

    var routeControl = L.Routing.control({
        show: true,
        fitSelectedRoutes: true,
        plan: false,
        lineOptions: {
            styles: [
                {
                    color: "blue",
                    opacity: "0.7",
                    weight: 6
                }
            ]
        }
    })
        .addTo(this)
        .getPlan();

    var newLatLngA = new L.LatLng(65.012357, 25.483549, "taskA");
    var newLatLngB = new L.LatLng(65.01615, 25.471847, "taskB");
    var newLatLngC = new L.LatLng(65.05098, 25.474349, "taskc");

    routeControl.setWaypoints([newLatLngA, newLatLngB, newLatLngC]);

    return <MapContainer id='usuariosMapa' center={center} zoom={13} scrollWheelZoom={true}>
        <h1>Ubicacion</h1>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
    </MapContainer>
}

export default MapView