import dynamic from 'next/dynamic';
import { useState } from 'react';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });


function Hum(props) {
    var tmp = props.values

    var series = [{
      name: 'Humidity',
      type: 'area',
      data: tmp.pressure
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
      <>
        <div className=''>
            <ApexCharts width="300%" options={options} series={series} type="area"/>
        </div>
      </>
      
    )
  
  }

  export default Hum