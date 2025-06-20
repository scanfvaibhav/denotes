"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown, FileIcon, Folder, FolderOpen } from "lucide-react"
import type { TreeNode } from "../types/tree"
import { cn } from "@/lib/utils"

interface TreeItemProps {
  node: TreeNode
  level: number
  selectedId: string | null
  onSelect: (node: TreeNode) => void
}

export function TreeItem({ node, level, selectedId, onSelect }: TreeItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasChildren = node.children && node.children.length > 0
  const isSelected = selectedId === node.id

  const handleToggle = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded)
    }
  }

  const handleSelect = () => {
    onSelect(node)
  }

  const getIcon = () => {
    if (!hasChildren) {
      return <FileIcon className="w-4 h-4 text-blue-500" />
    }
    return isExpanded ? (
      <FolderOpen className="w-4 h-4 text-amber-500" />
    ) : (
      <Folder className="w-4 h-4 text-amber-600" />
    )
  }

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-2 py-2 px-3 cursor-pointer hover:bg-gray-100 rounded-md transition-colors",
          isSelected && "bg-blue-50 border-l-4 border-blue-500",
          "group",
        )}
        style={{ paddingLeft: `${level * 20 + 12}px` }}
        onClick={handleSelect}
      >
        {hasChildren && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleToggle()
            }}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
          >
            {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          </button>
        )}
        {!hasChildren && <div className="w-5" />}
        {getIcon()}
        <span className={cn("text-sm font-medium", isSelected && "text-blue-700")}>{node.label}</span>
      </div>

      {hasChildren && isExpanded && (
        <div>
          {node.children!.map((child) => (
            <TreeItem key={child.id} node={child} level={level + 1} selectedId={selectedId} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  )
}
