'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Palette, Users, Clock, CheckCircle, Star, MessageCircle, Send } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface ProjectRequest {
  type: string
  description: string
  purpose: string
  dimensions: string
  complexity: string
  deadline: string
  budget: string
  referenceImages: File[]
  contactInfo: {
    name: string
    email: string
    phone: string
  }
  additionalInfo: string
}

const Modelagem = () => {
  const { state: authState } = useAuth()
  const [projectRequest, setProjectRequest] = useState<ProjectRequest>({
    type: '',
    description: '',
    purpose: '',
    dimensions: '',
    complexity: 'medium',
    deadline: '',
    budget: '',
    referenceImages: [],
    contactInfo: {
      name: '',
      email: '',
      phone: ''
    },
    additionalInfo: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const projectTypes = [
    { id: 'character', name: 'Personagem', description: 'Personagens para jogos, filmes ou colecionáveis' },
    { id: 'functional', name: 'Funcional', description: 'Peças técnicas, protótipos ou ferramentas' },
    { id: 'artistic', name: 'Artístico', description: 'Esculturas, arte decorativa ou peças únicas' },
    { id: 'architectural', name: 'Arquitetônico', description: 'Maquetes, modelos arquitetônicos' },
    { id: 'jewelry', name: 'Joias', description: 'Anéis, pingentes, acessórios personalizados' },
    { id: 'other', name: 'Outro', description: 'Projetos especiais ou personalizados' }
  ]

  const complexityLevels = [
    { id: 'simple', name: 'Simples', description: 'Formas básicas, poucos detalhes', price: 'R$ 50-150' },
    { id: 'medium', name: 'Médio', description: 'Detalhes moderados, algumas complexidades', price: 'R$ 150-400' },
    { id: 'complex', name: 'Complexo', description: 'Muitos detalhes, alta complexidade', price: 'R$ 400-800' },
    { id: 'expert', name: 'Expert', description: 'Extremamente detalhado, nível profissional', price: 'R$ 800+' }
  ]

  const purposes = [
    'Prototipagem',
    'Produção em série',
    'Colecionável',
    'Presente personalizado',
    'Arte decorativa',
    'Uso funcional',
    'Estudo/Educação',
    'Outro'
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files)
      setProjectRequest(prev => ({
        ...prev,
        referenceImages: [...prev.referenceImages, ...newImages]
      }))
    }
  }

  const removeImage = (index: number) => {
    setProjectRequest(prev => ({
      ...prev,
      referenceImages: prev.referenceImages.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Solicitação enviada com sucesso! Entraremos em contato em breve para discutir seu projeto.')
      setProjectRequest({
        type: '',
        description: '',
        purpose: '',
        dimensions: '',
        complexity: 'medium',
        deadline: '',
        budget: '',
        referenceImages: [],
        contactInfo: {
          name: '',
          email: '',
          phone: ''
        },
        additionalInfo: ''
      })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Modelagem <span className="gradient-text">3D</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Criação de modelos 3D personalizados do zero. Transformamos suas ideias em realidade digital.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Descreva Seu Projeto
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Project Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Tipo de Projeto *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {projectTypes.map((type) => (
                      <label
                        key={type.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          projectRequest.type === type.id
                            ? 'border-primary-purple bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="type"
                          value={type.id}
                          checked={projectRequest.type === type.id}
                          onChange={(e) => setProjectRequest(prev => ({ ...prev, type: e.target.value }))}
                          className="sr-only"
                        />
                        <div className="font-medium text-gray-900 mb-1">{type.name}</div>
                        <div className="text-sm text-gray-600">{type.description}</div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição Detalhada *
                  </label>
                  <textarea
                    value={projectRequest.description}
                    onChange={(e) => setProjectRequest(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    placeholder="Descreva seu projeto em detalhes. O que você quer criar? Quais características especiais?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                    required
                  />
                </div>

                {/* Purpose */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Finalidade do Projeto
                  </label>
                  <select
                    value={projectRequest.purpose}
                    onChange={(e) => setProjectRequest(prev => ({ ...prev, purpose: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                  >
                    <option value="">Selecione uma opção</option>
                    {purposes.map((purpose) => (
                      <option key={purpose} value={purpose}>
                        {purpose}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dimensions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dimensões Aproximadas
                  </label>
                  <input
                    type="text"
                    value={projectRequest.dimensions}
                    onChange={(e) => setProjectRequest(prev => ({ ...prev, dimensions: e.target.value }))}
                    placeholder="Ex: 10cm x 5cm x 3cm ou 'tamanho de uma caneca'"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                  />
                </div>

                {/* Complexity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Nível de Complexidade
                  </label>
                  <div className="space-y-3">
                    {complexityLevels.map((level) => (
                      <label
                        key={level.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          projectRequest.complexity === level.id
                            ? 'border-primary-purple bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="complexity"
                          value={level.id}
                          checked={projectRequest.complexity === level.id}
                          onChange={(e) => setProjectRequest(prev => ({ ...prev, complexity: e.target.value }))}
                          className="sr-only"
                        />
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-gray-900">{level.name}</div>
                            <div className="text-sm text-gray-600">{level.description}</div>
                          </div>
                          <div className="text-sm font-semibold text-primary-purple">
                            {level.price}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Deadline and Budget */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prazo Desejado
                    </label>
                    <input
                      type="text"
                      value={projectRequest.deadline}
                      onChange={(e) => setProjectRequest(prev => ({ ...prev, deadline: e.target.value }))}
                      placeholder="Ex: 1 semana, 15 dias, urgente"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Orçamento Aproximado
                    </label>
                    <input
                      type="text"
                      value={projectRequest.budget}
                      onChange={(e) => setProjectRequest(prev => ({ ...prev, budget: e.target.value }))}
                      placeholder="Ex: R$ 200-500, flexível"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Reference Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Imagens de Referência
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer"
                    >
                      <Palette className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Clique para adicionar imagens de referência</p>
                      <p className="text-sm text-gray-500">PNG, JPG até 10MB cada</p>
                    </label>
                  </div>
                  
                  {projectRequest.referenceImages.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                      {projectRequest.referenceImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Referência ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Additional Info */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Informações Adicionais
                  </label>
                  <textarea
                    value={projectRequest.additionalInfo}
                    onChange={(e) => setProjectRequest(prev => ({ ...prev, additionalInfo: e.target.value }))}
                    rows={3}
                    placeholder="Alguma informação extra que possa ajudar no desenvolvimento do projeto?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                  />
                </div>

                {/* Contact Info */}
                {!authState.isAuthenticated && (
                  <div className="space-y-4 pt-6 border-t">
                    <h3 className="font-medium text-gray-900">Informações de Contato</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nome *
                        </label>
                        <input
                          type="text"
                          required
                          value={projectRequest.contactInfo.name}
                          onChange={(e) => setProjectRequest(prev => ({ 
                            ...prev, 
                            contactInfo: { ...prev.contactInfo, name: e.target.value }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={projectRequest.contactInfo.email}
                          onChange={(e) => setProjectRequest(prev => ({ 
                            ...prev, 
                            contactInfo: { ...prev.contactInfo, email: e.target.value }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        value={projectRequest.contactInfo.phone}
                        onChange={(e) => setProjectRequest(prev => ({ 
                          ...prev, 
                          contactInfo: { ...prev.contactInfo, phone: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                      />
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!projectRequest.type || !projectRequest.description || isSubmitting}
                  className="w-full bg-primary-purple text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Solicitar Orçamento</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="space-y-6">
              {/* Process Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Como Funciona
                </h3>
                <div className="space-y-4">
                  {[
                    { step: '1', title: 'Análise', desc: 'Analisamos sua solicitação' },
                    { step: '2', title: 'Proposta', desc: 'Enviamos proposta detalhada' },
                    { step: '3', title: 'Desenvolvimento', desc: 'Criamos o modelo 3D' },
                    { step: '4', title: 'Revisões', desc: 'Ajustes até sua aprovação' },
                    { step: '5', title: 'Entrega', desc: 'Arquivo STL final' }
                  ].map((item) => (
                    <div key={item.step} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary-purple text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{item.title}</div>
                        <div className="text-sm text-gray-600">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  O que Inclui
                </h3>
                <div className="space-y-3">
                  {[
                    'Modelo 3D otimizado para impressão',
                    'Arquivo STL de alta qualidade',
                    'Suporte técnico durante o projeto',
                    'Até 3 revisões incluídas',
                    'Garantia de satisfação'
                  ].map((feature) => (
                    <div key={feature} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="bg-gradient-to-r from-primary-purple to-purple-600 rounded-lg p-6 text-white">
                <h3 className="text-lg font-semibold mb-4">
                  Precisa de Ajuda?
                </h3>
                <p className="text-purple-100 mb-4">
                  Nossa equipe está pronta para tirar suas dúvidas sobre modelagem 3D.
                </p>
                <button className="bg-white text-primary-purple px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Falar no WhatsApp</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Portfolio Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Nossos Trabalhos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Personagem de Jogo',
                description: 'Modelo detalhado para impressão 3D',
                image: '/images/portfolio/character.jpg'
              },
              {
                title: 'Peça Técnica',
                description: 'Protótipo funcional para teste',
                image: '/images/portfolio/technical.jpg'
              },
              {
                title: 'Escultura Artística',
                description: 'Arte decorativa personalizada',
                image: '/images/portfolio/artistic.jpg'
              }
            ].map((work, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{work.title}</h3>
                  <p className="text-sm text-gray-600">{work.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Modelagem

