"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { useAuth } from '@/context/AuthContext';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Settings,
    Shield,
    LogOut,
    Camera,
    Sparkles,
    ChevronRight,
    Map,
    Heart,
    Award,
    Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import api from '@/lib/api';

interface Trip {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    city: string;
    image?: string;
}

const ProfilePage = () => {
    const { user, logout } = useAuth();
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        trips: 0,
        cities: 0,
        countries: 0,
        miles: '0'
    });

    useEffect(() => {
        if (user) {
            fetchProfileData();
        }
    }, [user]);

    const fetchProfileData = async () => {
        try {
            const [tripsRes, statsRes] = await Promise.all([
                api.get('/trips'),
                api.get('/admin/stats') // Reusing admin stats for now, ideally should be a user-specific endpoint
            ]);
            setTrips(tripsRes.data);
            // Mocking user-specific stats from general stats for now
            setStats({
                trips: tripsRes.data.length,
                cities: tripsRes.data.length * 2,
                countries: Math.ceil(tripsRes.data.length / 2),
                miles: (tripsRes.data.length * 1200).toLocaleString()
            });
        } catch (error) {
            console.error('Error fetching profile data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    const preplannedTrips = trips.filter(t => new Date(t.startDate) > new Date());
    const previousTrips = trips.filter(t => new Date(t.startDate) <= new Date());

    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />

            <div className="container mx-auto px-6 pt-32 pb-12">
                <div className="max-w-6xl mx-auto">
                    {/* Profile Header */}
                    <div className="relative mb-16">
                        <div className="h-64 rounded-[40px] bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 border border-white/10 overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
                        </div>

                        <div className="absolute -bottom-12 left-12 flex items-end space-x-8">
                            <div className="relative group">
                                <div className="w-32 h-32 rounded-[40px] bg-black border-4 border-black overflow-hidden relative">
                                    <div className="w-full h-full bg-white/[0.03] flex items-center justify-center">
                                        {user.avatar ? (
                                            <img src={user.avatar} alt={user.firstName} className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-12 h-12 text-gray-600" />
                                        )}
                                    </div>
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                        <Camera className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-xl border-4 border-black flex items-center justify-center">
                                    <Award className="w-4 h-4 text-white" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <h1 className="text-4xl font-bold tracking-tight">{user.firstName} {user.lastName}</h1>
                                <p className="text-gray-500 flex items-center mt-1">
                                    <MapPin className="w-4 h-4 mr-1.5" />
                                    {user.city || 'World'}, {user.country || 'Traveler'}
                                </p>
                            </div>
                        </div>

                        <div className="absolute bottom-4 right-12 flex items-center space-x-4">
                            <button className="btn-secondary py-2.5 px-6 text-sm flex items-center">
                                <Settings className="w-4 h-4 mr-2" />
                                Edit Profile
                            </button>
                            <button className="btn-premium py-2.5 px-6 text-sm">
                                Share Profile
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8">
                        {/* Left Column - Info */}
                        <div className="space-y-8">
                            <div className="glass-card p-8 rounded-[40px]">
                                <h3 className="text-xl font-bold mb-8">Personal Info</h3>
                                <div className="space-y-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
                                            <Mail className="w-5 h-5 text-gray-500" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Email</p>
                                            <p className="text-sm font-medium">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
                                            <Phone className="w-5 h-5 text-gray-500" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Phone</p>
                                            <p className="text-sm font-medium">{user.phoneNumber || 'Not provided'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
                                            <Calendar className="w-5 h-5 text-gray-500" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Member Since</p>
                                            <p className="text-sm font-medium">January 2024</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card p-8 rounded-[40px]">
                                <h3 className="text-xl font-bold mb-8">Travel Stats</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-3xl bg-white/[0.03] border border-white/[0.08] text-center">
                                        <div className="text-2xl font-bold">{stats.trips}</div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">Trips</p>
                                    </div>
                                    <div className="p-4 rounded-3xl bg-white/[0.03] border border-white/[0.08] text-center">
                                        <div className="text-2xl font-bold">{stats.cities}</div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">Cities</p>
                                    </div>
                                    <div className="p-4 rounded-3xl bg-white/[0.03] border border-white/[0.08] text-center">
                                        <div className="text-2xl font-bold">{stats.countries}</div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">Countries</p>
                                    </div>
                                    <div className="p-4 rounded-3xl bg-white/[0.03] border border-white/[0.08] text-center">
                                        <div className="text-2xl font-bold">{stats.miles}</div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">Miles</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={logout}
                                className="w-full p-6 rounded-[32px] bg-red-500/5 border border-red-500/10 text-red-400 font-bold flex items-center justify-center space-x-3 hover:bg-red-500/10 transition-all group"
                            >
                                <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                <span>Sign Out</span>
                            </button>
                        </div>

                        {/* Right Column - Content */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="glass-card p-8 rounded-[40px]">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xl font-bold">About Me</h3>
                                    <Sparkles className="w-5 h-5 text-blue-400" />
                                </div>
                                <p className="text-gray-400 leading-relaxed">
                                    {user.additionalInfo || "No bio provided yet. Tell the community about your travel style and favorite destinations!"}
                                </p>
                            </div>

                            {/* Preplanned Trips */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold">Preplanned Trips</h3>
                                    <button className="text-sm text-gray-500 hover:text-white transition-colors">View all</button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {loading ? (
                                        <div className="col-span-2 flex items-center justify-center py-12">
                                            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                                        </div>
                                    ) : preplannedTrips.length > 0 ? (
                                        preplannedTrips.map((trip, i) => (
                                            <div key={trip.id} className="glass-card rounded-[32px] overflow-hidden group cursor-pointer">
                                                <div className="h-40 relative overflow-hidden">
                                                    <img src={trip.image || `https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600&auto=format&fit=crop`} alt={trip.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                    <div className="absolute bottom-4 left-4">
                                                        <h4 className="font-bold">{trip.title}</h4>
                                                        <p className="text-[10px] text-gray-300 uppercase tracking-widest">{new Date(trip.startDate).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-2 glass-card p-8 rounded-[32px] text-center text-gray-500">
                                            No preplanned trips found.
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Previous Trips */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold">Previous Trips</h3>
                                    <button className="text-sm text-gray-500 hover:text-white transition-colors">View all</button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {loading ? (
                                        <div className="col-span-2 flex items-center justify-center py-12">
                                            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                                        </div>
                                    ) : previousTrips.length > 0 ? (
                                        previousTrips.map((trip, i) => (
                                            <div key={trip.id} className="glass-card rounded-[32px] overflow-hidden group cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                                                <div className="h-40 relative overflow-hidden">
                                                    <img src={trip.image || `https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=600&auto=format&fit=crop`} alt={trip.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                    <div className="absolute bottom-4 left-4">
                                                        <h4 className="font-bold">{trip.title}</h4>
                                                        <p className="text-[10px] text-gray-300 uppercase tracking-widest">{new Date(trip.startDate).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-2 glass-card p-8 rounded-[32px] text-center text-gray-500">
                                            No previous trips found.
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="glass-card p-8 rounded-[40px]">
                                <h3 className="text-xl font-bold mb-8">Preferences</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                                            <div className="flex items-center space-x-3">
                                                <Shield className="w-4 h-4 text-gray-500" />
                                                <span className="text-sm">Public Profile</span>
                                            </div>
                                            <div className="w-10 h-5 bg-blue-500 rounded-full relative">
                                                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                                            <div className="flex items-center space-x-3">
                                                <Map className="w-4 h-4 text-gray-500" />
                                                <span className="text-sm">Share Location</span>
                                            </div>
                                            <div className="w-10 h-5 bg-white/10 rounded-full relative">
                                                <div className="absolute left-1 top-1 w-3 h-3 bg-white/40 rounded-full" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                                            <div className="flex items-center space-x-3">
                                                <Heart className="w-4 h-4 text-gray-500" />
                                                <span className="text-sm">Show Favorites</span>
                                            </div>
                                            <div className="w-10 h-5 bg-blue-500 rounded-full relative">
                                                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                                            <div className="flex items-center space-x-3">
                                                <Award className="w-4 h-4 text-gray-500" />
                                                <span className="text-sm">Show Badges</span>
                                            </div>
                                            <div className="w-10 h-5 bg-blue-500 rounded-full relative">
                                                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;
