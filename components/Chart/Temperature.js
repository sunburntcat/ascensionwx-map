import { useState } from 'react';
import dynamic from 'next/dynamic';
import {conversion} from '../../lib/api'
// import Modal from './ModalT';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });
const Modal = dynamic(() => import("./ModalT"), {
    loading: () => "Loading...",
    ssr: false
  });

function Temperature(props) {

  const [celcius, setCelcius] = useState(true);
  const [show, setShow] = useState(false)
   
  var tmp = props.values //JSON.parse(props.values)
  
  // Converted value to Fahrenheit unit
  var series_fah = conversion(tmp.temperature)
  
  var series = [{
    name: 'Temperature',
    type: 'area',
    data: celcius ? tmp.temperature : series_fah
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
    labels: tmp.times,
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
      <div className='rounded overflow-hidden shadow-lg border border-gray-200 bg-white'>
        <div className='m-2'>
          <button className='ml-10 mt-10 border border-gray-200 hover:border-gray-400 bg-gray-200 rounded w-28 text-sm text-gray-700' onClick={() => { setCelcius(!celcius)}}>
            {
              celcius ? "to Fahrenheit" : "to Celcius"
            }
          </button>
          <button className='ml-1 border border-gray-200 hover:border-gray-400 rounded w-28 text-sm' onClick={() => setShow(true)}>
            {
              "Full view"
            }
          </button>
          <ApexCharts width="100%" options={options} series={series} type="area"/>
        </div>
        {
          show ?
          <Modal setShow={setShow} data={props.values} name={"Temperature"}/>
          :
          <></>
        }
      </div>
    )
  }

  export default Temperature