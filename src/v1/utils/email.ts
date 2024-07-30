import nodemailer from 'nodemailer'

const sendMail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    service: 'smtp.gmail.com',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  })

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject,
    html
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully.')
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

module.exports = sendMail
