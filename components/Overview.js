import Image from "next/image"

export default function Overview(props) {
    return (
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <Image
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src={props.source}
            alt=""
            />
      </div>
    )
}