"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  onNavItemClick?: (itemName: string) => void
  activeItemUrl?: string
}

export function NavBar({ items, className, onNavItemClick, activeItemUrl }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [mounted, setMounted] = useState(false)
  
  // Update activeTab when activeItemUrl changes
  useEffect(() => {
    if (activeItemUrl) {
      const matchingItem = items.find(item => item.url === activeItemUrl);
      if (matchingItem) {
        setActiveTab(matchingItem.name);
      }
    }
  }, [activeItemUrl, items]);

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      className={cn(
        "relative w-full z-50 pointer-events-auto",
        className,
      )}
    >
      <div className="flex items-center justify-center gap-1 bg-black/20 border border-white/10 backdrop-blur-lg py-0.5 px-1 rounded-full shadow-lg mx-auto w-fit relative z-50 pointer-events-auto">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => {
                setActiveTab(item.name)
                if (onNavItemClick) onNavItemClick(item.name)
              }}
              className={cn(
                "relative cursor-pointer text-xs font-semibold px-3 py-1 rounded-full transition-colors",
                "text-white/80 hover:text-white z-50 pointer-events-auto",
                isActive && "bg-white/10 text-white",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">{item.name}</span>
              {isActive && (
                mounted && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 w-full bg-white/10 rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-t-full">
                      <div className="absolute w-12 h-6 bg-white/30 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-8 h-6 bg-white/30 rounded-full blur-md -top-1" />
                      <div className="absolute w-4 h-4 bg-white/30 rounded-full blur-sm top-0 left-2" />
                    </div>
                  </motion.div>
                )
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
