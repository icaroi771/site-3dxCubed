'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: 'impressao-pronta' | 'impressao-stl' | 'modelagem'
  rating: number
  reviews: number
  description: string
  inStock: boolean
  tags: string[]
}

const FeaturedProducts = () => {
  const { addToCart } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data - em produção viria da API
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Suporte para Celular',
        price: 25.90,
        originalPrice: 35.90,
        image: '/images/products/suporte-celular.jpg',
        category: 'impressao-pronta',
        rating: 4.8,
        reviews: 24,
        description: 'Suporte ajustável para celular com base estável',
        inStock: true,
        tags: ['útil', 'escritório']
      },
      {
        id: '2',
        name: 'Miniatura Dragão',
        price: 45.00,
        image: '/images/products/dragao-miniatura.jpg',
        category: 'impressao-pronta',
        rating: 4.9,
        reviews: 18,
        description: 'Miniatura detalhada de dragão para colecionadores',
        inStock: true,
        tags: ['arte', 'colecionável']
      },
      {
        id: '3',
        name: 'Organizador de Cabos',
        price: 19.90,
        image: '/images/products/organizador-cabos.jpg',
        category: 'impressao-pronta',
        rating: 4.7,
        reviews: 31,
        description: 'Organizador prático para cabos e fios',
        inStock: true,
        tags: ['organização', 'casa']
      },
      {
        id: '4',
        name: 'Vaso Decorativo',
        price: 35.00,
        image: '/images/products/vaso-decorativo.jpg',
        category: 'impressao-pronta',
        rating: 4.6,
        reviews: 12,
        description: 'Vaso moderno com design geométrico',
        inStock: true,
        tags: ['decoração', 'casa']
      }
    ]
    
    setTimeout(() => {
      setProducts(mockProducts)
      setLoading(false)
    }, 1000)
  }, [])

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      category: product.category,
      description: product.description
    })
  }

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Produtos em <span className="gradient-text">Destaque</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-2xl h-80 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    )
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
            Produtos em <span className="gradient-text">Destaque</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Confira nossos produtos mais populares e bem avaliados pelos clientes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 card-hover">
                {/* Product Image */}
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/20 to-transparent"></div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    {product.originalPrice && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </span>
                    )}
                    <button className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-primary-purple/20 rounded-full flex items-center justify-center">
                      <ShoppingCart className="w-8 h-8 text-primary-purple" />
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-primary-purple font-semibold">
                      Impressões Prontas
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                      <span className="text-sm text-gray-400">({product.reviews})</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-purple transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">
                        R$ {product.price.toFixed(2).replace('.', ',')}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <Link
                      href={`/produto/${product.id}`}
                      className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-center font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Ver</span>
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-primary-purple text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Comprar</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/impressoes-prontas"
            className="bg-primary-purple text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors inline-flex items-center space-x-2"
          >
            <span>Ver Todos os Produtos</span>
            <ShoppingCart className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedProducts

