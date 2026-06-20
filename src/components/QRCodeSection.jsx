import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import QRCode from 'qrcode.react'
import { FaQrcode, FaDownload, FaShare } from 'react-icons/fa'

const QRCodeSection = () => {
  const [url, setUrl] = useState('')
  const [showQR, setShowQR] = useState(false)
  const qrRef = useRef(null)

  useEffect(() => {
    // Get current URL
    setUrl(window.location.href)
    
    // Show QR after a delay (only if not localhost)
    setTimeout(() => {
      if (!window.location.href.includes('localhost')) {
        setShowQR(true)
      }
    }, 5000)
  }, [])

  const handleDownloadQR = async () => {
    try {
      const canvas = document.createElement('canvas')
      const qrElement = qrRef.current
      
      if (qrElement) {
        // Get the SVG data
        const svgData = new XMLSerializer().serializeToString(qrElement.querySelector('svg'))
        
        // Create an image from the SVG
        const img = new Image()
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
        const url = URL.createObjectURL(svgBlob)
        
        img.onload = () => {
          // Set canvas size (higher resolution for better quality)
          canvas.width = 512
          canvas.height = 512
          
          const ctx = canvas.getContext('2d')
          ctx.fillStyle = '#FFFFFF'
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          
          // Convert to PNG and download
          const pngUrl = canvas.toDataURL('image/png')
          const downloadLink = document.createElement('a')
          downloadLink.download = 'moxa-birthday-qr.png'
          downloadLink.href = pngUrl
          document.body.appendChild(downloadLink)
          downloadLink.click()
          document.body.removeChild(downloadLink)
          URL.revokeObjectURL(url)
        }
        
        img.src = url
      }
    } catch (error) {
      console.error('Error downloading QR code:', error)
      alert('Failed to download QR code. Please try again.')
    }
  }

  const handleShareQR = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Happy Birthday Moxa! 🎂',
          text: 'Check out this special birthday surprise!',
          url: url
        })
      } else {
        // Fallback: copy URL to clipboard
        await navigator.clipboard.writeText(url)
        alert('URL copied to clipboard!')
      }
    } catch (error) {
      console.error('Error sharing:', error)
    }
  }

  // Don't show QR code on localhost
  if (window.location.href.includes('localhost')) {
    return null
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
            className="glass rounded-2xl p-4 shadow-xl max-w-[220px]"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <FaQrcode className="text-pink-600" />
              <span className="text-pink-700 font-semibold text-sm">Share this!</span>
            </div>
            
            <div className="bg-white rounded-lg p-2 mb-2" ref={qrRef}>
              <QRCode
                value={url}
                size={180}
                level="H"
                includeMargin={true}
                bgColor="#FFFFFF"
                fgColor="#000000"
              />
            </div>
            
            <button
              onClick={handleDownloadQR}
              className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-bold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <FaDownload size={14} />
              Download QR
            </button>
            
            <button
              onClick={handleShareQR}
              className="w-full py-2 mt-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm font-bold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <FaShare size={14} />
              Share URL
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
