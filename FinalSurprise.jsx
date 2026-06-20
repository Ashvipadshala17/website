import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHeart, FaStar, FaMagic } from 'react-icons/fa'
import confetti from 'canvas-confetti'

const FinalSurprise = () => {
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    // Trigger fireworks on mount
    const duration = 3000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ec4899', '#8b5cf6', '#fbbf24', '#f472b6', '#10b981'],
      })
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ec4899', '#8b5cf6', '#fbbf24', '#f472b6', '#10b981'],
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()

    // Show message after fireworks
    setTimeout(() => setShowMessage(true), 1000)

    // Periodic fireworks
    const interval = setInterval(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ec4899', '#8b5cf6', '#fbbf24', '#f472b6'],
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const hearts = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 4 + Math.random() * 4,
    size: 15 + Math.random() * 25,
  }))

  const stars = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 3,
    size: 12 + Math.random() * 18,
  }))

  const sparkles = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 2,
    size: 6 + Math.random() * 10,
  }))

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-pink-200 via-purple-200 to-pink-300">
      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-500 opacity-60"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
          }}
          animate={{
            y: [0, -window.innerHeight],
            rotate: [0, 360],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <FaHeart />
        </motion.div>
      ))}

      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute text-yellow-400 opacity-70"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            fontSize: `${star.size}px`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
          }}
        >
          <FaStar />
        </motion.div>
      ))}

      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute text-white opacity-80"
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            fontSize: `${sparkle.size}px`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: sparkle.delay,
            repeat: Infinity,
          }}
        >
          <FaMagic />
        </motion.div>
      ))}

      {/* Main Content */}
      <motion.div
        className="text-center z-10 px-4 max-w-4xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 mb-8 text-shadow-lg"
                style={{ fontFamily: 'Georgia, serif' }}
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                Thank You For Being The Best Friend In My Life ❤️
              </motion.h1>

              <motion.div
                className="flex justify-center gap-4 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.1,
                      repeat: Infinity,
                    }}
                  >
                    <FaHeart className="text-pink-500 text-3xl md:text-4xl" />
                  </motion.div>
                ))}
              </motion.div>

              <motion.p
                className="text-xl md:text-2xl text-pink-700 font-medium mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                You make every day brighter ✨
              </motion.p>

              <motion.p
                className="text-lg md:text-xl text-purple-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Here's to many more memories together! 🎉
              </motion.p>

              <motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                <p className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                  Happy Birthday Moxa! 🎂
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default FinalSurprise
