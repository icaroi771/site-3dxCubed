'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Package, Truck, Mail, Home, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

const PedidoConfirmado = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8 text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            Pedido Confirmado!
          </motion.h1>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-gray-600 mb-8"
          >
            Seu pedido foi recebido com sucesso e está sendo processado. 
            Você receberá um email de confirmação em breve.
          </motion.p>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-gray-50 rounded-lg p-6 mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Detalhes do Pedido
            </h3>
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span className="text-gray-600">Número do Pedido:</span>
                <span className="font-medium">#3DX-2024-001</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Data:</span>
                <span className="font-medium">{new Date().toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium text-green-600">Confirmado</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Forma de Pagamento:</span>
                <span className="font-medium">PIX</span>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Próximos Passos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
                <div className="text-left">
                  <div className="font-medium text-gray-900">Preparação</div>
                  <div className="text-sm text-gray-600">1-2 dias úteis</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg">
                <Truck className="w-6 h-6 text-yellow-600" />
                <div className="text-left">
                  <div className="font-medium text-gray-900">Envio</div>
                  <div className="text-sm text-gray-600">3-5 dias úteis</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                <Mail className="w-6 h-6 text-green-600" />
                <div className="text-left">
                  <div className="font-medium text-gray-900">Entrega</div>
                  <div className="text-sm text-gray-600">Você receberá</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/"
              className="bg-primary-purple text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>Voltar ao Início</span>
            </Link>
            <Link
              href="/impressoes-prontas"
              className="border-2 border-primary-purple text-primary-purple px-8 py-3 rounded-lg font-semibold hover:bg-primary-purple hover:text-white transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Continuar Comprando</span>
            </Link>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 pt-8 border-t border-gray-200"
          >
            <p className="text-sm text-gray-600 mb-4">
              Dúvidas sobre seu pedido? Entre em contato conosco:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <a
                href="mailto:3dxcubed@gmail.com"
                className="text-primary-purple hover:text-purple-700 font-medium"
              >
                📧 3dxcubed@gmail.com
              </a>
              <a
                href="https://instagram.com/3dx.cubed"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-purple hover:text-purple-700 font-medium"
              >
                📱 @3dx.cubed
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default PedidoConfirmado

