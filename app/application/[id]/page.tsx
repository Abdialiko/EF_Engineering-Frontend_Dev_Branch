import { redirect } from 'next/navigation'

export default async function ApplicationRedirect({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  redirect(`/vacancy/apply/${id}`)
}

