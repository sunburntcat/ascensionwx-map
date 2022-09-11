
import dynamic from 'next/dynamic';
const MapOverview = dynamic(() => import("../components/MapOverview"), {
    loading: () => "Loading...",
    ssr: false
  });



export default function Map() {
    
    return (
        <div className="justify-center">

            <main className="w-screen h-screen  bg-white">
                <MapOverview className={""}/>
            </main>
            <br/>
        </div>
        
    )
} 