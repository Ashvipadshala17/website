import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaPlay, FaPause, FaVolumeUp, FaVolumeDown, FaMusic } from 'react-icons/fa'

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [volume, setVolume] = useState(0.7)
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      audioRef.current.play().catch(console.error)
    }
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(console.error)
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="/happy-birthday.mp3" type="audio/mpeg" />
        <source src="/happy-birthday.ogg" type="audio/ogg" />
      </audio>

      <motion.div
        className="fixed bottom-4 right-4 z-50 glass rounded-full p-3 shadow-lg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
      >
        <div className="flex items-center gap-3">
          <motion.button
            onClick={togglePlay}
            className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
          </motion.button>

          <div className="flex items-center gap-2">
            <FaMusic className="text-pink-600" size={16} />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer accent-pink-600"
            />
            {volume > 0.5 ? (
              <FaVolumeUp className="text-pink-600" size={16} />
            ) : (
              <FaVolumeDown className="text-pink-600" size={16} />
            )}
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default MusicPlayer
