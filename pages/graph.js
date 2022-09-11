import { useState } from "react"
import Waiting from "../components/Waiting"
import Temperature from "../components/Chart/Temperature"
import Humidity from "../components/Chart/Humidity"
import Pressure from "../components/Chart/Pressure"
import Dashboard from "../components/Dashboard"
import SensorCard from "../components/View/SensorCard"
import { getActions, checkCurrentGMT, compare, getData, postMapData, diff_days } from "../lib/api"

function diff_(d) {
  const today = new Date();
  d = new Date(d);
  const days = parseInt((today - d) / (1000 * 60 * 60 * 24));
  const hours = parseInt(Math.abs(today - d) / (1000 * 60 * 60) % 24);
  const minutes = parseInt(Math.abs(today.getTime() - d.getTime()) / (1000 * 60) % 60);
  const seconds = parseInt(Math.abs(today.getTime() - d.getTime()) / (1000) % 60); 
  // console.log("days: "+ days)
  // console.log("hours: "+ hours)
  // console.log("minutes: "+ minutes)
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


export default function Graph(props) {
    const json_sensor = JSON.parse(props.sensor)
    const json_data = JSON.parse(props.data)
    
    
    var tmp = json_data     //{temperature:[],humidity:[],pressure:[],times:[]}
    var date = new Date(json_sensor.responseSensor.time_created * 1000)
    var st_date = new Date(json_sensor.responseWeather.unix_time_s * 1000)
    
    
    var sensor_info = {
      time_created: date.toISOString(),
      status: diff_days(st_date),
      devname: "nxik2maqfxop",
      la: json_sensor.responseWeather.la,
      lo: json_sensor.responseWeather.lo,
      miner: json_sensor.responseSensor.miner,
      last_temp: json_sensor.responseWeather.last_temp,
      last_update: diff_(json_sensor.responseWeather.unix_time_s * 1000)
    }

    ////////// STATES ///////////////
    const [series, setSeries] = useState(tmp)
    const [sensor, setSensor] = useState('nxik2maqfxop')
    const [sensorInfo, setSensorInfo] = useState(sensor_info)
    const [prior, setPrior] = useState(0)
    const [plot, setPlot] = useState("Plot")
    const [loader, setLoader] = useState(false)
    const [errorPrior, setErrorPrior] = useState('')
    const [errorSensor, setErrorSensor] = useState('')
    ////////////////////////////////

    //--------- Handlers -------------
    //////////////////////////////
    // SENSOR ////////////////////
    const handleSensor = (e) => {
      setSensor(e.target.value)
      setErrorSensor('')
    }
    //////////////////////////////
    // PRIOR /////////////////////
    const handlePrior = (e) => {
      setPrior(e.target.value)
      var _ = e.target.value
      
      if (_.match(/^[0-9]+$/) != null ) {
        setErrorPrior("")
      }else if(e.target.value == ""){
        setErrorPrior("")
      }else{
        setErrorPrior('**You should enter a digit')
      }
    }
    //////////////////////////////
    // CLICK /////////////////////
    const handleClick = (e) => {

      if(!sensor) {
        setErrorSensor("You should provide a devname")
      }else{
        setPlot("loading...")
        setLoader(true)
        const template = {sensor:sensor,before:prior}
        const result = puller(template).then(data => {
            const r = getSensorData(sensor).then(sens => {
              
                if(sens.responseSensor.miner != undefined){
                  const _info = {
                      time_created: (new Date(sens.responseSensor.time_created *1000)).toISOString(),
                      status: diff_days(new Date(sens.responseWeather.unix_time_s*1000)),
                      devname: sensor,
                      la: sens.responseWeather.la,
                      lo: sens.responseWeather.lo,
                      miner: sens.responseSensor.miner, 
                      last_temp: sens.responseWeather.last_temp,
                      last_update: diff_(sens.responseWeather.unix_time_s * 1000)
                  }

                  setSensorInfo(_info)
                }else{
                  const _empty = {
                      time_created: "",
                      status: "",
                      devname: "--",
                      la: "",
                      lo: "",
                      miner: "",
                      last_temp: "--",
                      last_update: ""
                  }

                  setSensorInfo(_empty)
                }
                setSeries(data.props.data)
                
                setPlot("Plot")
                setLoader(false)
                
            })
          
        }) 
        
      }
      
    }
    
    /////////////////////////////////


    return (
        <>
          <Dashboard className="sticky">
            <div className="justify-end max-w-7xl md:mx-auto flex mt-14">
                <div>
                    <label className="block text-gray-400 text-sm font-bold mb-2" >
                    Sensor *
                    </label>
                    <input onChange={handleSensor} defaultValue={sensor? sensor : ""} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline hover:border-purple-500" id="sensor" type="text" placeholder="_devname" />
                    <p className="block text-red-400 text-sm font-bold mb-2">{errorSensor}</p>
                </div>
                <div className="md:ml-5 sm:ml-2">
                    <label className="block text-gray-400 text-sm font-bold mb-2" >
                    Prior number of day
                    </label>
                    <input onChange={handlePrior} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline hover:border-purple-500" id="digit" type="text" placeholder="_number" />
                    <p className="block text-red-400 text-sm font-bold mb-2">{errorPrior}</p>
                </div>
                <div className="md:ml-5 sm:ml-5 md:py-0">
                    <label className="block text-violet-400 text-sm font-bold mb-2" >
                    * must be provided
                    </label>
                    <button onClick={handleClick} className="appearance-none border rounded py-2 px-3 text-white bg-[#C416EC] text-sm font-bold leading-tight focus:outline-none shadow-md w-40 hover:bg-purple-600 duration-300" name="click">
                        {plot}
                    </button>
                </div>
            </div>
            
            {/* ------------------------- */}
            <hr className="mt-3"/>

            {/* ------------------------- */}
            <div className="mt-5">
              {
                loader ? 
                  <div className="mt-28">
                    <Waiting />
                    <p className=" mt-10 text-center text-gray-500 font-medium text-xl">
                        Data are pulling from Telos blockchain
                    </p>
                  </div>
                  :
                  <div className="">
                    <div className="m-4 grid gap-4 grid-cols-2">
                      <SensorCard sensor={sensorInfo} />
                      <Temperature values={series} />
                      
                    </div>
                    <div className="m-4 grid gap-4 grid-cols-2">
                        <Humidity values={series} />
                        <Pressure values={series} />
                    </div>
                  </div>
              }
            </div>
            <br/>

          </Dashboard>
      
        </>            
    )
}


export async function getServerSideProps(context) {
  const ctx = {
    sensor: "nxik2maqfxop", //dxujgds3gkzy nxik2maqfxop
  }

  const template = {sensor:ctx.sensor,before:5}
  // var predata

  const res = await puller(template)

  const sensor = await getSensorData(ctx.sensor)


  return {
    props: {
      sensor: JSON.stringify(sensor),
      data: JSON.stringify(res.props.data)

    }
  }
}

async function getSensorData(devname){
  const jsonWeather = await postMapData()
  const jsonSensor = await postMapData("sensors")
  var resWeather = {}
  var resSensor = {}
  
  for(let res of jsonWeather.rows){
    
      if(res.devname == devname){
        // console.log("++++++++")
        // var day = (new Date(res.unix_time_s *1000)).toISOString()
        // console.log(diff_(day), day)
          resWeather = {
            unix_time_s: res.unix_time_s,
            la: res.latitude_deg,
            lo: res.longitude_deg,
            last_temp: res.temperature_c
        }
        break
      }
      
  }
  for(let res of jsonSensor.rows){
      if(res.devname ==devname){
          resSensor = {
            miner: res.miner,
            time_created: res.time_created,
      }
      break
    }
  }

  return {
      responseWeather: resWeather,
      responseSensor: resSensor
  }
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
