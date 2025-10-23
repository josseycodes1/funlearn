
'use client';
import { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  id: string;
  userName: string;
  message: string;
  timestamp: Date;
  isOwn: boolean;
}

interface ChatRoom {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  category: string;
}

export default function ChatRoom() {
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockChatRooms: ChatRoom[] = [
      {
        id: '1',
        name: 'Mathematics Help',
        description: 'Get help with math problems and concepts',
        memberCount: 24,
        category: 'Mathematics'
      },
      {
        id: '2',
        name: 'Science Club',
        description: 'Discuss scientific discoveries and theories',
        memberCount: 18,
        category: 'Science'
      },
      {
        id: '3',
        name: 'History Buffs',
        description: 'Share historical facts and stories',
        memberCount: 15,
        category: 'History'
      },
      {
        id: '4',
        name: 'Language Learners',
        description: 'Practice and learn new languages together',
        memberCount: 32,
        category: 'Languages'
      },
      {
        id: '5',
        name: 'Programming Help',
        description: 'Get coding assistance and share projects',
        memberCount: 28,
        category: 'Computer Science'
      }
    ];

    setTimeout(() => {
      setChatRooms(mockChatRooms);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const joinRoom = (roomId: string) => {
    setActiveRoom(roomId);
    // Mock messages for the room
    const mockMessages: ChatMessage[] = [
      {
        id: '1',
        userName: 'Alice Johnson',
        message: 'Hi everyone! Does anyone understand calculus?',
        timestamp: new Date(Date.now() - 3600000),
        isOwn: false
      },
      {
        id: '2',
        userName: 'Bob Smith',
        message: 'Sure! What specific topic are you struggling with?',
        timestamp: new Date(Date.now() - 3500000),
        isOwn: false
      },
      {
        id: '3',
        userName: 'You',
        message: 'I need help with integration by parts',
        timestamp: new Date(Date.now() - 3400000),
        isOwn: true
      },
      {
        id: '4',
        userName: 'Carol Davis',
        message: 'I can help with that! The formula is ∫u dv = uv - ∫v du',
        timestamp: new Date(Date.now() - 3300000),
        isOwn: false
      }
    ];
    setMessages(mockMessages);
  };

  const leaveRoom = () => {
    setActiveRoom(null);
    setMessages([]);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeRoom) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      userName: 'You',
      message: newMessage,
      timestamp: new Date(),
      isOwn: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate response after 2 seconds
    setTimeout(() => {
      const responses = [
        "That's a great question!",
        "I was wondering about that too.",
        "Does anyone have resources on this topic?",
        "Let me check my notes and get back to you.",
        "I found this helpful video explaining that concept."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        userName: 'Study Buddy',
        message: randomResponse,
        timestamp: new Date(),
        isOwn: false
      };
      setMessages(prev => [...prev, botMessage]);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-funlearn6"></div>
      </div>
    );
  }

  if (activeRoom) {
    const currentRoom = chatRooms.find(room => room.id === activeRoom);

    return (
      <div className="max-w-6xl mx-auto h-[600px] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Chat Header */}
        <div className="bg-funlearn6 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={leaveRoom}
                className="p-2 hover:bg-funlearn7 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h2 className="text-lg font-semibold">{currentRoom?.name}</h2>
                <p className="text-funlearn2 text-sm">{currentRoom?.memberCount} members online</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-funlearn7 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="p-2 hover:bg-funlearn7 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-md rounded-2xl px-4 py-2 ${
                  message.isOwn
                    ? 'bg-funlearn6 text-white rounded-br-none'
                    : 'bg-white border border-gray-200 rounded-bl-none'
                }`}
              >
                {!message.isOwn && (
                  <p className="text-xs font-medium text-funlearn7 mb-1">{message.userName}</p>
                )}
                <p className="text-sm">{message.message}</p>
                <p className={`text-xs mt-1 ${
                  message.isOwn ? 'text-funlearn3' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-funlearn6 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="px-6 py-3 bg-funlearn6 text-white rounded-lg font-semibold hover:bg-funlearn7 focus:ring-2 focus:ring-funlearn6 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Chat Rooms 💬</h1>
        <p className="text-gray-600 mt-2">Join study groups and collaborate with other students</p>
      </div>

      {/* Chat Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chatRooms.map(room => (
          <div key={room.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
                <span className="px-2 py-1 bg-funlearn2 text-funlearn8 text-xs font-medium rounded-full">
                  {room.category}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{room.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>👥</span>
                  <span>{room.memberCount} members</span>
                </div>
                <button
                  onClick={() => joinRoom(room.id)}
                  className="bg-funlearn6 text-white px-4 py-2 rounded-lg font-semibold hover:bg-funlearn7 transition-colors"
                >
                  Join Room
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Room Button */}
      <div className="mt-8 text-center">
        <button className="bg-white text-funlearn6 border-2 border-funlearn6 px-6 py-3 rounded-lg font-semibold hover:bg-funlearn1 transition-colors">
          + Create New Room
        </button>
      </div>
    </div>
  );
}