// app/dashboard/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DashboardSidebar from '@/components/Dashboard/DashboardSidebar';
import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import ChatBot from '@/components/Dashboard/ChatBot';
import QuizPage from '@/components/Dashboard/QuizPage';
import ChatRoom from '@/components/Dashboard/ChatRoom';
import Profile from '@/components/Dashboard/Profile';
import Settings from '@/components/Dashboard/Settings';
import Leaderboard from '@/components/Dashboard/Leaderboard';
import DashboardOverview from '@/components/Dashboard/DashboardOverview';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get initial tab from URL parameters
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/login');
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
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

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-funlearn1">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-funlearn6"></div>
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