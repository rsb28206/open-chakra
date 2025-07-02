import React from 'react';
import { ChakraCard } from './ChakraCard';
import { chakras } from '../data/chakras';
import { Chakra } from '../types/chakra';

interface HomeScreenProps {
  onChakraSelect: (chakra: Chakra) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onChakraSelect }) => {
  const todayChakra = chakras[3]; // Heart chakra as today's recommendation

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-800">🕉 チャクラ開放</h1>
        </div>
      </header>

      <div className="px-6 py-6 space-y-8">
        {/* Today's Recommendation */}
        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">今日のおすすめ</h2>
          <div 
            className={`bg-gradient-to-br ${todayChakra.gradient} rounded-2xl p-6 
              text-white shadow-lg relative overflow-hidden`}
          >
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">{todayChakra.nameJa}</h3>
              <p className="text-lg opacity-90 mb-4">愛と調和のチャクラ</p>
              <button
                onClick={() => onChakraSelect(todayChakra)}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 px-6 py-3 
                  rounded-full font-semibold transition-all duration-200 
                  backdrop-blur-sm border border-white border-opacity-30"
              >
                セッション開始
              </button>
            </div>
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white bg-opacity-10 
              rounded-full animate-pulse"></div>
          </div>
        </section>

        {/* Chakra Selection */}
        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">チャクラ選択</h2>
          <div className="grid grid-cols-3 gap-4 justify-items-center">
            {chakras.map((chakra) => (
              <ChakraCard
                key={chakra.id}
                chakra={chakra}
                onClick={() => onChakraSelect(chakra)}
              />
            ))}
          </div>
        </section>

        {/* Daily Tips */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">今日のヒント</h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-gray-600">
                深呼吸を意識して、心と体のバランスを整えましょう
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p className="text-gray-600">
                今日は感謝の気持ちを表現してみてください
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};