import { MapContainer, Marker, Popup, TileLayer, CircleMarker, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
// import L from "leaflet"
import { postMapData, getActions, checkCurrentGMT, compare, getData, diff_days } from '../lib/api'

function diff_(d) {
  const today = new Date();
  d = new Date(d);
  const days = parseInt((today - d) / (1000 * 60 * 60 * 24));
  const hours = parseInt(Math.abs(today - d) / (1000 * 60 * 60) % 24);
  const minutes = parseInt(Math.abs(today.getTime() - d.getTime()) / (1000 * 60) % 60);
  const seconds = parseInt(Math.abs(today.getTime() - d.getTime()) / (1000) % 60); 

  console.log("─────────────────────")
  if(days == 0) {
    if(hours == 0) {
      console.log("minutes: "+ minutes)
      return minutes + " minute(s) ago"
    }else{
      console.log("hours: "+ hours)
      return hours + " hours(s) ago"
    }
    
  } else {
    console.log("days: "+ days)
    return days + " day(s) ago"
  }
}


const MapOverview = () => {
  
  ////////// STATES ///////////////
  const [series, setSeries] = useState()
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


// the puller data
async function puller(context) {

  // get the start time and the name of the device sensor
  let d = new Date();
  
  
  ///////////////////////////// pre config ////////////////////////////
  const _devname = context.sensor
  var _before = context.before
  if(!_before) _before = 5
  // _before = _before+1
  
  d.setDate(d.getDate() - _before)
  
  // set the day to [today - 'before' days] in iso format
  let start = d.toISOString()

  // check GMT index time to different zone
  var val = new Date().toString().match(/([-\+][0-9]+)\s/)[1] 
  var id = checkCurrentGMT(val)
  // if (id == 0 ){
  //   // add 1hour to the server time
    // d.setHours( d.getHours() + 1 )
    start = d.toISOString()
  // }
  // d.setHours( d.getHours() + 1 )
  // start = d.toISOString()
  /////////////////////////////


 
  // get the response data
  const res = await getActions( start )

  // parse into json format
  const json = await res.json()
  const _actions = json.actions

  const parsed = getData(_actions, _devname)

  const _data = JSON.stringify(parsed)

  let is_data_collected = false

  ////////////////////// check result of _data ////////////////////////////////////////
  let existing_sensor = false
  if(_data == JSON.stringify({temperature:[],humidity:[],pressure:[],times:[]})){
    existing_sensor = false
  }else{
    existing_sensor = true

    // is data collected statement ?
    const size = parsed.times.length

    if(size == 0){
      is_data_collected = false
    }else{
      const from = parsed.times[size-1]
      const day_threshold = start
      is_data_collected = compare(from, day_threshold)

    }
  }
  //////////////////////////////////////////////


  return {
    props: {
      data: parsed || JSON.stringify({}), //_data
      existing_sensor,
      is_data_collected,

    }
  }
}



////////////////////////////////

export default MapOverview;