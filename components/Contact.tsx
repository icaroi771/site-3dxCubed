'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Instagram } from 'lucide-react'

interface ContactForm {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  service: string
}

const Contact = () => {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    service: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const services = [
    'Impressões Prontas',
    'Impressão de STL',
    'Modelagem 3D',
    'Orçamento Personalizado',
    'Suporte Técnico',
    'Outro'
  ]

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: '3dxcubed@gmail.com',
      link: 'mailto:3dxcubed@gmail.com'
    },
    {
      icon: Instagram,
      title: 'Instagram',
      value: '@3dx.cubed',
      link: 'https://instagram.com/3dx.cubed'
    },
    {
      icon: Clock,
      title: 'Horário de Atendimento',
      value: 'Seg - Sex: 9h às 18h',
      link: null
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Mensagem enviada com sucesso! Entraremos em contato em breve.')
      setForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        service: ''
      })
    }, 2000)
  }

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Entre em <span className="gradient-text">Contato</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tem alguma dúvida ou projeto em mente? Estamos aqui para ajudar! 
            Entre em contato conosco e vamos transformar sua ideia em realidade.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Envie sua Mensagem
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Serviço de Interesse
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) => handleInputChange('service', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                    >
                      <option value="">Selecione um serviço</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assunto *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                    placeholder="Resumo do seu projeto ou dúvida"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                    placeholder="Descreva seu projeto, dúvidas ou necessidades em detalhes..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-purple text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Enviar Mensagem</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Informações de Contato
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-primary-purple/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary-purple" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 mb-1">
                          {info.title}
                        </div>
                        {info.link ? (
                          <a
                            href={info.link}
                            target={info.link.startsWith('http') ? '_blank' : undefined}
                            rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-gray-600 hover:text-primary-purple transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <div className="text-gray-600">
                            {info.value}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-primary-purple to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-semibold mb-4">
                Ações Rápidas
              </h3>
              <div className="space-y-4">
                <a
                  href="/orcamento"
                  className="block bg-white/20 hover:bg-white/30 rounded-lg p-4 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">Solicitar Orçamento</span>
                  </div>
                </a>
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/20 hover:bg-white/30 rounded-lg p-4 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">WhatsApp</span>
                  </div>
                </a>
                <a
                  href="https://instagram.com/3dx.cubed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/20 hover:bg-white/30 rounded-lg p-4 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Instagram className="w-5 h-5" />
                    <span className="font-medium">Instagram</span>
                  </div>
                </a>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Perguntas Frequentes
              </h3>
              <div className="space-y-4">
                {[
                  {
                    question: 'Qual o prazo de entrega?',
                    answer: 'Varia de 3-7 dias úteis dependendo da complexidade.'
                  },
                  {
                    question: 'Aceitam arquivos STL?',
                    answer: 'Sim! Analisamos e orçamos arquivos STL personalizados.'
                  },
                  {
                    question: 'Fazem modelagem 3D?',
                    answer: 'Sim! Criamos modelos 3D do zero conforme sua necessidade.'
                  }
                ].map((faq, index) => (
                  <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0">
                    <div className="font-medium text-gray-900 text-sm mb-1">
                      {faq.question}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {faq.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-gray-100 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Nossa Localização
            </h3>
            <p className="text-gray-600 mb-6">
              Atendemos clientes de todo o Brasil com envio pelos Correios
            </p>
            <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
              <MapPin className="w-8 h-8 text-primary-purple mx-auto mb-3" />
              <p className="text-gray-700 font-medium">
                Atendimento Online
              </p>
              <p className="text-gray-600 text-sm">
                Enviamos para todo o território nacional
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact

