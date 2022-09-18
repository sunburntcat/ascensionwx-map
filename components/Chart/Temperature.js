import { useEffect, useState } from 'react';
import Pulse from '../Pulse';
import dynamic from 'next/dynamic';
import { conversion, getActions, checkCurrentGMT, compare, getData, diff_days } from '../../lib/api'


const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });


function Temperature(props) {

  const [celcius, setCelcius] = useState(true);
  const [serieFA, setSerieFA] = useState([]);
  const [serieC, setSerieC] = useState([]);
  const [times, setTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect( () => {
    const fetcher = async () => {
      const pulled = await puller(props.devname)
      setSerieC(pulled.props.data.temperature)
      setSerieFA(conversion(pulled.props.data.temperature))
      setTimes(pulled.props.data.times)
      setIsLoading(false)
      console.log(pulled.props.data)
      console.log(props.devname)
    }

    fetcher()


  })
   
  
  var series = [{
    name: 'Temperature',
    type: 'area',
    data: celcius ? serieC : serieFA
  }]

  var options = {
      chart: {
      // height: 350,
      type: 'area',
      zoom: {
        type: "x",
        enabled: true,
      },
    },
    title:{
      text: ""
    },
    dataLabels: {
      enabled: false,
      enabledOnSeries: [1]
    },
    labels: times,
    xaxis: {
      type: 'datetime'
    },
    yaxis: [{
      title: {
        text: celcius? "Temperature  (°C)" : "Temperature (°F)",
      },
      labels: {
        formatter: function (val) {
          if (series[0].data === undefined || series[0].data.length === 0)
          return 
        else
          return (val).toFixed(2)
        }
      }
    }
  ],
    fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.7,
      opacityTo: 0,
      stops: [0, 90, 100]
    }
    }
    }

    
    
  
    return (
      <div className=' rounded border border-gray-200 bg-white'>
        {
          (isLoading) 
          ?
          <Pulse>
            
          </Pulse>
        :
        <div className='m-2'>
          <button className='ml-10 mt-10 border border-gray-200 hover:border-gray-400 bg-gray-200 rounded w-28 text-sm text-gray-700' onClick={() => { setCelcius(!celcius)}}>
            {
              celcius ? "to Fahrenheit" : "to Celcius"
            }
          </button>
          <ApexCharts width="100%"  className="" options={options} series={series} type="area"/>
        </div>
        }
      </div>
    )
  }


  async function puller(context) {

    // get the start time and the name of the device sensor
    let d = new Date();
    
    ///////////////////////////// pre config ////////////////////////////
    const _devname = context
    var _before = 5 //context.before
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
    console.log(parsed)
  
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


  //////////////////////////////
  export default Temperature