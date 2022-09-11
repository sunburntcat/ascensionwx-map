import TopHeader from "./TopHeader"


const navigation = [
    { name: 'Overview', href: '/' },
    { name: 'Graph', href: '/graph' },
    { name: 'Map', href: '/map' },
  ]

export default function Dashboard({children}) {
    return (
        <div className="relative bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className=" z-10 bg-white "> {/* sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 */}
                    <svg
                        className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                        fill="currentColor"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <polygon points="50,0 100,0 50,100 0,100" />
                    </svg>

                    <TopHeader links={navigation} />

                    {/* children */}
                        <> 
                            {children}
                        </>
                    {/* End children */}

                
                </div>
            </div>
        
        </div>
    )
}