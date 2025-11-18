'use client'

import { useState } from 'react'
import { Module } from '@/types/module'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useMainHub } from '@/hooks/use-main-hub'
import { useAccount } from 'wagmi'

interface ExecuteModalProps {
  module: Module
  isOpen: boolean
  onClose: () => void
}

export function ExecuteModal({ module, isOpen, onClose }: ExecuteModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { executeModule } = useMainHub()
  const { address } = useAccount()

  const handleExecute = async () => {
    if (!address) return

    setIsLoading(true)
    try {
      // This would be module-specific data
      const moduleData = '0x' // Empty data for simple modules
      
      await executeModule(module.id, moduleData, module.premium)
      onClose()
    } catch (error) {
      console.error('Failed to execute module:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Execute {module.name}</DialogTitle>
          <DialogDescription>
            This will execute the {module.name} module on the Celo blockchain.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Transaction Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Module:</span>
                <span>{module.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Fee:</span>
                <span className="font-semibold">
                  {module.premium ? '0.01' : '0.1'} CELO
                </span>
              </div>
              <div className="flex justify-between">
                <span>Category:</span>
                <span>{module.category}</span>
              </div>
            </div>
          </div>

          {module.premium && (
            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
              <p className="text-yellow-800 text-sm">
                <strong>Premium Module:</strong> Requires NFT Access Pass
              </p>
            </div>
          )}

          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleExecute}
              disabled={isLoading || !address}
            >
              {isLoading ? 'Executing...' : `Execute (${module.premium ? '0.01' : '0.1'} CELO)`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
