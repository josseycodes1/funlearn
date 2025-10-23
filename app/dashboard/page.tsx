
'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import DashboardSidebar from '@/components/Dashboard/DashboardSidebar';
import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import ChatBot from '@/components/Dashboard/ChatBot';
import QuizPage from '@/components/Dashboard/QuizPage';
import ChatRoom from '@/components/Dashboard/ChatRoom';
import Profile from '@/components/Dashboard/Profile';
import Settings from '@/components/Dashboard/Settings';
import Leaderboard from '@/components/Dashboard/Leaderboard';
import DashboardOverview from '@/components/Dashboard/DashboardOverview';

function DashboardContent() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        console.log('Auth check - Token:', token ? 'exists' : 'missing');
        console.log('Auth check - User data:', userData ? 'exists' : 'missing');

        if (!token) {
          console.log('No token found, redirecting to login');
          router.push('/login');
          return;
        }

        if (userData) {
          // Use the stored user data from login
          setUser(JSON.parse(userData));
          setIsLoading(false);
        } else {
          // If no user data but token exists, create basic user
          console.log('No user data found, creating basic user');
          const basicUser = {
            userName: 'Student',
            email: 'student@example.com'
          };
          setUser(basicUser);
          setIsLoading(false);
        }

      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview user={user} />;
      case 'chatbot':
        return <ChatBot />;
      case 'quiz':
        return <QuizPage />;
      case 'chatroom':
        return <ChatRoom />;
      case 'profile':
        return <Profile user={user} />;
      case 'settings':
        return <Settings user={user} />;
      case 'leaderboard':
        return <Leaderboard />;
      default:
        return <DashboardOverview user={user} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-funlearn1">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-funlearn6 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-funlearn1">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Authentication Required</h3>
          <p className="text-gray-600 mb-4">Please log in to access the dashboard.</p>
          <button
            onClick={() => router.push('/login')}
            className="bg-funlearn6 text-white px-6 py-2 rounded-lg font-semibold hover:bg-funlearn7 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        user={user}
        onLogout={handleLogout}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader 
          user={user}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-funlearn1">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-funlearn6"></div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}