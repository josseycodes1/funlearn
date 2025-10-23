
'use client';
import { useState, useEffect } from 'react';

interface LeaderboardEntry {
  rank: number;
  userName: string;
  points: number;
  quizzesCompleted: number;
  avatar?: string;
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [timeRange, setTimeRange] = useState<'weekly' | 'monthly' | 'allTime'>('weekly');

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockLeaderboard: LeaderboardEntry[] = [
      { rank: 1, userName: 'Alice Johnson', points: 2450, quizzesCompleted: 32 },
      { rank: 2, userName: 'Bob Smith', points: 2180, quizzesCompleted: 28 },
      { rank: 3, userName: 'Carol Davis', points: 1950, quizzesCompleted: 25 },
      { rank: 4, userName: 'David Wilson', points: 1820, quizzesCompleted: 23 },
      { rank: 5, userName: 'Eva Brown', points: 1750, quizzesCompleted: 22 },
      { rank: 6, userName: 'Frank Miller', points: 1620, quizzesCompleted: 20 },
      { rank: 7, userName: 'Grace Lee', points: 1580, quizzesCompleted: 19 },
    ];
    setLeaderboard(mockLeaderboard);
  }, [timeRange]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Leaderboard 🏆</h2>
              <p className="text-gray-600 mt-1">See how you rank among other students</p>
            </div>
            <div className="flex space-x-2">
              {(['weekly', 'monthly', 'allTime'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg font-medium capitalize ${
                    timeRange === range
                      ? 'bg-funlearn6 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {range === 'allTime' ? 'All Time' : range}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Leaderboard List */}
        <div className="p-6">
          <div className="space-y-3">
            {leaderboard.map((entry) => (
              <div
                key={entry.rank}
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                  entry.rank <= 3
                    ? 'bg-funlearn1 to-funlearn2 border-funlearn4'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    entry.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                    entry.rank === 2 ? 'bg-gray-100 text-gray-800' :
                    entry.rank === 3 ? 'bg-orange-100 text-orange-800' :
                    'bg-funlearn2 text-funlearn8'
                  }`}>
                    {entry.rank}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{entry.userName}</h3>
                    <p className="text-sm text-gray-600">{entry.quizzesCompleted} quizzes completed</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-funlearn7">{entry.points.toLocaleString()} pts</p>
                  {entry.rank <= 3 && (
                    <p className="text-sm text-gray-600 capitalize">
                      {entry.rank === 1 ? '🥇 Gold' : entry.rank === 2 ? '🥈 Silver' : '🥉 Bronze'}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Your Rank Card */}
      <div className="mt-6 bg-funlearn5 to-funlearn7 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Your Current Rank</h3>
            <p className="text-funlearn2 mt-1">Keep learning to climb the leaderboard!</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">#8</p>
            <p className="text-funlearn2">1,420 points</p>
          </div>
        </div>
        <div className="mt-4 w-full bg-white bg-opacity-20 rounded-full h-2">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-500"
            style={{ width: '65%' }}
          ></div>
        </div>
        <p className="text-funlearn2 text-sm mt-2">650 points to reach #7</p>
      </div>
    </div>
  );
}