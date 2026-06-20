import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import QRCode from 'qrcode.react'
import { FaQrcode } from 'react-icons/fa'

const QRCodeSection = () => {
  const [url, setUrl] = useState('')
  const [showQR, setShowQR] = useState(false)

  useEffect(() => {
    // Get current URL
    setUrl(window.location.href)
    
    // Show QR after a delay
    setTimeout(() => setShowQR(true), 3000)
  }, [])

  const handleDownloadQR = () => {
    const svg = document.getElementById('qr-code-svg')
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg)
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      img.onload = () => {
        canvas.width = img.width * 4
        canvas.height = img.height * 4
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        
        const pngFile = canvas.toDataURL('image/png')
        const downloadLink = document.createElement('a')
        downloadLink.download = 'moxa-birthday-qr.png'
        downloadLink.href = pngFile
        downloadLink.click()
      }
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
    }
  }

  return (
    <AnimatePresence>
      {showQR && (
        <motion.div
          className="fixed bottom-4 left-4 z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring' }}
        >
          <motion.div
            className="glass rounded-2xl p-4 shadow-xl max-w-[200px]"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <FaQrcode className="text-pink-600" />
              <span className="text-pink-700 font-semibold text-sm">Share this!</span>
            </div>
            
            <div className="bg-white rounded-lg p-2 mb-2">
              <QRCode
                id="qr-code-svg"
                value={url}
                size={150}
                level="H"
                includeMargin={true}
                bgColor="#FFFFFF"
                fgColor="#000000"
              />
            </div>
            
            <button
              onClick={handleDownloadQR}
              className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-bold rounded-lg hover:shadow-lg transition-all"
            >
              Download QR
            </button>
            
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 text-center text-pink-600 text-xs hover:underline truncate"
            >
              {url}
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default QRCodeSection
