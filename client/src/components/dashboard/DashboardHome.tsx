import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Filter, ArrowUpAz, Globe, Compass, Clock, Star, MapPin, X, Loader2 } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';

const DashboardHome = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [trips, setTrips] = useState<any[]>([]);
    const [isLoadingTrips, setIsLoadingTrips] = useState(true);

    useEffect(() => {
        fetchTrips();
    }, []);

    const fetchTrips = async () => {
        try {
            const { data } = await api.get('/trips');
            setTrips(data);
        } catch (error) {
            console.error('Failed to fetch trips:', error);
        } finally {
            setIsLoadingTrips(false);
        }
    };

    const handleSearch = async (query: string) => {
        setSearchQuery(query);
        if (query.length < 3) {
            setSuggestions([]);
            return;
        }

        setIsSearching(true);
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`);
            const data = await response.json();
            setSuggestions(data);
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setIsSearching(false);
        }
    };

    const [selectedCity, setSelectedCity] = useState<any>(null);

    const regionalCities = [
        {
            name: "Paris",
            img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop",
            desc: "City of Light & Romance",
            details: "Paris is the capital of France, known for its cafe culture, the Eiffel Tower, and world-class museums like the Louvre. Perfect for a romantic getaway or a cultural deep-dive."
        },
        {
            name: "Tokyo",
            img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2094&auto=format&fit=crop",
            desc: "Neon Lights & Tradition",
            details: "Tokyo offers a unique blend of ultramodern skyscrapers and traditional temples. Explore the bustling streets of Shibuya, the serene Meiji Shrine, and incredible street food."
        },
        {
            name: "London",
            img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop",
            desc: "History & Modernity",
            details: "From the historic Tower of London to the modern Shard, London is a city of contrasts. Enjoy world-class theater in the West End and explore diverse neighborhoods."
        },
        {
            name: "New York",
            img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop",
            desc: "The City That Never Sleeps",
            details: "Experience the energy of NYC. From Broadway shows to Central Park, and iconic landmarks like the Statue of Liberty and Empire State Building."
        },
        {
            name: "Dubai",
            img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop",
            desc: "Luxury & Innovation",
            details: "Dubai is a city of superlatives, home to the world's tallest building, the Burj Khalifa, and luxurious shopping malls. A desert oasis of innovation."
        },
    ];

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-12">
            <div className="container mx-auto px-6">
                {/* ... existing welcome and banner ... */}

                {/* Explore Modal */}
                <AnimatePresence>
                    {selectedCity && (
                        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedCity(null)}
                                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="relative w-full max-w-2xl glass-card rounded-[40px] border border-white/10 overflow-hidden"
                            >
                                <div className="h-64 relative">
                                    <img src={selectedCity.img} alt={selectedCity.name} className="w-full h-full object-cover" />
                                    <button
                                        onClick={() => setSelectedCity(null)}
                                        className="absolute top-6 right-6 p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-all"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="p-8">
                                    <h2 className="text-3xl font-bold mb-2">{selectedCity.name}</h2>
                                    <p className="text-blue-400 font-medium mb-6">{selectedCity.desc}</p>
                                    <p className="text-gray-400 leading-relaxed mb-8">{selectedCity.details}</p>
                                    <div className="flex gap-4">
                                        <Link href={`/trips/create?location=${selectedCity.name}`} className="flex-1">
                                            <button className="w-full btn-premium py-4">Plan a Trip</button>
                                        </Link>
                                        <button
                                            onClick={() => setSelectedCity(null)}
                                            className="flex-1 py-4 rounded-2xl bg-white/5 hover:bg-white/10 font-bold transition-all"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Welcome Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome back, Traveler</h1>
                    <p className="text-gray-500">Where would you like to go next?</p>
                </div>

                {/* Banner Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative w-full h-[450px] rounded-[40px] overflow-hidden mb-10 group"
                >
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute bottom-12 left-12 max-w-lg">
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Featured Destination</span>
                        </div>
                        <h2 className="text-5xl font-bold mb-4 leading-tight">Swiss Alps <br />Winter Escape</h2>
                        <p className="text-gray-300 mb-8 leading-relaxed">Experience the magic of the Alps with our curated 7-day winter itinerary. Perfect for adventure seekers and luxury travelers.</p>
                        <Link href="/trips/create">
                            <button className="btn-premium">Explore Itinerary</button>
                        </Link>
                    </div>
                </motion.div>

                {/* Search & Filter Row */}
                <div className="flex flex-col lg:flex-row items-center gap-4 mb-16">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search for your next destination..."
                            className="w-full pl-12 pr-12 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl focus:outline-none focus:border-white/20 transition-all text-sm"
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => { setSearchQuery(''); setSuggestions([]); }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-all text-gray-500 hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}

                        {/* Suggestions Dropdown */}
                        <AnimatePresence>
                            {(suggestions.length > 0 || isSearching) && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute left-0 right-0 top-full mt-2 bg-[#121212] border border-white/10 rounded-2xl overflow-hidden z-[100] shadow-2xl"
                                >
                                    {isSearching ? (
                                        <div className="px-6 py-8 text-center">
                                            <div className="w-6 h-6 border-2 border-white/10 border-t-white/50 rounded-full animate-spin mx-auto mb-2" />
                                            <p className="text-xs text-gray-500">Searching places...</p>
                                        </div>
                                    ) : (
                                        suggestions.map((place, idx) => (
                                            <Link key={idx} href={`/trips/create?location=${encodeURIComponent(place.display_name)}`}>
                                                <button
                                                    className="w-full px-6 py-4 text-left hover:bg-white/5 transition-colors border-b border-white/5 last:border-none flex items-start gap-3 group"
                                                >
                                                    <MapPin className="w-4 h-4 mt-1 text-gray-500 group-hover:text-white transition-colors shrink-0" />
                                                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors line-clamp-2">{place.display_name}</span>
                                                </button>
                                            </Link>
                                        ))
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <div className="flex items-center gap-3 w-full lg:w-auto">
                        <button className="flex-1 lg:flex-none px-8 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 transition-colors text-sm font-medium">
                            Group by
                        </button>
                        <button className="flex-1 lg:flex-none px-8 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 transition-colors text-sm font-medium">
                            Filter
                        </button>
                        <button className="flex-1 lg:flex-none px-8 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 transition-colors text-sm font-medium">
                            Sort by...
                        </button>
                    </div>
                </div>

                {/* Top Regional Selections */}
                <section className="mb-20">
                    <div className="flex items-center gap-6 mb-10">
                        <h2 className="text-2xl font-bold tracking-tight whitespace-nowrap">Top Regional Selections</h2>
                        <div className="h-[1px] w-full bg-white/10" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                        {regionalCities.map((city, i) => (
                            <div key={i} onClick={() => setSelectedCity(city)} className="group cursor-pointer">
                                <div className="aspect-square rounded-3xl overflow-hidden mb-4 relative">
                                    <img src={city.img} alt={city.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                                        <span className="px-4 py-2 rounded-full bg-white text-black text-xs font-bold">Explore</span>
                                    </div>
                                </div>
                                <h3 className="font-bold text-lg group-hover:text-blue-400 transition-colors">{city.name}</h3>
                                <p className="text-xs text-gray-500">{city.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Previous Trips */}
                <section className="mb-20">
                    <div className="flex items-center gap-6 mb-10">
                        <h2 className="text-2xl font-bold tracking-tight whitespace-nowrap">Previous Trips</h2>
                        <div className="h-[1px] w-full bg-white/10" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {isLoadingTrips ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="aspect-[3/4] rounded-[32px] bg-white/[0.03] animate-pulse" />
                            ))
                        ) : trips.length > 0 ? (
                            trips.map((trip, i) => (
                                <div key={trip.id} className="group cursor-pointer">
                                    <div className="aspect-[3/4] rounded-[32px] overflow-hidden mb-6 relative">
                                        <img
                                            src={trip.image || `https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600&auto=format&fit=crop`}
                                            alt={trip.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
                                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-4">
                                            <Link href={`/trips/${trip.id}/itinerary`} className="w-3/4">
                                                <button className="w-full py-3 bg-white text-black rounded-xl font-bold text-sm hover:scale-105 transition-transform">
                                                    View Itinerary
                                                </button>
                                            </Link>
                                            <Link href={`/trips/${trip.id}`} className="w-3/4">
                                                <button className="w-full py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl font-bold text-sm hover:bg-white/20 transition-all">
                                                    Trip Details
                                                </button>
                                            </Link>
                                        </div>
                                        <div className="absolute bottom-6 left-6 group-hover:opacity-0 transition-opacity duration-500">
                                            <p className="text-xs font-medium text-white/60 mb-1">{new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                                            <h3 className="font-bold text-xl">{trip.title}</h3>
                                            <div className="flex items-center gap-2 mt-2 text-[10px] text-gray-400">
                                                <MapPin className="w-3 h-3" />
                                                {trip.location || 'Unknown Location'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center glass-card rounded-[40px]">
                                <Globe className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-500">No trips found. Start planning your first journey!</p>
                                <Link href="/trips/create">
                                    <button className="mt-6 btn-premium">Plan a Trip</button>
                                </Link>
                            </div>
                        )}
                    </div>
                </section>

                {/* Plan a Trip Floating Button */}
                <div className="fixed bottom-10 right-10 z-50">
                    <Link href="/trips/create">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white text-black rounded-full font-bold flex items-center gap-3 shadow-2xl shadow-white/20"
                        >
                            <Plus className="w-6 h-6" />
                            Plan a trip
                        </motion.button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;

