'use client'

import { useState, useEffect } from 'react'
import { Module } from '@/types/module'
import { MOCK_MODULES } from '@/data/mock-modules'
import { useMainHub } from './use-main-hub'

export function useModules(category?: string) {
  const [modules, setModules] = useState<Module[]>([])
  const [loading, setLoading] = useState(true)
  const { getModule } = useMainHub()

  useEffect(() => {
    const loadModules = async () => {
      setLoading(true)
      
      // Start with mock modules
      let filteredModules = category 
        ? MOCK_MODULES.filter(module => module.category === category)
        : MOCK_MODULES

      // Enhance with on-chain data if available
      try {
        const enhancedModules = await Promise.all(
          filteredModules.map(async (module) => {
            try {
              const onChainData = await getModule(module.id)
              if (onChainData) {
                return {
                  ...module,
                  active: onChainData.active,
                  version: onChainData.version,
                }
              }
            } catch {
              // If on-chain data fails, use mock data
            }
            return module
          })
        )
        setModules(enhancedModules)
      } catch (error) {
        console.error('Error loading modules:', error)
        setModules(filteredModules)
      } finally {
        setLoading(false)
      }
    }

    loadModules()
  }, [category, getModule])

  return {
    modules,
    loading,
  }
}
