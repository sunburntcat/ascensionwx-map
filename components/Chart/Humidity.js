import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });
import Modal from './ModalT';
import { useState } from 'react';

function Humidity(props) {
    var tmp = props.values
    const [show, setShow] = useState(false)

    var series = [{
      name: 'Humidity',
      type: 'area',
      data: tmp.humidity
    }]
    
    var options = {
      chart: {
      type: 'area',
      zoom: {
        type: "x",
        enabled: true,
      },
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
        text: 'Humidity (%)',
      },
      labels: {
        formatter: function (val) {
            if (series[0].data === undefined || series[0].data.length === 0)
            return 
          else
            return (val).toFixed(2)
        },
      }
    }
  ],
    legend: {
      show: false
    },
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
          <button className='ml-10 mt-10 border border-gray-200 hover:border-gray-400 rounded w-28 text-sm' onClick={() => { setShow(true) }}>
              {
                "Full view"
              }
            </button>
            <ApexCharts width="100%" options={options} series={series} type="area"/>
        </div>
        {
          show ?
          <Modal setShow={setShow} data={props.values} name={"Humidity"}/>
          :
          <></>
        }
      </div>
      
    )
  
  }

  export default Humidity