/* eslint-disable import/prefer-default-export */
import { Theme } from '@react-navigation/native'

declare module '@react-navigation/native' {
  export function useTheme(): Theme & {
    dark: boolean
    colors: {
      primary: string
      background: string
      card: string
      text: string
      border: string
      notification: string
      secondary: string
      lightGray: string
      darkGray: string
    }
  }
}
