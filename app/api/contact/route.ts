import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, message, service } = await request.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: 'Nome, email, assunto e mensagem são obrigatórios' },
        { status: 400 }
      )
    }

    // Configure email transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER || '3dxcubed@gmail.com',
        pass: process.env.SMTP_PASS || ''
      }
    })

    // Email content
    const emailContent = `
      Nova mensagem de contato recebida:
      
      Nome: ${name}
      Email: ${email}
      Telefone: ${phone || 'Não informado'}
      Serviço de Interesse: ${service || 'Não especificado'}
      Assunto: ${subject}
      
      Mensagem:
      ${message}
      
      ---
      Enviado através do site 3dxCubed
    `

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_USER || '3dxcubed@gmail.com',
      to: '3dxcubed@gmail.com',
      subject: `[3dxCubed] ${subject}`,
      text: emailContent
    })

    // Send confirmation email to user
    const confirmationContent = `
      Olá ${name},
      
      Recebemos sua mensagem e entraremos em contato em breve!
      
      Resumo da sua mensagem:
      Assunto: ${subject}
      Serviço: ${service || 'Não especificado'}
      
      Atenciosamente,
      Equipe 3dxCubed
    `

    await transporter.sendMail({
      from: process.env.SMTP_USER || '3dxcubed@gmail.com',
      to: email,
      subject: 'Confirmação de recebimento - 3dxCubed',
      text: confirmationContent
    })

    return NextResponse.json({
      message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.'
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { message: 'Erro ao enviar mensagem. Tente novamente.' },
      { status: 500 }
    )
  }
}

