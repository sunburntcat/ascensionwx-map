import { MapContainer, Marker, Popup, TileLayer, CircleMarker, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
// import L from "leaflet"
import { postMapData } from '../lib/api'



const MapOverview = () => {

  const [rows, setRows] = useState([])
  useEffect(() => {
    const data = postMapData().then(data => {
      const rows = data.rows
      setRows(data.rows)
    })
  }, [])

  
  return (
    <MapContainer center={[6.524400, 3.379199]} zoom={3} scrollWheelZoom={true} style={{height: "100%", width: "100%"}}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        rows.map((row) => (
          <CircleMarker key={row.longitude_deg+row.latitude_deg} center={[row.latitude_deg , row.longitude_deg]} radius={20} >
            <Popup >
              Kanda.<br /> {row.latitude_deg} {row.longitude_deg}.
               <div className='h-52 w-52'></div>
            </Popup>
          </CircleMarker>
        ))
      }
    </MapContainer>
  )
}

export default MapOverview