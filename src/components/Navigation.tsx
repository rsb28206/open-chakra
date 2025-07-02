import React from 'react';
import { Home, Calendar, Settings } from 'lucide-react';
import { Screen } from '../types/chakra';

interface NavigationProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  currentScreen, 
  onScreenChange 
}) => {
  const navItems = [
    { screen: 'home' as Screen, icon: Home, label: 'ホーム' },
    { screen: 'record' as Screen, icon: Calendar, label: '記録' },
    { screen: 'home' as Screen, icon: Settings, label: '設定' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 
      px-4 py-2 flex justify-around items-center safe-area-inset-bottom">
      {navItems.map(({ screen, icon: Icon, label }) => (
        <button
          key={screen}
          onClick={() => onScreenChange(screen)}
          className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors
            ${currentScreen === screen 
              ? 'text-purple-600 bg-purple-50' 
              : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          <Icon size={20} />
          <span className="text-xs mt-1">{label}</span>
        </button>
      ))}
    </nav>
  );
};