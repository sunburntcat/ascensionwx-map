import dynamic from 'next/dynamic';
import { useState } from 'react';


export default function SensorCard(props) {
    
    return (
      <div className='rounded overflow-hidden shadow-lg border border-gray-200 bg-white'>
        <div className=''>
            <div className="p-12 ml-5">
                <h5 className="mt-1 mb-4 text-xl font-medium text-[#8C01AA]"> Sensor Information</h5>
                <div className="flex items-baseline text-gray-900">
                    <span className="ml-5 text-xl font-normal text-gray-500 ">Devname:</span>
                    <span className="ml-2 text-3xl font-semibold">
                        {
                            props.sensor.devname
                        }
                    </span>
                </div>
                <ul role="list" className="my-7 space-y-5 ml-10">
                    <li className="flex space-x-3">
                        <svg className="flex-shrink-0 w-5 h-5 text-blue-400 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                        <span className="text-base font-normal leading-tight text-gray-500 ">Time created: {props.sensor.time_created}</span>
                    </li>
                    <li className="flex space-x-3">
                        <svg className="flex-shrink-0 w-5 h-5 text-purple-400 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                        {
                            <span className="text-base font-normal leading-tight text-gray-500"> 
                                Status : 
                                {
                                    props.sensor.status == "ACTIVE" ?
                                    (
                                        <span className="text-base font-semibold leading-tight text-green-500"> 
                                            {" "}{props.sensor.status}
                                        </span>
                                    )
                                    :
                                    (
                                        <span className="text-base font-semibold leading-tight text-red-500"> 
                                            {" "} {props.sensor.status}
                                        </span>
                                    )
                                }
                            </span>
                            
                        }

                    </li>
                    <li className="flex space-x-3">
                        <svg className="flex-shrink-0 w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                        <span className="text-base font-normal leading-tight text-gray-500">Latitude: {props.sensor.la}</span>
                    </li>
                    <li className="flex space-x-3">
                        <svg className="flex-shrink-0 w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                        <span className="text-base font-normal leading-tight text-gray-500">Longitude: {props.sensor.lo}</span>
                    </li>
                    <li className="flex space-x-3">
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-400 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                        <span className="flex gap-2 text-base font-normal leading-tight text-gray-500 ">
                            Miner: 
                            <span className="text-base font-semibold leading-tight text-gray-500 ">
                                {props.sensor.miner}
                            </span>
                        </span>
                    </li>
                    <li className="flex space-x-3">
                        <svg className="flex-shrink-0 w-5 h-5 text-[#130f40]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                        <span className="text-base font-normal leading-tight text-gray-500">Lastest temperaure: {props.sensor.last_temp} °C</span>
                    </li>
                    <li className="flex space-x-3">
                        <svg className="flex-shrink-0 w-5 h-5 text-[#f9ca24]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                        <span className="text-base font-semibold leading-tight text-gray-500">Last updated: {props.sensor.last_update}</span>
                    </li>
                </ul>
                {/* <button type="button" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Choose plan</button> */}
            </div>
        </div>
           
      </div>
      
    )
  
  }

  