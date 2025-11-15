import { redirect } from 'next/navigation'

export default async function VacancyDetailRedirect({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  redirect(`/vacancy/detail/${id}`)
}

