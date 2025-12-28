'use client'

import { useState } from 'react'
import { ChevronDown, Filter, X } from 'lucide-react'

interface FilterOption {
  id: string
  label: string
  count?: number
}

interface FilterGroup {
  id: string
  label: string
  options: FilterOption[]
  type: 'checkbox' | 'radio' | 'range'
}

const filterGroups: FilterGroup[] = [
  {
    id: 'brand',
    label: 'Brand',
    type: 'checkbox',
    options: [
      { id: 'nike', label: 'Nike', count: 45 },
      { id: 'adidas', label: 'Adidas', count: 32 },
      { id: 'jordan', label: 'Jordan', count: 28 },
      { id: 'new-balance', label: 'New Balance', count: 15 },
      { id: 'vans', label: 'Vans', count: 12 },
      { id: 'converse', label: 'Converse', count: 8 }
    ]
  },
  {
    id: 'category',
    label: 'Category',
    type: 'checkbox',
    options: [
      { id: 'sneakers', label: 'Sneakers', count: 89 },
      { id: 'boots', label: 'Boots', count: 23 },
      { id: 'sandals', label: 'Sandals', count: 15 },
      { id: 'formal', label: 'Formal', count: 12 }
    ]
  },
  {
    id: 'size',
    label: 'Size',
    type: 'checkbox',
    options: [
      { id: '6', label: 'UK 6', count: 45 },
      { id: '7', label: 'UK 7', count: 52 },
      { id: '8', label: 'UK 8', count: 48 },
      { id: '9', label: 'UK 9', count: 44 },
      { id: '10', label: 'UK 10', count: 38 },
      { id: '11', label: 'UK 11', count: 32 }
    ]
  },
  {
    id: 'price',
    label: 'Price Range',
    type: 'checkbox',
    options: [
      { id: '0-5000', label: 'Under KSh 5,000', count: 23 },
      { id: '5000-10000', label: 'KSh 5,000 - 10,000', count: 45 },
      { id: '10000-15000', label: 'KSh 10,000 - 15,000', count: 32 },
      { id: '15000-20000', label: 'KSh 15,000 - 20,000', count: 18 },
      { id: '20000+', label: 'Over KSh 20,000', count: 12 }
    ]
  }
]

interface SearchFiltersProps {
  isOpen: boolean
  onClose: () => void
  onFilterChange: (filters: Record<string, string[]>) => void
}

export function SearchFilters({ isOpen, onClose, onFilterChange }: SearchFiltersProps) {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['brand', 'category'])

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    )
  }

  const handleFilterToggle = (groupId: string, optionId: string) => {
    setSelectedFilters(prev => {
      const groupFilters = prev[groupId] || []
      const newGroupFilters = groupFilters.includes(optionId)
        ? groupFilters.filter(id => id !== optionId)
        : [...groupFilters, optionId]
      
      const newFilters = {
        ...prev,
        [groupId]: newGroupFilters
      }
      
      onFilterChange(newFilters)
      return newFilters
    })
  }

  const clearAllFilters = () => {
    setSelectedFilters({})
    onFilterChange({})
  }

  const getActiveFilterCount = () => {
    return Object.values(selectedFilters).flat().length
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
      {/* Mobile Overlay */}
      <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Filter Panel */}
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl lg:relative lg:w-full lg:shadow-none lg:bg-transparent">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b lg:hidden">
          <div className="flex items-center space-x-2">
            <Filter size={20} />
            <h3 className="font-semibold">Filters</h3>
            {getActiveFilterCount() > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>

        {/* Clear Filters */}
        {getActiveFilterCount() > 0 && (
          <div className="p-4 border-b">
            <button
              onClick={clearAllFilters}
              className="text-red-500 text-sm font-medium hover:text-red-600"
            >
              Clear all filters ({getActiveFilterCount()})
            </button>
          </div>
        )}

        {/* Filter Groups */}
        <div className="p-4 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {filterGroups.map((group) => (
            <div key={group.id} className="border-b border-gray-100 pb-6 last:border-b-0">
              <button
                onClick={() => toggleGroup(group.id)}
                className="flex items-center justify-between w-full text-left"
              >
                <h4 className="font-medium text-gray-900">{group.label}</h4>
                <ChevronDown 
                  size={16} 
                  className={`transition-transform ${
                    expandedGroups.includes(group.id) ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {expandedGroups.includes(group.id) && (
                <div className="mt-4 space-y-3">
                  {group.options.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center space-x-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFilters[group.id]?.includes(option.id) || false}
                        onChange={() => handleFilterToggle(group.id, option.id)}
                        className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900 flex-1">
                        {option.label}
                      </span>
                      {option.count && (
                        <span className="text-xs text-gray-500">({option.count})</span>
                      )}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}