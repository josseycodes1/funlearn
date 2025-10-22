import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-funlearn1 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Learning Made{' '}
            <span className="text-funlearn6">Fun & Engaging</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            AI-powered summaries, interactive quizzes, and collaborative chat rooms - all designed to make learning enjoyable for students of all levels
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/signup"
              className="bg-funlearn6 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-funlearn7 transition-colors shadow-lg hover:shadow-xl"
            >
              Start Learning Free
            </Link>
            <Link 
              href="#how-it-works"
              className="border-2 border-funlearn6 text-funlearn6 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-funlearn2 transition-colors"
            >
              See How It Works
            </Link>
          </div>
          
          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-funlearn6">10K+</div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-funlearn6">95%</div>
              <div className="text-gray-600">Better Retention</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-funlearn6">24/7</div>
              <div className="text-gray-600">Learning Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}