"use client"

import { deleteVideoAction } from "@/app/admin/actions"

export default function DeleteButton({ id, title }: { id: string; title: string }) {
  return (
    <form action={deleteVideoAction}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="px-3 py-1.5 rounded-lg text-xs font-medium text-rose-600 bg-rose-50/80 hover:bg-rose-100/80 transition-colors"
        onClick={(e) => {
          if (!confirm(`确认删除「${title}」？此操作不可撤销。`)) e.preventDefault()
        }}
      >
        删除
      </button>
    </form>
  )
}
