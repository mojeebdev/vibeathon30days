export const metadata = { title: '30 Days of Vibeathon' }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: '#060608' }}>
        {children}
      </body>
    </html>
  )
}