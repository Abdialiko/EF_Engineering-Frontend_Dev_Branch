import PageHeader from '../../../components/PageHeader'
import Reveal from '../../../components/Reveal'

const getImage = (s: any) => {
  if (!s) return '/images/hero/home.jpg'
  if (Array.isArray(s.photos) && s.photos.length) return s.photos[0]?.path || s.photos[0]
  if (s.image_url) return s.image_url
  if (s.image) return s.image
  return '/images/hero/home.jpg'
}

export default async function ProjectDetail(props: any) {
  const params = await props.params
  const id = params?.id

  const [detailRes, servicesRes, projectsRes] = await Promise.all([
    fetch(`https://api.efengineering-architect.com/api/projects/${id}`, { cache: 'no-store' }),
    fetch('https://api.efengineering-architect.com/api/services', { cache: 'no-store' }),
    fetch('https://api.efengineering-architect.com/api/projects', { cache: 'no-store' }),
  ])
  const d = await detailRes.json()
  const s = await servicesRes.json()
  const p = await projectsRes.json()
  const project = d?.data || d
  const services = (Array.isArray(s) ? s : s?.data) || []
  const related = ((Array.isArray(p) ? p : p?.data) || []).filter((x: any) => String(x.id) !== String(id)).slice(0, 3)
  const title = project?.title || project?.name || 'Project Details'

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title={title} />
      <main className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <article className="lg:col-span-8">
          <Reveal variant="up" delay={0}>
            <div className="relative h-[260px] md:h-[420px] bg-gray-200 overflow-hidden">
              <img src={getImage(project)} alt={title} className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </Reveal>
          <Reveal variant="up" delay={120}>
            <h1 className="text-2xl md:text-3xl font-extrabold mt-6">{title}</h1>
          </Reveal>
          <Reveal variant="up" delay={240}>
            <div
              className="bg-white p-6 md:p-8 mt-4 border border-gray-200 prose max-w-none prose-p:leading-7"
              dangerouslySetInnerHTML={{ __html: project?.description || project?.details || '<p>Details coming soon.</p>' }}
            />
          </Reveal>
        </article>

        <aside className="lg:col-span-4">
          <Reveal variant="left" delay={0}>
            <div className="bg-white border border-gray-200 p-5">
              <h3 className="text-sm uppercase tracking-[.2em] text-gray-500 mb-3">Services</h3>
              <ul className="space-y-3">
                {services.map((svc: any, i: number) => (
                  <li key={String(svc.id)}>
                    <a href={`/services/${svc.id}`} className="flex items-center gap-3 group">
                      <span className="inline-block w-2 h-2 rounded-full bg-orange-500" />
                      <span className="font-semibold group-hover:text-orange-600">{svc.title || svc.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </aside>
      </main>

      {related.length > 0 && (
        <section className="container mx-auto px-4 pb-16 -mt-6">
          <Reveal variant="up" delay={0}>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Related Projects</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((rp: any, i: number) => (
              <Reveal key={rp.id} variant="up" delay={i * 100}>
                <a href={`/projects/${rp.id}`} className="group block overflow-hidden bg-white border border-gray-200 relative h-64">
                  <img src={getImage(rp)} alt={rp.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <span className="text-xs font-semibold uppercase text-orange-400">{rp.category || 'Project'}</span>
                    <h3 className="text-lg font-extrabold leading-snug">{rp.title}</h3>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}


