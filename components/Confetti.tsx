import { Crown } from 'lucide-react'
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
      <div className="relative">
        <Crown
          size={50}
          className="absolute top--2 right-1 text-yellow-400 rotate-45 z-0"
        />
        <div className="relative z-1">
          {url && (
            // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
            <img
              className="rounded-full h-[250px] w-[250px]"
              src={`${url}?x-oss-process=image/resize,w_400,h_400`}
            />
          )}

          {!url && (
            <div className="bg-teal-400 text-white font-bold text-4xl h-[200px] w-[200px] rounded-full inline-flex justify-center items-center">
              {name[0]}
            </div>
          )}
        </div>
      </div>
      <div className="text-white font-bold text-6xl">{name}</div>
      <Fireworks autorun={{ speed: 1 }} onInit={onInit} />
    </div>
  )
}

export default Confetti
