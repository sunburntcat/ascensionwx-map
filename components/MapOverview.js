import { MapContainer, Marker, Popup, TileLayer, CircleMarker, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
// import L from "leaflet"
import { postMapData } from '../lib/api'



const MapOverview = () => {

  const [rows, setRows] = useState([])

  // fetch MapData from Telos chain
  useEffect(() => {
    const data = postMapData().then(data => {
      const rows = data.rows
      setRows(data.rows)
      console.log(rows)
    })
    
  }, [])
  
  // get random color
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
            <Marker position={[row.latitude_deg, row.longitude_deg]} icon={L.divIcon({
                className: "text-black font-medium",
                html: "15",
              })}>
                <Popup maxWidth={700} maxHeight={600}>
                  <div className='h-[500px] w-[700px]'>
                    <p className="flex space-x-3"> 
                        <span className="flex gap-2 text-4xl font-normal leading-tight text-gray-500 ">
                            Devname:
                            <span className="text-4xl font-semibold leading-tight text-blue-500 ">
                                {row.devname}
                            </span>
                        </span>
                    </p>
                    <div className='flex gap-5'>
                        <p className="flex space-x-3">
                            <span className="flex gap-2 text-base font-normal leading-tight text-gray-500 ">
                                Lat: 
                                <span className="text-base font-semibold leading-tight text-gray-500 ">
                                    {row.latitude_deg}
                                </span>
                            </span>
                        </p>
                        <p className="flex space-x-3">
                            <span className="flex gap-2 text-base font-normal leading-tight text-gray-500 ">
                                Long: 
                                <span className="text-base font-semibold leading-tight text-gray-500 ">
                                    {row.longitude_deg}
                                </span>
                            </span>
                        </p>
                    </div>
                    <div className='h-1 w-full bg-gray-200'/>
                  </div>
                </Popup>
            </Marker>
            <CircleMarker key={row.longitude_deg+row.latitude_deg} center={[row.latitude_deg , row.longitude_deg]} 
                        radius={15} color="black" fillColor={rcolor()} opacity={1} 
                        fillOpacity={1} weight={1.2}
                >
              {/* <Popup >
                Kanda.<br /> {row.latitude_deg} {row.longitude_deg}.
                <div className='h-52 w-52 '></div>
              </Popup> */}
            </CircleMarker>
            
          </>
          
        ))
      }
    </MapContainer>
  )
}

export default MapOverview