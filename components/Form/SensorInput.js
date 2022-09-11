

export default function SensorInput(props) {
    return (
        <div>
            <label className="block text-gray-400 text-sm font-bold mb-2">
            Sensor
            </label>
            <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline" id="sensor" type="text" placeholder="_devname" />
        </div>
    )
  }