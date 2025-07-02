import React from 'react';
import { Chakra } from '../types/chakra';

interface ChakraCardProps {
  chakra: Chakra;
  onClick: () => void;
  size?: 'small' | 'large';
}

export const ChakraCard: React.FC<ChakraCardProps> = ({ 
  chakra, 
  onClick, 
  size = 'small' 
}) => {
  const sizeClasses = size === 'large' 
    ? 'w-32 h-32 text-lg' 
    : 'w-20 h-20 text-sm';

  return (
    <button
      onClick={onClick}
      className={`${sizeClasses} rounded-full bg-gradient-to-br ${chakra.gradient} 
        text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 
        transition-all duration-200 flex flex-col items-center justify-center
        active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50`}
      style={{ 
        boxShadow: `0 4px 20px ${chakra.color}30`,
        animation: 'pulse 2s infinite'
      }}
    >
      <div className="text-center">
        <div className="font-bold">{chakra.nameJa}</div>
        <div className="text-xs opacity-90 mt-1">{chakra.frequency}</div>
      </div>
    </button>
  );
};