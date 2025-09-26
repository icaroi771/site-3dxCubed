'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, File, Calculator, Send, CheckCircle, AlertCircle } from 'lucide-react'

interface QuoteForm {
  service: string
  description: string
  files: File[]
  contactInfo: {
    name: string
    email: string
    phone: string
  }
  urgency: string
  budget: string
}

const Orcamento = () => {
  const [form, setForm] = useState<QuoteForm>({
    service: '',
    description: '',
    files: [],
    contactInfo: {
      name: '',
      email: '',
      phone: ''
    },
    urgency: 'normal',
    budget: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const services = [
    { id: 'impressao-stl', name: 'Impressão de STL', description: 'Envie seu arquivo STL' },
    { id: 'modelagem-3d', name: 'Modelagem 3D', description: 'Criação de modelo personalizado' },
    { id: 'consultoria', name: 'Consultoria Técnica', description: 'Orientação sobre projetos 3D' },
    { id: 'prototipagem', name: 'Prototipagem', description: 'Desenvolvimento de protótipos' }
  ]

  const urgencyLevels = [
    { id: 'low', name: 'Baixa', description: '1-2 semanas', color: 'text-green-600' },
    { id: 'normal', name: 'Normal', description: '3-5 dias', color: 'text-blue-600' },
    { id: 'high', name: 'Alta', description: '1-2 dias', color: 'text-yellow-600' },
    { id: 'urgent', name: 'Urgente', description: '24 horas', color: 'text-red-600' }
  ]

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setForm(prev => ({
        ...prev,
        files: [...prev.files, ...newFiles]
      }))
    }
  }

  const removeFile = (index: number) => {
    setForm(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envio
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Solicitação de orçamento enviada com sucesso! Entraremos em contato em breve.')
      setForm({
        service: '',
        description: '',
        files: [],
        contactInfo: {
          name: '',
          email: '',
          phone: ''
        },
        urgency: 'normal',
        budget: ''
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
            Solicitar <span className="gradient-text">Orçamento</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descreva seu projeto e receba um orçamento personalizado em até 24 horas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-sm p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Tipo de Serviço */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Tipo de Serviço *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <label
                        key={service.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          form.service === service.id
                            ? 'border-primary-purple bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="service"
                          value={service.id}
                          checked={form.service === service.id}
                          onChange={(e) => setForm(prev => ({ ...prev, service: e.target.value }))}
                          className="sr-only"
                        />
                        <div className="font-medium text-gray-900 mb-1">{service.name}</div>
                        <div className="text-sm text-gray-600">{service.description}</div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Descrição do Projeto */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição Detalhada do Projeto *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={form.description}
                    onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                    placeholder="Descreva seu projeto em detalhes. Inclua dimensões, materiais desejados, quantidade, finalidade, etc."
                  />
                </div>

                {/* Upload de Arquivos */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Arquivos de Referência
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      multiple
                      accept=".stl,.obj,.3ds,.blend,.max,.fbx,.dae,.ply,.step,.iges,.pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer"
                    >
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Clique para adicionar arquivos</p>
                      <p className="text-sm text-gray-500">STL, OBJ, imagens, PDFs (máx. 50MB cada)</p>
                    </label>
                  </div>
                  
                  {form.files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {form.files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <File className="w-5 h-5 text-gray-500" />
                            <div>
                              <p className="font-medium text-gray-900">{file.name}</p>
                              <p className="text-sm text-gray-500">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <AlertCircle className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Urgência e Orçamento */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Urgência do Projeto
                    </label>
                    <div className="space-y-2">
                      {urgencyLevels.map((level) => (
                        <label
                          key={level.id}
                          className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                            form.urgency === level.id
                              ? 'border-primary-purple bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="urgency"
                            value={level.id}
                            checked={form.urgency === level.id}
                            onChange={(e) => setForm(prev => ({ ...prev, urgency: e.target.value }))}
                            className="sr-only"
                          />
                          <div className={`font-medium ${level.color}`}>{level.name}</div>
                          <div className="text-sm text-gray-600">{level.description}</div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Orçamento Aproximado
                    </label>
                    <input
                      type="text"
                      value={form.budget}
                      onChange={(e) => setForm(prev => ({ ...prev, budget: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                      placeholder="Ex: R$ 200-500, flexível"
                    />
                  </div>
                </div>

                {/* Informações de Contato */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Informações de Contato</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.contactInfo.name}
                        onChange={(e) => setForm(prev => ({ 
                          ...prev, 
                          contactInfo: { ...prev.contactInfo, name: e.target.value }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.contactInfo.email}
                        onChange={(e) => setForm(prev => ({ 
                          ...prev, 
                          contactInfo: { ...prev.contactInfo, email: e.target.value }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      value={form.contactInfo.phone}
                      onChange={(e) => setForm(prev => ({ 
                        ...prev, 
                        contactInfo: { ...prev.contactInfo, phone: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!form.service || !form.description || isSubmitting}
                  className="w-full bg-primary-purple text-white py-4 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
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
              {/* Processo */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Como Funciona
                </h3>
                <div className="space-y-4">
                  {[
                    { step: '1', title: 'Envie sua solicitação', desc: 'Descreva seu projeto' },
                    { step: '2', title: 'Análise técnica', desc: 'Avaliamos viabilidade' },
                    { step: '3', title: 'Orçamento detalhado', desc: 'Envio em até 24h' },
                    { step: '4', title: 'Aprovação', desc: 'Início do projeto' }
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

              {/* Benefícios */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Por que escolher a 3dxCubed?
                </h3>
                <div className="space-y-3">
                  {[
                    'Orçamento gratuito e sem compromisso',
                    'Resposta rápida (até 24 horas)',
                    'Especialistas em impressão 3D',
                    'Qualidade garantida',
                    'Suporte técnico completo'
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contato Rápido */}
              <div className="bg-gradient-to-r from-primary-purple to-purple-600 rounded-lg p-6 text-white">
                <h3 className="text-lg font-semibold mb-4">
                  Precisa de Ajuda?
                </h3>
                <p className="text-purple-100 mb-4">
                  Nossa equipe está pronta para tirar suas dúvidas sobre orçamentos e projetos.
                </p>
                <div className="space-y-2">
                  <a
                    href="mailto:3dxcubed@gmail.com"
                    className="block text-purple-100 hover:text-white transition-colors"
                  >
                    📧 3dxcubed@gmail.com
                  </a>
                  <a
                    href="https://instagram.com/3dx.cubed"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-purple-100 hover:text-white transition-colors"
                  >
                    📱 @3dx.cubed
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Orcamento

