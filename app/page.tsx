import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import ProjectsSection from '../components/ProjectsSection';
import AboutSection from '../components/AboutSection';
import StatsSection from '../components/StatsSection';
import WhyChooseUsSection from '../components/WhyChooseUsSection';
import NewsSection from '../components/NewsSection';
import ClientsSection from '../components/ClientsSection';
import ContactSection from '../components/ContactSection';

export default function Home() {
  return (
    <div className="">
      <main className=" ">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <StatsSection />
        <WhyChooseUsSection />
        <NewsSection />
        <ClientsSection />
        <ContactSection />
      </main>
    </div>
  );
}