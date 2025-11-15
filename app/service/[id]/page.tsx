import { redirect } from 'next/navigation'

export default async function ServiceDetailRedirect({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  redirect(`/services/${id}`)
}

