import Header from '../../components/Header'

export default function FAQ() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary mb-6">Frequently Asked Questions</h1>
        <p className="text-gray-700 mb-4">
          Find answers to common questions about our services, processes, and company policies.
        </p>
        
        <div className="mt-8 space-y-4">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-primary">What services does EF Engineering provide?</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                We provide comprehensive architectural and engineering consulting services including architectural design, 
                structural engineering, project management, construction supervision, and sustainability consulting. 
                Our services cater to residential, commercial, industrial, and infrastructure projects.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-primary">How long does a typical project take to complete?</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                Project duration varies depending on complexity, scope, and size. Small residential projects may take 
                3-6 months, while large commercial or industrial projects can take 1-3 years. We provide detailed 
                project timelines during the initial consultation phase.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-primary">What is your design process?</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                Our design process includes initial consultation, concept development, schematic design, design 
                development, construction documentation, and construction administration. We involve clients at 
                every stage to ensure their vision is realized.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-primary">Do you provide services outside Addis Ababa?</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                Yes, we provide our services throughout Ethiopia and have experience working on projects in 
                various regions including Dire Dawa, Bahir Dar, Hawassa, and Mekelle. We also have the capability 
                to work on international projects through our network of partners.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-primary">How can I request a project quote?</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                You can request a project quote by contacting us through our website contact form, calling our 
                office directly, or sending an email to info@efengineering.com. Please provide project details, 
                requirements, and any relevant documentation to help us prepare an accurate quote.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}