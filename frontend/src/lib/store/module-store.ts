import { create } from 'zustand'
import { Module } from '@/types/module'

interface ModuleState {
  modules: Module[]
  featuredModules: number[]
  setModules: (modules: Module[]) => void
  setFeaturedModules: (moduleIds: number[]) => void
  getModuleById: (id: number) => Module | undefined
  getModulesByCategory: (category: string) => Module[]
}

export const useModuleStore = create<ModuleState>((set, get) => ({
  modules: [],
  featuredModules: [],

  setModules: (modules: Module[]) => {
    set({ modules })
  },

  setFeaturedModules: (moduleIds: number[]) => {
    set({ featuredModules: moduleIds })
  },

  getModuleById: (id: number) => {
    const { modules } = get()
    return modules.find(module => module.id === id)
  },

  getModulesByCategory: (category: string) => {
    const { modules } = get()
    return modules.filter(module => module.category === category)
  },
}))
