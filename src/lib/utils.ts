import { type ClassValue, clsx } from "clsx"
import { formatDistanceToNowStrict } from "date-fns"
import { twMerge } from "tailwind-merge"
import locale from 'date-fns/locale/it'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function wait(time: number) {
  return new Promise<void>((resolve) => setTimeout(() => resolve(), time))
}
const formatDistanceLocale = {
  lessThanXSeconds: 'adesso',
  xSeconds: 'adesso',
  halfAMinute: 'adesso',
  lessThanXMinutes: '{{count}}min',
  xMinutes: '{{count}}min',
  aboutXHours: '{{count}}o',
  xHours: '{{count}}o',
  xDays: '{{count}}g',
  aboutXWeeks: '{{count}}sett',
  xWeeks: '{{count}}sett',
  aboutXMonths: '{{count}}m',
  xMonths: '{{count}}m',
  aboutXYears: '{{count}}a',
  xYears: '{{count}}a',
  overXYears: '{{count}}a',
  almostXYears: '{{count}}a',
}

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {}

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace('{{count}}', count.toString())

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'in ' + result
    } else {
      if (result === 'adess') return result
      return result + ' fa'
    }
  }

  return result
}

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  })
}