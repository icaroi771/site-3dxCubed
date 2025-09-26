'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Award, Users, Clock, Target, CheckCircle, Star } from 'lucide-react'

const About = () => {
  const stats = [
    { number: '500+', label: 'Projetos Realizados' },
    { number: '98%', label: 'Satisfação dos Clientes' },
    { number: '3+', label: 'Anos de Experiência' },
    { number: '24h', label: 'Tempo de Resposta' }
  ]

  const values = [
    {
      icon: Target,
      title: 'Qualidade',
      description: 'Comprometimento com a excelência em cada projeto entregue'
    },
    {
      icon: Users,
      title: 'Atendimento',
      description: 'Suporte personalizado e acompanhamento em todas as etapas'
    },
    {
      icon: Clock,
      title: 'Prazos',
      description: 'Cumprimento rigoroso dos prazos acordados'
    },
    {
      icon: Award,
      title: 'Inovação',
      description: 'Uso das melhores tecnologias e técnicas de impressão 3D'
    }
  ]

  const achievements = [
    'Especialistas em impressão 3D desde 2021',
    'Equipe certificada em modelagem 3D',
    'Parcerias com empresas de tecnologia',
    'Projetos reconhecidos na comunidade maker'
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Sobre a <span className="gradient-text">3dxCubed</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Somos especialistas em transformar ideias em realidade através da impressão 3D. 
              Com anos de experiência e tecnologia de ponta, oferecemos soluções completas 
              para suas necessidades de modelagem e impressão.
            </p>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Nossa missão é democratizar o acesso à impressão 3D de qualidade, oferecendo 
              serviços personalizados que atendem desde projetos simples até criações 
              complexas e únicas.
            </p>

            {/* Achievements */}
            <div className="space-y-3 mb-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{achievement}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <a
                href="/contato"
                className="bg-primary-purple text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors inline-flex items-center space-x-2"
              >
                <span>Fale Conosco</span>
                <Star className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-gray-50 rounded-lg"
                >
                  <div className="text-3xl font-bold text-primary-purple mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Values */}
            <div className="space-y-6">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="w-12 h-12 bg-primary-purple rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Nossa Equipe
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: 'Equipe Técnica',
                role: 'Especialistas em 3D',
                description: 'Profissionais certificados em modelagem e impressão 3D'
              },
              {
                name: 'Atendimento',
                role: 'Suporte ao Cliente',
                description: 'Equipe dedicada ao atendimento e suporte personalizado'
              },
              {
                name: 'Qualidade',
                role: 'Controle de Qualidade',
                description: 'Garantia de excelência em cada projeto entregue'
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <div className="w-20 h-20 bg-primary-purple rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{member.name}</h4>
                <p className="text-primary-purple font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About

