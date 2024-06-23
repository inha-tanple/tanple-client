/* eslint-disable no-unused-vars */

import { create } from 'zustand'

export interface ProgressDataType {
  id: number
  credit: number
  date: string
  time: string
  detail: string
  productBarcode?: number
  creditType: '적립' | '소비'
}

interface ProgressDataStore {
  progressData: ProgressDataType[]
  addProgressData: (data: ProgressDataType) => void
  setProgressData: (data: ProgressDataType[]) => void
  clearProgressData: () => void
}

export const useProgressDataStore = create<ProgressDataStore>((set) => ({
  progressData: [],

  addProgressData: (data) =>
    set((state) => ({
      progressData: [data, ...state.progressData],
    })),
  setProgressData: (data) => set({ progressData: data }),
  clearProgressData: () => set({ progressData: [] }),
}))
