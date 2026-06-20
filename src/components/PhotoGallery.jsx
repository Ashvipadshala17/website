import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHeart, FaArrowLeft, FaArrowRight, FaChevronDown } from 'react-icons/fa'

const PhotoGallery = ({ onNext }) => {
  const [images, setImages] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    // Load images from public/images folder
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp']
    const loadedImages = []
    
    // Try to load common image names
    const commonNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    
    commonNames.forEach((name, index) => {
      imageExtensions.forEach(ext => {
        const img = new Image()
        img.src = `/images/${name}.${ext}`
        img.onload = () => {
          if (!loadedImages.find(i => i.id === index)) {
            setImages(prev => [...prev, { id: index, src: `/images/${name}.${ext}` }])
          }
        }
      })
    })

    // If no images found, add placeholder
    setTimeout(() => {
      if (loadedImages.length === 0) {
        setImages([
          { id: 1, src: '/images/placeholder1.jpg' },
          { id: 2, src: '/images/placeholder2.jpg' },
          { id: 3, src: '/images/placeholder3.jpg' },
        ])
      }
    }, 1000)
  }, [])

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleImageClick = (image) => {
    setSelectedImage(image)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative">
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-2">
          Our Beautiful Memories
        </h2>
        <p className="text-pink-700 text-lg">Click on photos to zoom ❤️</p>
      </motion.div>

      {/* Gallery */}
      {images.length > 0 ? (
        <motion.div
          className="relative w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Main Image with Heart Frame */}
          <div className="relative aspect-square md:aspect-video max-h-[60vh] flex items-center justify-center">
            <motion.div
              className="relative w-full h-full flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={currentIndex}
              transition={{ duration: 0.3 }}
            >
              {/* Heart-shaped frame */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full max-w-[500px] max-h-[500px]">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full drop-shadow-2xl"
                  >
                    <path
                      d="M50 88.9C50 88.9 10 55 10 30C10 15 20 5 35 5C42.5 5 50 10 50 15C50 10 57.5 5 65 5C80 5 90 15 90 30C90 55 50 88.9 50 88.9Z"
                      fill="#ec4899"
                      opacity="0.3"
                    />
                  </svg>
                  <img
                    src={images[currentIndex]?.src}
                    alt={`Memory ${currentIndex + 1}`}
                    className="absolute inset-0 w-full h-full object-cover rounded-full"
                    style={{
                      clipPath: 'path("M50 88.9C50 88.9 10 55 10 30C10 15 20 5 35 5C42.5 5 50 10 50 15C50 10 57.5 5 65 5C80 5 90 15 90 30C90 55 50 88.9 50 88.9Z")',
                    }}
                    onClick={() => handleImageClick(images[currentIndex])}
                  />
                </div>
              </div>
            </motion.div>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-pink-600 shadow-lg hover:bg-pink-100 transition-colors z-10"
            >
              <FaArrowLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-pink-600 shadow-lg hover:bg-pink-100 transition-colors z-10"
            >
              <FaArrowRight size={24} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {images.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-pink-600' : 'bg-pink-300'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>

          {/* Image Counter */}
          <p className="text-center text-pink-700 mt-4 font-medium">
            {currentIndex + 1} / {images.length}
          </p>
        </motion.div>
      ) : (
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-pink-700 text-xl mb-4">Add your photos to the /public/images folder!</p>
          <p className="text-pink-600">Name them: 1.jpg, 2.jpg, 3.jpg, etc.</p>
        </motion.div>
      )}

      {/* Next Button */}
      <motion.button
        onClick={onNext}
        className="mt-8 px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-lg font-bold rounded-full shadow-lg hover:shadow-pink-500/50 hover:scale-105 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Next Surprise 🎂
      </motion.button>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage.src}
              alt="Zoomed memory"
              className="max-w-full max-h-full object-contain rounded-lg"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              transition={{ type: 'spring' }}
            />
            <button
              className="absolute top-4 right-4 text-white text-4xl hover:text-pink-400 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PhotoGallery
