'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaTelegramPlane,
  FaChevronDown,
  FaBars,
  FaTimes
} from 'react-icons/fa'

interface NavLink {
  name: string
  href: string
  subLinks?: { name: string; href: string }[]
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const navLinks: NavLink[] = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'News', href: '/news' },
    { 
      name: 'Collaborators', 
      href: '/collaborators',
      subLinks: [
        { name: 'Clients', href: '/clients' },
        { name: 'Partners', href: '/partners' }
      ]
    },
    { name: 'Vacancy', href: '/vacancy' },
    { name: 'Profile', href: '/profile' },
  ]
  
  const topLinks: NavLink[] = [
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' }
  ]
  
  const socialLinks = [
    { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100063901428377', icon: <FaFacebookF /> },
    { name: 'Twitter', href: 'https://twitter.com', icon: <FaTwitter /> },
    { name: 'Instagram', href: 'https://instagram.com/ef_architecture_consultanting?igshid=YmMyMTA2M2Y', icon: <FaInstagram /> },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/endale-abdissa-a13564234', icon: <FaLinkedinIn /> },
    { name: 'Telegram', href: 'https://t.me/efengineeringandconsulting', icon: <FaTelegramPlane /> }
  ]
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  
  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name)
  }
  
  return (
    <header className="fixed top-0 left-0 w-full z-[100]">
      {/* Top header removed for a cleaner modern look */}
      
      {/* Main Header - Sticky and transparent initially, becomes opaque on scroll */}
      <div className={`transition-all duration-300 sticky top-0 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-6'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/logo/newlogo.png"
                  alt="EF Engineering"
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </Link>
            </div>
            
            {/* Desktop Navigation - Hidden on small screens */}
            <nav className="hidden md:flex space-x-6">
              {navLinks.map((link) => (
                <div key={link.name} className="relative">
                  {link.subLinks ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(link.name)}
                        className={`font-medium flex items-center transition-colors ${
                          scrolled ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-accent'
                        }`}
                      >
                        {link.name}
                        <FaChevronDown className="ml-1 h-3 w-3" />
                      </button>
                      
                      {openDropdown === link.name && (
                        <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50 border-t-4 border-accent">
                          {link.subLinks.map((subLink) => (
                            <Link
                              key={subLink.name}
                              href={subLink.href}
                              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {subLink.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link 
                      href={link.href}
                      className={`font-medium transition-colors ${
                        scrolled ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-accent'
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
            
            {/* Mobile Menu Button - Only visible on small screens */}
            <button 
              className={`md:hidden focus:outline-none ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
          
          {/* Mobile Navigation - Only visible when menu is open */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4">
              {/* Top Links for Mobile */}
              <div className="flex flex-col space-y-2 pb-4 border-b border-gray-200">
                {topLinks.map((link) => (
                  <Link 
                    key={link.name}
                    href={link.href}
                    className="text-gray-700 hover:text-primary font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              
              {/* Main Navigation Links */}
              <div className="flex flex-col space-y-2 py-4">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    {link.subLinks ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(link.name)}
                          className="text-gray-700 hover:text-primary font-medium py-2 flex justify-between items-center w-full"
                        >
                          {link.name}
                          <FaChevronDown className={`h-3 w-3 transform transition-transform ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {openDropdown === link.name && (
                          <div className="pl-4 pb-2 border-l-2 border-accent">
                            {link.subLinks.map((subLink) => (
                              <Link
                                key={subLink.name}
                                href={subLink.href}
                                className="block py-2 text-gray-700 hover:text-primary pl-4"
                                onClick={() => {
                                  setIsMenuOpen(false)
                                  setOpenDropdown(null)
                                }}
                              >
                                {subLink.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link 
                        href={link.href}
                        className="text-gray-700 hover:text-primary font-medium py-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Mobile Social Links */}
              <div className="pt-4 mt-4 border-t border-gray-200">
                <h3 className="text-gray-700 font-medium mb-3">Follow Us</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <a 
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-primary"
                      aria-label={social.name}
                    >
                      <div className="h-6 w-6 flex items-center justify-center">
                        {social.icon}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}