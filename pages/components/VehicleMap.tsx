import { FC, useEffect, useState } from 'react'
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet'
import axios from 'axios'
import { FormattedDate } from '@/utils/dateUtils'
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { VehicleData, Stoppage } from '@/types/vehicle.types';

interface VehicleProps{
    vehicleData: VehicleData[];
    stoppages: Stoppage[];
}


const VehicleMap: React.FC<VehicleProps> = ({ vehicleData, stoppages }) => {
    // console.log('mapped_data', vehicleData);

    const vehiclePaths: { [key: string]: [number, number][] } = {};

    vehicleData.forEach((vehicle) => {
        const key = vehicle.EquipmentId;
        if (!vehiclePaths[key]) {
            vehiclePaths[key] = [];
        }

        vehiclePaths[key].push([vehicle.latitude, vehicle.longitude]);
    })

    return (

        
        <MapContainer center={[12.9677449, 74.871435]} zoom={12} style={{ height: '100vh', width: '100%' }} >
                <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                

            {Object.entries(vehiclePaths).map(([key, path], index) => (
                <Polyline key={index} positions={path} pathOptions={{color:'blue'}} />
            ))}
            
            {stoppages.map((stop, index) => (
                <Marker key={index} position={[stop.latitude, stop.longitude]}>
                    <Popup>
                        <div>
                            <strong>Stoppage Information</strong>
                            <p><strong>Reach Time : </strong> {FormattedDate(stop.reachTime)}</p>
                            <p><strong>End Time : </strong> {FormattedDate(stop.endTime)}</p>
                            <p><strong>Duration : </strong> {stop.duration.toFixed(2)} minutes </p>
                        </div> 
                    </Popup>
                </Marker>
                
            ))}

            </MapContainer>
            
  )
}

export default VehicleMap