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

            <div className="container mx-auto px-6 pt-32 pb-12">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <Link href="/dashboard" className="inline-flex items-center text-sm text-gray-500 hover:text-white transition-colors mb-8 group">
                            <X className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform" />
                            Cancel and go back
                        </Link>
                        <h1 className="text-5xl font-bold tracking-tight mb-4">Start your journey.</h1>
                        <p className="text-gray-500 text-lg">Every great adventure begins with a single step. Tell us about your dream trip.</p>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="space-y-12">
                        {/* Cover Photo Placeholder */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="relative h-64 rounded-[40px] bg-white/[0.02] border border-white/[0.08] border-dashed flex flex-col items-center justify-center group cursor-pointer hover:bg-white/[0.04] transition-all"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                                <Camera className="w-8 h-8 text-gray-500" />
                            </div>
                            <span className="text-sm font-bold uppercase tracking-widest text-gray-500">Add Cover Photo</span>
                            <p className="text-[10px] text-gray-600 mt-2">Optional • JPG, PNG up to 10MB</p>
                        </motion.div>

                        <div className="grid grid-cols-1 gap-8">
                            <div className="space-y-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Journey Title</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g., Summer in the Swiss Alps"
                                    className="w-full px-8 py-6 bg-white/[0.02] border border-white/[0.08] rounded-[32px] text-xl font-medium focus:outline-none focus:border-white/20 transition-all placeholder:text-gray-700"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Departure</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                                        <input
                                            type="date"
                                            required
                                            className="w-full pl-16 pr-8 py-6 bg-white/[0.02] border border-white/[0.08] rounded-[32px] focus:outline-none focus:border-white/20 transition-all"
                                            value={formData.startDate}
                                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Return</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                                        <input
                                            type="date"
                                            required
                                            className="w-full pl-16 pr-8 py-6 bg-white/[0.02] border border-white/[0.08] rounded-[32px] focus:outline-none focus:border-white/20 transition-all"
                                            value={formData.endDate}
                                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Description</label>
                                <textarea
                                    rows={4}
                                    placeholder="What's the motive of this journey?"
                                    className="w-full px-8 py-6 bg-white/[0.02] border border-white/[0.08] rounded-[32px] focus:outline-none focus:border-white/20 transition-all resize-none placeholder:text-gray-700"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-8">
                            <div className="flex items-center space-x-2 text-gray-500">
                                <Sparkles className="w-4 h-4 text-blue-400" />
                                <span className="text-xs font-medium">Auto-generating itinerary suggestions...</span>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-premium group flex items-center"
                            >
                                {isSubmitting ? 'Creating...' : 'Create Journey'}
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default CreateTrip;
