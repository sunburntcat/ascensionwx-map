import KandaMap from "../public/kanda-map4.png"
import Overview from "./Overview";
import TopHeader from "./TopHeader";

const navigation = [
  { name: 'Overview', href: '/' },
  { name: 'Graph', href: '/graph' },
  { name: 'Map', href: '/map' },
]

export function Layout({children})  {
  return (
    <div className="relative bg-white overflow-hidden min-w-full">
      {children}
    
    </div>
  )
}
