'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Calendar, MapPin, ArrowRight, Camera, Sparkles, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Navbar from '@/components/layout/Navbar';

const CreateTrip = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        startDate: '',
        endDate: '',
        description: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const { data } = await api.post('/trips', formData);
            router.push(`/trips/${data.id}/itinerary`);
        } catch (error) {
            console.error('Failed to create trip:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white selection:bg-white/20">
            <Navbar />

            <div className="container mx-auto px-6 pt-32 pb-24">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16"
                    >
                        <div className="flex items-center gap-6 mb-12">
                            <h1 className="text-4xl font-bold tracking-tight whitespace-nowrap">Plan a new trip</h1>
                            <div className="h-[1px] w-full bg-white/10" />
                        </div>
                    </motion.div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-8 mb-24">
                        <div className="grid grid-cols-1 gap-6">
                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                                <label className="w-full md:w-48 text-lg font-medium text-gray-300">Trip Title :</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g., Summer in the Swiss Alps"
                                    className="flex-1 px-6 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl focus:outline-none focus:border-white/20 transition-all"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                                <label className="w-full md:w-48 text-lg font-medium text-gray-300">Select a Place :</label>
                                <div className="flex-1 relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Where are you going?"
                                        className="w-full pl-12 pr-6 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl focus:outline-none focus:border-white/20 transition-all"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                                <label className="w-full md:w-48 text-lg font-medium text-gray-300">Start Date :</label>
                                <div className="flex-1 relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input
                                        type="date"
                                        required
                                        className="w-full pl-12 pr-6 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl focus:outline-none focus:border-white/20 transition-all"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                                <label className="w-full md:w-48 text-lg font-medium text-gray-300">End Date :</label>
                                <div className="flex-1 relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input
                                        type="date"
                                        required
                                        className="w-full pl-12 pr-6 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl focus:outline-none focus:border-white/20 transition-all"
                                        value={formData.endDate}
                                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-8">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-premium px-12 py-4 rounded-2xl flex items-center gap-3"
                            >
                                {isSubmitting ? 'Creating...' : 'Create Journey'}
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </form>

                    {/* Suggestions Section */}
                    <section>
                        <div className="flex items-center gap-6 mb-12">
                            <h2 className="text-2xl font-bold tracking-tight whitespace-nowrap">Suggestion for Places to Visit/Activities to perform</h2>
                            <div className="h-[1px] w-full bg-white/10" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { name: "Eiffel Tower", category: "Landmark", img: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1974&auto=format&fit=crop" },
                                { name: "Louvre Museum", category: "Culture", img: "https://images.unsplash.com/photo-1597910034998-247214af4428?q=80&w=2070&auto=format&fit=crop" },
                                { name: "Seine River Cruise", category: "Activity", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop" },
                                { name: "Montmartre", category: "District", img: "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?q=80&w=1974&auto=format&fit=crop" },
                                { name: "Arc de Triomphe", category: "Landmark", img: "https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?q=80&w=1974&auto=format&fit=crop" },
                                { name: "Palace of Versailles", category: "History", img: "https://images.unsplash.com/photo-1585155967349-90c1b1dc568e?q=80&w=2072&auto=format&fit=crop" },
                            ].map((item, i) => (
                                <div key={i} className="group cursor-pointer">
                                    <div className="aspect-square rounded-[32px] overflow-hidden mb-4 relative">
                                        <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                                        <div className="absolute top-4 right-4">
                                            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-widest">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-lg">{item.name}</h3>
                                    <p className="text-xs text-gray-500">Popular choice</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default CreateTrip;
