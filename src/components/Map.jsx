import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
import {useGeolocation} from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";


function Map() {
    const [mapPosition, setMapPosition] = useState([40,0]);
    const {cities} = useCities();
    const {isLoading: isLoadingPosition, position: geolocationPosition, getPosition} = useGeolocation();
    const [mapLat, mapLng] = useUrlPosition();

    useEffect(
        function() {
            if(mapLat&&mapLng) setMapPosition(mp=>[mapLat, mapLng]);
        },[mapLat, mapLng]);

    useEffect(function() {
        if (geolocationPosition)
            setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }, [geolocationPosition]);

    return(
        <div className={styles.mapContainer}>
            <Button type="position" onClick={getPosition}>
                {isLoadingPosition ? "Loading..." : "Use your position"}
            </Button>
            <MapContainer className={styles.map} center={mapPosition} zoom={7} scrollWheelZoom={true}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
{               cities.map(city=>(
                <Marker position={[city.position.lat,city.position.lng]} key={city.id}>
                    <Popup>
                        <span>{city.cityName}</span>
                        <span>{city.notes}</span>
                    </Popup>
                </Marker>
)) }
                <ChangeCenter position={mapPosition}/>
                <DetectClick/>
            </MapContainer>
        </div>
    );
}

function ChangeCenter({position}) {
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick() {
    const navigate = useNavigate();
    useMapEvents({
        click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    });

}

export default Map;

