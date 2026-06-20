import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaFire, FaBirthdayCake, FaCut, FaGift } from 'react-icons/fa'
import confetti from 'canvas-confetti'

const BirthdayCake = ({ onBlowCandles, onCutCake, candlesBlown, cakeCut, onNext }) => {
  const [showMessage, setShowMessage] = useState(false)

  const handleBlowCandles = () => {
    onBlowCandles()
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#8b5cf6', '#fbbf24', '#f472b6'],
    })
    
    // Play celebration sound (optional)
    try {
      const audio = new Audio('/celebration.mp3')
      audio.play().catch(() => {
        // Celebration sound not available, continue without it
      })
    } catch (error) {
      // Celebration sound not available, continue without it
    }
    
    setTimeout(() => setShowMessage(true), 500)
  }

  const handleCutCake = () => {
    onCutCake()
    // More confetti
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#ec4899', '#8b5cf6', '#fbbf24', '#10b981', '#3b82f6'],
    })
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
          Make a Wish! 🎂
        </h2>
        <p className="text-pink-700 text-lg">Blow the candles & cut the cake</p>
      </motion.div>

      {/* Cake Container */}
      <motion.div
        className="relative w-full max-w-lg mx-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* 3D Cake */}
        <div className="relative w-full aspect-square max-h-[400px] mx-auto">
          {/* Cake Base */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-gradient-to-b from-pink-400 to-pink-600 rounded-b-3xl shadow-2xl"
            style={{
              transform: cakeCut ? 'translateX(-60%)' : 'translateX(-50%)',
              transition: 'transform 1s ease-in-out',
            }}
          >
            {/* Cake decorations */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400 rounded-t-lg" />
            <div className="absolute top-6 left-4 w-3 h-3 bg-yellow-400 rounded-full" />
            <div className="absolute top-10 right-6 w-3 h-3 bg-yellow-400 rounded-full" />
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full" />
          </motion.div>

          {/* Second Cake Slice (appears when cut) */}
          <motion.div
            className="absolute bottom-0 left-1/2 w-48 h-32 bg-gradient-to-b from-pink-400 to-pink-600 rounded-b-3xl shadow-2xl"
            style={{
              transform: cakeCut ? 'translateX(20%)' : 'translateX(-50%)',
              opacity: cakeCut ? 1 : 0,
              transition: 'transform 1s ease-in-out, opacity 0.5s',
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400 rounded-t-lg" />
          </motion.div>

          {/* Cake Top Layer */}
          <motion.div
            className="absolute bottom-28 left-1/2 -translate-x-1/2 w-40 h-24 bg-gradient-to-b from-purple-400 to-purple-600 rounded-b-2xl shadow-xl"
            style={{
              transform: cakeCut ? 'translateX(-60%)' : 'translateX(-50%)',
              transition: 'transform 1s ease-in-out',
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-pink-300 via-purple-200 to-pink-300 rounded-t-lg" />
          </motion.div>

          {/* Second Top Layer */}
          <motion.div
            className="absolute bottom-28 left-1/2 w-40 h-24 bg-gradient-to-b from-purple-400 to-purple-600 rounded-b-2xl shadow-xl"
            style={{
              transform: cakeCut ? 'translateX(20%)' : 'translateX(-50%)',
              opacity: cakeCut ? 1 : 0,
              transition: 'transform 1s ease-in-out, opacity 0.5s',
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-pink-300 via-purple-200 to-pink-300 rounded-t-lg" />
          </motion.div>

          {/* Candles */}
          <div className="absolute bottom-52 left-1/2 -translate-x-1/2 flex gap-4">
            {[1, 2, 3].map((candle) => (
              <motion.div
                key={candle}
                className="relative"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: candle * 0.2 }}
              >
                {/* Candle */}
                <div className="w-3 h-16 bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-t-full" />
                
                {/* Flame */}
                <AnimatePresence>
                  {!candlesBlown && (
                    <motion.div
                      className="absolute -top-6 left-1/2 -translate-x-1/2"
                      initial={{ scale: 0 }}
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [-5, 5, -5],
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ 
                        duration: 0.5,
                        repeat: Infinity,
                      }}
                    >
                      <FaFire className="text-orange-500 text-2xl drop-shadow-lg" />
                      <div className="absolute inset-0 bg-yellow-300 blur-sm rounded-full" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-pink-200/50 to-transparent rounded-full blur-3xl -z-10"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </motion.div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        {!candlesBlown && (
          <motion.button
            onClick={handleBlowCandles}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg font-bold rounded-full shadow-lg hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <FaFire size={24} />
            Blow Candles
          </motion.button>
        )}

        {candlesBlown && !cakeCut && (
          <motion.button
            onClick={handleCutCake}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-lg font-bold rounded-full shadow-lg hover:shadow-pink-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring' }}
          >
            <FaCut size={24} />
            Cut Cake
          </motion.button>
        )}
      </div>

      {/* Special Message */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <p className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-2">
              🎉 Happy Birthday Moxa! 🎉
            </p>
            <p className="text-pink-700 text-lg">May all your wishes come true! ✨</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next Button */}
      {candlesBlown && cakeCut && (
        <motion.button
          onClick={onNext}
          className="mt-8 px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-lg font-bold rounded-full shadow-lg hover:shadow-pink-500/50 hover:scale-105 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Next Surprise 💌
        </motion.button>
      )}
    </div>
  )
}

export default BirthdayCake
