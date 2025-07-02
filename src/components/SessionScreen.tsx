import React, { useState, useEffect } from 'react';
import { Pause, Play, Square, Volume2 } from 'lucide-react';
import { Chakra } from '../types/chakra';
import { useTimer } from '../hooks/useTimer';

interface SessionScreenProps {
  chakra: Chakra;
  onComplete: (duration: number) => void;
  onExit: () => void;
}

export const SessionScreen: React.FC<SessionScreenProps> = ({ 
  chakra, 
  onComplete, 
  onExit 
}) => {
  const { timeLeft, isRunning, isCompleted, start, pause, stop, formatTime } = useTimer(600);
  const [volume, setVolume] = useState(70);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    if (isCompleted) {
      setShowCompleted(true);
      onComplete(600 - timeLeft);
    }
  }, [isCompleted, timeLeft, onComplete]);

  const progress = ((600 - timeLeft) / 600) * 100;

  if (showCompleted) {
    return (
      <div 
        className={`min-h-screen bg-gradient-to-br ${chakra.gradient} 
          flex flex-col items-center justify-center px-6 text-white`}
      >
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full 
            flex items-center justify-center mb-6">
            <span className="text-3xl">✨</span>
          </div>
          <h2 className="text-2xl font-bold">セッション完了！</h2>
          <p className="text-lg opacity-90">
            {chakra.nameJa}の調整が完了しました
          </p>
          <button
            onClick={onExit}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 px-8 py-3 
              rounded-full font-semibold transition-all duration-200 
              backdrop-blur-sm border border-white border-opacity-30"
          >
            記録を保存
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen bg-gradient-to-br ${chakra.gradient} 
        flex flex-col items-center justify-center px-6 text-white relative overflow-hidden`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Chakra Visual */}
        <div className="relative">
          <div
            className="w-48 h-48 rounded-full bg-white bg-opacity-20 backdrop-blur-sm 
              flex items-center justify-center border-4 border-white border-opacity-30"
            style={{
              animation: isRunning ? 'pulse 2s infinite' : 'none',
              transform: isRunning ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.5s ease'
            }}
          >
            <div className="text-center">
              <div className="text-xl font-bold">{chakra.nameJa}</div>
              <div className="text-sm opacity-90">{chakra.frequency}</div>
            </div>
          </div>
          
          {/* Progress ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="90"
              stroke="white"
              strokeOpacity="0.2"
              strokeWidth="4"
              fill="none"
            />
            <circle
              cx="100"
              cy="100"
              r="90"
              stroke="white"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 90}`}
              strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
        </div>

        {/* Timer */}
        <div className="text-center">
          <div className="text-6xl font-light mb-2">{formatTime(timeLeft)}</div>
          <div className="text-lg opacity-90">
            {isRunning ? '音叉再生中...' : '一時停止中'}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-6">
          <button
            onClick={isRunning ? pause : start}
            className="w-16 h-16 bg-white bg-opacity-20 hover:bg-opacity-30 
              rounded-full flex items-center justify-center transition-all duration-200 
              backdrop-blur-sm border border-white border-opacity-30"
          >
            {isRunning ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button
            onClick={() => {
              stop();
              onExit();
            }}
            className="w-16 h-16 bg-white bg-opacity-20 hover:bg-opacity-30 
              rounded-full flex items-center justify-center transition-all duration-200 
              backdrop-blur-sm border border-white border-opacity-30"
          >
            <Square size={24} />
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-4 w-64">
          <Volume2 size={20} />
          <div className="flex-1 relative">
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full h-2 bg-white bg-opacity-20 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, white 0%, white ${volume}%, 
                  rgba(255,255,255,0.2) ${volume}%, rgba(255,255,255,0.2) 100%)`
              }}
            />
          </div>
          <Volume2 size={20} />
        </div>

        {/* Guidance */}
        <div className="text-center max-w-sm">
          <p className="text-lg opacity-90 leading-relaxed">
            深く呼吸をして、{chakra.keywords[0]}のエネルギーを感じてください
          </p>
        </div>
      </div>
    </div>
  );
};