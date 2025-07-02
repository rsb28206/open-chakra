import React, { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { ChakraDetail } from './components/ChakraDetail';
import { SessionScreen } from './components/SessionScreen';
import { RecordScreen } from './components/RecordScreen';
import { Navigation } from './components/Navigation';
import { Screen, Chakra, SessionRecord } from './types/chakra';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedChakra, setSelectedChakra] = useState<Chakra | null>(null);
  const [records, setRecords] = useLocalStorage<SessionRecord[]>('chakra-records', []);

  const handleChakraSelect = (chakra: Chakra) => {
    setSelectedChakra(chakra);
    setCurrentScreen('detail');
  };

  const handleStartSession = () => {
    setCurrentScreen('session');
  };

  const handleSessionComplete = (duration: number) => {
    if (selectedChakra) {
      const newRecord: SessionRecord = {
        id: Date.now().toString(),
        chakraId: selectedChakra.id,
        date: new Date().toISOString().split('T')[0],
        duration,
        feeling: 'good' // Default feeling, could be made interactive
      };
      setRecords(prev => [...prev, newRecord]);
    }
    setCurrentScreen('home');
  };

  const handleBack = () => {
    setCurrentScreen('home');
  };

  const handleScreenChange = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onChakraSelect={handleChakraSelect} />;
      case 'detail':
        return selectedChakra ? (
          <ChakraDetail
            chakra={selectedChakra}
            onBack={handleBack}
            onStartSession={handleStartSession}
          />
        ) : null;
      case 'session':
        return selectedChakra ? (
          <SessionScreen
            chakra={selectedChakra}
            onComplete={handleSessionComplete}
            onExit={handleBack}
          />
        ) : null;
      case 'record':
        return <RecordScreen records={records} />;
      default:
        return <HomeScreen onChakraSelect={handleChakraSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderScreen()}
      {currentScreen !== 'session' && (
        <Navigation
          currentScreen={currentScreen}
          onScreenChange={handleScreenChange}
        />
      )}
      
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }
        
        .safe-area-inset-bottom {
          padding-bottom: env(safe-area-inset-bottom);
        }
        
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: 2px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: 2px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}

export default App;