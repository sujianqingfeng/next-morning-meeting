import Image from 'next/image'
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks'
import type { TConductorInstance } from 'react-canvas-confetti/dist/types'

type ConfettiProps = {
  name: string
  url?: string
}

function Confetti({ name, url }: ConfettiProps) {
  const onInit = ({ conductor }: { conductor: TConductorInstance }) => {
    setTimeout(() => {
      conductor.stop()
    }, 3000)
  }

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      {url && (
        <Image
          width={250}
          height={250}
          src={`${url}?x-oss-process=image/resize,w_500,h_500`}
          className=" rounded-full"
          alt=""
        />
      )}
      {!url && (
        <div className="bg-teal-400 text-white font-bold text-4xl h-[200px] w-[200px] rounded-full inline-flex justify-center items-center">
          {name[0]}
        </div>
      )}
      <div className="text-white font-bold text-6xl">{name}</div>
      <Fireworks autorun={{ speed: 1 }} onInit={onInit} />
    </div>
  )
}

export default Confetti
