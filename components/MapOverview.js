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

  const rcolor = () => {
    let items = ["#FF490D", "#FD9019", "#7BFF05", "#F5C200"]
    return items.sort(() => 0.5 - Math.random())[0];
  }
  
  return (
    <MapContainer center={[6.524400, 3.379199]} zoom={3} scrollWheelZoom={true} style={{height: "100%", width: "100%"}}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        rows.map((row) => (
          <>
            <CircleMarker key={row.longitude_deg+row.latitude_deg} center={[row.latitude_deg , row.longitude_deg]} 
                        radius={15} color="black" fillColor={rcolor()} opacity={1} 
                        fillOpacity={1} weight={1.2}
                >
              <Popup >
                Kanda.<br /> {row.latitude_deg} {row.longitude_deg}.
                <div className='h-52 w-52 '></div>
              </Popup>
            </CircleMarker>
            <Marker position={[row.latitude_deg, row.longitude_deg]} icon={L.divIcon({
                className: "text-black font-medium",
                html: "15",
              })}/>
          </>
          
        ))
      }
    </MapContainer>
  )
}

export default MapOverview