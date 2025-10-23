
'use client';
import { useState, useEffect } from 'react';

interface DashboardOverviewProps {
  user: any;
}

export default function DashboardOverview({ user }: DashboardOverviewProps) {
  const [stats, setStats] = useState({
    quizzesCompleted: 0,
    correctAnswers: 0,
    currentRank: 0,
    points: 0
  });

  useEffect(() => {
    // Fetch user stats
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/users/stats`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, value, subtitle, icon, color }: any) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
          <span className="text-xl">{icon}</span>
        </div>
      </div>
    </div>
  );

  const QuickAction = ({ title, description, icon, onClick, color }: any) => (
    <button
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-left hover:shadow-md transition-shadow"
    >
      <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center mb-3`}>
        <span className="text-lg">{icon}</span>
      </div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-funlearn5 to-funlearn7 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Hello, {user?.userName || 'Student'}! 🌟</h1>
            <p className="mt-2 opacity-90">Keep up the great work! Your learning journey is going amazing.</p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-3xl">🎓</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Quizzes Completed"
          value={stats.quizzesCompleted}
          subtitle="This month"
          icon="🎯"
          color="bg-funlearn2"
        />
        <StatCard
          title="Correct Answers"
          value={stats.correctAnswers}
          subtitle="Total"
          icon="✅"
          color="bg-green-100"
        />
        <StatCard
          title="Current Rank"
          value={`#${stats.currentRank}`}
          subtitle="Among peers"
          icon="🏆"
          color="bg-yellow-100"
        />
        <StatCard
          title="Learning Points"
          value={stats.points}
          subtitle="Earned"
          icon="⭐"
          color="bg-funlearn3"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <QuickAction
            title="Take a Quiz"
            description="Test your knowledge with fun quizzes"
            icon="🎯"
            color="bg-funlearn2"
            onClick={() => window.location.href = '/dashboard?tab=quiz'}
          />
          <QuickAction
            title="Ask AI Tutor"
            description="Get help from our AI learning assistant"
            icon="🤖"
            color="bg-blue-100"
            onClick={() => window.location.href = '/dashboard?tab=chatbot'}
          />
          <QuickAction
            title="Join Chat Room"
            description="Collaborate with other students"
            icon="💬"
            color="bg-green-100"
            onClick={() => window.location.href = '/dashboard?tab=chatroom'}
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-3 bg-funlearn1 rounded-lg">
            <div className="w-8 h-8 bg-funlearn4 rounded-full flex items-center justify-center">
              <span className="text-funlearn8">✅</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Completed Quiz: Mathematics Basics</p>
              <p className="text-sm text-gray-600">Score: 85% • 2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-3 bg-funlearn1 rounded-lg">
            <div className="w-8 h-8 bg-funlearn4 rounded-full flex items-center justify-center">
              <span className="text-funlearn8">⭐</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Earned 50 points</p>
              <p className="text-sm text-gray-600">For active participation • 5 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}