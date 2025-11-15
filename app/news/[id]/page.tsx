import PageHeader from '../../../components/PageHeader'
import Reveal from '../../../components/Reveal'

const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' })

export default async function NewsDetail(props: any) {
  const params = await props.params
  const id = params?.id

  const [detailRes, listRes, servicesRes] = await Promise.all([
    fetch(`https://api.efengineering-architect.com/api/news/${id}`, { cache: 'no-store' }),
    fetch('https://api.efengineering-architect.com/api/news', { cache: 'no-store' }),
    fetch('https://api.efengineering-architect.com/api/services', { cache: 'no-store' }),
  ])
  const d = await detailRes.json()
  const l = await listRes.json()
  const s = await servicesRes.json()
  const news = d?.data || d
  const related = ((Array.isArray(l) ? l : l?.data) || []).filter((x: any) => String(x.id) !== String(id)).slice(0,3)
  const services = (Array.isArray(s) ? s : s?.data) || []

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="News Details" />
      <main className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <article className="lg:col-span-8">
          <Reveal variant="up" delay={0}>
            <div className="h-[280px] md:h-[420px] bg-gray-200 overflow-hidden">
              <img src={news?.photos?.[0]?.path || news?.image || '/assets/img/blog/blog-details-img1.jpg'} alt={news?.title} className="w-full h-full object-cover" />
            </div>
          </Reveal>
          <Reveal variant="up" delay={120}>
            <div className="mt-6">
              <h1 className="text-2xl md:text-3xl font-extrabold">{news?.title}</h1>
              <p className="text-gray-500 text-sm mt-1">{news?.created_at ? fmt(news.created_at) : ''} · {news?.category || 'News'}</p>
            </div>
          </Reveal>
          <Reveal variant="up" delay={240}>
            <div className="bg-white border border-gray-200 mt-4 p-6 prose max-w-none prose-p:leading-7" dangerouslySetInnerHTML={{ __html: news?.description || 'No description available' }} />
          </Reveal>
        </article>

        <aside className="lg:col-span-4">
          {related.length > 0 && (
            <Reveal variant="left" delay={0}>
              <div className="bg-white border border-gray-200 p-5">
                <h3 className="text-sm uppercase tracking-[.2em] text-gray-500 mb-3">Related News</h3>
                <ul className="space-y-3">
                  {related.map((r: any, i: number) => (
                    <li key={r.id}>
                      <a href={`/news/${r.id}`} className="flex items-center gap-3 group">
                        <img src={r.photos?.[0]?.path || r.image || `/assets/img/blog/blog-v1-img${(i%6)+1}.jpg`} alt={r.title} className="w-14 h-14 object-cover" />
                        <div>
                          <p className="text-xs text-gray-500">{r.created_at ? fmt(r.created_at) : ''}</p>
                          <p className="font-semibold group-hover:text-orange-600">{r.title}</p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </aside>
      </main>
    </div>
  )
}


