'use client';

import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/landing/Hero';
import { useAuth } from '@/context/AuthContext';
import DashboardHome from '@/components/dashboard/DashboardHome';

export default function Home() {
  const { user, isLoading } = useAuth();

  console.log('Home Page: render', { isLoading, user: !!user });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 animate-pulse">Loading GlobeTrotter...</p>
      </div>
    );
  }

  if (user) {
    return (
      <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
        <Navbar />
        <DashboardHome />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section id="features" className="py-24 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Everything you need to travel</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From budget tracking to real-time collaboration, GlobeTrotter is the only tool you'll ever need for your trips.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: 'Real-time Maps', desc: 'Visualize your entire route with interactive Google Maps integration.' },
            { title: 'Budget Analytics', desc: 'Detailed charts and insights into your spending patterns.' },
            { title: 'Itinerary Sharing', desc: 'Share your plans with friends or the world with public links.' },
            { title: 'Offline Access', desc: 'Access your plans even when you are off the grid.' }
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors group">
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center text-gray-500 text-sm">
        <p>&copy; 2026 GlobeTrotter. All rights reserved.</p>
      </footer>
    </main>
  );
}

