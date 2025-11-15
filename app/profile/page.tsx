"use client"
import PageHeader from '../../components/PageHeader'
import Reveal from '../../components/Reveal'

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Company Profile" />
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: About content */}
          <section className="lg:col-span-7 space-y-6">
            <Reveal variant="up" delay={0}>
              <div className="bg-white border border-gray-200 p-6 md:p-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">EF Engineering & Architect</h1>
                <p className="text-orange-600 mt-2 font-semibold">Building with certainty. Designing with purpose.</p>
                <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">
                  <p>Established in 2015, EF Engineering & Architect is a leading multidisciplinary engineering and architectural consultancy firm based in Ethiopia. We specialize in delivering innovative, sustainable, and cost-effective solutions across residential, commercial, industrial, and infrastructure sectors.</p>
                  <p>Our team of experienced professionals combines technical excellence with creative design to transform visionary concepts into exceptional built environments. With a commitment to quality, safety, and environmental sustainability, we have successfully completed numerous projects that stand as testaments to our expertise and dedication.</p>
                  <p>We provide comprehensive services including structural engineering, MEP systems design, architectural planning, project management, and construction supervision. Our client-focused approach ensures that every project is delivered on time, within budget, and to the highest standards of excellence.</p>
                </div>
              </div>
            </Reveal>

            <Reveal variant="up" delay={120}>
              <div className="bg-white border border-gray-200 p-6 md:p-8">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Our Core Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-600 font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-gray-900">Excellence</h4>
                      <p className="text-sm text-gray-600 mt-1">Uncompromising quality in every project</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-600 font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-gray-900">Innovation</h4>
                      <p className="text-sm text-gray-600 mt-1">Cutting-edge solutions and technologies</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-600 font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-gray-900">Integrity</h4>
                      <p className="text-sm text-gray-600 mt-1">Ethical practices and transparency</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-600 font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-gray-900">Sustainability</h4>
                      <p className="text-sm text-gray-600 mt-1">Environmental responsibility in design</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          {/* Right: Quick facts & contact cta */}
          <aside className="lg:col-span-5 space-y-6">
            <Reveal variant="up" delay={0}>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 md:p-8">
                <h3 className="text-xl font-extrabold">Why clients choose us</h3>
                <ul className="mt-4 space-y-3 text-white/95 text-sm">
                  <li className="flex items-start gap-2"><span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-white" /> Proven track record across diverse sectors</li>
                  <li className="flex items-start gap-2"><span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-white" /> Safety and quality-first approach</li>
                  <li className="flex items-start gap-2"><span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-white" /> Transparent budgets and realistic timelines</li>
                  <li className="flex items-start gap-2"><span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-white" /> Experienced multidisciplinary team</li>
                </ul>
                <a href="/contact" className="mt-6 inline-flex items-center justify-center bg-white text-orange-600 font-semibold px-5 py-3 hover:bg-gray-100 transition-colors">Talk to our team</a>
              </div>
            </Reveal>

            <Reveal variant="up" delay={120}>
              <div className="bg-white border border-gray-200 p-6">
                <h4 className="text-lg font-extrabold text-gray-900 mb-3">Our Vision</h4>
                <p className="text-gray-700 leading-relaxed">To be the premier engineering and architectural consultancy firm in East Africa, recognized for our innovative solutions, ethical practices, and contribution to sustainable development. We envision a future where every project we undertake enhances communities and preserves our environment for generations to come.</p>
              </div>
            </Reveal>

            <Reveal variant="up" delay={240}>
              <div className="bg-white border border-gray-200 p-6">
                <h4 className="text-lg font-extrabold text-gray-900 mb-3">Our Mission</h4>
                <p className="text-gray-700 leading-relaxed">To provide exceptional architectural and engineering services that exceed client expectations while contributing to the sustainable development of our communities and environment. We are committed to delivering innovative, cost-effective solutions that combine technical excellence with creative design.</p>
              </div>
            </Reveal>

            <Reveal variant="up" delay={360}>
              <div className="bg-gray-900 text-white p-6">
                <h4 className="text-lg font-extrabold mb-4">Key Statistics</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Projects Completed</span>
                    <span className="text-2xl font-extrabold">200+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Years of Experience</span>
                    <span className="text-2xl font-extrabold">10+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Team Members</span>
                    <span className="text-2xl font-extrabold">50+</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </main>
    </div>
  )
}