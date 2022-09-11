

export default function PriorDay(props) {
    return (
        <div className="md:ml-10 sm:ml-5">
            <label className="block text-gray-400 text-sm font-bold mb-2">
            Prior number of day
            </label>
            <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline" id="digit" type="number" />
        </div>
    )
  }