import Image from 'next/image'

export type AvatarProps = {
  name: string
  url?: string
}

function Avatar({ name, url }: AvatarProps) {
  if (url) {
    return (
      <Image
        width={80}
        height={80}
        src={`${url}?x-oss-process=image/resize,w_400,h_400`}
        className="rounded-full"
        alt=""
      />
    )
  }

  return (
    <div className="bg-teal-400 text-white font-bold text-4xl h-20 w-20 rounded-full inline-flex justify-center items-center">
      {name[0]}
    </div>
  )
}

export default Avatar
