import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  recentModules: number[]
  favoriteModules: number[]
  addRecentModule: (moduleId: number) => void
  toggleFavoriteModule: (moduleId: number) => void
  clearRecentModules: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      recentModules: [],
      favoriteModules: [],

      addRecentModule: (moduleId: number) => {
        const { recentModules } = get()
        const updated = [moduleId, ...recentModules.filter(id => id !== moduleId)].slice(0, 10)
        set({ recentModules: updated })
      },

      toggleFavoriteModule: (moduleId: number) => {
        const { favoriteModules } = get()
        const isFavorite = favoriteModules.includes(moduleId)
        
        if (isFavorite) {
          set({ favoriteModules: favoriteModules.filter(id => id !== moduleId) })
        } else {
          set({ favoriteModules: [...favoriteModules, moduleId] })
        }
      },

      clearRecentModules: () => {
        set({ recentModules: [] })
      },
    }),
    {
      name: 'celomodulex-user-storage',
    }
  )
)
