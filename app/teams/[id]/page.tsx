import PageHeader from '../../../components/PageHeader'
import Reveal from '../../../components/Reveal'

export default async function TeamDetail(props: any) {
  const params = await props.params
  const id = params?.id
  const res = await fetch(`https://api.efengineering-architect.com/api/teams/${id}`, { cache: 'no-store' })
  const d = await res.json()
  const team = d?.data || d
  const photo = team?.photo || team?.image || team?.image_url || '/assets/img/team/team-v2-img1.jpg'

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title={team?.name || 'Team Member'} />
      <main className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <Reveal variant="left" delay={0}>
            <div className="bg-white border border-gray-200 p-4">
              <img src={photo} alt={team?.name} className="w-full h-auto object-cover" />
              <h1 className="text-2xl font-extrabold mt-4">{team?.name}</h1>
              <p className="text-gray-600">{team?.role || team?.position}</p>
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          <Reveal variant="up" delay={120}>
            <div className="bg-white border border-gray-200 p-6 md:p-8 prose max-w-none" dangerouslySetInnerHTML={{ __html: team?.bio || team?.description || '<p>Profile details coming soon.</p>' }} />
          </Reveal>
        </div>
      </main>
    </div>
  )
}


