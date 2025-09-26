'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Printer, Upload, Palette, ArrowRight, CheckCircle } from 'lucide-react'

const Services = () => {
  const services = [
    {
      id: 'impressoes-prontas',
      title: 'Impressões Prontas',
      description: 'Modelos úteis, arte e decoração já prontos para impressão',
      icon: Printer,
      features: [
        'Modelos úteis do dia a dia',
        'Arte e decoração',
        'Miniaturas e colecionáveis',
        'Entrega rápida'
      ],
      href: '/impressoes-prontas',
      color: 'from-blue-500 to-purple-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      id: 'impressao-stl',
      title: 'Impressão de STL',
      description: 'Envie seu arquivo STL e receba um orçamento personalizado',
      icon: Upload,
      features: [
        'Upload de arquivos STL',
        'Orçamento personalizado',
        'Diferentes materiais',
        'Cálculo de frete'
      ],
      href: '/impressao-stl',
      color: 'from-green-500 to-teal-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      id: 'modelagem-3d',
      title: 'Modelagem 3D',
      description: 'Criação de modelos 3D personalizados do zero',
      icon: Palette,
      features: [
        'Design personalizado',
        'Consultoria técnica',
        'Prototipagem',
        'Acompanhamento completo'
      ],
      href: '/modelagem',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nossos <span className="gradient-text">Serviços</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oferecemos soluções completas em impressão 3D, desde modelos prontos 
            até criação personalizada de peças únicas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={service.href}>
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 card-hover h-full">
                    {/* Icon */}
                    <div className={`w-16 h-16 ${service.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-8 h-8 ${service.iconColor}`} />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-purple transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: (index * 0.2) + (featureIndex * 0.1) }}
                          viewport={{ once: true }}
                          className="flex items-center space-x-3"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="flex items-center text-primary-purple font-semibold group-hover:translate-x-2 transition-transform duration-300">
                      <span>Saiba mais</span>
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-purple to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Não sabe qual serviço escolher?
            </h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Entre em contato conosco e nossa equipe te ajudará a encontrar 
              a melhor solução para seu projeto.
            </p>
            <Link
              href="/contato"
              className="bg-white text-primary-purple px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
            >
              <span>Falar com Especialista</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services

