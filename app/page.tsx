'use client'

import Avatar, { AvatarProps } from '~/components/Avatar'
import { Dices, QrCode, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { cn, generateRandom, sleep } from '~/lib/utils'
import { users } from '~/mock'
import Confetti from '~/components/Confetti'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger
} from '~/components/ui/alert-dialog'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function HomePage() {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const random = useRef(-1)
  const [activeRect, setActiveRect] = useState<null | {
    top: number
    left: number
  }>(null)
  const [currentUser, setCurrentUser] = useState<null | AvatarProps>(null)

  const interval = () => {
    const r = generateRandom(0, users.length - 1)
    console.log('🚀 ~ interval ~ r:', r)
    const current = wrapperRef.current?.children[r]
    if (!current) {
      return
    }

    random.current = r
    const { top, left } = current.getBoundingClientRect()
    setActiveRect({
      top: top - 6,
      left: left - 6
    })
  }

  const onRandom = async () => {
    for (let i = 0; i < 8; i++) {
      interval()
      await sleep(500)
    }
    const c = users[random.current]
    setCurrentUser(c)
  }

  const onClose = () => {
    setCurrentUser(null)
  }

  const style = {
    top: activeRect?.top,
    left: activeRect?.left
  }

  return (
    <main className="min-h-screen p-4">
      <header className="flex justify-end pb-4">
        <AlertDialog>
          <AlertDialogTrigger>
            <QrCode size="28" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <Image src="/qr.png" width={800} height={800} alt="" />
            <AlertDialogFooter>
              <AlertDialogAction>关闭</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </header>

      <div ref={wrapperRef} className="flex flex-wrap justify-between gap-4">
        {users.map((user, i) => (
          <Avatar key={i} {...user} />
        ))}

        <div className="flex-auto"></div>
      </div>

      <button
        onClick={onRandom}
        className="fixed right-8 bottom-8 bg-orange-400 h-20 w-20 rounded-full shadow-sm text-white inline-flex justify-center items-center"
      >
        <Dices size="28" />
      </button>

      {activeRect && (
        <div
          style={style}
          className={cn(
            'absolute h-[92px] w-[92px] rounded-full border-pink-400 bg-gradient-to-r from-purple-500 to-pink-500 border-4 border-solid transition-all'
          )}
        ></div>
      )}

      {currentUser && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.8)] flex justify-center items-center"
        >
          <X
            size={40}
            className="absolute right-4 top-4 text-white cursor-pointer"
            onClick={onClose}
          />
          <Confetti {...currentUser} />
        </motion.div>
      )}
    </main>
  )
}
