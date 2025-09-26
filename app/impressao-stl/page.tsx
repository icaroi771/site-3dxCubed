'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, File, Calculator, Truck, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  status: 'uploading' | 'success' | 'error'
}

interface QuoteRequest {
  files: UploadedFile[]
  material: string
  color: string
  quantity: number
  notes: string
  contactInfo: {
    name: string
    email: string
    phone: string
  }
}

const ImpressaoSTL = () => {
  const { state: authState } = useAuth()
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [quoteRequest, setQuoteRequest] = useState<QuoteRequest>({
    files: [],
    material: 'PLA',
    color: 'Branco',
    quantity: 1,
    notes: '',
    contactInfo: {
      name: '',
      email: '',
      phone: ''
    }
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const materials = [
    { id: 'PLA', name: 'PLA', description: 'Fácil de imprimir, boa qualidade' },
    { id: 'PETG', name: 'PETG', description: 'Mais resistente, flexível' },
    { id: 'ABS', name: 'ABS', description: 'Muito resistente, precisa de aquecimento' },
    { id: 'TPU', name: 'TPU', description: 'Flexível, tipo borracha' }
  ]

  const colors = [
    'Branco', 'Preto', 'Vermelho', 'Azul', 'Verde', 'Amarelo', 'Rosa', 'Roxo', 'Cinza', 'Transparente'
  ]

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      if (file.type === 'application/octet-stream' || file.name.toLowerCase().endsWith('.stl')) {
        const newFile: UploadedFile = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'uploading'
        }
        
        setUploadedFiles(prev => [...prev, newFile])
        
        // Simulate upload
        setTimeout(() => {
          setUploadedFiles(prev => 
            prev.map(f => f.id === newFile.id ? { ...f, status: 'success' } : f)
          )
        }, 2000)
      }
    })
  }

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Solicitação enviada com sucesso! Entraremos em contato em breve com o orçamento.')
      setUploadedFiles([])
      setQuoteRequest({
        files: [],
        material: 'PLA',
        color: 'Branco',
        quantity: 1,
        notes: '',
        contactInfo: {
          name: '',
          email: '',
          phone: ''
        }
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
            Impressão de <span className="gradient-text">STL</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Envie seu arquivo STL e receba um orçamento personalizado com preço de envio pelos Correios
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Upload do Arquivo STL
              </h2>

              {/* Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-primary-purple bg-purple-50' 
                    : 'border-gray-300 hover:border-primary-purple'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Arraste e solte seu arquivo STL aqui
                </p>
                <p className="text-gray-600 mb-4">
                  ou clique para selecionar
                </p>
                <input
                  type="file"
                  accept=".stl"
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="bg-primary-purple text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors cursor-pointer inline-block"
                >
                  Selecionar Arquivo
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  Formatos aceitos: .stl (máximo 50MB)
                </p>
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Arquivos Enviados
                  </h3>
                  <div className="space-y-3">
                    {uploadedFiles.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <File className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="font-medium text-gray-900">{file.name}</p>
                            <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {file.status === 'uploading' && (
                            <div className="flex items-center space-x-2 text-blue-600">
                              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                              <span className="text-sm">Enviando...</span>
                            </div>
                          )}
                          {file.status === 'success' && (
                            <div className="flex items-center space-x-2 text-green-600">
                              <CheckCircle className="w-5 h-5" />
                              <span className="text-sm">Enviado</span>
                            </div>
                          )}
                          {file.status === 'error' && (
                            <div className="flex items-center space-x-2 text-red-600">
                              <AlertCircle className="w-5 h-5" />
                              <span className="text-sm">Erro</span>
                            </div>
                          )}
                          <button
                            onClick={() => removeFile(file.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Quote Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Detalhes do Orçamento
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Material */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Material
                  </label>
                  <select
                    value={quoteRequest.material}
                    onChange={(e) => setQuoteRequest(prev => ({ ...prev, material: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                  >
                    {materials.map(material => (
                      <option key={material.id} value={material.id}>
                        {material.name} - {material.description}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cor
                  </label>
                  <select
                    value={quoteRequest.color}
                    onChange={(e) => setQuoteRequest(prev => ({ ...prev, color: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                  >
                    {colors.map(color => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantidade
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quoteRequest.quantity}
                    onChange={(e) => setQuoteRequest(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Observações
                  </label>
                  <textarea
                    value={quoteRequest.notes}
                    onChange={(e) => setQuoteRequest(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                    placeholder="Detalhes especiais, acabamento desejado, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                  />
                </div>

                {/* Contact Info */}
                {!authState.isAuthenticated && (
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-medium text-gray-900">Informações de Contato</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome
                      </label>
                      <input
                        type="text"
                        required
                        value={quoteRequest.contactInfo.name}
                        onChange={(e) => setQuoteRequest(prev => ({ 
                          ...prev, 
                          contactInfo: { ...prev.contactInfo, name: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={quoteRequest.contactInfo.email}
                        onChange={(e) => setQuoteRequest(prev => ({ 
                          ...prev, 
                          contactInfo: { ...prev.contactInfo, email: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        value={quoteRequest.contactInfo.phone}
                        onChange={(e) => setQuoteRequest(prev => ({ 
                          ...prev, 
                          contactInfo: { ...prev.contactInfo, phone: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                      />
                    </div>
                  </div>
                )}

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Como funciona:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Analisamos seu arquivo STL</li>
                        <li>• Calculamos volume e tempo de impressão</li>
                        <li>• Enviamos orçamento com frete</li>
                        <li>• Aprovação e início da impressão</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={uploadedFiles.length === 0 || isSubmitting}
                  className="w-full bg-primary-purple text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Calculator className="w-5 h-5" />
                      <span>Solicitar Orçamento</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Process Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Como Funciona
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Upload do STL',
                description: 'Envie seu arquivo STL com as especificações desejadas'
              },
              {
                step: '2',
                title: 'Análise Técnica',
                description: 'Analisamos o arquivo e calculamos volume, tempo e material'
              },
              {
                step: '3',
                title: 'Orçamento',
                description: 'Enviamos orçamento detalhado com preço e frete'
              },
              {
                step: '4',
                title: 'Impressão',
                description: 'Após aprovação, iniciamos a impressão e envio'
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary-purple text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ImpressaoSTL

