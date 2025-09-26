import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// Mock user database - em produção usar banco real
const users = [
  {
    id: '1',
    name: 'Admin 3dxCubed',
    email: 'admin@3dxcubed.com.br',
    role: 'admin'
  }
]

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Token não fornecido' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    
    try {
      const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret') as any
      
      // Find user
      const user = users.find(u => u.id === decoded.userId)
      if (!user) {
        return NextResponse.json(
          { message: 'Usuário não encontrado' },
          { status: 404 }
        )
      }

      return NextResponse.json(user)

    } catch (jwtError) {
      return NextResponse.json(
        { message: 'Token inválido' },
        { status: 401 }
      )
    }

  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

