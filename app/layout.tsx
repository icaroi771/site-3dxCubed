import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from '@/contexts/CartContext'
import { AuthProvider } from '@/contexts/AuthContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '3dxCubed - Impressão 3D e Modelagem',
  description: 'Especialistas em impressão 3D, modelagem e criação de peças personalizadas. Impressões prontas, impressão de STL e serviços de modelagem 3D.',
  keywords: 'impressão 3D, modelagem 3D, STL, impressora 3D, peças personalizadas, 3dxCubed',
  authors: [{ name: '3dxCubed' }],
  creator: '3dxCubed',
  publisher: '3dxCubed',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://3dxcubed.com.br',
    siteName: '3dxCubed',
    title: '3dxCubed - Impressão 3D e Modelagem',
    description: 'Especialistas em impressão 3D, modelagem e criação de peças personalizadas.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '3dxCubed - Impressão 3D',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '3dxCubed - Impressão 3D e Modelagem',
    description: 'Especialistas em impressão 3D, modelagem e criação de peças personalizadas.',
    images: ['/og-image.jpg'],
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#4B0082',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#1f2937',
                  color: '#fff',
                  border: '1px solid #4B0082',
                },
                success: {
                  iconTheme: {
                    primary: '#4B0082',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

