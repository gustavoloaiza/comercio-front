import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const createRoutineMachineLayer = ({ position, start, end, color }) => {
    const instance = L.Routing.control({
        waypoints: [
            start,
            end
        ],
        lineOptions: {
            styles: [
                {
                    color,
                },
            ],
        },
    });

    return instance;
};

const Rutine = createControlComponent(createRoutineMachineLayer);

export default Rutine;