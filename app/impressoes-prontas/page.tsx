'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Filter, Grid, List, Search, ShoppingCart, Star, Heart } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  description: string
  inStock: boolean
  tags: string[]
  material: string
  dimensions: string
  weight: number
}

const ImpressoesProntas = () => {
  const { addToCart } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popular')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'utilitarios', name: 'Utilitários' },
    { id: 'arte', name: 'Arte' },
    { id: 'decoracao', name: 'Decoração' },
    { id: 'miniaturas', name: 'Miniaturas' },
    { id: 'organizacao', name: 'Organização' }
  ]

  const sortOptions = [
    { id: 'popular', name: 'Mais Populares' },
    { id: 'price-low', name: 'Menor Preço' },
    { id: 'price-high', name: 'Maior Preço' },
    { id: 'rating', name: 'Melhor Avaliados' },
    { id: 'newest', name: 'Mais Recentes' }
  ]

  // Mock data
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Suporte para Celular Ajustável',
        price: 25.90,
        originalPrice: 35.90,
        image: '/images/products/suporte-celular.jpg',
        category: 'utilitarios',
        rating: 4.8,
        reviews: 24,
        description: 'Suporte ajustável para celular com base estável e design moderno',
        inStock: true,
        tags: ['útil', 'escritório', 'celular'],
        material: 'PLA',
        dimensions: '12x8x6 cm',
        weight: 45
      },
      {
        id: '2',
        name: 'Miniatura Dragão Detalhada',
        price: 45.00,
        image: '/images/products/dragao-miniatura.jpg',
        category: 'arte',
        rating: 4.9,
        reviews: 18,
        description: 'Miniatura detalhada de dragão para colecionadores e jogadores',
        inStock: true,
        tags: ['arte', 'colecionável', 'fantasia'],
        material: 'PLA+',
        dimensions: '8x6x10 cm',
        weight: 80
      },
      {
        id: '3',
        name: 'Organizador de Cabos Universal',
        price: 19.90,
        image: '/images/products/organizador-cabos.jpg',
        category: 'organizacao',
        rating: 4.7,
        reviews: 31,
        description: 'Organizador prático para cabos e fios com design minimalista',
        inStock: true,
        tags: ['organização', 'casa', 'escritório'],
        material: 'PETG',
        dimensions: '15x10x3 cm',
        weight: 60
      },
      {
        id: '4',
        name: 'Vaso Decorativo Geométrico',
        price: 35.00,
        image: '/images/products/vaso-decorativo.jpg',
        category: 'decoracao',
        rating: 4.6,
        reviews: 12,
        description: 'Vaso moderno com design geométrico para plantas pequenas',
        inStock: true,
        tags: ['decoração', 'casa', 'plantas'],
        material: 'PLA',
        dimensions: '10x10x12 cm',
        weight: 120
      },
      {
        id: '5',
        name: 'Porta-chaves Personalizado',
        price: 15.90,
        image: '/images/products/porta-chaves.jpg',
        category: 'utilitarios',
        rating: 4.5,
        reviews: 8,
        description: 'Porta-chaves prático com gancho para parede',
        inStock: true,
        tags: ['útil', 'casa', 'organização'],
        material: 'PLA',
        dimensions: '8x6x2 cm',
        weight: 25
      },
      {
        id: '6',
        name: 'Miniatura Robô Futurista',
        price: 38.00,
        image: '/images/products/robo-miniatura.jpg',
        category: 'miniaturas',
        rating: 4.8,
        reviews: 15,
        description: 'Miniatura de robô com design futurista e detalhes incríveis',
        inStock: true,
        tags: ['miniaturas', 'sci-fi', 'colecionável'],
        material: 'PLA+',
        dimensions: '6x5x8 cm',
        weight: 55
      }
    ]
    
    setTimeout(() => {
      setProducts(mockProducts)
      setFilteredProducts(mockProducts)
      setLoading(false)
    }, 1000)
  }, [])

  // Filter and search
  useEffect(() => {
    let filtered = products

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        // Mock newest - in real app would use creation date
        filtered.reverse()
        break
      default: // popular
        filtered.sort((a, b) => b.reviews - a.reviews)
    }

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory, sortBy])

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      category: 'impressao-pronta',
      description: product.description,
      specifications: {
        material: product.material,
        size: product.dimensions,
        weight: product.weight
      }
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg h-80"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Impressões <span className="gradient-text">Prontas</span>
          </h1>
          <p className="text-lg text-gray-600">
            Modelos úteis, arte e decoração já prontos para impressão
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="lg:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode */}
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-purple text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-purple text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
            >
              {viewMode === 'grid' ? (
                // Grid View
                <div className="group">
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
                      <div className="w-16 h-16 bg-primary-purple/20 rounded-full flex items-center justify-center">
                        <ShoppingCart className="w-6 h-6 text-primary-purple" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-primary-purple font-semibold">
                        {categories.find(c => c.id === product.category)?.name}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{product.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-purple transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900">
                          R$ {product.price.toFixed(2).replace('.', ',')}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-primary-purple text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Adicionar ao Carrinho</span>
                    </button>
                  </div>
                </div>
              ) : (
                // List View
                <div className="flex group">
                  <div className="w-32 h-32 bg-gray-200 flex-shrink-0"></div>
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm text-primary-purple font-semibold">
                            {categories.find(c => c.id === product.category)?.name}
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

                        <p className="text-gray-600 text-sm mb-3">
                          {product.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {product.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="text-sm text-gray-500">
                          Material: {product.material} | Dimensões: {product.dimensions} | Peso: {product.weight}g
                        </div>
                      </div>

                      <div className="text-right ml-4">
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-xl font-bold text-gray-900">
                            R$ {product.price.toFixed(2).replace('.', ',')}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => handleAddToCart(product)}
                          className="bg-primary-purple text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center space-x-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>Adicionar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-600">
              Tente ajustar os filtros ou termos de busca
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ImpressoesProntas

