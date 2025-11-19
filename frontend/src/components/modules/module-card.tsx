'use client'

import { useState } from 'react'
import { Module } from '@/types/module'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExecuteModal } from './execute-modal'
import { MODULE_CATEGORIES } from '@/lib/utils/constants'

interface ModuleCardProps {
  module: Module
}

export function ModuleCard({ module }: ModuleCardProps) {
  const [isExecuteModalOpen, setIsExecuteModalOpen] = useState(false)
  const categoryInfo = MODULE_CATEGORIES[module.category]

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{module.name}</CardTitle>
            <div className="flex gap-2">
              <Badge variant={module.premium ? "default" : "secondary"} className={categoryInfo.color}>
                {categoryInfo.name}
              </Badge>
              {module.premium && (
                <Badge variant="default" className="bg-yellow-100 text-yellow-800">
                  Premium
                </Badge>
              )}
            </div>
          </div>
          <CardDescription>{module.description}</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Standard Fee</span>
              <span className="font-semibold">0.1 CELO</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Premium Fee</span>
              <span className="font-semibold text-emerald-500">0.01 CELO</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Version:</span>
              <span className="font-mono">v{module.version}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            className="w-full"
            onClick={() => setIsExecuteModalOpen(true)}
          >
            Execute Module
          </Button>
        </CardFooter>
      </Card>

      <ExecuteModal
        module={module}
        isOpen={isExecuteModalOpen}
        onClose={() => setIsExecuteModalOpen(false)}
      />
    </>
  )
}
