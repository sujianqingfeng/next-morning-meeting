import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function sleep(wait: number = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, wait)
  })
}
