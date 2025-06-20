"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { TreeItem } from "./components/tree-item"
import type { TreeNode } from "./types/tree"
import { menuData } from "./data/menu-data"
import { FileIcon } from "lucide-react"

export default function TreeMenu() {
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null)

  const handleNodeSelect = (node: TreeNode) => {
    setSelectedNode(node)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Tree Menu Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Development Topics</h2>
          <p className="text-sm text-gray-600 mt-1">Explore different areas of web development</p>
        </div>

        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-2">
            {menuData.map((node) => (
              <TreeItem
                key={node.id}
                node={node}
                level={0}
                selectedId={selectedNode?.id || null}
                onSelect={handleNodeSelect}
              />
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6">
        {selectedNode ? (
          <Card className="max-w-4xl">
            <CardHeader>
              <CardTitle className="text-2xl">{selectedNode.label}</CardTitle>
              <CardDescription>Learn more about this topic</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed text-base">{selectedNode.description}</p>
              </div>

              {selectedNode.children && selectedNode.children.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Subtopics</h3>
                  <div className="grid gap-3">
                    {selectedNode.children.map((child) => (
                      <div
                        key={child.id}
                        className="p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => handleNodeSelect(child)}
                      >
                        <h4 className="font-medium text-gray-900 mb-1">{child.label}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{child.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a topic</h3>
              <p className="text-gray-600">Choose an item from the menu to view its description</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
