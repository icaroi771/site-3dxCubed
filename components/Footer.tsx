import React from 'react'
import Link from 'next/link'
import { 
  Mail, 
  Instagram, 
  MapPin, 
  Phone,
  Cube,
  Facebook,
  Twitter,
  Youtube
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    services: [
      { name: 'Impressões Prontas', href: '/impressoes-prontas' },
      { name: 'Impressão de STL', href: '/impressao-stl' },
      { name: 'Modelagem 3D', href: '/modelagem' },
      { name: 'Orçamento', href: '/orcamento' },
    ],
    company: [
      { name: 'Sobre Nós', href: '/sobre' },
      { name: 'Contato', href: '/contato' },
      { name: 'Blog', href: '/blog' },
      { name: 'FAQ', href: '/faq' },
    ],
    support: [
      { name: 'Central de Ajuda', href: '/ajuda' },
      { name: 'Política de Privacidade', href: '/privacidade' },
      { name: 'Termos de Uso', href: '/termos' },
      { name: 'Trocas e Devoluções', href: '/trocas' },
    ],
  }

  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com/3dx.cubed', icon: Instagram },
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'YouTube', href: '#', icon: Youtube },
  ]

  return (
    <footer className="bg-primary-black text-primary-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-purple rounded-lg flex items-center justify-center">
                <Cube className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">3dxCubed</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Especialistas em impressão 3D, modelagem e criação de peças personalizadas. 
              Transformamos suas ideias em realidade.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-4 h-4" />
                <a href="mailto:3dxcubed@gmail.com" className="hover:text-primary-white transition-colors">
                  3dxcubed@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Instagram className="w-4 h-4" />
                <a href="https://instagram.com/3dx.cubed" target="_blank" rel="noopener noreferrer" className="hover:text-primary-white transition-colors">
                  @3dx.cubed
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Serviços</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Suporte</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} 3dxCubed. Todos os direitos reservados.
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-primary-purple rounded-lg flex items-center justify-center transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

