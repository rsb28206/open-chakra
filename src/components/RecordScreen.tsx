import React from 'react';
import { Calendar, TrendingUp, Smile, Meh, Frown } from 'lucide-react';
import { SessionRecord } from '../types/chakra';
import { chakras } from '../data/chakras';

interface RecordScreenProps {
  records: SessionRecord[];
}

export const RecordScreen: React.FC<RecordScreenProps> = ({ records }) => {
  const thisWeek = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date;
  });

  const weekDays = ['月', '火', '水', '木', '金', '土', '日'];

  const getRecordsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return records.filter(record => record.date === dateStr);
  };

  const chakraUsage = chakras.map(chakra => ({
    ...chakra,
    count: records.filter(record => record.chakraId === chakra.id).length
  }));

  const totalSessions = records.length;
  const feelingCounts = {
    great: records.filter(r => r.feeling === 'great').length,
    good: records.filter(r => r.feeling === 'good').length,
    okay: records.filter(r => r.feeling === 'okay').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4">
        <div className="flex items-center justify-center">
          <Calendar className="mr-2" size={20} />
          <h1 className="text-xl font-semibold text-gray-800">今週の記録</h1>
        </div>
      </header>

      <div className="px-6 py-6 space-y-6">
        {/* Weekly Calendar */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">週間カレンダー</h2>
          <div className="grid grid-cols-7 gap-2">
            {thisWeek.map((date, index) => {
              const dayRecords = getRecordsForDate(date);
              const hasSession = dayRecords.length > 0;
              return (
                <div key={index} className="text-center">
                  <div className="text-sm text-gray-500 mb-2">{weekDays[index]}</div>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                      ${hasSession 
                        ? 'bg-green-100 text-green-600 border-2 border-green-300' 
                        : 'bg-gray-100 text-gray-400'
                      }`}
                  >
                    {hasSession ? '○' : '-'}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {date.getDate()}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Chakra Balance */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">チャクラバランス</h2>
          <div className="space-y-3">
            {chakraUsage.map((chakra) => (
              <div key={chakra.id} className="flex items-center space-x-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: chakra.color }}
                ></div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {chakra.nameJa}
                    </span>
                    <span className="text-sm text-gray-500">{chakra.count}回</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        backgroundColor: chakra.color,
                        width: totalSessions > 0 ? `${(chakra.count / totalSessions) * 100}%` : '0%'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Weekly Feelings */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">今週の体感</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Smile className="text-green-500" size={20} />
                <span className="text-gray-700">とても良い</span>
              </div>
              <span className="font-semibold text-gray-800">{feelingCounts.great}回</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Meh className="text-yellow-500" size={20} />
                <span className="text-gray-700">普通</span>
              </div>
              <span className="font-semibold text-gray-800">{feelingCounts.good}回</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Frown className="text-red-500" size={20} />
                <span className="text-gray-700">いまいち</span>
              </div>
              <span className="font-semibold text-gray-800">{feelingCounts.okay}回</span>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">統計</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{totalSessions}</div>
              <div className="text-sm text-gray-500">総セッション数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {records.reduce((acc, record) => acc + record.duration, 0)}分
              </div>
              <div className="text-sm text-gray-500">総瞑想時間</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};