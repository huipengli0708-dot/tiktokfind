"use server"

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function loginAction(formData: FormData) {
  const password = formData.get('password') as string

  if (password === process.env.ADMIN_PASSWORD) {
    const jar = await cookies()
    jar.set('admin_auth', '1', {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7天
      path: '/',
    })
    redirect('/admin/videos')
  }

  redirect('/admin/login?error=1')
}

export async function logoutAction() {
  const jar = await cookies()
  jar.delete('admin_auth')
  redirect('/admin/login')
}
