import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LandingPage from './components/LandingPage'
import PhotoGallery from './components/PhotoGallery'
import BirthdayCake from './components/BirthdayCake'
import EnvelopeLetter from './components/EnvelopeLetter'
import FinalSurprise from './components/FinalSurprise'
import MusicPlayer from './components/MusicPlayer'
import QRCodeSection from './components/QRCodeSection'

function App() {
  const [currentSection, setCurrentSection] = useState('landing')
  const [isOpened, setIsOpened] = useState(false)
  const [candlesBlown, setCandlesBlown] = useState(false)
  const [cakeCut, setCakeCut] = useState(false)
  const [envelopeOpened, setEnvelopeOpened] = useState(false)
  const [showFinal, setShowFinal] = useState(false)

  const handleOpenSurprise = () => {
    setIsOpened(true)
    setCurrentSection('gallery')
  }

  const handleNextSection = () => {
    if (currentSection === 'gallery') setCurrentSection('cake')
    else if (currentSection === 'cake' && candlesBlown && cakeCut) setCurrentSection('envelope')
    else if (currentSection === 'envelope' && envelopeOpened) {
      setShowFinal(true)
      setCurrentSection('final')
    }
  }

  const handleBlowCandles = () => {
    setCandlesBlown(true)
  }

  const handleCutCake = () => {
    setCakeCut(true)
  }

  const handleOpenEnvelope = () => {
    setEnvelopeOpened(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      {!isOpened && (
        <LandingPage onOpen={handleOpenSurprise} />
      )}
      
      {isOpened && (
        <>
          <MusicPlayer />
          
          <AnimatePresence mode="wait">
            {currentSection === 'gallery' && (
              <PhotoGallery key="gallery" onNext={handleNextSection} />
            )}
            
            {currentSection === 'cake' && (
              <BirthdayCake 
                key="cake"
                onBlowCandles={handleBlowCandles}
                onCutCake={handleCutCake}
                candlesBlown={candlesBlown}
                cakeCut={cakeCut}
                onNext={handleNextSection}
              />
            )}
            
            {currentSection === 'envelope' && (
              <EnvelopeLetter 
                key="envelope"
                onOpen={handleOpenEnvelope}
                isOpened={envelopeOpened}
                onNext={handleNextSection}
              />
            )}
            
            {currentSection === 'final' && (
              <FinalSurprise key="final" />
            )}
          </AnimatePresence>

          <QRCodeSection />
        </>
      )}
    </div>
  )
}

export default App
