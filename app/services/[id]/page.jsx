import PageHeader from '../../../components/PageHeader'
import Reveal from '../../../components/Reveal'
import { FaAngleRight } from 'react-icons/fa'

const getImage = (s) => {
  if (!s) return '/images/hero/home.jpg'
  if (s.image_url) return s.image_url
  if (s.image) return s.image
  if (s.photo) return s.photo
  if (Array.isArray(s.photos) && s.photos.length) return s.photos[0]
  if (Array.isArray(s.image_urls) && s.image_urls.length) return s.image_urls[0]
  return '/images/hero/home.jpg'
}

export default async function Page(props) {
  const params = await props.params
  const id = params?.id

  const [detailRes, listRes] = await Promise.all([
    fetch(`https://api.efengineering-architect.com/api/services/${id}`, { cache: 'no-store' }),
    fetch('https://api.efengineering-architect.com/api/services', { cache: 'no-store' }),
  ])

  const d = await detailRes.json()
  const l = await listRes.json()
  const service = d?.data || d
  const others = (Array.isArray(l) ? l : l?.data || []).filter((s) => String(s.id) !== String(id)).slice(0, 6)
  const title = service?.title || service?.name || 'Service'

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title={title} />
      <main className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <article className="lg:col-span-8">
          <Reveal variant="up" delay={0}>
            <div className="relative h-[260px] md:h-[360px] bg-gray-200 overflow-hidden">
              <img src={getImage(service)} alt={title} className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </Reveal>
          <Reveal variant="up" delay={120}>
            <div className="bg-white p-6 md:p-8 mt-6 border border-gray-200">
              <h1 className="text-2xl md:text-3xl font-extrabold mb-4">{title}</h1>
              <div
                className="prose max-w-none prose-p:leading-7"
                dangerouslySetInnerHTML={{ __html: service?.description || '<p>Details coming soon.</p>' }}
              />
            </div>
          </Reveal>
        </article>

        <aside className="lg:col-span-4">
          <Reveal variant="left" delay={0}>
            <div className="bg-white border border-gray-200 p-5">
              <h3 className="text-sm uppercase tracking-[.2em] text-gray-500 mb-3">Other Services</h3>
              <ul className="space-y-3">
                {others.map((s) => (
                  <li key={String(s.id)}>
                    <a href={`/services/${s.id}`} className="flex items-center gap-3 group">
                      <FaAngleRight className="text-orange-500 text-xl shrink-0" />
                      <span className="font-semibold group-hover:text-orange-600">{s.title || s.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </aside>
      </main>
    </div>
  )
}