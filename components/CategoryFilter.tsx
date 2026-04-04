"use client"

import { cn } from "@/lib/utils"

interface CategoryFilterProps {
  categories: string[]
  selected: string
  onChange: (cat: string) => void
}

export default function CategoryFilter({ categories, selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap",
            selected === cat
              ? "btn-gradient shadow-md"
              : "glass-card border border-white/10 text-gray-300 hover:text-white hover:bg-white/10"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
