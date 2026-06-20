import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaEnvelopeOpen, FaEnvelope, FaHeart } from 'react-icons/fa'

const EnvelopeLetter = ({ onOpen, isOpened, onNext }) => {
  const [letterContent, setLetterContent] = useState('')

  useEffect(() => {
    // Load letter from public folder
    fetch('/letter.txt')
      .then(res => {
        if (!res.ok) throw new Error('Letter not found')
        return res.text()
      })
      .then(text => setLetterContent(text))
      .catch(() => {
        // Default letter if file not found
        setLetterContent(`Dear Moxa ❤️,

Happy Birthday to the most amazing person and the most precious friend in my life. 🎂✨

Today is all about celebrating you — your beautiful heart, your wonderful smile, and all the happiness you bring into the lives of everyone around you. I feel incredibly lucky and grateful to have a friend like you.

From all our silly conversations, endless laughter, random moments, and unforgettable memories, every moment spent with you has become a special chapter of my life. No matter how small those moments were, they will always have a special place in my heart.

You are not just my best friend; you are someone who understands me without needing many words, someone who supports me when things are difficult, and someone who makes ordinary days feel extraordinary.

Thank you for always being there for me, for listening to my problems, for sharing my happiness, and for creating countless memories that I will cherish forever. Your kindness, care, and positivity make you truly one of a kind.

I hope this new year of your life brings you endless smiles, success in everything you dream of, good health, peace, and all the love you deserve. May every single day be as beautiful and special as you are.

Even if life takes us to different places and we get busy with our own journeys, I hope our friendship remains strong forever. The memories we have created together are priceless, and I cannot wait to create thousands more.

So today, make a wish, blow out your candles, enjoy your cake, and remember that there is someone who is always cheering for your happiness and wishing the very best for you. 🌸✨

Thank you for being my partner in crime, my biggest supporter, my source of endless laughter, and one of the most important people in my life.

Once again, Happy Birthday, Moxa! ❤️🎉

May your life always be filled with love, laughter, adventures, and beautiful moments. Never stop smiling because your smile has the power to brighten so many lives.

With endless love, gratitude, and the warmest wishes,

Your Best Friend ❤️`)
      })
  }, [])

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
          A Special Letter 💌
        </h2>
        <p className="text-pink-700 text-lg">Click the envelope to open</p>
      </motion.div>

      {/* Envelope Container */}
      <div className="relative w-full max-w-2xl mx-auto">
        {/* Envelope */}
        <motion.div
          className="relative cursor-pointer"
          onClick={!isOpened ? onOpen : undefined}
          whileHover={!isOpened ? { scale: 1.02 } : {}}
          whileTap={!isOpened ? { scale: 0.98 } : {}}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Envelope Body */}
          <div className="relative w-full aspect-[3/2] max-h-[300px] bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg shadow-2xl overflow-hidden">
            {/* Paper texture effect */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.03) 10px, rgba(0,0,0,0.03) 20px)',
            }} />

            {/* Envelope Flap */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-br from-pink-300 to-pink-400 origin-top"
              animate={{
                rotateX: isOpened ? 180 : 0,
              }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              style={{
                clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
              }}
            />

            {/* Heart seal */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              animate={{
                scale: isOpened ? 0 : 1,
                opacity: isOpened ? 0 : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                <FaHeart className="text-white text-3xl" />
              </div>
            </motion.div>

            {/* Letter */}
            <AnimatePresence>
              {isOpened && (
                <motion.div
                  className="absolute inset-4 bg-white rounded shadow-lg p-6 overflow-y-auto"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  style={{
                    backgroundImage: 'linear-gradient(to right, #f8f8f8 1px, transparent 1px), linear-gradient(to bottom, #f8f8f8 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                >
                  <pre className="whitespace-pre-wrap font-handwriting text-gray-800 text-sm md:text-base leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                    {letterContent}
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Envelope Icon (when closed) */}
            {!isOpened && (
              <div className="absolute inset-0 flex items-center justify-center">
                <FaEnvelope className="text-pink-400 text-6xl opacity-50" />
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Next Button */}
      {isOpened && (
        <motion.button
          onClick={onNext}
          className="mt-8 px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-lg font-bold rounded-full shadow-lg hover:shadow-pink-500/50 hover:scale-105 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Final Surprise 🎁
        </motion.button>
      )}

      {/* Instructions */}
      {!isOpened && (
        <motion.p
          className="mt-6 text-pink-600 text-sm text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          💡 Tip: Edit the letter by modifying /public/letter.txt
        </motion.p>
      )}
    </div>
  )
}

export default EnvelopeLetter
