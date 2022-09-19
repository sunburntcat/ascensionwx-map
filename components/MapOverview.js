import { MapContainer, Marker, Popup, TileLayer, CircleMarker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Pulse from './Pulse'
import Temperature from './Chart/Temperature'
import { useEffect, useState } from 'react'
import { postMapData } from '../lib/api'



const MapOverview = () => {
  
  ////////// STATES ///////////////
  const [rows, setRows] = useState([])
  const [percent, setPercent] = useState(0)
  const [isLoading, setIsLoading] = useState(true)


  // fetch MapData from Telos chain
  useEffect( () => {
    const fetcher = async () => {
      // fetch post Map data
      const data = await postMapData()
      setRows(data.rows)
      // console.log(rows)
    }
    
    fetcher()


    
  }, [])
  
  // get random color
  const rcolor = (t) => {
    let items = {red:"#FF490D", green:"#7BFF05", blue:"#0000FF", white:"#FFFFFF"}
    let color
    if (t >= 40) color = items["red"]
    else if (t >= 20) color = items["green"]
    else if (t >= 0) color = items["blue"]
    else if (t >= -20) color = items["white"]

    return color
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
                html: Math.trunc(row.temperature_c),
              })}>
                <Popup maxWidth={500} maxHeight={700}>
                  <div className='w-[500px] h-[510px]'>
                    <p className="flex space-x-3"> 
                        <span className="flex gap-2 text-4xl font-normal leading-tight text-gray-500 ">
                            Devname:
                            <span className="text-4xl font-semibold leading-tight text-blue-500 ">
                                {row.devname}
                            </span>
                        </span>
                    </p>
                    <div className='flex gap-5 ml-5'>
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
                    {/* <Temperature values={rows}/> */}
                    <Temperature devname={row.devname} />
                  </div>
                </Popup>
            </Marker>
            <CircleMarker key={row.longitude_deg+row.latitude_deg} center={[row.latitude_deg , row.longitude_deg]} 
                        radius={15} color="black" fillColor={rcolor(row.temperature_c)} opacity={1} 
                        fillOpacity={1} weight={1.2}
                >
              <Popup maxWidth={500} maxHeight={700}>
                  <div className='w-[500px] h-[510px]'>
                    <p className="flex space-x-3"> 
                        <span className="flex gap-2 text-4xl font-normal leading-tight text-gray-500 ">
                            Devname:
                            <span className="text-4xl font-semibold leading-tight text-blue-500 ">
                                {row.devname}
                            </span>
                        </span>
                    </p>
                    <div className='flex gap-5 ml-5'>
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
                    {/* <Temperature values={rows}/> */}
                    <Temperature devname={row.devname} />
                  </div>
                </Popup>
            </CircleMarker>
            
          </>
          
        ))
      }
    </MapContainer>
  )
}



////////////////////////////////

export default MapOverview;