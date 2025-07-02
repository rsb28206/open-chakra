import React, { useState } from 'react';
import { ArrowLeft, Play } from 'lucide-react';
import { Chakra, DetailTab } from '../types/chakra';

interface ChakraDetailProps {
  chakra: Chakra;
  onBack: () => void;
  onStartSession: () => void;
}

export const ChakraDetail: React.FC<ChakraDetailProps> = ({ 
  chakra, 
  onBack, 
  onStartSession 
}) => {
  const [activeTab, setActiveTab] = useState<DetailTab>('sound');

  const tabs = [
    { id: 'sound' as DetailTab, label: '音叉' },
    { id: 'yoga' as DetailTab, label: 'ヨガ' },
    { id: 'food' as DetailTab, label: '食事' },
    { id: 'daily' as DetailTab, label: '日常' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'sound':
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-700 mb-2">周波数</h4>
              <p className="text-2xl font-bold" style={{ color: chakra.color }}>
                {chakra.frequency}
              </p>
              <p className="text-gray-600 mt-2">
                この周波数でチャクラを活性化します
              </p>
            </div>
          </div>
        );
      case 'yoga':
        return (
          <div className="space-y-3">
            {chakra.yoga.map((pose, index) => (
              <div key={index} className="bg-white rounded-lg p-4">
                <p className="font-medium text-gray-700">{pose}</p>
              </div>
            ))}
          </div>
        );
      case 'food':
        return (
          <div className="space-y-3">
            {chakra.food.map((food, index) => (
              <div key={index} className="bg-white rounded-lg p-4">
                <p className="font-medium text-gray-700">{food}</p>
              </div>
            ))}
          </div>
        );
      case 'daily':
        return (
          <div className="space-y-3">
            {chakra.daily.map((practice, index) => (
              <div key={index} className="bg-white rounded-lg p-4">
                <p className="font-medium text-gray-700">{practice}</p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center">
        <button
          onClick={onBack}
          className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">{chakra.nameJa}</h1>
      </header>

      <div className="px-6 py-6 space-y-6">
        {/* Main Visual */}
        <div className="flex flex-col items-center">
          <div
            className={`w-32 h-32 rounded-full bg-gradient-to-br ${chakra.gradient} 
              shadow-lg flex items-center justify-center animate-pulse`}
            style={{ 
              boxShadow: `0 0 40px ${chakra.color}40`,
              animation: 'pulse 2s infinite'
            }}
          >
            <div className="text-white text-center">
              <div className="text-lg font-bold">{chakra.frequency}</div>
              <div className="text-sm opacity-90">{chakra.position}</div>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">キーワード</h3>
            <div className="flex flex-wrap gap-2">
              {chakra.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: chakra.color }}
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">説明</h3>
            <p className="text-gray-600 leading-relaxed">{chakra.description}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-4 text-center font-medium transition-colors
                  ${activeTab === tab.id
                    ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-gray-800'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>

        {/* Session Start Button */}
        <button
          onClick={onStartSession}
          className={`w-full bg-gradient-to-r ${chakra.gradient} text-white py-4 
            rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl 
            transform hover:scale-105 transition-all duration-200 flex items-center 
            justify-center space-x-2 active:scale-95`}
        >
          <Play size={20} />
          <span>セッション開始（10分）</span>
        </button>
      </div>
    </div>
  );
};